import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Step5Consent = ({ formData, handleChange, setFormData, errors }) => {
  const handleCheckboxChange = (name) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Consent & Confirmation</h2>
        <p className="text-gray-500 text-sm mb-6">Please review and confirm the following</p>
      </div>

      <div className="space-y-4">
        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={formData.communicationConsent || false}
            onChange={() => handleCheckboxChange('communicationConsent')}
            className="w-5 h-5 mt-0.5 text-pink-600 focus:ring-pink-500 rounded"
          />
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium text-gray-900">
              Communication Consent <span className="text-red-500">*</span>
            </span>
            <p className="text-xs text-gray-500 mt-1">
              I agree to receive hackathon updates via WhatsApp and Email
            </p>
          </div>
        </label>
        {errors.communicationConsent && (
          <p className="text-xs text-red-500 ml-4">{errors.communicationConsent}</p>
        )}

        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={formData.declaration || false}
            onChange={() => handleCheckboxChange('declaration')}
            className="w-5 h-5 mt-0.5 text-pink-600 focus:ring-pink-500 rounded"
          />
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium text-gray-900">
              Declaration <span className="text-red-500">*</span>
            </span>
            <p className="text-xs text-gray-500 mt-1">
              I confirm that the information provided is correct and I agree to the <Link to="/Terms & Conditions – Refund & Cancellation Policy.pdf" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline" onClick={(e) => e.stopPropagation()}>Terms & Conditions</Link>.
            </p>
          </div>
        </label>
        {errors.declaration && (
          <p className="text-xs text-red-500 ml-4">{errors.declaration}</p>
        )}
      </div>

      <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-pink-800">
            <p className="font-medium mb-1">Review Your Information</p>
            <p className="text-xs">
              Please ensure all information is correct before submitting. You will receive a confirmation email after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Consent;

