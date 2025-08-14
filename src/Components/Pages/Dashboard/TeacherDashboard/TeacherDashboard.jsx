// src/Components/Pages/TeacherDashboard/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardHome from './DashboardHome';
import AttendanceTracker from './ManageStudents/AttendanceTracker';
import GradeBook from './ManageStudents/GradeBook';
import StudentProfiles from './ManageStudents/StudentProfiles';
import DailySchedule from './ScheduleManagement/DailySchedule';
import CalendarView from './ScheduleManagement/CalendarView';
import LessonPlanner from './ScheduleManagement/LessonPlanner';

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeStudentTab, setActiveStudentTab] = useState(0);
  const [activeScheduleTab, setActiveScheduleTab] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment submission from Sarah', time: '2 min ago', read: false },
    { id: 2, text: 'Staff meeting reminder', time: '1 hour ago', read: false },
    { id: 3, text: 'New school announcement', time: '3 hours ago', read: true },
  ]);
  
  const teacherData = {
    name: 'Ms. Johnson',
    subjects: ['Algebra I', 'Geometry', 'Pre-Calculus'],
    classes: 4,
    students: 105,
    upcomingEvents: [
      { id: 1, title: 'Parent-Teacher Conference', date: '2023-11-15' },
      { id: 2, title: 'Algebra Midterm', date: '2023-11-20' },
    ]
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  // Render active section
  const renderActiveSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardHome teacherData={teacherData} />;
      case 'students':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {['Attendance', 'Grades', 'Profiles'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    activeStudentTab === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveStudentTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeStudentTab === 0 && <AttendanceTracker />}
            {activeStudentTab === 1 && <GradeBook />}
            {activeStudentTab === 2 && <StudentProfiles />}
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {['Daily', 'Calendar', 'Lessons'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    activeScheduleTab === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveScheduleTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeScheduleTab === 0 && <DailySchedule />}
            {activeScheduleTab === 1 && <CalendarView />}
            {activeScheduleTab === 2 && <LessonPlanner />}
          </div>
        );
      default:
        return <DashboardHome teacherData={teacherData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar 
          teacherName={teacherData.name}
          notifications={notifications}
          markNotificationRead={markNotificationRead}
          clearNotifications={clearNotifications}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;