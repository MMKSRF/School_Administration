// src/Components/Pages/TeacherDashboard/TeacherDashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

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
        <main className="flex-1 overflow-y-auto p-0 md:p-0">

          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;