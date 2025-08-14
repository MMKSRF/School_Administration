// Topbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBell, FaEnvelope, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const Topbar = ({ onMenuClick, isMobile }) => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Mock notifications
  useEffect(() => {
    setNotifications([
      { id: 1, type: 'assignment', title: 'Math Assignment Graded', time: '10 min ago', read: false },
      { id: 2, type: 'event', title: 'Science Fair Reminder', time: '1 hour ago', read: true },
      { id: 3, type: 'alert', title: 'Schedule Change Approved', time: '2 hours ago', read: true }
    ]);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Animate notifications
  useEffect(() => {
    if (notifications.length > 0) {
      gsap.to('.notification-badge', {
        scale: 1.2,
        duration: 0.2,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [notifications.length]);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={onMenuClick}
                className="mr-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaBars className="h-5 w-5" />
              </button>
            )}
            
            <div className="flex items-center">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className={`${isSearchOpen ? 'block absolute left-0 right-0 top-16 bg-white shadow-md px-4 py-3' : 'hidden'} md:block md:relative md:shadow-none md:top-auto md:px-0 md:py-0`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            )}
            
            <div className="relative">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 relative"
                onClick={() => setIsDropdownOpen('notifications')}
              >
                <FaBell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="notification-badge absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {isDropdownOpen === 'notifications' && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 ${
                            !notification.read ? 'bg-indigo-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              {notification.type === 'assignment' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              )}
                              {notification.type === 'event' && (
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                              {notification.type === 'alert' && (
                                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsDropdownOpen('messages')}
              >
                <FaEnvelope className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center text-sm focus:outline-none"
                onClick={() => setIsDropdownOpen('profile')}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8"></div>
                {isMobile && <span className="ml-2 text-gray-700">Alex</span>}
              </button>
              
              {isDropdownOpen === 'profile' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                    <p className="text-xs text-gray-600">Grade 10 Student</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <div className="border-t border-gray-200"></div>
                  <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;