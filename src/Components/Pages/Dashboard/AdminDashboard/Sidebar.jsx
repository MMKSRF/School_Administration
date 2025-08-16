// src/Components/Pages/Dashboard/AdminDashboard/Sidebar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { NavLink } from 'react-router-dom';
// import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUserTie, 
  FaUserGraduate, 
  FaChalkboardTeacher,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft
} from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef();
//   const location = useLocation();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isExpanded) {
        gsap.to('.sidebar-item', {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to('.sidebar-item', {
          opacity: 100,
          x: -10,
          stagger: 0.05,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/teachers', label: 'Manage Teachers', icon: <FaUserTie /> },
    { path: '/admin/students', label: 'Manage Students', icon: <FaUserGraduate /> },
    { path: '/admin/classes', label: 'Manage Classes', icon: <FaChalkboardTeacher /> },
    { path: '/admin/schedule', label: 'Schedule', icon: <FaClipboardList /> },
    { path: '/admin/requests', label: 'Requests', icon: <FaClipboardList /> },
    { path: '/admin/reports', label: 'Reports', icon: <FaChartBar /> },
    { path: '/admin/settings', label: 'Settings', icon: <FaCog /> }
  ];

  return (
    <div 
      ref={containerRef}
      className={`h-full bg-white shadow-xl transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo and Toggle */}
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        {isExpanded ? (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">SchoolAdmin</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <FaChevronLeft className={`transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              sidebar-item flex items-center px-4 py-3 mb-1 rounded-xl transition-colors duration-200
              ${isActive 
                ? 'bg-indigo-100 text-indigo-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            <div className="text-lg">
              {item.icon}
            </div>
            {isExpanded && (
              <span className="ml-4">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button className="sidebar-item w-full flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
          <FaSignOutAlt className="text-lg" />
          {isExpanded && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
