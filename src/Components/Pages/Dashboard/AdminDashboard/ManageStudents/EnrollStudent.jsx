// src/Components/Pages/Dashboard/AdminDashboard/ManageStudents/EnrollStudent.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { enrollStudent } from '../../../../../Redux/Slices/studentsSlice';
import { FaUserPlus, FaCheck, FaArrowLeft, FaUser, FaIdCard, FaSchool, FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

const EnrollStudent = ({ onBack }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    grade: '',
    previousSchool: '',
    guardianName: '',
    guardianRelationship: '',
    guardianPhone: '',
    guardianEmail: '',
    medicalNotes: '',
    specialNeeds: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-step', {
        x: 50,
        opacity: 100,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, formRef);

    return () => ctx.revert();
  }, [step]);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }
    
    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }

    if (step === 3) {
      if (!formData.grade) newErrors.grade = 'Grade is required';
      if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
      if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'Guardian phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 && onBack) {
      onBack();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      dispatch(enrollStudent(formData));
      if (onBack) onBack();
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaUser className="mr-2 text-indigo-500" />
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-500" />
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaPhone className="mr-2 text-indigo-500" />
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaHome className="mr-2 text-indigo-500" />
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Academic & Guardian Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaSchool className="mr-2 text-indigo-500" />
                  Grade*
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.grade ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select grade</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                  ))}
                </select>
                {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <FaIdCard className="mr-2 text-indigo-500" />
                  Primary Guardian Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.guardianName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.guardianName && <p className="mt-1 text-sm text-red-600">{errors.guardianName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input
                      type="text"
                      name="guardianRelationship"
                      value={formData.guardianRelationship}
                      onChange={handleChange}
                      placeholder="e.g., Mother, Father, Guardian"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.guardianPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.guardianPhone && <p className="mt-1 text-sm text-red-600">{errors.guardianPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Notes</label>
                <textarea
                  name="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any allergies, medications, or special medical conditions"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Needs</label>
                <textarea
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any learning accommodations or special needs"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Enroll New Student</h2>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 -z-10 transition-all duration-300"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
          
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNum ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNum ? <FaCheck /> : stepNum}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                step >= stepNum ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {stepNum === 1 ? 'Basic Info' : stepNum === 2 ? 'Contact' : 'Academic'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      {renderStep()}

      {/* Form Actions */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center"
          >
            <FaUserPlus className="mr-2" />
            Enroll Student
          </button>
        )}
      </div>
    </div>
  );
};

export default EnrollStudent;