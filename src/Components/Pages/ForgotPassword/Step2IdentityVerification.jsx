import React from 'react';
import {useDispatch} from "react-redux";

const Step2IdentityVerification = ({ 
  formData, 
  errors, 
  countdown, 
  handleChange, 
  handleVerifyCode, 
  handleResendCode, 
  setStep,
  loading
}) => {

  const dispatch = useDispatch();
  return (
    <div className="space-y-6 form-section">
      <div className="text-center mb-6">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Contact Method</h3>
        <p className="text-gray-600">
          We've sent a 6-digit reset code to <span className="font-medium">{formData.contact}</span>
        </p>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Enter Reset Code
        </label>
        <div className="relative">
          <input
            type="text"
            name="resetCode"
            value={formData.resetCode}
            onChange={handleChange}
            placeholder="Enter 6-digit code"
            className={`w-full border ${
              errors.resetCode ? 'border-red-500' : 'border-gray-300'
            } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            maxLength={6}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        {errors.resetCode && (
          <p className="mt-1 text-sm text-red-500">{errors.resetCode}</p>
        )}
        
        <div className="mt-4 text-center">
          {countdown > 0 ? (
            <p className="text-gray-500">
              Resend code in {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              Didn't receive code? Resend now
            </button>
          )}
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="button"
          onClick={handleVerifyCode}
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
              Verifying Code...
            </div>
          ) : (
            'Verify Code'
          )}
        </button>
      </div>
      
      <div className="pt-4 text-center">
        <button 
          onClick={() => dispatch(setStep(1))}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to previous step
        </button>
      </div>
    </div>
  );
};

export default Step2IdentityVerification;