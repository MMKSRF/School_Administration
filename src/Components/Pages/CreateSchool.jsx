// src/pages/CreateSchool.js
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import TopSection from '../Ui/TopSection';
import BenefitsSection from '../Ui/BenefitsSection ';
// import SchoolIllustration from '../assets/school-illustration.svg';

const CreateSchool = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolId: '',
    email: '',
    adminName: '',
    password: '',
    confirmPassword: '',
    schoolType: '',
    region: '',
    phoneNumber: '',
    schoolSize: '',
    academicLevels: []
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  const ethiopianRegions = [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
    "Dire Dawa", "Gambela", "Harari", "Oromia", 
    "Sidama", "Somali", "South West Ethiopia", 
    "Southern Nations, Nationalities, and Peoples", "Tigray"
  ];
  
  const academicLevels = [
    { id: 'kg', label: 'Kindergarten (KG)', icon: '🧒' },
    { id: 'primary', label: 'Primary School (Grades 1-8)', icon: '📚' },
    { id: 'secondary', label: 'Secondary School (Grades 9-12)', icon: '🎓' },
    { id: 'vocational', label: 'Vocational Training', icon: '🔧' },
    { id: 'university', label: 'University/College', icon: '🏛️' }
  ];
  
  const schoolSizes = [
    { label: 'Small (1-100 students)', value: 'small' },
    { label: 'Medium (101-500 students)', value: 'medium' },
    { label: 'Large (501-1000 students)', value: 'large' },
    { label: 'Extra Large (1000+ students)', value: 'xlarge' }
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
    
    gsap.from('.benefit-card', {
      duration: 0.6,
      y: 0,
      opacity: 100,
      stagger: 0.1,
      delay: 0.5
    });
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleAcademicLevelChange = (level) => {
    const updatedLevels = formData.academicLevels.includes(level)
      ? formData.academicLevels.filter(l => l !== level)
      : [...formData.academicLevels, level];
    
    setFormData(prev => ({ ...prev, academicLevels: updatedLevels }));
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
      if (!formData.schoolId.trim()) newErrors.schoolId = 'School ID is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.adminName.trim()) newErrors.adminName = 'Admin name is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.schoolType) newErrors.schoolType = 'Please select school type';
      if (!formData.region) newErrors.region = 'Please select region';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <TopSection tope="Create Your School Account" bottom="Join hundreds of Ethiopian schools using Aqimari to simplify scheduling and administration" />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">School Account Setup</h2>
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((num) => (
                          <div 
                            key={num}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              step === num ? 'bg-white text-blue-600' : 'bg-white/20'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-blue-100 mt-2">
                      {step === 1 ? 'Basic information about your school' : 
                       step === 2 ? 'Administrator account details' : 
                       'Finalize your account creation'}
                    </p>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    {success ? (
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
                    ) : (
                      <form onSubmit={step === 3 ? handleSubmit : undefined}>
                        {step === 1 && (
                          <div className="space-y-6 form-section">
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                School Name
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="schoolName"
                                  value={formData.schoolName}
                                  onChange={handleChange}
                                  placeholder="Enter your school's full name"
                                  className={`w-full border ${
                                    errors.schoolName ? 'border-red-500' : 'border-gray-300'
                                  } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                              </div>
                              {errors.schoolName && (
                                <p className="mt-1 text-sm text-red-500">{errors.schoolName}</p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                School ID (Shortcode)
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="schoolId"
                                  value={formData.schoolId}
                                  onChange={handleChange}
                                  placeholder="e.g. aqimari_g12"
                                  className={`w-full border ${
                                    errors.schoolId ? 'border-red-500' : 'border-gray-300'
                                  } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  </svg>
                                </div>
                              </div>
                              {errors.schoolId && (
                                <p className="mt-1 text-sm text-red-500">{errors.schoolId}</p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                School Email
                              </label>
                              <div className="relative">
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="contact@yourschool.edu.et"
                                  className={`w-full border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                  } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              </div>
                              {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                School Phone Number
                              </label>
                              <div className="relative">
                                <input
                                  type="tel"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleChange}
                                  placeholder="Enter school phone number"
                                  className={`w-full border ${
                                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                  } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                </div>
                              </div>
                              {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                              )}
                            </div>
                            
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
                        )}
                        
                        {step === 2 && (
                          <div className="space-y-6 form-section">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Administrator Account</h3>
                            
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                Full Name
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="adminName"
                                  value={formData.adminName}
                                  onChange={handleChange}
                                  placeholder="First and last name"
                                  className={`w-full border ${
                                    errors.adminName ? 'border-red-500' : 'border-gray-300'
                                  } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              </div>
                              {errors.adminName && (
                                <p className="mt-1 text-sm text-red-500">{errors.adminName}</p>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                  Password
                                </label>
                                <div className="relative">
                                  <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={`w-full border ${
                                      errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                  />
                                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                  </div>
                                </div>
                                {errors.password && (
                                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                  Confirm Password
                                </label>
                                <div className="relative">
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
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
                                    onClick={() => setFormData(prev => ({ ...prev, schoolSize: size.value }))}
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
                                onClick={() => setStep(1)}
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
                        )}
                        
                        {step === 3 && (
                          <div className="space-y-6 form-section">
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                              <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1 mr-3">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <p className="text-blue-700">
                                  <span className="font-bold">Pro Tip:</span> Your school will be verified before full access is granted. This usually takes 1-2 business days.
                                </p>
                              </div>
                            </div>
                            
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
                                I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>
                              </label>
                            </div>
                            
                            <div className="flex items-start mb-6">
                              <div className="flex items-center h-5">
                                <input
                                  id="newsletter"
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                              </div>
                              <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                                I want to receive product updates and tips via email
                              </label>
                            </div>
                            
                            <div className="pt-4">
                              <button
                                type="submit"
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
                                    Creating Account...
                                  </div>
                                ) : (
                                  'Create School Account'
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Right Column - Benefits */}
             


              <BenefitsSection
                heading="Why Schools Love Aqimari"
                subheading="Join the educational revolution with tools designed specifically for Ethiopian schools"
                benefits={[
                  {
                    title: 'Smart Scheduling',
                    description: 'Automatically generate conflict-free timetables that respect teacher availability and classroom constraints.',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    iconPath:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  },
                  {
                    title: 'Teacher & Student Portals',
                    description: 'Dedicated dashboards for teachers and students with real-time schedule updates and notifications.',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    iconPath: "M17 20h5v-2a3 3 0 00-3-3h-3M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  },
                  {
                    title: 'Comprehensive Reporting',
                    description: 'Generate attendance reports, academic performance analytics, and resource utilization statistics.',
                    iconBg: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  },
                  {
                    title: 'Resource Management',
                    description: 'Efficiently allocate classrooms, labs, and equipment to maximize utilization and minimize conflicts.',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    iconPath: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  }
                ]}
                trustedBy={['AAU', 'HU', 'JU', 'MU', 'DU', 'BU']}
              />



            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateSchool;




































// // src/pages/CreateSchool.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import FormInput from '../Ui/FormInput';
// import PrimaryButton from '../Ui/PrimaryButton';
// import FormWrapper from '../Ui/FormWrapper';

// const CreateSchool = () => {
//   const [formData, setFormData] = useState({
//     schoolName: '',
//     schoolId: '',
//     email: '',
//     adminName: '',
//     password: '',
//     confirmPassword: '',
//     schoolType: '',
//     region: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
  
//   const ethiopianRegions = [
//     "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
//     "Dire Dawa", "Gambela", "Harari", "Oromia", 
//     "Sidama", "Somali", "South West Ethiopia", 
//     "Southern Nations, Nationalities, and Peoples", "Tigray"
//   ];
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validation
//     const newErrors = {};
//     if (!formData.schoolName.trim()) {
//       newErrors.schoolName = 'School name is required';
//     }
//     if (!formData.schoolId.trim()) {
//       newErrors.schoolId = 'School ID is required';
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.adminName.trim()) {
//       newErrors.adminName = 'Admin name is required';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
//     if (!formData.schoolType) {
//       newErrors.schoolType = 'Please select school type';
//     }
//     if (!formData.region) {
//       newErrors.region = 'Please select region';
//     }
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
    
//     // Simulate account creation
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       // In a real app, you would redirect to onboarding or dashboard
//       alert('Account created successfully! Redirecting to setup...');
//     }, 2000);
//   };
  
//   return (
//     <FormWrapper
//       title="Create School Account"
//       subtitle="Get started with Aqimari in minutes"
//       footerText="Already have an account?"
//       footerLink="/login"
//       footerLinkText="Login here"
//     >
//       <form onSubmit={handleSubmit}>
//         <FormInput
//           label="School Name"
//           name="schoolName"
//           placeholder="Enter your school's full name"
//           value={formData.schoolName}
//           onChange={handleChange}
//           error={errors.schoolName}
//           icon={
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//           }
//         />
        
//         <FormInput
//           label="School ID (Shortcode)"
//           name="schoolId"
//           placeholder="e.g. aqimari_g12"
//           value={formData.schoolId}
//           onChange={handleChange}
//           error={errors.schoolId}
//           icon={
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           }
//         />
        
//         <FormInput
//           label="School Email"
//           name="email"
//           type="email"
//           placeholder="contact@yourschool.edu.et"
//           value={formData.email}
//           onChange={handleChange}
//           error={errors.email}
//           icon={
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//           }
//         />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               School Type
//             </label>
//             <div className="relative">
//               <select
//                 name="schoolType"
//                 value={formData.schoolType}
//                 onChange={handleChange}
//                 className={`w-full border ${
//                   errors.schoolType ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg px-4 py-3 pr-10 focus:outline-none appearance-none bg-white`}
//               >
//                 <option value="">Select school type</option>
//                 <option value="public">Public School</option>
//                 <option value="private">Private School</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//             {errors.schoolType && (
//               <p className="mt-1 text-sm text-red-500">{errors.schoolType}</p>
//             )}
//           </div>
          
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               Region
//             </label>
//             <div className="relative">
//               <select
//                 name="region"
//                 value={formData.region}
//                 onChange={handleChange}
//                 className={`w-full border ${
//                   errors.region ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg px-4 py-3 pr-10 focus:outline-none appearance-none bg-white`}
//               >
//                 <option value="">Select region</option>
//                 {ethiopianRegions.map(region => (
//                   <option key={region} value={region}>{region}</option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//             {errors.region && (
//               <p className="mt-1 text-sm text-red-500">{errors.region}</p>
//             )}
//           </div>
//         </div>
        
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Account</h3>
        
//         <FormInput
//           label="Admin Full Name"
//           name="adminName"
//           placeholder="First and last name"
//           value={formData.adminName}
//           onChange={handleChange}
//           error={errors.adminName}
//           icon={
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           }
//         />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormInput
//             label="Password"
//             name="password"
//             type="password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//             icon={
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             }
//           />
          
//           <FormInput
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             error={errors.confirmPassword}
//             icon={
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             }
//           />
//         </div>
        
//         <div className="mt-8">
//           <div className="flex items-start mb-6">
//             <div className="flex items-center h-5">
//               <input
//                 id="terms"
//                 type="checkbox"
//                 className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
//                 required
//               />
//             </div>
//             <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
//               I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
//             </label>
//           </div>
          
//           <PrimaryButton loading={loading}>
//             Create School Account
//           </PrimaryButton>
//         </div>
//       </form>
//     </FormWrapper>
//   );
// };

// export default CreateSchool;