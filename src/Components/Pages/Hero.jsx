// src/components/Hero.js
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    gsap.fromTo(textRef.current.children, {
      opacity: 0
    }, {
      duration: 1,
      y: 50,
      opacity: 100,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    gsap.fromTo(imageRef.current, {
      opacity: 0,
    }, {
      duration: 1.2,
      scale: 0.8,
      opacity: 100,
      delay: 0.6,
      ease: 'back.out(1.4)'
    });
    
    gsap.fromTo(buttonRef.current.children, {
      opacity: 0,
    }, {
      duration: 0.8,
      y: 20,
      opacity: 100,
      stagger: 0.2,
      delay: 1,
      ease: 'power2.out'
    });

    // Floating icons animation
    const floatingIcons = gsap.utils.toArray('.floating-icon');
    floatingIcons.forEach(icon => {
      gsap.to(icon, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, []);

  return (
    <section 
      id="about" 
      className="min-h-screen pt-32 pb-20 md:pt-20 md:mx-5 flex justify-center mx-auto px-4"
      ref={heroRef}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12" ref={textRef}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Organize Your School's Schedule <span className="text-blue-600">Effortlessly</span> with Aqimari
          </h1>
          <p className="text-xl text-gray-600 mb-5 max-w-lg">
            Say goodbye to timetable clashes and hello to smart scheduling. Designed specifically for Ethiopian schools and beyond.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:w-120 justify-center align-center items-center lg:w-auto sm:flex-row space-y-4 sm:space-y-0 mb-10 sm:space-x-4" ref={buttonRef}>
            <NavLink to={"/login"} className="bg-blue-600 text-white px-8 md:pr-6 md:pl-5 lg:px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
              Login/Join to Your School
            </NavLink>
            <NavLink to={"/create-school"} className="border-2 border-blue-600 text-blue-600 px-8 md:pr-5 md:pl-3 lg:px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Create New School Account
            </NavLink>
          </div>
          
          <p className="mt-6 text-gray-500 mb-10 italic">
            Free to start — powerful enough to scale.
          </p>
        </div>
        
        {/* Illustration with school-themed SVGs */}
        <div className="md:w-1/2 flex justify-center" ref={imageRef}>
          <div className="relative w-full max-w-xl">
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-200 rounded-full opacity-50"></div>
            
            {/* Main illustration container */}
            <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-3">
              {/* School administration illustration */}
              <div className="relative w-full h-64 flex items-center justify-center">
                <svg viewBox="0 0 500 300" className="w-full h-full">
                  {/* Calendar base */}
                  <rect x="50" y="30" width="400" height="240" rx="10" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
                  
                  {/* Calendar header */}
                  <rect x="50" y="30" width="400" height="40" rx="10" fill="#0ea5e9" />
                  <text x="250" y="58" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">School Calendar</text>
                  
                  {/* Days */}
                  <g fill="#1e40af" fontSize="14">
                    <text x="100" y="90" textAnchor="middle">Mon</text>
                    <text x="170" y="90" textAnchor="middle">Tue</text>
                    <text x="240" y="90" textAnchor="middle">Wed</text>
                    <text x="310" y="90" textAnchor="middle">Thu</text>
                    <text x="380" y="90" textAnchor="middle">Fri</text>
                  </g>
                  
                  {/* Periods */}
                  <g fill="#4b5563" fontSize="12">
                    <text x="60" y="130" textAnchor="middle">8:00</text>
                    <text x="60" y="170" textAnchor="middle">9:00</text>
                    <text x="60" y="210" textAnchor="middle">10:00</text>
                    <text x="60" y="250" textAnchor="middle">11:00</text>
                  </g>
                  
                  {/* Classes */}
                  <rect x="90" y="110" width="60" height="30" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
                  <text x="120" y="130" textAnchor="middle" fill="#1e40af" fontSize="12">Math</text>
                  
                  <rect x="160" y="150" width="60" height="30" rx="5" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1" />
                  <text x="190" y="170" textAnchor="middle" fill="#9d174d" fontSize="12">Science</text>
                  
                  <rect x="230" y="190" width="60" height="30" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
                  <text x="260" y="210" textAnchor="middle" fill="#166534" fontSize="12">History</text>
                  
                  <rect x="300" y="230" width="60" height="30" rx="5" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
                  <text x="330" y="250" textAnchor="middle" fill="#9a3412" fontSize="12">English</text>
                </svg>
              </div>
            </div>
            
            {/* Floating school-themed icons */}
            <div className="absolute top-0 -left-8 floating-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500">
                <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            
            <div className="absolute top-10 -right-8 floating-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-yellow-500">
                <path fill="currentColor" d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m0 14.5a6.5 6.5 0 0 1-6.5-6.5A6.5 6.5 0 0 1 14 3.5a6.5 6.5 0 0 1 6.5 6.5a6.5 6.5 0 0 1-6.5 6.5M4 7c-.6 0-1 .4-1 1v3H1v2h2v3h2v-3h2v-2H5V8c0-.6-.4-1-1-1m14.5 4a1.5 1.5 0 0 0-1.5 1.5V13h5v-1.5c0-.8-.7-1.5-1.5-1.5h-2M7 15c-.6 0-1 .4-1 1v3H4v2h2v2h2v-2h2v-2H8v-3c0-.6-.4-1-1-1Z"/>
              </svg>
            </div>
            
            <div className="absolute bottom-0 -left-6 floating-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 text-green-500">
                <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                <path fill="currentColor" d="M8.5 15H10V9H7v1.5h1.5zM13.5 12.75L15.25 15H17l-2.25-3L17 9h-1.75l-1.75 2.25V9H12v6h1.5z"/>
              </svg>
            </div>
            
            <div className="absolute bottom-8 -right-6 floating-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-red-500">
                <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            
            {/* Existing indicators */}
            <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 transform -rotate-6">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                <span className="text-sm font-medium">No conflicts</span>
              </div>
            </div>
            
            <div className="absolute bottom-10 -right-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 transform rotate-6">
              <div className="flex items-center">
                <div className="bg-yellow-500 rounded-full w-3 h-3 mr-2"></div>
                <span className="text-sm font-medium">Part-time support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;