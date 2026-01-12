import { body, validationResult } from 'express-validator';

// Validation rules for registration
export const validateRegistration = [
  // Step 1: Basic Details
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^\d{10,}$/)
    .withMessage('Please provide a valid 10-digit mobile number'),

  // Step 2: Academic Details
  body('college')
    .trim()
    .notEmpty()
    .withMessage('College name is required'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),

  body('state')
    .notEmpty()
    .withMessage('State is required'),

  body('course')
    .notEmpty()
    .withMessage('Course is required')
    .isIn(['BE', 'BTech', 'BCA', 'BCS', 'BSc (CS)', 'MCA', 'Other'])
    .withMessage('Invalid course selection'),

  body('year')
    .notEmpty()
    .withMessage('Year of study is required')
    .isIn(['1st Year', '2nd Year', '3rd Year', '4th Year', 'Passout'])
    .withMessage('Invalid year selection'),

  // Step 3: Participation Details
  body('participationType')
    .notEmpty()
    .withMessage('Participation type is required')
    .isIn(['individual', 'team'])
    .withMessage('Invalid participation type'),

  body('teamName')
    .if(body('participationType').equals('team'))
    .trim()
    .notEmpty()
    .withMessage('Team name is required for team participation'),

  // Step 4: Skills & Interests
  body('skillLevel')
    .notEmpty()
    .withMessage('Skill level is required')
    .isIn(['Beginner / Non-Coder', 'Basic Coding Knowledge', 'Intermediate', 'Advanced'])
    .withMessage('Invalid skill level'),

  body('referralSource')
    .notEmpty()
    .withMessage('Referral source is required')
    .isIn(['Instagram', 'WhatsApp', 'College / Friend', 'Campus Ambassador', 'Poster / Banner', 'Other'])
    .withMessage('Invalid referral source'),

  // Step 5: Consent
  body('communicationConsent')
    .isBoolean()
    .withMessage('Communication consent must be a boolean')
    .equals('true')
    .withMessage('Communication consent is required'),

  body('declaration')
    .isBoolean()
    .withMessage('Declaration must be a boolean')
    .equals('true')
    .withMessage('Declaration is required'),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};
