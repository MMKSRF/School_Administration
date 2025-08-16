// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/CreateSchedule.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers, fetchClasses, createSchedule } from '../../../../../Redux/Slices/teachersSlice';
import { FaCalendarAlt, FaSearch, FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const CreateSchedule = () => {
  const dispatch = useDispatch();
  // const { teachers, classes, status, error } = useSelector(state => state.teachers);
  const { teachers, classes } = useSelector(state => state.teachers);
  const containerRef = useRef();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    teacherId: '',
    classId: '',
    periodId: '',
    room: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    recurrence: 'weekly',
    daysOfWeek: []
  });
  const [conflicts, setConflicts] = useState([]);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.schedule-step', {
        x: 50,
        opacity: 100,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleDaySelection = (day) => {
    setFormData(prev => {
      const newDays = prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day];
      return { ...prev, daysOfWeek: newDays };
    });
  };

  const checkConflicts = () => {
    // In a real app, this would call an API to check for conflicts
    const mockConflicts = [
      {
        type: 'teacher',
        message: 'Teacher already has a class scheduled during this time',
        existing: {
          class: 'Physics 101',
          room: 'Room 203',
          time: '10:00 AM - 11:30 AM'
        }
      },
      {
        type: 'room',
        message: 'Room is already booked for another class',
        existing: {
          class: 'Chemistry Lab',
          teacher: 'Dr. Smith',
          time: '10:00 AM - 11:30 AM'
        }
      }
    ];
    setConflicts(mockConflicts);
    setStep(3);
  };

  const handleSubmit = () => {
    dispatch(createSchedule(formData));
    // Reset form or redirect
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="schedule-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Select Teacher and Class</h3>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher*</label>
              <button
                type="button"
                onClick={() => setShowTeacherDropdown(!showTeacherDropdown)}
                className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span>
                  {formData.teacherId 
                    ? teachers.find(t => t.id === formData.teacherId)?.name 
                    : 'Select a teacher'}
                </span>
                <FiChevronDown className={`transition-transform ${showTeacherDropdown ? 'transform rotate-180' : ''}`} />
              </button>
              {showTeacherDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-xl border border-gray-300 max-h-60 overflow-auto">
                  {teachers.map(teacher => (
                    <div 
                      key={teacher.id}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, teacherId: teacher.id }));
                        setShowTeacherDropdown(false);
                      }}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center"
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium mr-3">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-xs text-gray-500">{teacher.subjects.join(', ')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Class*</label>
              <button
                type="button"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span>
                  {formData.classId 
                    ? classes.find(c => c.id === formData.classId)?.name 
                    : 'Select a class'}
                </span>
                <FiChevronDown className={`transition-transform ${showClassDropdown ? 'transform rotate-180' : ''}`} />
              </button>
              {showClassDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-xl border border-gray-300 max-h-60 overflow-auto">
                  {classes.map(cls => (
                    <div 
                      key={cls.id}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, classId: cls.id }));
                        setShowClassDropdown(false);
                      }}
                      className="p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="font-medium">{cls.name}</div>
                      <div className="text-xs text-gray-500">
                        {cls.grade} • {cls.subject} • {cls.students?.length || 0} students
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room*</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="Enter room number or name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="schedule-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Set Schedule Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence*</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {formData.recurrence === 'weekly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days of Week*</label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDaySelection(day)}
                      className={`px-4 py-2 rounded-xl border ${
                        formData.daysOfWeek.includes(day)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period*</label>
              <select
                name="periodId"
                value={formData.periodId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a period</option>
                <option value="1">08:00 AM - 09:30 AM</option>
                <option value="2">09:30 AM - 11:00 AM</option>
                <option value="3">11:00 AM - 12:30 PM</option>
                <option value="4">01:30 PM - 03:00 PM</option>
                <option value="5">03:00 PM - 04:30 PM</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="schedule-step space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Review and Confirm</h3>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-lg mb-4">Schedule Summary</h4>
              
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-gray-500 w-32">Teacher:</span>
                  <span className="font-medium">
                    {teachers.find(t => t.id === formData.teacherId)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Class:</span>
                  <span className="font-medium">
                    {classes.find(c => c.id === formData.classId)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Room:</span>
                  <span className="font-medium">{formData.room || 'Not specified'}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Schedule:</span>
                  <span className="font-medium">
                    {formData.recurrence === 'weekly' 
                      ? formData.daysOfWeek.join(', ') + ' at ' + 
                        (formData.periodId 
                          ? ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM'][parseInt(formData.periodId) - 1]
                          : 'No time selected')
                      : formData.recurrence + ' at selected time'}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Duration:</span>
                  <span className="font-medium">
                    {formData.startDate} {formData.endDate ? `to ${formData.endDate}` : 'onwards'}
                  </span>
                </div>
              </div>
            </div>

            {conflicts.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Potential Conflicts Detected</h4>
                    <div className="mt-2 space-y-3">
                      {conflicts.map((conflict, index) => (
                        <div key={index} className="text-sm text-yellow-700">
                          <p>{conflict.message}</p>
                          {conflict.existing && (
                            <div className="mt-1 ml-4 text-xs bg-yellow-100 p-2 rounded-lg">
                              Existing: {Object.entries(conflict.existing).map(([key, value]) => (
                                <span key={key} className="mr-3">{key}: {value}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaCalendarAlt className="text-indigo-600 mr-3" />
          Create Teacher Schedule
        </h2>
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
                {stepNum}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                step >= stepNum ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {stepNum === 1 ? 'Teacher & Class' : stepNum === 2 ? 'Schedule' : 'Review'}
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
          onClick={() => step > 1 ? setStep(prev => prev - 1) : null}
          disabled={step === 1}
          className={`px-6 py-2 border rounded-xl ${
            step === 1 
              ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Back
        </button>
        
        {step < 3 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 2) {
                checkConflicts();
              } else {
                setStep(prev => prev + 1);
              }
            }}
            disabled={
              (step === 1 && (!formData.teacherId || !formData.classId || !formData.room)) ||
              (step === 2 && (!formData.startDate || !formData.periodId || 
                (formData.recurrence === 'weekly' && formData.daysOfWeek.length === 0)))
            }
            className={`px-6 py-2 rounded-xl ${
              (step === 1 && (!formData.teacherId || !formData.classId || !formData.room)) ||
              (step === 2 && (!formData.startDate || !formData.periodId || 
                (formData.recurrence === 'weekly' && formData.daysOfWeek.length === 0)))
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {step === 2 ? 'Check Conflicts' : 'Next'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center"
          >
            <FaCheck className="mr-2" />
            Confirm Schedule
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateSchedule;