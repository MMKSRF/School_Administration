// src/components/FormInput.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FormInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  icon, 
  value, 
  onChange,
  error
}) => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    
    // Focus animation
    const focusAnimation = () => {
      gsap.to(containerRef.current, {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
        duration: 0.3
      });
    };
    
    // Blur animation
    const blurAnimation = () => {
      gsap.to(containerRef.current, {
        borderColor: error ? '#ef4444' : '#d1d5db',
        boxShadow: 'none',
        duration: 0.3
      });
    };
    
    input.addEventListener('focus', focusAnimation);
    input.addEventListener('blur', blurAnimation);
    
    return () => {
      input.removeEventListener('focus', focusAnimation);
      input.removeEventListener('blur', blurAnimation);
    };
  }, [error]);

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      
      <div 
        ref={containerRef}
        className={`flex items-center border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg px-4 py-3 transition-all duration-300`}
      >
        {icon && (
          <span className="mr-3 text-blue-500">
            {icon}
          </span>
        )}
        
        <input
          ref={inputRef}
          type={type}
          className="w-full bg-transparent outline-none text-gray-700"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;