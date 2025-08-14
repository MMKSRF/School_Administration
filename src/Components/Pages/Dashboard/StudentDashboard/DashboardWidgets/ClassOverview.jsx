// ClassOverview.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaChalkboardTeacher, FaClock, FaEllipsisV, FaInfoCircle } from 'react-icons/fa';
import ClassDetailModal from './ClassDetailModal';

const ClassOverview = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Simulate API call
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        { 
          id: 1, 
          name: 'Mathematics', 
          period: 'Period 1', 
          teacher: 'Mr. Johnson',
          time: '8:00 AM - 9:30 AM',
          room: 'Room 305',
          color: 'bg-blue-100 text-blue-800',
          isLive: true,
          teacherEmail: 'johnson@school.edu'
        },
        { 
          id: 2, 
          name: 'Science', 
          period: 'Period 2', 
          teacher: 'Dr. Williams',
          time: '9:45 AM - 11:15 AM',
          room: 'Lab 102',
          color: 'bg-green-100 text-green-800',
          isLive: false,
          teacherEmail: 'williams@school.edu'
        },
        { 
          id: 3, 
          name: 'Literature', 
          period: 'Period 3', 
          teacher: 'Ms. Peterson',
          time: '11:30 AM - 1:00 PM',
          room: 'Room 201',
          color: 'bg-purple-100 text-purple-800',
          isLive: false,
          teacherEmail: 'peterson@school.edu'
        },
        { 
          id: 4, 
          name: 'History', 
          period: 'Period 4', 
          teacher: 'Mr. Davis',
          time: '2:00 PM - 3:30 PM',
          room: 'Room 110',
          color: 'bg-amber-100 text-amber-800',
          isLive: false,
          teacherEmail: 'davis@school.edu'
        },
      ];
      
      setClasses(mockData);
      setLoading(false);
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current) return;
    
    gsap.from(containerRef.current.children, {
      duration: 0.6,
      y: 20,
      opacity: 100,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3
    });
  }, [loading]);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleJoinClass = () => {
    // Simulate joining a class
    gsap.to('.join-button', {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.2
    });
    setTimeout(() => {
      alert(`Joining ${selectedClass.name} class...`);
    }, 300);
  };

  const handleMarkAsCompleted = (id) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, completed: !cls.completed } : cls
    ));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-5 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">My Classes</h2>
          <div className="flex items-center">
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full mr-2">
              Today
            </span>
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        <div ref={containerRef} className="space-y-3">
          {classes.map((classItem) => (
            <div 
              key={classItem.id}
              className={`p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer relative group ${
                classItem.completed ? 'opacity-70' : ''
              }`}
              onClick={() => handleClassClick(classItem)}
            >
              {classItem.isLive && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${classItem.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${classItem.color}`}>
                  {classItem.period}
                </span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <FaChalkboardTeacher className="mr-2 opacity-70" />
                <span>{classItem.teacher}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <FaClock className="mr-2 opacity-70" />
                <span>{classItem.time}</span>
                <span className="mx-2">•</span>
                <span>{classItem.room}</span>
              </div>
              
              <div className="flex mt-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsCompleted(classItem.id);
                  }}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  {classItem.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button 
                  className="text-xs px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClassClick(classItem);
                  }}
                >
                  <FaInfoCircle className="inline mr-1" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedClass && (
        <ClassDetailModal 
          classItem={selectedClass} 
          onClose={() => setIsModalOpen(false)}
          onJoin={handleJoinClass}
        />
      )}
    </>
  );
};

export default ClassOverview;



