// src/Components/Pages/Dashboard/AdminDashboard/DashboardHome.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import SchoolStats from "./DashboardWidgets/SchoolStats.jsx";
import RecentActivity  from "./DashboardWidgets/RecentActivity.jsx";
import {useSelector} from "react-redux";


import {miniReport} from "../../../../Redux/Selectors/AdminSelectors/adminSelectors.js";


import {
  FaUsers, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaChartLine,
  FaCalendarAlt,
  FaFileExport,
  FaCog
} from 'react-icons/fa';

import WelcomeBanner from '../../../Ui/Basics/WelcomeBanner.jsx'

const DashboardHome = () => {
  const containerRef = useRef();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.welcome-section', {
        y: 20,
        opacity: 100,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.from('.stat-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out'
      });
      
      gsap.from('.quick-action', {
        y: 10,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.6,
        ease: 'back.out(1.2)'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // const stats = [
  //   { value: '1,248', label: 'Total Students', icon: <FaUsers className="text-indigo-500" />, change: '+3.2%' },
  //   { value: '58', label: 'Teaching Staff', icon: <FaChalkboardTeacher className="text-indigo-500" />, change: '+1.8%' },
  //   { value: '42', label: 'Active Classes', icon: <FaSchool className="text-indigo-500" />, change: '0%' },
  //   { value: '94.5%', label: 'Attendance Rate', icon: <FaChartLine className="text-indigo-500" />, change: '-0.7%' }
  // ];
  const stats = useSelector(miniReport)
  const quickActions = [
    { 
      title: 'Schedule Management', 
      icon: <FaCalendarAlt className="text-indigo-600 text-xl" />,
      link: '/admin/schedule',
      color: 'bg-indigo-100'
    },
    { 
      title: 'Create Reports', 
      icon: <FaFileExport className="text-indigo-600 text-xl" />,
      link: '/admin/reports',
      color: 'bg-green-100'
    },
    { 
      title: 'System Settings', 
      icon: <FaCog className="text-indigo-600 text-xl" />,
      link: '/admin/settings',
      color: 'bg-purple-100'
    }
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Welcome Section */}

       < WelcomeBanner
           userName={'Admin Perez Endale'}
           message={"Here's what's happening with your school today. You have 3 pending requests and 2 schedule conflicts to resolve."}
           userRoleMessage={"This is User RoleMessage"}
       />

      {/*<div className="welcome-section bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">*/}
      {/*  <div className="p-6 md:p-8">*/}
      {/*    <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back, Admin!</h1>*/}
      {/*    <p className="text-indigo-100 mt-2 max-w-2xl">*/}
      {/*      Here's what's happening with your school today. You have 3 pending requests and 2 schedule conflicts to resolve.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</div>*/}





      {/* Stats Cards */}
      <SchoolStats stats={stats} />
      {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-card bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-indigo-600">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>
      */}


      {/* Quick Actions */}




      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="quick-action"
          >
            <div className={`${action.color} rounded-2xl shadow-xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]`}>
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
              </div>
              <p className="mt-3 text-gray-600 flex-1">
                {action.title === 'Schedule Management' 
                  ? 'View and manage class schedules, resolve conflicts' 
                  : action.title === 'Create Reports' 
                    ? 'Generate attendance and performance reports' 
                    : 'Configure system settings and preferences'}
              </p>
              <div className="mt-4 text-indigo-600 font-medium flex items-center">
                Go to section
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      





      {/* Recent Activity */}
{/* 
      <RecentActivity
          // onViewAll={() => console.log('View all clicked')}
          onResolveActivity={(index, activity, success) =>
              console.log('Activity resolved:', index, activity, success)
          }
          editable={true}
          maxItems={2}
      /> */}


      <RecentActivity
          useRedux={false}
          customActivities = {[
  { type: 'enrollment', title: 'New Student', description: 'John enrolled', time: '10:00 AM' },
  { type: 'approval', title: 'Request Approved', description: 'Library access granted', time: '11:30 AM' },
  { type: 'event', title: 'Sports Day', description: 'Event scheduled for next week', time: '09:00 AM' },
  { type: 'attendance', title: 'Attendance Marked', description: 'Grade 8 attendance completed', time: '08:45 AM' },
  { type: 'notice', title: 'Notice Sent', description: 'Parents notified about PTA meeting', time: '12:15 PM' },
  { type: 'enrollment', title: 'New Student', description: 'Emily joined Grade 5', time: '01:20 PM' },
  { type: 'approval', title: 'Leave Approved', description: 'Teacher leave approved', time: '02:00 PM' },
  { type: 'event', title: 'Workshop', description: 'Math workshop announced', time: '03:10 PM' },
  { type: 'attendance', title: 'Late Arrival', description: 'Student arrived late', time: '08:55 AM' },
  { type: 'notice', title: 'Fee Reminder', description: 'Fee due notice sent', time: '04:30 PM' },
  { type: 'enrollment', title: 'Transfer Student', description: 'Alex transferred from another school', time: '10:40 AM' },
  { type: 'approval', title: 'Document Verified', description: 'Birth certificate verified', time: '11:50 AM' },
  { type: 'event', title: 'Science Fair', description: 'Science fair scheduled', time: '02:30 PM' },
  { type: 'attendance', title: 'Absence Noted', description: 'Student absent today', time: '09:15 AM' },
  { type: 'notice', title: 'Holiday Notice', description: 'School closed on Friday', time: '05:00 PM' },
  { type: 'enrollment', title: 'New Admission', description: 'Sophia admitted to Grade 2', time: '12:40 PM' },
  { type: 'approval', title: 'Request Denied', description: 'Trip request denied', time: '01:55 PM' },
  { type: 'event', title: 'Parent Meeting', description: 'Parent-teacher meeting scheduled', time: '03:45 PM' },
  { type: 'attendance', title: 'Attendance Updated', description: 'Grade 10 attendance updated', time: '08:35 AM' },
  { type: 'notice', title: 'Exam Schedule', description: 'Exam dates announced', time: '06:10 PM'}]}
          theme="dark"
          animationType="fade"
          editable={false}
          maxItems={5}

      />


    </div>
  );
};

export default DashboardHome;