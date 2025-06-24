import React from 'react';

const Step2RoleSelection = ({ school, onRoleSelect, onBack }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join {school.name}</h2>
        <p className="text-gray-600">
          Select your role to continue. Are you joining as a student or a teacher?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div 
          className="border-2 border-gray-200 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-300"
          onClick={() => onRoleSelect('student')}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">I'm a Student</h3>
          <p className="text-gray-600">
            Join your class and access your schedule, assignments, and school resources.
          </p>
          <div className="mt-6">
            <button className="text-blue-600 font-medium flex items-center justify-center">
              Continue as Student
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          className="border-2 border-gray-200 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-300"
          onClick={() => onRoleSelect('teacher')}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">I'm a Teacher</h3>
          <p className="text-gray-600">
            Access your teaching schedule, manage classes, and collaborate with colleagues.
          </p>
          <div className="mt-6">
            <button className="text-blue-600 font-medium flex items-center justify-center">
              Continue as Teacher
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to school selection
        </button>
      </div>
    </div>
  );
};

export default Step2RoleSelection;