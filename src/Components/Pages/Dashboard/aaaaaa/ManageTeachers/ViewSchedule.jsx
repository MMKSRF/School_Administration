// src/AdminDashboard/ManageSchedule/ViewSchedule.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const TimetableView = () => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [selectedClass, setSelectedClass] = useState('Grade 9A');
  const [viewMode, setViewMode] = useState('daily');
  
  // Mock data
  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [
    { id: 1, name: 'Period 1', start: '08:00', end: '08:45' },
    { id: 2, name: 'Period 2', start: '08:50', end: '09:35' },
    { id: 3, name: 'Period 3', start: '09:40', end: '10:25' },
  ];
  
  const timetableData = {
    'Grade 9A': {
      Monday: {
        'Period 1': { subject: 'Math', teacher: 'Alemu Bekele', room: 'Room 101' },
        'Period 2': { subject: 'English', teacher: 'Tigist Worku', room: 'Room 102' },
        'Period 3': { subject: 'Science', teacher: 'Alemu Bekele', room: 'Lab 1' },
      },
      // ... similar data for other days
    },
    // ... similar data for other classes
  };

  useEffect(() => {
    gsap.from(contentRef.current.children, {
      y: 0,
      opacity: 100,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });
  }, []);

  const handleEditSchedule = () => {
    navigate('/admin-dashboard/schedule/create');
  };

  return (
    <div ref={contentRef} className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">View Timetable</h2>
        
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Daily View</option>
              <option value="weekly">Weekly Overview</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={handleEditSchedule}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Schedule
            </button>
          </div>
        </div>
      </div>
      
      {viewMode === 'daily' ? (
        <div className="overflow-x-auto">
          {days.map(day => (
            <div key={day} className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4">{day}</h3>
              
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100 w-1/6">Period</th>
                    <th className="border border-gray-300 p-2 bg-gray-100 w-1/3">Subject</th>
                    <th className="border border-gray-300 p-2 bg-gray-100 w-1/4">Teacher</th>
                    <th className="border border-gray-300 p-2 bg-gray-100 w-1/4">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {periods.map(period => {
                    const scheduleItem = timetableData[selectedClass]?.[day]?.[period.name] || {};
                    return (
                      <tr key={period.name}>
                        <td className="border border-gray-300 p-2">
                          <div className="font-medium">{period.name}</div>
                          <div className="text-xs text-gray-600">{period.start} - {period.end}</div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {scheduleItem.subject || '-'}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {scheduleItem.teacher || '-'}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {scheduleItem.room || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-100">Time/Day</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-300 p-2 bg-gray-100">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period.name}>
                  <td className="border border-gray-300 p-2 bg-gray-50 font-medium">
                    {period.name}
                    <div className="text-xs text-gray-600">{period.start} - {period.end}</div>
                  </td>
                  {days.map(day => {
                    const scheduleItem = timetableData[selectedClass]?.[day]?.[period.name] || {};
                    return (
                      <td key={`${day}-${period.name}`} className="border border-gray-300 p-2">
                        {scheduleItem.subject && (
                          <div className="text-center">
                            <div className="font-medium">{scheduleItem.subject}</div>
                            <div className="text-sm text-gray-600">{scheduleItem.teacher}</div>
                            <div className="text-xs text-gray-500">{scheduleItem.room}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          Print Timetable
        </button>
      </div>
    </div>
  );
};

export default TimetableView;