// src/Components/Pages/Dashboard/AdminDashboard/ManageClasses/CreateClass.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { createClass } from '../../../../../Redux/Slices/classesSlice';
import { FaPlus, FaArrowLeft, FaChalkboardTeacher, FaUserGraduate, FaDoorOpen } from 'react-icons/fa';

const CreateClass = ({ onBack }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    subject: '',
    room: '',
    capacity: '',
    schedule: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-card', {
        y: 30,
        opacity: 100,
        duration: 0.6,
        ease: 'power2.out'
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Class name is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.room) newErrors.room = 'Room is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      dispatch(createClass(formData));
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            grade: '',
            subject: '',
            room: '',
            capacity: '',
            schedule: '',
            description: ''
          });
          setShowSuccess(false);
          if (onBack) onBack();
        }, 2000);
      }, 1500);
    }
  };

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Music', 'Physical Education'];

  return (
    <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Create New Class</h2>
      </div>

      {showSuccess ? (
        <div className="form-card bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Class Created Successfully!</h3>
          <p className="text-gray-600">Your new class has been added to the system.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Math 101, Science A"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade*</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.grade ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select grade</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
              {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room*</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.room ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Room 203, Lab B"
              />
              {errors.room && <p className="mt-1 text-sm text-red-600">{errors.room}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Maximum students"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Mon/Wed/Fri 10:00-11:30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Brief description of the class..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-xl flex items-center ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Create Class
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateClass;