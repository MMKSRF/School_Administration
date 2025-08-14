// src/Components/Pages/Dashboard/StudentDashboard/MyCourses/MyCourses.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaSearch, FaFilter, FaBook, FaClock, FaChartBar, FaDownload } from 'react-icons/fa';
import CourseDetailModal from './CourseDetailModal';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  
  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      code: 'MATH-201',
      teacher: 'Mr. Johnson',
      credits: 4,
      schedule: 'Mon, Wed, Fri • 9:00-10:30 AM',
      room: 'Building A, Room 305',
      progress: 75,
      grade: 'A-',
      description: 'Advanced topics in algebra, calculus, and mathematical analysis. Focus on problem-solving techniques and theoretical foundations.',
      syllabus: 'syllabus-math-201.pdf',
      materials: [
        { name: 'Textbook: Advanced Calculus', type: 'required' },
        { name: 'Course Workbook', type: 'required' },
        { name: 'Reference Guide', type: 'optional' }
      ]
    },
    {
      id: 2,
      title: 'Physics: Mechanics',
      code: 'PHYS-101',
      teacher: 'Dr. Williams',
      credits: 3,
      schedule: 'Tue, Thu • 11:00 AM-12:30 PM',
      room: 'Science Building, Lab 102',
      progress: 60,
      grade: 'B+',
      description: 'Introduction to classical mechanics covering Newtonian physics, kinematics, and dynamics.',
      syllabus: 'syllabus-phys-101.pdf',
      materials: [
        { name: 'Textbook: University Physics', type: 'required' },
        { name: 'Lab Manual', type: 'required' }
      ]
    },
    // More courses...
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
      animateContent();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      animateContent();
    }
  }, [loading, filter]);

  const animateContent = () => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id}
            className="border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
            onClick={() => handleCourseClick(course)}
          >
            <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                  <div className="text-sm text-gray-600">{course.code} • {course.credits} credits</div>
                </div>
                <div className="bg-white rounded-lg px-2 py-1 text-sm font-medium">
                  {course.grade}
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaBook className="mr-2 opacity-70" />
                <span>{course.teacher}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaClock className="mr-2 opacity-70" />
                <span>{course.schedule}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                {course.room}
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-indigo-600" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && selectedCourse && (
        <CourseDetailModal 
          course={selectedCourse} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyCourses;

