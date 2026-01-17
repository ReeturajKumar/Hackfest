import express from 'express';
import * as XLSX from 'xlsx';
import Registration from '../models/Registration.js';
import { validateRegistration, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// POST /api/v1/register - Create new registration
router.post('/register', validateRegistration, handleValidationErrors, async (req, res) => {
  try {
    const {
      name, email, mobile, gender,
      college, city, state, course, year,
      participationType, teamName,
      member2Name, member2Email, member2Mobile,
      member3Name, member3Email, member3Mobile,
      member4Name, member4Email, member4Mobile,
      skillLevel, interests, referralSource,
      communicationConsent, declaration
    } = req.body;

    // Check if email already registered
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
      });
    }

    // Build team members array
    const teamMembers = [];
    if (participationType === 'team') {
      if (member2Name && member2Email && member2Mobile) {
        teamMembers.push({ name: member2Name, email: member2Email, mobile: member2Mobile });
      }
      if (member3Name && member3Email && member3Mobile) {
        teamMembers.push({ name: member3Name, email: member3Email, mobile: member3Mobile });
      }
      if (member4Name && member4Email && member4Mobile) {
        teamMembers.push({ name: member4Name, email: member4Email, mobile: member4Mobile });
      }
    }

    // Create registration
    const registration = new Registration({
      name,
      email,
      mobile,
      gender,
      college,
      city,
      state,
      course,
      year,
      participationType,
      teamName: participationType === 'team' ? teamName : undefined,
      teamMembers: participationType === 'team' ? teamMembers : [],
      skillLevel,
      interests: interests || [],
      referralSource,
      communicationConsent,
      declaration,
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: registration.registrationId,
        name: registration.name,
        email: registration.email,
        participationType: registration.participationType,
        paymentAmount: registration.paymentAmount,
        paymentStatus: registration.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// GET /api/v1/registrations - Get all registrations (Admin)
router.get('/registrations', async (req, res) => {
  try {
    const { page = 1, limit = 10, participationType, paymentStatus } = req.query;

    const filter = {};
    if (participationType) filter.participationType = participationType;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const registrations = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Registration.countDocuments(filter);

    res.json({
      success: true,
      data: registrations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});


// GET /api/v1/registrations/export

router.get('/registrations/export', async (req, res) => {
  try {
    const { type, paymentStatus, from, to } = req.query;

    // Build filter dynamically
    const filter = {};

    if (type) {
      filter.participationType = type;
    }

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const registrations = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (!registrations.length) {
      return res.status(404).json({
        success: false,
        message: 'No registrations found to export',
      });
    }

    // Flatten data for Excel
    const data = registrations.map((reg) => {
      const row = {
        'Registration ID': reg.registrationId,
        'Name': reg.name,
        'Email': reg.email,
        'Mobile': reg.mobile,
        'Gender': reg.gender || 'N/A',
        'College': reg.college,
        'City': reg.city,
        'State': reg.state,
        'Course': reg.course,
        'Year': reg.year,
        'Participation Type': reg.participationType,
        'Team Name': reg.teamName || 'N/A',
        'Skill Level': reg.skillLevel,
        'Interests': Array.isArray(reg.interests)
          ? reg.interests.join(', ')
          : reg.interests || 'N/A',
        'Referral Source': reg.referralSource || 'N/A',
        'Payment Status': reg.paymentStatus,
        'Payment Amount': reg.paymentAmount || 0,
        'Registered Date': new Date(reg.createdAt).toLocaleString(),
      };

      // Team members (if team)
      if (reg.participationType === 'team' && Array.isArray(reg.teamMembers)) {
        reg.teamMembers.forEach((member, index) => {
          row[`Member ${index + 2} Name`] = member.name || '';
          row[`Member ${index + 2} Email`] = member.email || '';
          row[`Member ${index + 2} Mobile`] = member.mobile || '';
        });
      }

      return row;
    });

    // Create Excel workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    const buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    // Response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=registrations_${new Date().toISOString().slice(0, 10)}.xlsx`
    );

    return res.send(buffer);

  } catch (error) {
    console.error('Export error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to export registrations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});


// GET /api/v1/registrations/:id - Get single registration
router.get('/registrations/:id', async (req, res) => {
  try {
    // Check if the provided ID is a valid MongoDB ObjectId format
    const isValidObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);

    // Only query _id if it's a valid format, otherwise only search by registrationId
    const query = isValidObjectId
      ? { $or: [{ _id: req.params.id }, { registrationId: req.params.id }] }
      : { registrationId: req.params.id };

    const registration = await Registration.findOne(query).select('-__v');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error('Fetch registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// PATCH /api/v1/registrations/:id/payment - Update payment status
router.patch('/registrations/:id/payment', async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!['pending', 'completed', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status',
      });
    }

    const registration = await Registration.findOneAndUpdate(
      { registrationId: req.params.id },
      { paymentStatus },
      { new: true }
    ).select('-__v');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.json({
      success: true,
      message: 'Payment status updated',
      data: registration,
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// POST /api/v1/payment-callback - Handle Easebuzz payment response
router.post('/payment-callback', async (req, res) => {
  try {
    // IMPORTANT: Log the entire body so we can see what Easebuzz sends in production
    console.log('--- EASEBUZZ CALLBACK RECEIVED ---');
    console.log(JSON.stringify(req.body, null, 2));

    // Easebuzz might send txnid or transaction_id
    const txnid = req.body.txnid || req.body.transaction_id;
    const status = req.body.status;

    if (!txnid) {
      console.error('Callback error: Missing txnid in request body');
      return res.status(400).json({ success: false, message: 'Missing txnid' });
    }

    // Map Easebuzz status to our internal status (Case-insensitive)
    const normalizedStatus = status?.toLowerCase();
    let paymentStatus = 'pending';
    if (normalizedStatus === 'success') paymentStatus = 'completed';
    else if (normalizedStatus === 'failure' || normalizedStatus === 'usercancelled') paymentStatus = 'failed';

    const registration = await Registration.findOneAndUpdate(
      { registrationId: txnid.trim() },
      {
        paymentStatus,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!registration) {
      console.error(`Registration not found for txnid: ${txnid}`);
      // Return 200 anyway to stop Easebuzz retries if the ID is just invalid
      return res.status(200).json({ success: false, message: 'Registration not found' });
    }

    console.log(`Successfully updated status for ${txnid} to ${paymentStatus}`);
    res.status(200).json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// GET /api/v1/stats - Get registration statistics
router.get('/stats', async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const individualCount = await Registration.countDocuments({ participationType: 'individual' });
    const teamCount = await Registration.countDocuments({ participationType: 'team' });
    const paidCount = await Registration.countDocuments({ paymentStatus: 'completed' });
    const pendingCount = await Registration.countDocuments({ paymentStatus: 'pending' });

    res.json({
      success: true,
      data: {
        total: totalRegistrations,
        individual: individualCount,
        team: teamCount,
        paid: paidCount,
        pending: pendingCount,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;
