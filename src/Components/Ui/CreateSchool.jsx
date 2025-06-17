// src/pages/CreateSchool.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';
import FormWrapper from './FormWrapper';

const CreateSchool = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolId: '',
    email: '',
    adminName: '',
    password: '',
    confirmPassword: '',
    schoolType: '',
    region: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const ethiopianRegions = [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
    "Dire Dawa", "Gambela", "Harari", "Oromia", 
    "Sidama", "Somali", "South West Ethiopia", 
    "Southern Nations, Nationalities, and Peoples", "Tigray"
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }
    if (!formData.schoolId.trim()) {
      newErrors.schoolId = 'School ID is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.schoolType) {
      newErrors.schoolType = 'Please select school type';
    }
    if (!formData.region) {
      newErrors.region = 'Please select region';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate account creation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would redirect to onboarding or dashboard
      alert('Account created successfully! Redirecting to setup...');
    }, 2000);
  };
  
  return (
    <FormWrapper
      title="Create School Account"
      subtitle="Get started with Aqimari in minutes"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login here"
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="School Name"
          name="schoolName"
          placeholder="Enter your school's full name"
          value={formData.schoolName}
          onChange={handleChange}
          error={errors.schoolName}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        
        <FormInput
          label="School ID (Shortcode)"
          name="schoolId"
          placeholder="e.g. aqimari_g12"
          value={formData.schoolId}
          onChange={handleChange}
          error={errors.schoolId}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
        
        <FormInput
          label="School Email"
          name="email"
          type="email"
          placeholder="contact@yourschool.edu.et"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              School Type
            </label>
            <div className="relative">
              <select
                name="schoolType"
                value={formData.schoolType}
                onChange={handleChange}
                className={`w-full border ${
                  errors.schoolType ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-4 py-3 pr-10 focus:outline-none appearance-none bg-white`}
              >
                <option value="">Select school type</option>
                <option value="public">Public School</option>
                <option value="private">Private School</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Region
            </label>
            <div className="relative">
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`w-full border ${
                  errors.region ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-4 py-3 pr-10 focus:outline-none appearance-none bg-white`}
              >
                <option value="">Select region</option>
                {ethiopianRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.region && (
              <p className="mt-1 text-sm text-red-500">{errors.region}</p>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Account</h3>
        
        <FormInput
          label="Admin Full Name"
          name="adminName"
          placeholder="First and last name"
          value={formData.adminName}
          onChange={handleChange}
          error={errors.adminName}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </div>
        
        <div className="mt-8">
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
              I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
            </label>
          </div>
          
          <PrimaryButton loading={loading}>
            Create School Account
          </PrimaryButton>
        </div>
      </form>
    </FormWrapper>
  );
};

export default CreateSchool;