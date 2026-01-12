import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  // Step 1: Basic Details
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\d{10,}$/, 'Please provide a valid mobile number'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'prefer-not-to-say', ''],
    default: '',
  },

  // Step 2: Academic Details
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    default: 'Maharashtra',
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    enum: ['BE', 'BTech', 'BCA', 'BCS', 'BSc (CS)', 'MCA', 'Other'],
  },
  year: {
    type: String,
    required: [true, 'Year of study is required'],
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Passout'],
  },

  // Step 3: Participation Details
  participationType: {
    type: String,
    required: [true, 'Participation type is required'],
    enum: ['individual', 'team'],
  },
  teamName: {
    type: String,
    trim: true,
  },
  teamMembers: [{
    name: String,
    email: String,
    mobile: String,
  }],

  // Step 4: Skills & Interests
  skillLevel: {
    type: String,
    required: [true, 'Skill level is required'],
    enum: ['Beginner / Non-Coder', 'Basic Coding Knowledge', 'Intermediate', 'Advanced'],
  },
  interests: [{
    type: String,
    enum: ['AI / ML', 'No-Code Tools', 'Web / App Development', 'Automation', 'Blockchain', 'Just Exploring', 'DevOps'],
  }],
  referralSource: {
    type: String,
    required: [true, 'Referral source is required'],
    enum: ['Instagram', 'WhatsApp', 'College / Friend', 'Campus Ambassador', 'Poster / Banner', 'Other'],
  },

  // Step 5: Consent
  communicationConsent: {
    type: Boolean,
    required: [true, 'Communication consent is required'],
    default: false,
  },
  declaration: {
    type: Boolean,
    required: [true, 'Declaration is required'],
    default: false,
  },

  // Additional fields
  registrationId: {
    type: String,
    unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Generate registration ID before saving
registrationSchema.pre('save', function (next) {
  if (!this.registrationId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    this.registrationId = `CBZ${timestamp}${random}`.toUpperCase();
  }

  // Set payment amount based on participation type
  if (!this.paymentAmount) {
    this.paymentAmount = this.participationType === 'individual' ? 499 : 999;
  }

  next();
});

// Virtual for team size
registrationSchema.virtual('teamSize').get(function () {
  if (this.participationType === 'individual') return 1;
  return 1 + (this.teamMembers ? this.teamMembers.length : 0);
});

// Ensure virtuals are included in JSON
registrationSchema.set('toJSON', { virtuals: true });
registrationSchema.set('toObject', { virtuals: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
