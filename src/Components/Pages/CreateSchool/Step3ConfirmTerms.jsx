import React from 'react';

const Step3ConfirmTerms = ({ loading /*handleSubmit*/ }) => {
  return (
    <div className="space-y-6 form-section">
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start">
          <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1 mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-blue-700">
            <span className="font-bold">Pro Tip:</span> Your school will be verified before full access is granted. This usually takes 1-2 business days.
          </p>
        </div>
      </div>
      
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            required
          />
        </div>
        <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
          I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>
        </label>
      </div>
      
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="newsletter"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
        </div>
        <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
          I want to receive product updates and tips via email
        </label>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md transition-all ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            'Create School Account'
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3ConfirmTerms;