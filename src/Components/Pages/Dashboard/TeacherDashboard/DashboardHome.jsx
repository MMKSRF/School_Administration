// src/Components/Pages/TeacherDashboard/DashboardHome.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ClassOverview from './DashboardWidgets/ClassOverview';
import UpcomingTasks from './DashboardWidgets/UpcomingTasks';
import RecentAnnouncements from './DashboardWidgets/RecentAnnouncements';

const DashboardHome = ({ teacherData }) => {
  const headerRef = useRef();
  const statsRef = useRef();
  const gridRef = useRef();
  
  // Sample data
  const classes = [
    { id: 1, name: 'Algebra I', period: 'Period 1', students: 28, assignments: 2 },
    { id: 2, name: 'Geometry', period: 'Period 2', students: 25, assignments: 1 },
    { id: 3, name: 'Pre-Calculus', period: 'Period 3', students: 30, assignments: 3 },
    { id: 4, name: 'Calculus', period: 'Period 4', students: 22, assignments: 0 },
  ];

  const tasks = [
    { id: 1, title: 'Grade Algebra Quiz', due: 'Tomorrow', priority: 'high' },
    { id: 2, title: 'Prepare Calculus Exam', due: '3 days', priority: 'medium' },
    { id: 3, title: 'Submit Attendance Report', due: 'Friday', priority: 'high' },
    { id: 4, title: 'Review Student Projects', due: 'Next week', priority: 'low' },
  ];

  const announcements = [
    { id: 1, title: 'School Holiday Announcement', date: 'Nov 10, 2023', author: 'Principal Smith' },
    { id: 2, title: 'New Curriculum Resources Available', date: 'Nov 8, 2023', author: 'Curriculum Dept' },
    { id: 3, title: 'Professional Development Workshop', date: 'Nov 5, 2023', author: 'Staff Development' },
  ];

  // GSAP animations on component mount
  useEffect(() => {
    gsap.from(headerRef.current, {
      duration: 0.8,
      y: 20,
      opacity: 100,
      ease: "power3.out"
    });

    gsap.from(statsRef.current.children, {
      duration: 0.6,
      y: 30,
      opacity: 100,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });

    gsap.from(gridRef.current.children, {
      duration: 0.7,
      y: 40,
      opacity: 100,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.6
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome banner with animation */}
      <div 
        ref={headerRef}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {teacherData.name}!</h2>
            <p className="mt-2 opacity-90">Here's what's happening with your classes today</p>
          </div>

          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium text-sm">
              View Schedule
            </button>
            <button className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg font-medium text-sm">
              Add New Task
            </button>
          </div>


        </div>

      </div>

      {/* Stats summary with animation */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold text-gray-900">{teacherData.students}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Classes</h3>
              <p className="text-2xl font-bold text-gray-900">{teacherData.classes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
              <p className="text-2xl font-bold text-gray-900">{teacherData.upcomingEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid with animation */}
      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClassOverview classes={classes} />
        </div>
        
        <div className="space-y-6">
          <UpcomingTasks tasks={tasks} />
          <RecentAnnouncements announcements={announcements} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;