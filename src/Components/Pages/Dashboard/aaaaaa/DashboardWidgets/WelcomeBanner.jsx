// src/AdminDashboard/DashboardWidgets/WelcomeBanner.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const WelcomeBanner = () => {
  const bannerRef = useRef();
  
  useEffect(() => {
    gsap.from(bannerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-6 mb-8 text-white"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">Welcome to Aqimari Admin</h1>
          <p className="opacity-90">
            Manage your school's schedule efficiently and resolve conflicts with our smart tools.
            Get started by setting up your teachers and class periods.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Quick Start Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;