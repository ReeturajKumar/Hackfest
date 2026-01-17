import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Step1BasicDetails from '../components/registration/Step1BasicDetails';
import Step2AcademicDetails from '../components/registration/Step2AcademicDetails';
import Step3ParticipationDetails from '../components/registration/Step3ParticipationDetails';
import Step4SkillLevels from '../components/registration/Step4SkillLevels';
import Step5Consent from '../components/registration/Step5Consent';

const Register = () => {
  const location = useLocation();
  const plan = location.state?.plan || 'solo';

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    mobile: '',
    gender: '',
    // Step 2
    college: '',
    city: '',
    state: 'Maharashtra',
    course: '',
    year: '',
    // Step 3
    participationType: plan === 'team' ? 'team' : 'individual',
    teamName: '',
    member2Name: '',
    member2Email: '',
    member2Mobile: '',
    member3Name: '',
    member3Email: '',
    member3Mobile: '',
    member4Name: '',
    member4Email: '',
    member4Mobile: '',
    // Step 4
    skillLevel: '',
    interests: [],
    referralSource: '',
    // Step 5
    communicationConsent: false,
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!formData.email.includes('@') || !formData.email.includes('.')) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      else if (formData.mobile.length < 10) {
        newErrors.mobile = 'Please enter a valid mobile number';
      }
    }

    if (step === 2) {
      if (!formData.college.trim()) newErrors.college = 'College/Institute name is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.course) newErrors.course = 'Course is required';
      if (!formData.year) newErrors.year = 'Year of study is required';
    }

    if (step === 3) {
      if (!formData.participationType) {
        newErrors.participationType = 'Please select participation type';
      } else if (formData.participationType === 'team') {
        if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
        if (!formData.member2Name.trim()) newErrors.member2Name = 'Team member 2 name is required';
        if (!formData.member2Email.trim()) newErrors.member2Email = 'Team member 2 email is required';
        if (!formData.member2Mobile.trim()) newErrors.member2Mobile = 'Team member 2 mobile is required';
      }
    }

    if (step === 4) {
      if (!formData.skillLevel) newErrors.skillLevel = 'Skill level is required';
      if (!formData.referralSource) newErrors.referralSource = 'Referral source is required';
    }

    if (step === 5) {
      if (!formData.communicationConsent) {
        newErrors.communicationConsent = 'Communication consent is required';
      }
      if (!formData.declaration) {
        newErrors.declaration = 'Declaration is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(5)) {
      try {
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Call backend API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Prepare payment URL with user data for auto-fill
          const baseUrl = data.data.participationType === 'individual'
            ? 'https://smartpay.easebuzz.in/142077/Indi_HackFest2026'
            : 'https://smartpay.easebuzz.in/142077/Team_HackFest2026';

          // Build URL parameters
          const urlParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            amount: data.data.paymentAmount,
            txnid: data.data.registrationId,
            udf1: data.data.registrationId, // CRITICAL: Always pass registration ID in UDF1
          };

          // Add team name in UDF2 if team registration
          if (data.data.participationType === 'team' && formData.teamName) {
            urlParams.udf2 = formData.teamName; // Team name in UDF2
          }

          const params = new URLSearchParams(urlParams);
          const paymentUrl = `${baseUrl}?${params.toString()}`;

          // Log URL for debugging
          console.log('Payment URL:', paymentUrl);

          // Redirect to payment page immediately
          window.location.href = paymentUrl;
        } else {
          // Error from backend
          alert(`❌ Registration Failed\n\n${data.message || 'Please try again.'}`);
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('❌ Registration Failed\n\nUnable to connect to server. Please check your internet connection and try again.');
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Registration';
      }
    }
  };

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Academic Details' },
    { number: 3, title: 'Participation' },
    { number: 4, title: 'Skills & Interests' },
    { number: 5, title: 'Consent' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicDetails formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2AcademicDetails formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3ParticipationDetails formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Step4SkillLevels formData={formData} handleChange={handleChange} setFormData={setFormData} errors={errors} />;
      case 5:
        return <Step5Consent formData={formData} handleChange={handleChange} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-white flex items-start justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      <div className="max-w-7xl w-full">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8">
          {/* Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${currentStep > step.number
                        ? 'bg-gradient-to-r from-[#FF2D95] to-[#7030A0] text-white'
                        : currentStep === step.number
                          ? 'bg-gradient-to-r from-[#FF2D95] to-[#7030A0] text-white ring-4 ring-pink-100'
                          : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                        }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${currentStep > step.number ? 'bg-gradient-to-r from-[#FF2D95] to-[#7030A0]' : 'bg-gray-200'
                        }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={currentStep === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between pt-5 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                  }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <button
                  type="submit"
                  className="relative flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:scale-105"></span>
                  <span className="relative flex items-center gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="relative flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:scale-105"></span>
                  <span className="relative flex items-center gap-2">
                    Submit Registration
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
