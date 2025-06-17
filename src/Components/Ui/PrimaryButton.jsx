// src/components/PrimaryButton.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PrimaryButton = ({ 
  children, 
  onClick, 
  loading = false,
  fullWidth = true,
  disabled = false
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    // Hover animation
    const hoverAnimation = () => {
      if (disabled) return;
      gsap.to(button, {
        y: -2,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.2
      });
    };
    
    // Hover out animation
    const hoverOutAnimation = () => {
      gsap.to(button, {
        y: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        duration: 0.2
      });
    };
    
    button.addEventListener('mouseenter', hoverAnimation);
    button.addEventListener('mouseleave', hoverOutAnimation);
    
    return () => {
      button.removeEventListener('mouseenter', hoverAnimation);
      button.removeEventListener('mouseleave', hoverOutAnimation);
    };
  }, [disabled]);

  return (
    <button
      ref={buttonRef}
      className={`${
        fullWidth ? 'w-full' : ''
      } py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
      shadow-md transition-all duration-300 transform ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;