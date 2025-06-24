import React from 'react';
import BasicInput from '../../Ui/BasicInput';

const Step1SchoolInfo = ({ formData, errors, handleChange, handleAcademicLevelChange, handleNext }) => {
  return (
    <div className="space-y-6 form-section">
      <BasicInput 
        label='School Name'
        name='schoolName'
        type='text'
        value={formData.schoolName}
        onChange={handleChange}
        placeholder="Enter your school's full name"
        error={errors.schoolName}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>}
      />
      
      <BasicInput
        label='School ID (Shortcode)'
        name='schoolId'
        type='text'
        value={formData.schoolId}
        onChange={handleChange}
        placeholder="e.g. aqimari_g12"
        error={errors.schoolId}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>}
      />
      
      <BasicInput 
        label='School Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        placeholder="contact@yourschool.edu.et"
        error={errors.email}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>}
      />
      
      <BasicInput
        label='School Phone Number'
        name='phoneNumber'
        type='tel'
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Enter school phone number"
        error={errors.phoneNumber}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>}
      />
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Academic Levels
        </label>
        <p className="text-gray-500 text-sm mb-3">Select all that apply</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {academicLevels.map(level => (
            <div 
              key={level.id}
              onClick={() => handleAcademicLevelChange(level.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                formData.academicLevels.includes(level.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{level.icon}</span>
                <span>{level.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Continue to Admin Account
        </button>
      </div>
    </div>
  );
};

const academicLevels = [
  { id: 'kg', label: 'Kindergarten (KG)', icon: '🧒' },
  { id: 'primary', label: 'Primary School (Grades 1-8)', icon: '📚' },
  { id: 'secondary', label: 'Secondary School (Grades 9-12)', icon: '🎓' },
  { id: 'vocational', label: 'Vocational Training', icon: '🔧' },
  { id: 'university', label: 'University/College', icon: '🏛️' }
];

export default Step1SchoolInfo;