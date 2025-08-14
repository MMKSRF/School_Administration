// WelcomeBanner.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavLink } from 'react-router-dom';

const WelcomeBanner = () => {
  const bannerRef = useRef(null);
  
  useEffect(() => {
    if (bannerRef.current) {
      const elements = bannerRef.current.children;
      gsap.from(elements, {
        duration: 0.8,
        y: 20,
        opacity: 100,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-5 md:p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, Alex!
            </h1>
            <p className="text-indigo-200 mt-2 max-w-2xl">
              You have 3 upcoming assignments and 2 new notifications. Check your schedule for today's classes.
            </p>
            <div className="mt-4 flex space-x-3">
              <button className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                <NavLink to="/student/schedule"> View Schedule </NavLink>
              </button>
              <button className="px-4 py-2 bg-indigo-900 bg-opacity-50 text-white rounded-lg font-medium hover:bg-opacity-75 transition-colors">
                Check Assignments
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-indigo-500 bg-opacity-20 rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
    </div>
  );
};

export default WelcomeBanner;