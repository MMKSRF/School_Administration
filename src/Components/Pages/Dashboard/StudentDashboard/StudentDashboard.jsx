// StudentDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activePage, setActivePage] = useState('dashboard');
  const mainContentRef = useRef(null);
  const location = useLocation();

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active page based on route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActivePage(path);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Animate content entrance
    if (mainContentRef.current) {
      gsap.from(mainContentRef.current, {
        duration: 0.5,
        opacity: 100,
        y: 20,
        ease: 'power2.out'
      });
    }
  }, [location]);

  // Animate sidebar on open/close
  useEffect(() => {
    if (isMobile) {
      if (sidebarOpen) {
        gsap.to('.sidebar', {
          duration: 0.3,
          x: 0,
          ease: 'power2.out'
        });
        gsap.to('.overlay', {
          duration: 0.3,
          opacity: 1,
          display: 'block',
          ease: 'power2.out'
        });
      } else {
        gsap.to('.sidebar', {
          duration: 0.3,
          x: '-100%',
          ease: 'power2.in'
        });
        gsap.to('.overlay', {
          duration: 0.3,
          opacity: 0,
          display: 'none',
          ease: 'power2.in'
        });
      }
    }
  }, [sidebarOpen, isMobile]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        activePage={activePage} 
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className="overlay fixed inset-0 bg-black bg-opacity-50 z-20 opacity-0 hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          isMobile={isMobile}
        />
        
        {/* Main content */}
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300"
        >
          {location.pathname.endsWith('/student') || 
          location.pathname.endsWith('/student/') ? (
            <DashboardHome />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;