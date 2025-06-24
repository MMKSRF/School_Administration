// src/components/HowItWorks.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const steps = gsap.utils.toArray('.step');
    const numbers = gsap.utils.toArray('.step-number');
    const timeline = timelineRef.current;
    
    // Animate timeline line growing
    gsap.fromTo(timeline, 
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom center',
        }
      }
    );
    
    // Animate steps with a bounce effect
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { 
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: step,
            start: 'top 90%',
            toggleActions: 'play none none none',
            markers: false
          },
          delay: index * 0.1
        }
      );
      
      // Animate step numbers with a pop effect
      gsap.fromTo(numbers[index],
        { 
          scale: 0,
          rotation: -30,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(3)",
          scrollTrigger: {
            trigger: step,
            start: 'top 90%',
          },
          delay: index * 0.2 + 0.1
        }
      );
      
      // Hover effect for steps
      step.addEventListener('mouseenter', () => {
        gsap.to(step, {
          y: -10,
          duration: 0.3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        });
      });
      
      step.addEventListener('mouseleave', () => {
        gsap.to(step, {
          y: 0,
          duration: 0.3,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        });
      });
    });
    
    // Animate the section title
    gsap.fromTo(sectionRef.current.querySelector('h2'), 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%'
        }
      }
    );
    
    gsap.fromTo(sectionRef.current.querySelector('p'), 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%'
        }
      }
    );
    
  }, []);
  
  const steps = [
    {
      title: "Create Your School Profile",
      description: "Set up your school with basic information and academic calendar",
      icon: (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      )
    },
    {
      title: "Add Teachers & Classes",
      description: "Input faculty details, subjects, and class information",
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-3M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Generate Conflict-Free Schedule",
      description: "Let Aqimari create the perfect timetable in seconds",
      icon: (
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-blue-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your school schedule optimized in just three simple steps
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <div 
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 top-0 hidden md:block rounded-full"
          ></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full hidden md:block"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full hidden md:block"></div>
          
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step relative flex flex-col md:flex-row items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
              >
                <div className="flex-shrink-0 z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold mb-6 md:mb-0 step-number">
                  {index + 1}
                </div>
                
                <div className="flex-1 md:ml-8">
                  <div className="flex items-center mb-3">
                    {step.icon}
                    <h3 className="text-2xl font-bold text-gray-900 ml-3">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                  
                  {/* Animated decorative element */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform rotate-45"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full">
            <button className="bg-white px-8 py-4 rounded-full font-bold text-blue-600 hover:bg-blue-50 transition-colors text-lg">
              Get Started Today
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Join 100+ Ethiopian schools using Aqimari for smarter scheduling
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

