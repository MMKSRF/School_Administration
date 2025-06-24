import React from 'react';
import { Link } from 'react-router-dom';

const Step1AccountRecovery = ({ formData, errors, handleChange, handleSendCode, loading }) => {
  return (
    <div className="space-y-6 form-section">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Select Your School
        </label>
        <div className="relative">
          <select
            name="schoolId"
            value={formData.schoolId}
            onChange={handleChange}
            className={`w-full border ${
              errors.schoolId ? 'border-red-500' : 'border-gray-300'
            } rounded-lg px-4 py-3 pl-12 pr-10 focus:outline-none appearance-none bg-white`}
          >
            <option value="">Search for your school</option>
            {schools.map(school => (
              <option key={school.id} value={school.id}>{school.name} - {school.region}</option>
            ))}
          </select>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        {errors.schoolId && (
          <p className="mt-1 text-sm text-red-500">{errors.schoolId}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Your Role at the School
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => handleChange({ target: { name: 'role', value: 'teacher' } })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              formData.role === 'teacher' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span>Teacher</span>
            </div>
          </div>
          
          <div 
            onClick={() => handleChange({ target: { name: 'role', value: 'student' } })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              formData.role === 'student' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span>Student</span>
            </div>
          </div>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Recovery Email or Phone Number
        </label>
        <div className="relative">
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter email or phone number on file"
            className={`w-full border ${
              errors.contact ? 'border-red-500' : 'border-gray-300'
            } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        {errors.contact && (
          <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Enter the email or phone number associated with your school account
        </p>
      </div>
      
      <div className="pt-4">
        <button
          type="button"
          onClick={handleSendCode}
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
              Sending Reset Code...
            </div>
          ) : (
            'Send Reset Code'
          )}
        </button>
      </div>
      
      <div className="pt-4 text-center">
        <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

const schools = [
  { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa" },
  { id: 2, name: "Hawassa University School", region: "Sidama" },
  { id: 3, name: "Mekelle International Academy", region: "Tigray" },
  { id: 4, name: "Bahir Dar Model School", region: "Amhara" },
  { id: 5, name: "Jimma Preparatory School", region: "Oromia" },
  { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa" },
];

export default Step1AccountRecovery;