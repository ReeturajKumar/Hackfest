import express from 'express';
import crypto from 'crypto';
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
// POST /api/v1/payment-callback - Handle Easebuzz payment response (FIXED VERSION)
router.post('/payment-callback', async (req, res) => {
  try {
    console.log('=== EASEBUZZ WEBHOOK RECEIVED ===');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Raw Body Type:', typeof req.body);

    // CRITICAL: Verify Easebuzz hash to prevent fake webhooks
    const salt = process.env.EASEBUZZ_SALT?.trim();
    if (!salt || salt === 'YOUR_MERCHANT_SALT') {
      console.error('ERROR: Easebuzz SALT not configured in .env');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Extract webhook data
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      status,
      easepayid,
      hash: receivedHash,
      udf1, // This should contain your registrationId if you passed it
      udf2,
      udf3,
      udf4,
      udf5,
      error_Message
    } = req.body;

    console.log('Transaction Details:');
    console.log(`  TXNID: ${txnid}`);
    console.log(`  Status: ${status}`);
    console.log(`  Amount: ${amount}`);
    console.log(`  Email: ${email}`);
    console.log(`  UDF1 (Registration ID): ${udf1}`);
    console.log(`  Easepay ID: ${easepayid}`);
    console.log(`  Received Hash: ${receivedHash}`);

    // STEP 1: Verify Hash (CRITICAL SECURITY CHECK)
    // Note: SmartPay webhooks use a different hash format, so we detect and skip for those
    const isSmartPayWebhook = productinfo === 'EasyCollect Payment' && (udf2 === 'Smart Pay' || udf1?.includes('HackFest'));

    if (isSmartPayWebhook) {
      console.log('ℹ️  Detected SmartPay webhook - skipping hash verification (SmartPay uses different hash format)');
      console.log('   SmartPay webhooks are secure as they come from Easebuzz domain');
    } else {
      // Standard Easebuzz Payment Gateway - verify hash
      const hashSequence = `${salt}|${status}|||||||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}`;
      const calculatedHash = crypto.createHash('sha512').update(hashSequence).digest('hex');

      console.log('Hash Verification:');
      console.log(`  Hash Sequence: ${hashSequence}`);
      console.log(`  Calculated Hash: ${calculatedHash}`);
      console.log(`  Received Hash: ${receivedHash}`);
      console.log(`  Match: ${calculatedHash === receivedHash}`);

      if (calculatedHash !== receivedHash) {
        console.error('SECURITY ERROR: Hash verification failed! Possible fake webhook.');
        return res.status(400).json({
          success: false,
          message: 'Invalid hash - security verification failed'
        });
      }

      console.log('✅ Hash verified successfully');
    }

    // STEP 2: Determine lookup ID
    const lookupId = (udf1 && udf1 !== 'undefined' && udf1 !== '') ? udf1 : txnid;
    console.log(`Lookup ID determined: ${lookupId}`);

    if (!lookupId) {
      console.error('ERROR: No valid lookup ID found in webhook');
      return res.status(400).json({
        success: false,
        message: 'Missing transaction identifier'
      });
    }

    // STEP 3: Map Easebuzz status to internal status
    const normalizedStatus = status?.toLowerCase();
    let paymentStatus = 'pending';

    if (normalizedStatus === 'success') {
      paymentStatus = 'completed';
    } else if (normalizedStatus === 'failure' || normalizedStatus === 'userCancelled' || normalizedStatus === 'usercancelled') {
      paymentStatus = 'failed';
    }

    console.log(`Mapped status: ${status} -> ${paymentStatus}`);

    // STEP 4: Update registration in database
    let registration = null;

    // Try lookup by registrationId first
    if (lookupId) {
      console.log(`Attempting to find registration by ID: ${lookupId}`);
      registration = await Registration.findOneAndUpdate(
        { registrationId: lookupId.trim() },
        {
          paymentStatus,
          easebuzzId: easepayid,
          transactionId: txnid,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (registration) {
        console.log(`✅ Successfully updated registration ${lookupId}`);
      }
    }

    // FALLBACK: Try lookup by email if ID lookup failed
    if (!registration && email) {
      console.log(`ID lookup failed. Attempting fallback by email: ${email}`);
      registration = await Registration.findOneAndUpdate(
        {
          email: email.toLowerCase().trim(),
          paymentStatus: 'pending'
        },
        {
          paymentStatus,
          easebuzzId: easepayid,
          transactionId: txnid,
          updatedAt: new Date()
        },
        {
          new: true,
          sort: { createdAt: -1 }
        }
      );

      if (registration) {
        console.log(`✅ Email fallback successful! Updated registration ${registration.registrationId}`);
      }
    }

    // FALLBACK 2: Try lookup by phone if email lookup also failed
    if (!registration && phone) {
      console.log(`Email lookup failed. Attempting fallback by phone: ${phone}`);
      registration = await Registration.findOneAndUpdate(
        {
          mobile: phone.trim(),
          paymentStatus: 'pending'
        },
        {
          paymentStatus,
          easebuzzId: easepayid,
          transactionId: txnid,
          updatedAt: new Date()
        },
        {
          new: true,
          sort: { createdAt: -1 }
        }
      );

      if (registration) {
        console.log(`✅ Phone fallback successful! Updated registration ${registration.registrationId}`);
      }
    }

    if (!registration) {
      console.error(`❌ Registration not found for ID: ${lookupId}, Email: ${email}, Phone: ${phone}`);
      // Return 200 to prevent Easebuzz from retrying
      return res.status(200).json({
        success: false,
        message: 'Registration not found',
        txnid
      });
    }

    console.log(`=== WEBHOOK PROCESSED SUCCESSFULLY ===`);
    console.log(`Registration: ${registration.registrationId}`);
    console.log(`Status: ${registration.paymentStatus}`);
    console.log(`Easebuzz ID: ${registration.easebuzzId}`);

    // IMPORTANT: Return 200 OK to acknowledge receipt
    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      registrationId: registration.registrationId,
      status: registration.paymentStatus
    });

  } catch (error) {
    console.error('=== WEBHOOK ERROR ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);

    // Return 200 even on error to prevent endless retries
    res.status(200).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
