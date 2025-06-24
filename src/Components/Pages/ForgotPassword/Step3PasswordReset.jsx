import React from 'react';
import {useDispatch} from "react-redux";

const Step3PasswordReset = ({ 
  formData, 
  errors, 
  handleChange, 
  handleResetPassword, 
  setStep,
  loading
}) => {

  const dispatch = useDispatch();
  return (
    <div className="space-y-6 form-section">
      <div className="text-center mb-6">
        <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Create New Password</h3>
        <p className="text-gray-600">
          Your identity has been verified. Please create a new secure password.
        </p>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Create a new password"
            className={`w-full border ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Use at least 8 characters with a mix of letters, numbers, and symbols
        </p>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            className={`w-full border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div className="pt-4">
        <button
          type="button"
          onClick={handleResetPassword}
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
              Resetting Password...
            </div>
          ) : (
            'Reset Password'
          )}
        </button>
      </div>
      
      <div className="pt-4 text-center">
        <button 
          onClick={() => dispatch(setStep(2))}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to code verification
        </button>
      </div>
    </div>
  );
};

export default Step3PasswordReset;