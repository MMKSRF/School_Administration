import React from 'react';
import BasicInput from '../../Ui/BasicInput';
import {useDispatch} from 'react-redux';

const Step2AdminInfo = ({ 
  formData, 
  errors, 
  handleChange, 
  handleNext, 
  setStep,
  ethiopianRegions,
  schoolSizes,
  setFormData,
}) => {


  const dispatch = useDispatch();

  return (
    <div className="space-y-6 form-section">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Administrator Account</h3>
      
      <BasicInput
        label='Full Name'
        type="text"
        name='adminName'
        placeholder="First and last name"
        value={formData.adminName}
        onChange={handleChange}
        error={errors.adminName}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>}
      />
      
      <BasicInput 
        label='Admin Email'
        name='adminEmail'
        type='email'
        value={formData.adminEmail}
        onChange={handleChange}
        placeholder="admin@yourschool.edu.et"
        error={errors.adminEmail}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInput
          label='Password'
          type="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>}
          />
        
        <BasicInput
          label='Confirm Password'
          type="password"
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>}
          />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            School Type
          </label>
          <div className="relative">
            <select
              name="schoolType"
              value={formData.schoolType}
              onChange={handleChange}
              className={`w-full border ${
                errors.schoolType ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-4 py-3 pl-12 pr-10 focus:outline-none appearance-none bg-white`}
            >
              <option value="">Select school type</option>
              <option value="public">Public School</option>
              <option value="private">Private School</option>
              <option value="international">International School</option>
              <option value="religious">Religious School</option>
            </select>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.schoolType && (
            <p className="mt-1 text-sm text-red-500">{errors.schoolType}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Region
          </label>
          <div className="relative">
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={`w-full border ${
                errors.region ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-4 py-3 pl-12 pr-10 focus:outline-none appearance-none bg-white`}
            >
              <option value="">Select region</option>
              {ethiopianRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          {errors.region && (
            <p className="mt-1 text-sm text-red-500">{errors.region}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          School Size
        </label>
        <div className="grid grid-cols-2 gap-3">
          {schoolSizes.map(size => (
            <div 
              key={size.value}
              onClick={()=> dispatch(setFormData( {schoolSize: size.value}))}
              className={`p-3 rounded-lg border cursor-pointer text-center ${
                formData.schoolSize === size.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              {size.label}
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={()=> dispatch(setStep(1))}
          className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
        >
          Continue to Final Step
        </button>
      </div>
    </div>
  );
};

export default Step2AdminInfo;