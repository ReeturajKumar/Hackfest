import express from 'express';
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

// GET /api/v1/registrations/:id - Get single registration
router.get('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findOne({
      $or: [
        { _id: req.params.id },
        { registrationId: req.params.id }
      ]
    }).select('-__v');

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
