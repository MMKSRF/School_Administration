import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaEdit, FaTimes, FaArrowLeft, FaExclamationTriangle, FaHome, FaCheck, FaUserPlus } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

export default function TeacherEditModal({ setShowEditModal, currentTeacher, setCurrentTeacher, handleEditTeacher }) {
  const formRef = useRef();
  const modalRef = useRef();
  const [step, setStep] = useState(1);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  // Define permission options matching AddTeacher
  const permissionOptions = [
    'View grades',
    'Edit grades',
    'Take attendance',
    'Edit attendance',
    'Create assignments',
    'Manage classes',
    'Full access'
  ];

  // Generate available classes matching AddTeacher
  const generateAvailableClasses = () => {
    const classes = [];
    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const sections = ['A', 'B', 'C', 'D'];
    
    grades.forEach(grade => {
      sections.forEach(section => {
        classes.push(`Grade ${grade}${section}`);
      });
    });
    return classes;
  };

  const availableClasses = generateAvailableClasses();
  const availableSubjects = [
    'Mathematics', 'Science', 'English', 'History', 
    'Geography', 'Physics', 'Chemistry', 'Biology',
    'Computer Science', 'Art', 'Music', 'Physical Education'
  ];

  // Initialize form data with current teacher data, filling missing fields with defaults
  const [formData, setFormData] = useState({
    name: currentTeacher.name || '',
    email: currentTeacher.email || '',
    phone: currentTeacher.phone || '',
    address: currentTeacher.address || '',
    type: currentTeacher.type || 'full_time',
    status: currentTeacher.status || 'Active',
    subjects: currentTeacher.subjects || [],
    qualifications: currentTeacher.qualifications || '',
    joiningDate: currentTeacher.joiningDate || new Date().toISOString().split('T')[0],
    permissions: currentTeacher.permissions || [],
    assignedClasses: currentTeacher.assignedClasses || [],
    homeroomClass: currentTeacher.homeroomClass || '',
    availability: currentTeacher.availability || {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '08:00', end: '16:00', available: false },
      sunday: { start: '08:00', end: '16:00', available: false }
    }
  });

  // Update currentTeacher when formData changes
  useEffect(() => {
    setCurrentTeacher(formData);
  }, [formData, setCurrentTeacher]);

  // Check if form has been modified
  useEffect(() => {
    const initialFormData = {
      name: currentTeacher.name || '',
      email: currentTeacher.email || '',
      phone: currentTeacher.phone || '',
      address: currentTeacher.address || '',
      type: currentTeacher.type || 'full_time',
      status: currentTeacher.status || 'Active',
      subjects: currentTeacher.subjects || [],
      qualifications: currentTeacher.qualifications || '',
      joiningDate: currentTeacher.joiningDate || new Date().toISOString().split('T')[0],
      permissions: currentTeacher.permissions || [],
      assignedClasses: currentTeacher.assignedClasses || [],
      homeroomClass: currentTeacher.homeroomClass || '',
      availability: currentTeacher.availability || {
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
  }, [formData, currentTeacher]);

  // GSAP Animations
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

  useEffect(() => {
    if (showConfirmModal && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { scale: 0.8, opacity: 50 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [showConfirmModal]);

  // Validation function
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

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePermission = (permission) => {
    setFormData(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      if (permission === 'Full access') {
        if (newPermissions.includes('Full access')) {
          return { ...prev, permissions: [...permissionOptions] };
        } else {
          return { ...prev, permissions: newPermissions.filter(p => p !== 'Full access') };
        }
      }
      
      const otherPermissions = permissionOptions.filter(p => p !== 'Full access');
      const hasAllOtherPermissions = otherPermissions.every(p => 
        permission === p ? newPermissions.includes(p) : prev.permissions.includes(p)
      );
      
      if (hasAllOtherPermissions) {
        return { ...prev, permissions: [...newPermissions, 'Full access'] };
      } else {
        return { ...prev, permissions: newPermissions.filter(p => p !== 'Full access') };
      }
    });
  };

  const toggleAssignedClass = (classItem) => {
    setFormData(prev => {
      const newAssignedClasses = prev.assignedClasses.includes(classItem)
        ? prev.assignedClasses.filter(c => c !== classItem)
        : [...prev.assignedClasses, classItem];
      
      if (prev.homeroomClass === classItem && !newAssignedClasses.includes(classItem)) {
        return { ...prev, assignedClasses: newAssignedClasses, homeroomClass: '' };
      }
      
      return { ...prev, assignedClasses: newAssignedClasses };
    });
  };

  const handleHomeroomClassChange = (classItem) => {
    setFormData(prev => ({
      ...prev,
      homeroomClass: classItem
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

  // Step navigation
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      handleClose();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      handleEditTeacher(formData);
    }
  };

  const handleClose = () => {
    if (isFormDirty) {
      setShowConfirmModal(true);
    } else {
      setShowEditModal(false);
    }
  };

  const handleConfirmClose = () => {
    setShowEditModal(false);
  };

  const handleCancelClose = () => {
    setShowConfirmModal(false);
  };

  // Render steps matching AddTeacher component
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
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
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
            <h3 className="text-lg font-medium text-gray-900">Teacher Permissions</h3>
            <p className="text-sm text-gray-500">Set the access permissions for this teacher</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissionOptions.map((permission, idx) => (
                  <div key={idx} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label className="ml-3 text-sm text-gray-700 cursor-pointer flex-1">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
              
              {formData.permissions.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-800 mb-2">Selected Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.permissions.map(permission => (
                      <span key={permission} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Class Assignments</h3>
            <p className="text-sm text-gray-500">Assign classes to this teacher and set homeroom class</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Classes</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowClassDropdown(!showClassDropdown)}
                  className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <span>Select classes ({formData.assignedClasses.length})</span>
                  <FiChevronDown className={`transition-transform ${showClassDropdown ? 'transform rotate-180' : ''}`} />
                </button>
                {showClassDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white/90 backdrop-blur-md shadow-lg rounded-xl border border-gray-300/50 max-h-60 overflow-auto">
                    {availableClasses.map(classItem => (
                      <div key={classItem} className="p-3 hover:bg-gray-50/50 cursor-pointer">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.assignedClasses.includes(classItem)}
                            onChange={() => toggleAssignedClass(classItem)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
                          />
                          {classItem}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {formData.assignedClasses.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.assignedClasses.map(classItem => (
                    <span key={classItem} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      {classItem}
                      <button 
                        type="button"
                        onClick={() => toggleAssignedClass(classItem)}
                        className="ml-2 text-green-600 hover:text-green-900"
                      >
                        <FaTimes className="inline" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Homeroom Class <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <select
                  value={formData.homeroomClass}
                  onChange={(e) => handleHomeroomClassChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={formData.assignedClasses.length === 0}
                >
                  <option value="">Select homeroom class</option>
                  {formData.assignedClasses.map(classItem => (
                    <option key={classItem} value={classItem}>
                      {classItem}
                    </option>
                  ))}
                </select>
                {formData.homeroomClass && (
                  <FaHome className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formData.assignedClasses.length === 0 
                  ? "Assign classes first to set homeroom class"
                  : formData.homeroomClass 
                    ? `${formData.homeroomClass} is set as homeroom class`
                    : "Select a class for homeroom teacher role"
                }
              </p>
            </div>

            {formData.assignedClasses.length > 0 && (
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-medium text-green-800 mb-2">Class Assignment Summary:</h4>
                <p className="text-sm text-green-700">
                  This teacher is assigned to {formData.assignedClasses.length} class
                  {formData.assignedClasses.length !== 1 ? 'es' : ''}
                  {formData.homeroomClass && ` and is the homeroom teacher for ${formData.homeroomClass}`}.
                </p>
              </div>
            )}
          </div>
        );
      case 5:
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
            <div className="flex items-center">
              <FaEdit className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Edit Teacher: {formData.name}</h2>
            </div>
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
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <FaCheck /> : stepNum}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  step >= stepNum ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {stepNum === 1 ? 'Basic Info' : 
                   stepNum === 2 ? 'Subjects' : 
                   stepNum === 3 ? 'Permissions' : 
                   stepNum === 4 ? 'Classes' : 'Availability'}
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
          
          {step < 5 ? (
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
              Update Teacher
            </button>
          )}
        </div>
      </div>
    </div>
  );
}