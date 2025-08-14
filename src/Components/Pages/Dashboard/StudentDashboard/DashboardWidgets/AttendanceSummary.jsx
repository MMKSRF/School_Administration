// AttendanceSummary.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import AttendanceChart from './AttendanceChart';

const AttendanceSummary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('semester');
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const mockData = [
        { 
          id: 1, 
          class: 'Mathematics', 
          present: 45, 
          absent: 2, 
          percentage: 95.7,
          trend: 'up',
          trendValue: 2.3,
          history: [92, 94, 95, 96, 95.7]
        },
        { 
          id: 2, 
          class: 'Science', 
          present: 43, 
          absent: 4, 
          percentage: 91.5,
          trend: 'down',
          trendValue: 1.8,
          history: [93, 92, 92.5, 93.3, 91.5]
        },
        { 
          id: 3, 
          class: 'Literature', 
          present: 47, 
          absent: 0, 
          percentage: 100,
          trend: 'up',
          trendValue: 0.5,
          history: [99, 99.5, 100, 100, 100]
        },
        { 
          id: 4, 
          class: 'History', 
          present: 44, 
          absent: 3, 
          percentage: 93.6,
          trend: 'stable',
          trendValue: 0,
          history: [92, 93, 94, 93.5, 93.6]
        },
      ];
      
      setAttendanceData(mockData);
      setLoading(false);
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current) return;
    
    gsap.from(containerRef.current.children, {
      duration: 0.6,
      y: 20,
      opacity: 100,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.5
    });
  }, [loading, expanded]);

  const getColorClass = (percentage) => {
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 90) return 'bg-green-400';
    if (percentage >= 85) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const toggleTimeframe = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // In a real app, this would refetch data based on timeframe
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="flex justify-between mb-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
              <div className="flex justify-between mt-1">
                <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                <div className="h-3 bg-gray-200 rounded w-1/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Attendance</h2>
        <div className="flex">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => toggleTimeframe('semester')}
              className={`px-3 py-1 text-xs font-medium rounded-l-lg ${
                timeframe === 'semester'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semester
            </button>
            <button
              type="button"
              onClick={() => toggleTimeframe('month')}
              className={`px-3 py-1 text-xs font-medium ${
                timeframe === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => toggleTimeframe('week')}
              className={`px-3 py-1 text-xs font-medium rounded-r-lg ${
                timeframe === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="space-y-4">
        {attendanceData.map((item) => (
          <div key={item.id} className="group">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                {item.class}
                {item.trend === 'down' && item.percentage < 90 && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full">
                    At Risk
                  </span>
                )}
              </span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {item.percentage}%
                </span>
                {item.trend === 'up' && (
                  <div className="flex items-center text-green-500">
                    <FaChevronUp className="text-xs" />
                    <span className="text-xs">{item.trendValue}%</span>
                  </div>
                )}
                {item.trend === 'down' && (
                  <div className="flex items-center text-red-500">
                    <FaChevronDown className="text-xs" />
                    <span className="text-xs">{item.trendValue}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${getColorClass(item.percentage)}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{item.present} present</span>
              <span>{item.absent} absent</span>
            </div>
            
            <div 
              className="mt-2 text-xs text-indigo-600 flex items-center cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <FaInfoCircle className="mr-1" />
              {expanded === item.id ? 'Hide details' : 'Show trend analysis'}
            </div>
            
            {expanded === item.id && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attendance Trend</h4>
                <AttendanceChart data={item.history} />
                <p className="text-xs text-gray-600 mt-2">
                  {item.trend === 'up' 
                    ? 'Your attendance is improving in this class' 
                    : item.trend === 'down'
                      ? 'Attendance has decreased recently - consider reaching out to your teacher'
                      : 'Attendance has remained consistent'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummary;
