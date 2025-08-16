// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/WelcomeBanner.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPlus, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';

const WelcomeBanner = ({ user }) => {
  const bannerRef = useRef();
  const buttonRefs = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.from(bannerRef.current, {
        y: 20,
        opacity: 100,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      // Button animations
      gsap.from(buttonRefs.current, {
        y: 10,
        opacity: 0,
        stagger: 0.15,
        delay: 0.4,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      
      // Pulse animation for buttons
      buttonRefs.current.forEach(ref => {
        gsap.to(ref, {
          boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.3)',
          repeat: 1,
          yoyo: true,
          duration: 1.5,
          delay: 1.2
        });
      });
    });
    
    return () => ctx.revert();
  }, []);

  const quickActions = [
    { 
      label: 'Add Teacher', 
      icon: <FaUserPlus className="mr-2" />,
      action: () => console.log('Add Teacher clicked')
    },
    { 
      label: 'Create Class', 
      icon: <FaPlus className="mr-2" />,
      action: () => console.log('Create Class clicked')
    },
    { 
      label: 'Set Schedule', 
      icon: <FaCalendarAlt className="mr-2" />,
      action: () => console.log('Set Schedule clicked')
    }
  ];

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, {user?.name || 'Admin'}!
          </h2>
          <p className="text-indigo-100 mt-2 max-w-2xl">
            Here's what's happening with your school today. You have 3 pending requests and 2 schedule conflicts to resolve.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              ref={el => buttonRefs.current[index] = el}
              onClick={action.action}
              className="flex items-center bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-xl transition-all duration-300"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-indigo-400/10 px-6 py-3 text-indigo-100 text-sm flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        School year ends in 42 days. Prepare final reports and exams.
      </div>
    </div>
  );
};

export default WelcomeBanner;