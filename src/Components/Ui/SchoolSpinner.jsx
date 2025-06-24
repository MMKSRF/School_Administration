import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SchoolSpinner = () => {
  const pencilRef = useRef();
  const notebookRef = useRef();
  const pathRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // Pencil rotation and movement animation
    const tl = gsap.timeline({ repeat: -1 });
    
    // Pencil writing animation
    tl.to(pencilRef.current, {
      x: 150,
      duration: 2,
      ease: "none"
    })
    .to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut"
    }, "<")
    
    // Pencil lift and reposition
    .to(pencilRef.current, {
      y: -30,
      rotation: 10,
      duration: 0.3,
      ease: "power1.out"
    })
    .to(pencilRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: "power1.in"
    })
    .to(pathRef.current, {
      strokeDashoffset: 300,
      duration: 0.01
    })
    
    // Text pulsing animation
    gsap.to(textRef.current, {
      opacity: 0.6,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Notebook pulsing
    gsap.to(notebookRef.current, {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative mb-10" ref={notebookRef}>
        {/* Notebook */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative">
          {/* Notebook lines */}
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-0.5 bg-gray-100 w-64"></div>
            ))}
          </div>
          
          {/* Writing path */}
          <svg width="180" height="40" viewBox="0 0 180 40" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <path
              ref={pathRef}
              d="M15,20 C30,10 50,25 80,20 C110,15 140,30 165,20"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
          </svg>
        </div>
        
        {/* Pencil */}
        <div 
          ref={pencilRef}
          className="absolute top-1/2 left-1/4 transform -translate-y-1/2 rotate-0 origin-bottom"
        >
          <div className="flex flex-col items-center">
            <div className="w-2 h-8 bg-yellow-400 rounded-t"></div>
            <div className="w-3 h-1 bg-yellow-600"></div>
            <div className="w-4 h-16 bg-yellow-500"></div>
            <div className="w-3 h-1 bg-yellow-700"></div>
            <div className="w-2 h-6 bg-red-500 rounded-b"></div>
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="text-center" ref={textRef}>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Preparing Your Classroom</h2>
        <p className="text-gray-500">Organizing schedules and resources...</p>
      </div>
    </div>
  );
};

export default SchoolSpinner;