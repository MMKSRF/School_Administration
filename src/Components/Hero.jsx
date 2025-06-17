// src/components/Hero.js
import  { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    gsap.fromTo(textRef.current.children,{
      opacity: 0
    }, {
      duration: 1,
      y: 50,
      opacity: 100,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    gsap.fromTo(imageRef.current,{
        opacity: 0,
    }, {
      duration: 1.2,
      scale: 0.8,
      opacity: 100,
      delay: 0.6,
      ease: 'back.out(1.4)'
    });
    
    gsap.fromTo(buttonRef.current.children,{
        opacity: 0,
    }, {
      duration: 0.8,
      y: 20,
      opacity: 100,
      stagger: 0.2,
      delay: 1,
      ease: 'power2.out'
    });

  }, []);

  return (
    <section 
      id="about" 
      className="min-h-screen pt-32 pb-20 md:pt-20 md:mx-5 container mx-auto px-4"
      ref={heroRef}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12     " ref={textRef}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Organize Your School's Schedule <span className="text-blue-600">Effortlessly</span> with Aqimari
          </h1>
          <p className="text-xl text-gray-600 mb-5 max-w-lg">
            Say goodbye to timetable clashes and hello to smart scheduling. Designed specifically for Ethiopian schools and beyond.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:w-120  md lg:w-auto sm:flex-row space-y-4 sm:space-y-0 mb-10 sm:space-x-4   " ref={buttonRef}>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
              Login to Your School
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Create New School Account
            </button>
          </div>
          
          <p className="mt-6 text-gray-500  mb-10 italic">
            Free to start — powerful enough to scale.
          </p>
        </div>
        
        {/* Image/Illustration */}
        <div className="md:w-1/2 flex justify-center" ref={imageRef}>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-200 rounded-full opacity-50"></div>
            
            <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
            </div>
            
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