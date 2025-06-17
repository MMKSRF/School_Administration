// src/pages/RequestSchool.js
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Header from './Header';
import Footer from './Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const RequestSchool = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Recheck fields
    searchSchool: '',
    searchRegion: '',
    
    // Step 2: Requester Info
    fullName: '',
    requesterRole: '',
    phoneNumber: '',
    email: '',
    
    // Step 3: School Info
    schoolName: '',
    schoolType: '',
    gradeRange: '',
    region: '',
    subCity: '',
    woreda: '',
    schoolEmail: '',
    schoolPhone: '',
    schoolWebsite: '',
    notes: '',
    
    // Step 4: Upload
    document: null
  });
  const [searchResults, setSearchResults] = useState([]);
  const [schoolFound, setSchoolFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa", type: "University" },
    { id: 2, name: "Hawassa University School", region: "Sidama", type: "Secondary" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray", type: "Primary/Secondary" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara", type: "Primary/Secondary" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia", type: "Secondary" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa", type: "Secondary" },
  ];
  
  // Ethiopian regions
  const regions = [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
    "Dire Dawa", "Gambela", "Harari", "Oromia", 
    "Sidama", "Somali", "South West Ethiopia", 
    "Southern Nations, Nationalities, and Peoples", "Tigray"
  ];
  
  // School types
  const schoolTypes = [
    "Kindergarten (KG)", 
    "Primary School (Grades 1-8)", 
    "Secondary School (Grades 9-12)", 
    "Primary & Secondary Combined", 
    "University/College", 
    "Vocational/Training Institute"
  ];
  
  // Grade ranges
  const gradeRanges = [
    "KG only",
    "KG to Grade 4",
    "KG to Grade 8",
    "KG to Grade 12",
    "Grade 1 to Grade 8",
    "Grade 1 to Grade 12",
    "Grade 9 to Grade 12"
  ];
  
  // Requester roles
  const requesterRoles = [
    "Student",
    "Teacher",
    "Parent",
    "School Staff",
    "Administrator",
    "Other"
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
  
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, document: e.target.files[0] }));
  };
  
  const handleRecheck = () => {
    if (!formData.searchSchool) {
      alert("Please enter a school name to search");
      return;
    }
    
    // Simulate search
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Filter schools based on search criteria
      const results = schools.filter(school => 
        school.name.toLowerCase().includes(formData.searchSchool.toLowerCase()) &&
        (!formData.searchRegion || school.region === formData.searchRegion)
      );
      
      setSearchResults(results);
      
      if (results.length > 0) {
        setSchoolFound(true);
      } else {
        setSchoolFound(false);
      }
    }, 1000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.requesterRole) errors.requesterRole = "Your role is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.schoolName) errors.schoolName = "School name is required";
    if (!formData.schoolType) errors.schoolType = "School type is required";
    if (!formData.schoolEmail) errors.schoolEmail = "School email is required";
    if (!formData.schoolPhone) errors.schoolPhone = "School phone is required";
    
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
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Recheck School Registration</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Schools are being added daily — please recheck before submitting a new request.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="searchSchool"
                    value={formData.searchSchool}
                    onChange={handleInputChange}
                    placeholder="Enter school name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Region (Optional)
                  </label>
                  <select
                    name="searchRegion"
                    value={formData.searchRegion}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleRecheck}
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
                      Searching...
                    </div>
                  ) : (
                    'Recheck School Registration'
                  )}
                </button>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">School Found!</h3>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Your school is already on Aqimari. You can now join directly.
                </p>
                
                <div className="space-y-4">
                  {searchResults.map(school => (
                    <div key={school.id} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg">
                          {school.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-800">{school.name}</h4>
                          <p className="text-gray-600 text-sm">{school.region} • {school.type}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <a 
                          href="/join-school" 
                          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                        >
                          Join School
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.length === 0 && schoolFound === false && formData.searchSchool && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">School Not Found</h3>
                </div>
                
                <p className="text-gray-700 mb-4">
                  We couldn't find your school in our system. You can request to add it below.
                </p>
                
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                    shadow-md transition-all duration-300 transform hover:from-blue-600 hover:to-indigo-700"
                >
                  Request Your School to Join Aqimari
                </button>
              </div>
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Information</h2>
              <p className="text-gray-600">
                Tell us a little about yourself
              </p>
            </div>
            
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
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Role
                  </label>
                  <select
                    name="requesterRole"
                    value={formData.requesterRole}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Your Role</option>
                    {requesterRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
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
                    placeholder="Your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={() => setStep(1)}
                  className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Recheck
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
                >
                  Continue to School Info
                </button>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">School Information</h2>
              <p className="text-gray-600">
                Tell us about the school you'd like to join Aqimari
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="Official school name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    School Type
                  </label>
                  <select
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select School Type</option>
                    {schoolTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Grade Range
                  </label>
                  <select
                    name="gradeRange"
                    value={formData.gradeRange}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade Range</option>
                    {gradeRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Region
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Sub-city
                  </label>
                  <input
                    type="text"
                    name="subCity"
                    value={formData.subCity}
                    onChange={handleInputChange}
                    placeholder="Sub-city or district"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Woreda/Zone
                  </label>
                  <input
                    type="text"
                    name="woreda"
                    value={formData.woreda}
                    onChange={handleInputChange}
                    placeholder="Woreda or zone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    School Email
                  </label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleInputChange}
                    placeholder="Official school email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    School Phone Number
                  </label>
                  <input
                    type="tel"
                    name="schoolPhone"
                    value={formData.schoolPhone}
                    onChange={handleInputChange}
                    placeholder="Official school phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    School Website or Social Media (Optional)
                  </label>
                  <input
                    type="text"
                    name="schoolWebsite"
                    value={formData.schoolWebsite}
                    onChange={handleInputChange}
                    placeholder="Website, Facebook page, etc."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Why do you want your school to join Aqimari? Any additional information..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={() => setStep(2)}
                  className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Your Info
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
                >
                  Continue to Upload
                </button>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Supporting Document (Optional)</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload a document to verify your connection to the school (school ID, letter, etc.)
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Upload a PDF, JPG, or PNG file (max 5MB)
                </p>
                
                <div className="mt-4">
                  <label className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-colors">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                
                {formData.document && (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 inline-block">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-700">{formData.document.name}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
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
                      Submitting Request...
                    </div>
                  ) : (
                    'Submit School Request'
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setStep(3)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back to School Information
                </button>
              </div>
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
          Thank you! We've received your request to add <span className="font-semibold">{formData.schoolName}</span> to Aqimari. 
          We'll review your request and contact the school shortly. You'll be notified when your school is onboarded.
        </p>
        
        <div className="mt-10">
          <a 
            href="/" 
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Back to Homepage
          </a>
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
              Request Your School to Join Aqimari
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If your school is not yet on Aqimari, you can request it to be added
            </p>
          </div>
          
          {/* Progress indicator */}
          {!success && step > 1 && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 left-0 right-0 -z-10"></div>
                <div 
                  className="absolute h-1 bg-blue-500 top-1/2 transform -translate-y-1/2 left-0 -z-10 transition-all duration-500"
                  style={{ width: step === 2 ? '33%' : step === 3 ? '66%' : '100%' }}
                ></div>
                
                {/* Steps */}
                {[2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'
                    } font-bold`}>
                      {s-1}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-700">
                      {s === 2 ? 'Your Info' : s === 3 ? 'School Info' : 'Upload'}
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

export default RequestSchool;