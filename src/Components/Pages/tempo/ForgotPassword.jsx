// src/pages/ForgotPassword.js
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolId: '',
    role: '',
    contact: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  
  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa" },
    { id: 2, name: "Hawassa University School", region: "Sidama" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa" },
  ];
  
  useEffect(() => {
    // Entrance animations
    gsap.from('.form-section', {
      duration: 0.8,
      y: 0,
      opacity: 100,
      stagger: 0.2,
      delay: 0.3
    });
  }, [step]);
  
  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.schoolId.trim()) newErrors.schoolId = 'School selection is required';
      if (!formData.role) newErrors.role = 'Please select your role';
      if (!formData.contact.trim()) newErrors.contact = 'Email or phone number is required';
    }
    
    if (step === 2) {
      if (!formData.resetCode) newErrors.resetCode = 'Reset code is required';
      else if (formData.resetCode.length !== 6) newErrors.resetCode = 'Code must be 6 digits';
    }
    
    if (step === 3) {
      if (!formData.newPassword) newErrors.newPassword = 'Password is required';
      else if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSendCode = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate API call to send reset code
      setTimeout(() => {
        setLoading(false);
        setStep(2);
        setCountdown(120); // 2 minutes countdown
      }, 1500);
    }
  };
  
  const handleVerifyCode = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate code verification
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    }
  };
  
  const handleResetPassword = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate password reset
      setTimeout(() => {
        setLoading(false);
        navigate('/password-reset-success');
      }, 1500);
    }
  };
  
  const handleResendCode = () => {
    setLoading(true);
    
    // Simulate resending code
    setTimeout(() => {
      setLoading(false);
      setCountdown(120);
      alert('New reset code has been sent to your contact method');
    }, 1000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
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
                  onClick={() => setFormData(prev => ({ ...prev, role: 'teacher' }))}
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
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
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
        
      case 2:
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
                onClick={() => setStep(1)}
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
        
      case 3:
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
                onClick={() => setStep(2)}
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
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {step === 1 ? 'Reset Your Password' : 
               step === 2 ? 'Verify Your Identity' : 
               'Create New Password'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              {step === 1 ? 'Enter your school information to recover your account' : 
               step === 2 ? 'Enter the verification code sent to your contact method' : 
               'Create a new secure password for your account'}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      {step === 1 ? 'Account Recovery' : 
                       step === 2 ? 'Identity Verification' : 
                       'Password Reset'}
                    </h2>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((num) => (
                        <div 
                          key={num}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            step >= num ? 'bg-white text-blue-600' : 'bg-white/20'
                          }`}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  {renderStep()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;