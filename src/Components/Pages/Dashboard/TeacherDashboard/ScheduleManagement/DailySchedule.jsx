// src/Components/Pages/TeacherDashboard/ScheduleManagement/DailySchedule.jsx
import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';

const DailySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});
  const [showAddSession, setShowAddSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    period: '',
    startTime: '08:00',
    endTime: '09:00',
    room: '',
    description: ''
  });

  // Sample schedule data
  const classSchedule = {
    '2023-11-15': [
      { id: 1, title: 'Algebra I', period: 'Period 1', startTime: '08:00', endTime: '09:00', room: 'Room 204', description: 'Linear equations review' },
      { id: 2, title: 'Geometry', period: 'Period 2', startTime: '09:15', endTime: '10:15', room: 'Room 204', description: 'Triangle congruence' },
      { id: 3, title: 'Pre-Calculus', period: 'Period 3', startTime: '10:30', endTime: '11:30', room: 'Room 215', description: 'Trigonometric identities' },
      { id: 4, title: 'Calculus', period: 'Period 4', startTime: '12:30', endTime: '13:30', room: 'Room 215', description: 'Derivatives practice' }
    ],
    '2023-11-16': [
      { id: 5, title: 'Algebra I', period: 'Period 1', startTime: '08:00', endTime: '09:00', room: 'Room 204', description: 'Quadratic functions' },
      { id: 6, title: 'Geometry', period: 'Period 2', startTime: '09:15', endTime: '10:15', room: 'Room 204', description: 'Circle theorems' }
    ]
  };

  // Load schedule for current date
  useEffect(() => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    setSchedule(classSchedule[dateKey] || []);
  }, [currentDate]);

  // Navigate to previous day
  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  // Navigate to next day
  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  // Add new session
  const addSession = () => {
    if (!newSession.title || !newSession.period) return;
    
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const newSessionObj = {
      id: Math.max(0, ...(classSchedule[dateKey] || []).map(s => s.id)) + 1,
      ...newSession
    };
    
    const updatedSchedule = {
      ...classSchedule,
      [dateKey]: [...(classSchedule[dateKey] || []), newSessionObj]
    };
    
    setSchedule(updatedSchedule[dateKey]);
    setShowAddSession(false);
    setNewSession({
      title: '',
      period: '',
      startTime: '08:00',
      endTime: '09:00',
      room: '',
      description: ''
    });
  };

  // Delete session
  const deleteSession = (id) => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const updatedSchedule = (classSchedule[dateKey] || []).filter(session => session.id !== id);
    setSchedule(updatedSchedule);
  };

  // Format time for display
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    return hour > 12 ? `${hour - 12}:${minutes} PM` : `${hour}:${minutes} AM`;
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Daily Schedule</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className={`px-3 py-1 text-sm rounded-lg ${
              isToday(currentDate) 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={goToNextDay}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-lg font-medium text-gray-800">
            {format(currentDate, 'EEEE, MMMM d')}
          </div>
        </div>
        <button
          onClick={() => setShowAddSession(!showAddSession)}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Session
        </button>
      </div>

      {showAddSession && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-3">Add New Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newSession.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Class name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <input
                type="text"
                name="period"
                value={newSession.period}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Period number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={newSession.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={newSession.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
              <input
                type="text"
                name="room"
                value={newSession.room}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Room number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={newSession.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Session description"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowAddSession(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              onClick={addSession}
            >
              Add Session
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        {schedule.length > 0 ? (
          <div className="space-y-4">
            {schedule.map(session => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{session.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <span className="mr-4">{session.period}</span>
                      <span className="mr-4">{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                      <span>{session.room}</span>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => deleteSession(session.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {session.description && (
                  <div className="mt-3 text-sm text-gray-700">
                    {session.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No sessions scheduled</h3>
            <p className="mt-2 text-sm text-gray-500">
              {isToday(currentDate) 
                ? "You don't have any classes scheduled for today." 
                : `You don't have any classes scheduled for ${format(currentDate, 'MMMM d')}.`}
            </p>
            <button
              className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              onClick={() => setShowAddSession(true)}
            >
              Add a session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailySchedule;