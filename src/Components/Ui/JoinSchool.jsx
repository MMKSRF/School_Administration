// src/pages/JoinSchool.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Header from '../Header';
import Footer from '../Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const JoinSchool = () => {
  const [step, setStep] = useState(1);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    gradeLevel: '',
    section: '',
    studentId: '',
    parentContact: '',
    subjectsTaught: '',
    phoneNumber: '',
    email: '',
    teacherId: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa" },
    { id: 2, name: "Hawassa University School", region: "Sidama" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa" },
  ];
  
  // Grade levels from KG to Grade 12
  const gradeLevels = [
    "KG1", "KG2", "KG3", 
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", 
    "Grade 10", "Grade 11", "Grade 12"
  ];
  
  // Sections A-F
  const sections = ["A", "B", "C", "D", "E", "F"];
  
  // Subjects for teachers
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "English", "Amharic", "History", "Geography",
    "Civics", "ICT", "Physical Education", "Art",
    "Music", "Economics", "Business"
  ];
  
  useEffect(() => {
    // Entrance animation
    gsap.from(sectionRef.current, {
      y: 50,
      opacity: 100,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate content on step change
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [step]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubjectChange = (subject) => {
    setFormData(prev => {
      const currentSubjects = prev.subjectsTaught.split(',').filter(s => s);
      const index = currentSubjects.indexOf(subject);
      
      if (index > -1) {
        // Remove subject
        currentSubjects.splice(index, 1);
      } else {
        // Add subject
        currentSubjects.push(subject);
      }
      
      return { ...prev, subjectsTaught: currentSubjects.join(',') };
    });
  };
  
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setStep(2);
  };
  
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(3);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (role === 'student') {
      if (!formData.gradeLevel) errors.gradeLevel = "Grade level is required";
      if (!formData.section) errors.section = "Section is required";
    }
    if (role === 'teacher') {
      if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
      if (!formData.subjectsTaught) errors.subjectsTaught = "Please select at least one subject";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(errors).length > 0) {
      // Show errors
      alert(`Please fix the following errors:\n${Object.values(errors).join('\n')}`);
      return;
    }
    
    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your School</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Search for your school to join the Aqimari platform. Start by typing your school's name or location.
              </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 shadow-sm">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by school name or region..."
                  className="w-full bg-transparent outline-none text-gray-700"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {schools.map(school => (
                <div 
                  key={school.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleSchoolSelect(school)}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg">
                      {school.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-800">{school.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{school.region} Region</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-600 font-medium flex items-center">
                      Select School
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Can't find your school?{' '}
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Request your school to join Aqimari
                </button>
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Join {selectedSchool.name}</h2>
              <p className="text-gray-600">
                Select your role to continue. Are you joining as a student or a teacher?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div 
                className={`border-2 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  role === 'student' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleRoleSelect('student')}
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
                className={`border-2 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  role === 'teacher' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleRoleSelect('teacher')}
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
                onClick={() => setStep(1)}
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
        
      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {role === 'student' ? 'Student Registration' : 'Teacher Registration'}
              </h2>
              <p className="text-gray-600">
                Join {selectedSchool.name} as a {role}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  {role === 'student' ? (
                    <>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Grade Level
                        </label>
                        <select
                          name="gradeLevel"
                          value={formData.gradeLevel}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Grade Level</option>
                          {gradeLevels.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Section
                        </label>
                        <select
                          name="section"
                          value={formData.section}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Section</option>
                          {sections.map(section => (
                            <option key={section} value={section}>Section {section}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Student ID (Optional)
                        </label>
                        <input
                          type="text"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          placeholder="Enter your student ID"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Parent Contact (Optional)
                        </label>
                        <input
                          type="text"
                          name="parentContact"
                          value={formData.parentContact}
                          onChange={handleInputChange}
                          placeholder="Parent phone number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Teacher ID (Optional)
                        </label>
                        <input
                          type="text"
                          name="teacherId"
                          value={formData.teacherId}
                          onChange={handleInputChange}
                          placeholder="Enter your teacher ID"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">
                          Subjects Taught
                        </label>
                        <p className="text-gray-500 text-sm mb-3">Select all subjects you teach</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {subjects.map(subject => (
                            <button
                              key={subject}
                              type="button"
                              className={`py-2 px-3 rounded-lg border text-center ${
                                formData.subjectsTaught.includes(subject) 
                                  ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                              onClick={() => handleSubjectChange(subject)}
                            >
                              {subject}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Create Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-start">
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
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                        shadow-md transition-all duration-300 transform hover:from-blue-600 hover:to-indigo-700 ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        `Join ${selectedSchool.name} as a ${role}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setStep(2)}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to role selection
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderSuccessMessage = () => {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted Successfully!</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
          Your request to join {selectedSchool.name} as a {role} has been submitted. 
          You'll receive access to your dashboard once approved by the school administrator.
        </p>
        
        <div className="mt-10">
          <Link to="/" className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            Back to Homepage
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-500">
            You will be redirected to the homepage in a few seconds...
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      
      <section ref={sectionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Your School on Aqimari
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your school, select your role, and complete your info to access your dashboard
            </p>
          </div>
          
          {/* Progress indicator */}
          {!success && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 left-0 right-0 -z-10"></div>
                <div 
                  className="absolute h-1 bg-blue-500 top-1/2 transform -translate-y-1/2 left-0 -z-10 transition-all duration-500"
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>
                
                {/* Steps */}
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'
                    } font-bold`}>
                      {s}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-700">
                      {s === 1 ? 'Find School' : s === 2 ? 'Select Role' : 'Complete Profile'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div ref={contentRef}>
            {success ? renderSuccessMessage() : renderStep()}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default JoinSchool;