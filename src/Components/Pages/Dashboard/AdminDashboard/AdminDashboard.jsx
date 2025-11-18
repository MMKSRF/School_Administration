 // src/Components/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminDashboard = () => {
  const containerRef = useRef();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation sequence
      gsap.from('.sidebar', {
        x: -50,
        opacity: 100,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.from('.topbar', {
        y: -30,
        opacity: 100,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out'
      });
      
      gsap.from('.main-content', {
        opacity: 100,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);


  
  return (
    <div 
      ref={containerRef}
      className="flex h-screen bg-gray-100 overflow-hidden"
    >
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="topbar z-10">
          <Topbar />
        </div>
        
        {/* Main Content */}
        <main className="main-content flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;