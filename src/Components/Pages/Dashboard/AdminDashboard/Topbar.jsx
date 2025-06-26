// src/AdminDashboard/Topbar.jsx
import React from 'react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 mr-3 md:mr-4 focus:outline-none lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-700">Ethiopian High School</h1>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;