// src/Components/Pages/TeacherDashboard/Topbar.jsx
import React, { useState, useEffect } from 'react';

const Topbar = ({ teacherName, notifications, markNotificationRead, clearNotifications, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Calculate unread notifications
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && !e.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (isNotificationsOpen && !e.target.closest('.notifications-dropdown')) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen, isNotificationsOpen]);

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        {/* Left side - Mobile menu button and title */}
        <div className="flex items-center">
          <button 
            className="mr-3 text-gray-500 hover:text-gray-700 lg:hidden"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Teacher Dashboard</h1>
        </div>
        
        {/* Right side - Icons and profile */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Notifications */}
          <div className="relative notifications-dropdown">
            <button 
              className="p-1 text-gray-500 hover:text-gray-700 relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button 
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                      onClick={clearNotifications}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <div className="flex">
                          <div className="mr-3">
                            <div className="bg-indigo-100 rounded-full p-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2">
                              <span className="h-2 w-2 bg-blue-500 rounded-full block"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile dropdown */}
          <div className="relative profile-dropdown">
            <button 
              className="flex items-center focus:outline-none"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-9 h-9" />
              <span className="ml-2 text-gray-700 hidden md:inline">{teacherName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{teacherName}</p>
                  <p className="text-xs text-gray-500">Algebra Teacher</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
                <div className="border-t border-gray-100"></div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;