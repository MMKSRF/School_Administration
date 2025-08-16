// src/Components/Pages/Dashboard/AdminDashboard/Topbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle, FaCog } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const containerRef = useRef();
  
  useEffect(() => {
    // Mock notifications
    setNotifications([
      { id: 1, text: 'New student enrollment request', time: '10 min ago', read: false },
      { id: 2, text: 'Schedule conflict detected', time: '45 min ago', read: true },
      { id: 3, text: 'Teacher leave request pending', time: '2 hours ago', read: false }
    ]);
  }, []);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        gsap.from('.dropdown-menu', {
          y: -10,
          opacity: 100,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      ref={containerRef}
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side - Menu Button and Search */}
        <div className="flex items-center">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 mr-4">
            <FiMenu className="text-xl" />
          </button>
          
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        {/* Right Side - Icons and Profile */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <FaEnvelope className="text-lg" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FaUserCircle className="text-xl" />
              </div>
              <span className="hidden md:block font-medium text-gray-700">Admin User</span>
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@school.edu</p>
                  </div>
                  
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FaUserCircle className="mr-2 text-gray-500" />
                    My Profile
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FaCog className="mr-2 text-gray-500" />
                    Settings
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100 flex items-center">
                    <FaSignOutAlt className="mr-2 text-gray-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Notifications Dropdown (would be conditionally rendered) */}
    </div>
  );
};

export default Topbar;