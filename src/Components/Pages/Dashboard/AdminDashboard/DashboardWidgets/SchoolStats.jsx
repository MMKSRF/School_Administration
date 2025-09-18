// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/SchoolStats.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUsers, FaChalkboardTeacher, FaSchool, FaChartLine } from 'react-icons/fa';

const SchoolStats = ({ stats }) => {
  const containerRef = useRef();
  const statRefs = useRef([]);
  
  // Animation on component mount
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(statRefs.current, {
      y: 24,
      opacity: 100, // should be 0 for animation to fade in
      stagger: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Counter animations using statCards
    statCards.forEach((stat, i) => {
      const ref = statRefs.current[i];
      if (!ref) return; // avoid null refs

      gsap.fromTo(ref.querySelector('.stat-value'), 
        { textContent: 0 },
        {
          textContent: stat.value,
          duration: 1.5,
          ease: 'power1.out',
          snap: { textContent: 1 },
          stagger: 1
        }
      );
    });
  }, containerRef);

  return () => ctx.revert();
}, [stats]);
  {/*
  stats should be like this
  {
    students: number of student enrolled this month ,
    studentChange: 1 if it increases or -1 if it decreases ,

    the same for the teachers , teacherChange and for classes , attendance

  }
  */}

  const statCards = [
    { 
      title: 'Total Students', 
      icon: <FaUsers className="text-indigo-500" size={24} />,
      value: stats?.students || 0,
      change: stats?.studentChange || 0 // This will show if the value is 1 (increased) or  -1(decreased) from the last month
    },
    { 
      title: 'Teaching Staff', 
      icon: <FaChalkboardTeacher className="text-indigo-500" size={24} />,
      value: stats?.teachers || 0,
      change: stats?.teacherChange || 0
    },
    { 
      title: 'Active Classes', 
      icon: <FaSchool className="text-indigo-500" size={24} />,
      value: stats?.classes || 0,
      change: stats?.classChange || 0
    },
    { 
      title: 'Attendance Rate', 
      icon: <FaChartLine className="text-indigo-500" size={24} />,
      value: stats?.attendance || 0,
      change: stats?.attendanceChange || 0,
      isPercentage: true
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5"
    >
      {statCards.map((stat, index) => (
        <div 
          key={index}
          ref={el => statRefs.current[index] = el}
          className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2 stat-value">
                {stat.value}
                {stat.isPercentage && '%'}
              </h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-xl">
              {stat.icon}
            </div>
          </div>
          
          <div className={`mt-4 flex items-center text-sm font-medium ${
            stat.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {stat.change >= 0 ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            )}
            {Math.abs(stat.change)}% {stat.change >= 0 ? 'increase' : 'decrease'} from last month
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolStats;