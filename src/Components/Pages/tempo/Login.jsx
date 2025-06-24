// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, NavLink } from 'react-router-dom';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import TopSection from '../../Ui/TopSection.jsx';
import BenefitsSection from '../../Ui/BenefitsSection.jsx';
import BasicInput from '../../Ui/BasicInput.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    schoolId: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Entrance animations
    gsap.fromTo('.login-form', {
      y: -50,
      
      opacity: 0
    },{
      duration: 0.8,
      y: 0,
      opacity: 100,
      stagger: 0.2,
      delay: 0.2
    });
    
    gsap.fromTo('.benefit-card', {
      y: 50,
      opacity: 0
    },{
      duration: 0.6,
      y: 0,
      opacity: 100,
      stagger: 0.1,
      delay: 0.2
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <TopSection tope="Welcome Back to Aqimari" bottom="Access your school's scheduling dashboard and continue managing your institution efficiently" />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Login Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Login to Your Account</h2>
                      <div className="bg-white/20 rounded-full px-4 py-1 text-sm">
                        Secure Access
                      </div>
                    </div>
                    <p className="text-blue-100 mt-2">
                      Enter your credentials to access your school's dashboard
                    </p>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6 login-form">

 

                       <BasicInput
                          label='School ID or Name'
                          type="text"
                          name="schoolId"
                          placeholder="Enter your school ID or name"
                          value={formData.schoolId}
                          onChange={handleChange}
                          error={errors.schoolId}
                          icon={ <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>}
                        />




                        <BasicInput
                          label='Password'
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          error={errors.password}
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg> }
                          buttons={ <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              )}
                            </button>}
                        />



                      
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <input
                              id="remember"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
                              Remember me
                            </label>
                          </div>
                          
                          <NavLink to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                            Forgot password?
                          </NavLink>
                        </div>
                        
                        <div className="pt-2">
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
                                Logging In...
                              </div>
                            ) : (
                              'Login to Dashboard'
                            )}
                          </button>
                        </div>
                        
                        <div className="pt-4">
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
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/join-school" className="text-blue-600 font-medium hover:text-blue-800">
                      Join Your School on Aqimari
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Right Column - Benefits */}
              <BenefitsSection
  heading="Why Schools Love Aqimari"
  subheading="Join hundreds of educational institutions that have transformed their scheduling"
  benefits={[
    {
      title: 'Effortless Scheduling',
      description: 'Create conflict-free timetables in minutes, not hours, with our intelligent algorithm.',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      iconPath:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 

    },
    {
      title: 'Real-Time Collaboration',
      description: 'Teachers and administrators can coordinate schedules in real-time from any device.',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      iconPath: "M17 20h5v-2a3 3 0 00-3-3h-3M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: 'Comprehensive Analytics',
      description: 'Gain insights into resource utilization, teacher workload, and student performance.',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      title: 'Resource Optimization',
      description: 'Maximize classroom and facility usage with our smart resource allocation system.',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      iconPath: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    }
  ]}
  trustedBy={['AASTU', 'HU', 'JU', 'MU', 'DU', 'BU']}
/>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;








