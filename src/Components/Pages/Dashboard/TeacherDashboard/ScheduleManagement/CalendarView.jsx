// src/Components/Pages/TeacherDashboard/ScheduleManagement/CalendarView.jsx
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sample events data
  const events = {
    '2023-11-15': [
      { id: 1, title: 'Algebra I', time: '08:00 AM' },
      { id: 2, title: 'Geometry', time: '09:15 AM' },
      { id: 3, title: 'Pre-Calculus', time: '10:30 AM' },
      { id: 4, title: 'Calculus', time: '12:30 PM' }
    ],
    '2023-11-16': [
      { id: 5, title: 'Algebra I', time: '08:00 AM' },
      { id: 6, title: 'Geometry', time: '09:15 AM' }
    ],
    '2023-11-20': [
      { id: 7, title: 'Faculty Meeting', time: '03:00 PM' }
    ],
    '2023-11-22': [
      { id: 8, title: 'Parent Conferences', time: '01:00 PM - 04:00 PM' }
    ]
  };

  // Get days in current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Go to today
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // Check if date has events
  const hasEvents = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return events[dateKey] && events[dateKey].length > 0;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  // Get events for selected date
  const selectedDateEvents = events[format(selectedDate, 'yyyy-MM-dd')] || [];

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Calendar View</h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={goToToday}
            className={`px-3 py-1 text-sm rounded-lg ${
              isSameDay(new Date(), currentMonth) 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h3 className="text-lg font-medium text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
        </div>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              viewMode === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              viewMode === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              viewMode === 'day'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>
      </div>

      <div className="p-6">
        {viewMode === 'month' ? (
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {daysInMonth.map(day => {
              const dayKey = format(day, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);
              const hasEventsToday = hasEvents(day);
              
              return (
                <div
                  key={dayKey}
                  className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  } ${
                    !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="flex justify-between">
                    <span className={`text-sm font-medium ${
                      isSameDay(day, new Date()) ? 'text-indigo-600' : ''
                    }`}>
                      {format(day, 'd')}
                    </span>
                    {hasEventsToday && (
                      <span className="h-2 w-2 bg-indigo-500 rounded-full"></span>
                    )}
                  </div>
                  
                  {isCurrentMonth && hasEventsToday && (
                    <div className="mt-2 space-y-1">
                      {events[dayKey].slice(0, 2).map(event => (
                        <div key={event.id} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded truncate">
                          {event.title}
                        </div>
                      ))}
                      {events[dayKey].length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{events[dayKey].length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : viewMode === 'week' ? (
          <div className="flex flex-col">
            <div className="flex border-b border-gray-200">
              <div className="w-24"></div>
              {Array.from({ length: 7 }).map((_, index) => {
                const day = addDays(startOfMonth(currentMonth), index);
                return (
                  <div 
                    key={index} 
                    className={`flex-1 text-center py-2 ${
                      isSameDay(day, selectedDate) ? 'bg-indigo-50' : ''
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="text-sm text-gray-500">{format(day, 'EEE')}</div>
                    <div className={`text-lg font-medium ${
                      isSameDay(day, new Date()) ? 'text-indigo-600' : ''
                    }`}>
                      {format(day, 'd')}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex">
              <div className="w-24 border-r border-gray-200">
                {Array.from({ length: 12 }).map((_, hour) => (
                  <div key={hour} className="h-16 border-b border-gray-200 text-xs text-gray-500 p-1">
                    {hour + 8}:00
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-7">
                {Array.from({ length: 7 * 12 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="h-16 border-b border-r border-gray-200 hover:bg-gray-50"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <button 
                className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
                onClick={() => setShowDatePicker(true)}
              >
                Select different date
              </button>
            </div>
            
            <div className="max-w-2xl mx-auto w-full">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                          <div className="mt-1 text-sm text-gray-600">{event.time}</div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No events scheduled</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {isSameDay(selectedDate, new Date()) 
                      ? "You don't have any events scheduled for today." 
                      : `You don't have any events scheduled for ${format(selectedDate, 'MMMM d')}.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs">
            <Calendar
              date={selectedDate}
              onChange={handleDateSelect}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowDatePicker(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;