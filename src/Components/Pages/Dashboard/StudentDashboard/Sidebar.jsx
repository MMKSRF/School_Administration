// Sidebar.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTimes, FaHome, FaCalendarAlt, FaChartBar, FaEnvelope, FaCog, FaGraduationCap } from 'react-icons/fa';

const Sidebar = ({ isOpen, activePage, isMobile, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  
  // Navigation items
 const navItems = [
  { path: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
  { path: 'schedule', label: 'My Schedule', icon: <FaCalendarAlt /> },
  { path: 'grades', label: 'Grades', icon: <FaChartBar /> },
  { path: 'requests', label: 'Requests', icon: <FaEnvelope /> },
  { path: 'courses', label: 'My Courses', icon: <FaGraduationCap /> },
  { path: 'settings', label: 'Settings', icon: <FaCog /> },
];

  // Animate sidebar items
  useEffect(() => {
    if (sidebarRef.current) {
      const items = sidebarRef.current.querySelectorAll('.nav-item');
      gsap.from(items, {
        duration: 0.5,
        x: -20,
        opacity: 100,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  }, [location.pathname]);

  return (
    <div 
      ref={sidebarRef}
      className={`sidebar fixed md:relative z-30 h-full w-64 bg-white shadow-lg transform ${
        isMobile ? '-translate-x-full' : 'translate-x-0'
      } transition-transform duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-gray-500">
            S
          </div>
          <div className="ml-3">
            <div className="font-bold text-gray-900">Student Portal</div>
            <div className="text-xs text-gray-600">Welcome back!</div>
          </div>
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/student/${item.path}`}
              className={({ isActive }) => 
                `nav-item flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                  isActive || activePage === item.path
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-6 px-4">
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Resources</div>
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            School Calendar
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            Library Portal
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            Academic Policies
          </a>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10"></div>
          <div className="ml-3 flex-1">
            <div className="font-medium text-gray-900">Alex Johnson</div>
            <div className="text-xs text-gray-600">Grade 10 Student</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;