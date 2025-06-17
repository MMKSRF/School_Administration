// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';
import FormWrapper from './FormWrapper';

const Login = () => {
  const [formData, setFormData] = useState({
    schoolId: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
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
    
    // Simple validation
    const newErrors = {};
    if (!formData.schoolId.trim()) {
      newErrors.schoolId = 'School ID is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate login process
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would redirect to dashboard here
      alert('Login successful! Redirecting to dashboard...');
    }, 1500);
  };
  
  return (
    <FormWrapper
      title="Login to Your School"
      subtitle="Access your school's scheduling dashboard"
      footerText="Don't have an account?"
      footerLink="/create-school"
      footerLinkText="Create one now"
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="School ID or Name"
          name="schoolId"
          placeholder="Enter your school ID or name"
          value={formData.schoolId}
          onChange={handleChange}
          error={errors.schoolId}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        
        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Forgot password?
          </Link>
        </div>
        
        <PrimaryButton loading={loading}>
          Login to Dashboard
        </PrimaryButton>
      </form>
      
      <div className="mt-8 text-center">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500 bg-white text-sm">or continue with</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545.132a10.09 10.09 0 00-9.3 5.04 10.508 10.508 0 000 9.656 10.09 10.09 0 009.3 5.04 10.08 10.08 0 007.602-3.546 4.817 4.817 0 01-2.874.917 4.852 4.852 0 01-4.582-3.3c.302.058.612.09.928.09a4.86 4.86 0 001.2-.15 4.84 4.84 0 01-3.876-4.745v-.06a4.82 4.82 0 002.188.61 4.84 4.84 0 01-2.156-4.03c0-.894.24-1.73.66-2.45a13.71 13.71 0 004.692 3.78 13.67 13.67 0 006.01 1.72 4.84 4.84 0 01-.12-1.11 4.84 4.84 0 014.842-4.84c1.392 0 2.65.587 3.532 1.53a9.56 9.56 0 003.068-1.17 4.82 4.82 0 01-2.126 2.66 9.61 9.61 0 002.782-.76 10.33 10.33 0 01-2.426 2.5z" />
            </svg>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm6.344 8.301a.5.5 0 01.193.659l-3.085 6.5a.5.5 0 01-.457.301h-5.043a.5.5 0 01-.457-.301l-3.085-6.5a.5.5 0 01.457-.699h10.086a.5.5 0 01.457.301l.193.439z" />
            </svg>
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Login;