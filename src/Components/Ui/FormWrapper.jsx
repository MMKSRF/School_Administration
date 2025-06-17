// src/components/FormWrapper.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Logo from './Logo';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FormWrapper = ({ title, subtitle, children, footerText, footerLink, footerLinkText }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Entrance animation for the form
    gsap.fromTo(containerRef.current,{
      opacity: 0,
      x:-10
    }
      , {
      y: 0,
      x:0,
      opacity: 100,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate form elements sequentially
    gsap.fromTo(containerRef.current.querySelectorAll('h2, p, div'),{
      opacity:0,
      x:100
    }, {
      y: 0,
      x:0,
      opacity: 100,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-white">Aqimari</h1>
          <p className="text-blue-100 mt-2">School Scheduling Platform</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}
          
          {children}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {footerText}{' '}
              <Link to={footerLink} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;