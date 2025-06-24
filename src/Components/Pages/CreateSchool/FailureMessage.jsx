import React from 'react';
import { Link } from 'react-router-dom';

const FailureMessage = ({ errorMessage, onRetry }) => {
  return (
    <div className="text-center py-10">
      <div className="bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Account Creation Failed!</h3>
      <p className="text-gray-600 mb-6">
        {errorMessage || 'There was an issue creating your account. Please try again.'}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Try Again
        </button>
        <Link 
          to="/contact" 
          className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default FailureMessage;