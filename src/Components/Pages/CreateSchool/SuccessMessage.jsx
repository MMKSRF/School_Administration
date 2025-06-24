import React from 'react';
import { Link } from 'react-router-dom';

const SuccessMessage = () => {
  return (
    <div className="text-center py-10">
      <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Account Created Successfully!</h3>
      <p className="text-gray-600 mb-8">
        Congratulations! Your school account has been created. You can now start using Aqimari to manage your schedules.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link 
          to="/dashboard" 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Go to Dashboard
        </Link>
        <button className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">
          Watch Tutorial
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;