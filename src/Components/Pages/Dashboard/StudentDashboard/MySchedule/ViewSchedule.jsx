// ViewSchedule.jsx (updated)
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaPrint, FaSyncAlt, FaTasks, FaFilter } from 'react-icons/fa';
import DownloadSchedule from './DownloadSchedule';
import RequestChanges from './RequestChanges';
import ScheduleConflictModal from './ScheduleConflictModal';
import AssignmentDetailModal from './AssignmentDetailModal';

const ViewSchedule = () => {
  const [scheduleType, setScheduleType] = useState('weekly');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const scheduleRef = useRef(null);
  
  // Enhanced schedule data with assignments
  const scheduleData = {
    weekly: [
      {
        id: 1,
        day: 'Monday',
        date: '2023-12-11',
        periods: [
          { 
            id: 1, 
            time: '8:00 - 9:30', 
            subject: 'Mathematics', 
            teacher: 'Mr. Johnson', 
            room: '305', 
            color: 'bg-blue-100',
            assignments: [
              { id: 101, title: 'Algebra Homework', due: '2023-12-12', status: 'pending' }
            ]
          },
          { 
            id: 2, 
            time: '9:45 - 11:15', 
            subject: 'Science', 
            teacher: 'Dr. Williams', 
            room: 'Lab 102', 
            color: 'bg-green-100',
            assignments: []
          },
          // ... other periods
        ]
      },
      // ... other days
    ],
    daily: [
      { 
        id: 1, 
        time: '8:00 - 9:30', 
        subject: 'Mathematics', 
        teacher: 'Mr. Johnson', 
        room: '305', 
        color: 'bg-blue-100',
        assignments: [
          { id: 101, title: 'Algebra Homework', due: '2023-12-12', status: 'pending' }
        ]
      },
      // ... other periods
    ]
  };

  // All assignments across classes
  const allAssignments = [
    { 
      id: 1, 
      title: 'Algebra Final Exam', 
      subject: 'Mathematics', 
      dueDate: '2023-12-15', 
      daysLeft: 3,
      priority: 'high',
      completed: false,
      submitted: false,
      description: 'Comprehensive exam covering chapters 5-9. Calculators allowed.',
      attachments: 3,
      reminders: 2,
      relatedClass: 'Mathematics'
    },
    { 
      id: 2, 
      title: 'Science Project', 
      subject: 'Science', 
      dueDate: '2023-12-18', 
      daysLeft: 6,
      priority: 'medium',
      completed: false,
      submitted: true,
      description: 'Group project on renewable energy sources. Presentation required.',
      attachments: 5,
      reminders: 1,
      relatedClass: 'Science'
    },
    // ... more assignments
  ];

  useEffect(() => {
    // Simulate loading schedule data
    const timer = setTimeout(() => {
      setLoading(false);
      animateSchedule();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      animateSchedule();
    }
  }, [scheduleType, currentWeek, loading, showAssignments]);

  const animateSchedule = () => {
    if (scheduleRef.current) {
      gsap.from(scheduleRef.current.children, {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  };

  const handleWeekChange = (direction) => {
    gsap.to(scheduleRef.current, {
      duration: 0.3,
      opacity: 0,
      x: direction === 'next' ? -20 : 20,
      onComplete: () => {
        setCurrentWeek(prev => prev + (direction === 'next' ? 1 : -1));
        gsap.fromTo(scheduleRef.current, 
          { opacity: 0, x: direction === 'next' ? 20 : -20 },
          { duration: 0.3, opacity: 1, x: 0 }
        );
      }
    });
  };

  const detectConflicts = () => {
    // Simulate conflict detection
    setConflictData({
      conflicts: [
        { id: 1, class1: 'Mathematics', class2: 'Science Club', time: 'Tue 3:00 PM' },
        { id: 2, class1: 'History', class2: 'Robotics', time: 'Thu 2:30 PM' }
      ],
      warnings: [
        { id: 1, class: 'Literature', message: 'Low attendance - 87%' }
      ]
    });
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsAssignmentModalOpen(true);
  };

  const getAssignmentColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getFilteredAssignments = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return allAssignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      
      if (filter === 'today') return dueDate.toDateString() === today.toDateString();
      if (filter === 'week') return dueDate > today && dueDate <= nextWeek;
      if (filter === 'overdue') return dueDate < today && !assignment.completed;
      return true;
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="animate-pulse flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="h-10 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <FaCalendarAlt className="mr-2" />
            <span>Week of Dec 11 - Dec 17, 2023</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setScheduleType('weekly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                scheduleType === 'weekly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly View
            </button>
            <button
              type="button"
              onClick={() => setScheduleType('daily')}
              className={`px-4 py-2 text-sm font-medium ${
                scheduleType === 'daily'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily View
            </button>
            <button
              type="button"
              onClick={() => setScheduleType('assignments')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                scheduleType === 'assignments'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Assignments
            </button>
          </div>
          
          <button 
            onClick={detectConflicts}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg hover:bg-yellow-200 flex items-center"
          >
            <FaSyncAlt className="mr-2" />
            Check Conflicts
          </button>
          
          <button 
            onClick={() => setShowAssignments(!showAssignments)}
            className={`px-4 py-2 rounded-lg flex items-center ${
              showAssignments
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaTasks className="mr-2" />
            {showAssignments ? 'Hide Assignments' : 'Show Assignments'}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => handleWeekChange('prev')}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          <FaChevronLeft />
        </button>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {scheduleData.weekly.map(day => (
            <button
              key={day.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                day.day === 'Monday' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => handleWeekChange('next')}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          <FaChevronRight />
        </button>
      </div>
      
      {scheduleType === 'assignments' ? (
        <div ref={scheduleRef} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-indigo-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-indigo-800">Upcoming Assignments</h3>
            <div className="relative">
              <button 
                className="flex items-center text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <FaFilter className="mr-2" />
                Filter
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => setFilter('all')}
                >
                  All Assignments
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'today' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => setFilter('today')}
                >
                  Due Today
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'week' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => setFilter('week')}
                >
                  Due This Week
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'overdue' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => setFilter('overdue')}
                >
                  Overdue
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {getFilteredAssignments().map(assignment => (
              <div 
                key={assignment.id} 
                className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => handleAssignmentClick(assignment)}
              >
                <div className="col-span-1">
                  <div className={`w-3 h-3 rounded-full ${assignment.priority === 'high' ? 'bg-red-500' : assignment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                </div>
                <div className="col-span-5">
                  <div className="font-medium text-gray-900">{assignment.title}</div>
                  <div className="text-sm text-gray-600">{assignment.subject}</div>
                </div>
                <div className="col-span-3 text-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1.5 text-sm" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <span className={`text-sm font-medium ${
                    assignment.daysLeft <= 1 ? 'text-red-600' : 
                    assignment.daysLeft <= 3 ? 'text-yellow-600' : 'text-gray-900'
                  }`}>
                    {assignment.daysLeft} {assignment.daysLeft === 1 ? 'day' : 'days'} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div ref={scheduleRef}>
          {scheduleType === 'weekly' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {scheduleData.weekly.map(day => (
                <div key={day.id} className="border border-gray-200 rounded-lg">
                  <div className="bg-indigo-50 p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-indigo-800">{day.day}</h3>
                    <p className="text-sm text-indigo-600">{day.date}</p>
                  </div>
                  <div className="p-2">
                    {day.periods.map(period => (
                      <div 
                        key={period.id} 
                        className={`p-3 mb-2 rounded-lg border-l-4 border-indigo-500 ${period.color} transition-transform hover:scale-[1.02]`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">{period.subject}</span>
                          <span className="text-sm text-gray-700">{period.room}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{period.teacher}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {period.time}
                        </div>
                        
                        {showAssignments && period.assignments.length > 0 && (
                          <div className="mt-3 border-t border-gray-100 pt-2">
                            <div className="text-xs font-medium text-gray-700 mb-1">Assignments:</div>
                            {period.assignments.map(assignment => (
                              <div 
                                key={assignment.id}
                                className="flex items-center text-xs p-1.5 rounded bg-gray-50 hover:bg-gray-100 mb-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const fullAssignment = allAssignments.find(a => a.id === assignment.id);
                                  if (fullAssignment) handleAssignmentClick(fullAssignment);
                                }}
                              >
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  assignment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                                <span className="truncate">{assignment.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-indigo-800">Monday, Dec 11</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {scheduleData.daily.map(period => (
                  <div 
                    key={period.id} 
                    className={`p-4 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-gray-50 relative ${
                      period.time === '8:00 - 9:30' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="col-span-2 font-medium text-gray-900">{period.time}</div>
                    <div className="col-span-3">
                      <div className="font-medium text-gray-900">{period.subject}</div>
                      <div className="text-sm text-gray-600">{period.teacher}</div>
                    </div>
                    <div className="col-span-2 text-gray-700">{period.room}</div>
                    <div className="col-span-5 flex justify-end space-x-2">
                      {showAssignments && period.assignments.length > 0 && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                            {period.assignments.length} assignment{period.assignments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      <button className="text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200">
                        Set Reminder
                      </button>
                    </div>
                    
                    {showAssignments && period.assignments.length > 0 && (
                      <div className="col-span-12 mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs font-medium text-gray-700 mb-2">Assignments:</div>
                        <div className="flex flex-wrap gap-2">
                          {period.assignments.map(assignment => (
                            <div 
                              key={assignment.id}
                              className="flex items-center text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const fullAssignment = allAssignments.find(a => a.id === assignment.id);
                                if (fullAssignment) handleAssignmentClick(fullAssignment);
                              }}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                assignment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></div>
                              <span>{assignment.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end mt-6 space-x-3">
        <button 
          onClick={() => setIsDownloadOpen(true)}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center"
        >
          <FaPrint className="mr-2" />
          Export Schedule
        </button>
        
        <button 
          onClick={() => setIsRequestOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Request Changes
        </button>
      </div>
      
      {isDownloadOpen && (
        <DownloadSchedule 
          scheduleData={scheduleData} 
          onClose={() => setIsDownloadOpen(false)} 
        />
      )}
      
      {isRequestOpen && (
        <RequestChanges 
          onClose={() => setIsRequestOpen(false)} 
          onSuccess={() => {
            setIsRequestOpen(false);
            // Show success notification
          }}
        />
      )}
      
      {conflictData && (
        <ScheduleConflictModal 
          data={conflictData} 
          onClose={() => setConflictData(null)} 
        />
      )}
      
      {isAssignmentModalOpen && selectedAssignment && (
        <AssignmentDetailModal 
          assignment={selectedAssignment} 
          onClose={() => setIsAssignmentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewSchedule;