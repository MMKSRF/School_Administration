// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/AddTeacher.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { addTeacher } from '../../../../../Redux/Slices/teachersSlice';
import { FaUserPlus, FaCheck, FaTimes, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const AddTeacher = ({  setShowAddModal }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const modalRef = useRef();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'full_time',
    status: 'active',
    subjects: [],
    qualifications: '',
    joiningDate: new Date().toISOString().split('T')[0],
    availability: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '08:00', end: '16:00', available: false },
      sunday: { start: '08:00', end: '16:00', available: false }
    }
  });
  const [errors, setErrors] = useState({});
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const availableSubjects = [
    'Mathematics', 'Science', 'English', 'History', 
    'Geography', 'Physics', 'Chemistry', 'Biology',
    'Computer Science', 'Art', 'Music', 'Physical Education'
  ];



  function onBack(){
    setShowAddModal(false)
    setFormData(
      {
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'full_time',
    status: 'active',
    subjects: [],
    qualifications: '',
    joiningDate: new Date().toISOString().split('T')[0],
    availability: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '08:00', end: '16:00', available: false },
      sunday: { start: '08:00', end: '16:00', available: false }
    }
  })
  }
  // Check if form has been modified
  useEffect(() => {
    const initialFormData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'full_time',
      status: 'active',
      subjects: [],
      qualifications: '',
      joiningDate: new Date().toISOString().split('T')[0],
      availability: {
        monday: { start: '08:00', end: '16:00', available: true },
        tuesday: { start: '08:00', end: '16:00', available: true },
        wednesday: { start: '08:00', end: '16:00', available: true },
        thursday: { start: '08:00', end: '16:00', available: true },
        friday: { start: '08:00', end: '16:00', available: true },
        saturday: { start: '08:00', end: '16:00', available: false },
        sunday: { start: '08:00', end: '16:00', available: false }
      }
    };

    const checkFormDirty = () => {
      return JSON.stringify(formData) !== JSON.stringify(initialFormData);
    };

    setIsFormDirty(checkFormDirty());
  }, [formData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-container', {
        scale: 0.8,
        opacity: 50,
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    }, formRef);

    return () => ctx.revert();
  }, [step]);

  // Animation for confirmation modal
  useEffect(() => {
    if (showConfirmModal && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [showConfirmModal]);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }
    
    if (step === 2 && formData.subjects.length === 0) {
      newErrors.subjects = 'At least one subject is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const toggleDayAvailability = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          available: !prev.availability[day].available
        }
      }
    }));
  };

  const toggleSubject = (subject) => {
    setFormData(prev => {
      const newSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 && onBack) {
      handleClose();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      dispatch(addTeacher(formData));
      if (onBack) onBack();
    }
  };

  const handleClose = () => {
    if (isFormDirty) {
      setShowConfirmModal(true);
    } else {
      onBack();
    }
  };

  const handleConfirmClose = () => {
    onBack();
  };

  const handleCancelClose = () => {
    setShowConfirmModal(false);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="substitute">Substitute</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects*</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <span>Select subjects ({formData.subjects.length})</span>
                  <FiChevronDown className={`transition-transform ${showSubjectDropdown ? 'transform rotate-180' : ''}`} />
                </button>
                {showSubjectDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white/90 backdrop-blur-md shadow-lg rounded-xl border border-gray-300/50 max-h-60 overflow-auto">
                    {availableSubjects.map(subject => (
                      <div key={subject} className="p-3 hover:bg-gray-50/50 cursor-pointer">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => toggleSubject(subject)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
                          />
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.subjects && <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>}
              
              {formData.subjects.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.subjects.map(subject => (
                    <span key={subject} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm">
                      {subject}
                      <button 
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className="ml-2 text-indigo-600 hover:text-indigo-900"
                      >
                        <FaTimes className="inline" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Availability Schedule</h3>
            <p className="text-sm text-gray-500">Set the weekly availability for this teacher</p>
            
            <div className="space-y-4">
              {Object.entries(formData.availability).map(([day, data]) => (
                <div key={day} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.available}
                        onChange={() => toggleDayAvailability(day)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
                      />
                      <span className="capitalize">{day}</span>
                    </label>
                    {data.available && (
                      <div className="flex items-center space-x-3">
                        <div>
                          <label className="text-xs text-gray-500 block">Start</label>
                          <input
                            type="time"
                            value={data.start}
                            onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <label className="text-xs text-gray-500 block">End</label>
                          <input
                            type="time"
                            value={data.end}
                            onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with glass blur effect */}
      <div 
        className="absolute inset-0 bg-white/20 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleCancelClose}
          />
          <div 
            ref={modalRef}
            className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-md w-full border border-white/20"
          >
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">Unsaved Changes</h3>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              You have unsaved changes. Are you sure you want to close this form? All your progress will be lost.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClose}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Yes, Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main form container */}
      <div 
        ref={formRef} 
        className="form-container relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
      >
        {/* Header with X button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Add New Teacher</h2>
          </div>
          
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100/50 transition-colors text-gray-600 hover:text-gray-900"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200/50 -z-10"></div>
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
                  {stepNum === 1 ? 'Basic Info' : stepNum === 2 ? 'Subjects' : 'Availability'}
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
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50/50 transition-colors"
          >
            Back
          </button>
          
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center transition-colors"
            >
              <FaUserPlus className="mr-2" />
              Add Teacher
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;