// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ConflictDetector.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// import { useSelector } from 'react-redux';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const ConflictDetector = () => {
  // const { schedules } = useSelector(state => state.teachers);
  const containerRef = useRef();
  const [conflicts, setConflicts] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.conflict-item', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [conflicts]);

  const detectConflicts = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // In a real app, this would be a proper conflict detection algorithm
      const mockConflicts = [
        {
          id: '1',
          type: 'teacher',
          severity: 'critical',
          title: 'Teacher Double Booking',
          description: 'Mr. Smith is scheduled for two classes at the same time',
          items: [
            {
              type: 'Class',
              name: 'Physics 101',
              time: 'Mon, Wed, Fri 10:00-11:30',
              room: 'Room 203'
            },
            {
              type: 'Class',
              name: 'Chemistry Lab',
              time: 'Mon, Wed, Fri 10:00-11:30',
              room: 'Room 205'
            }
          ],
          suggestedFix: 'Move Physics 101 to Tue, Thu 10:00-11:30 or assign another teacher'
        },
        {
          id: '2',
          type: 'room',
          severity: 'critical',
          title: 'Room Double Booking',
          description: 'Room 203 is booked for two different classes',
          items: [
            {
              type: 'Class',
              name: 'Physics 101',
              teacher: 'Mr. Smith',
              time: 'Mon, Wed, Fri 10:00-11:30'
            },
            {
              type: 'Class',
              name: 'Math 201',
              teacher: 'Ms. Johnson',
              time: 'Mon, Wed, Fri 10:00-11:30'
            }
          ],
          suggestedFix: 'Move Math 201 to Room 207 or change the time slot'
        },
        {
          id: '3',
          type: 'availability',
          severity: 'warning',
          title: 'Part-time Teacher Availability',
          description: 'Ms. Davis is scheduled outside her available hours',
          items: [
            {
              type: 'Availability',
              name: 'Ms. Davis',
              available: 'Mon-Thu 1:00-5:00 PM'
            },
            {
              type: 'Class',
              name: 'English 301',
              time: 'Fri 9:00-10:30 AM',
              room: 'Room 104'
            }
          ],
          suggestedFix: 'Reschedule to Thu 1:00-2:30 PM or find another teacher'
        }
      ];
      
      setConflicts(mockConflicts);
      setIsScanning(false);
      
      // Animate new conflicts
      gsap.from('.conflict-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, 1500);
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const applyFix = (conflictId, fixIndex) => {
    // In a real app, this would dispatch an action to update the schedule
    console.log(`Applying fix ${fixIndex} to conflict ${conflictId}`);
    setConflicts(prev => prev.filter(c => c.id !== conflictId));
    
    // Show success animation
    gsap.to(`#conflict-${conflictId}`, {
      backgroundColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      duration: 0.5,
      onComplete: () => {
        gsap.to(`#conflict-${conflictId}`, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
          duration: 0.3,
          onComplete: () => {
            setConflicts(prev => prev.filter(c => c.id !== conflictId));
          }
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaExclamationTriangle className="text-yellow-500 mr-3" />
          Schedule Conflict Detection
        </h2>
        <button
          onClick={detectConflicts}
          disabled={isScanning}
          className={`px-4 py-2 rounded-xl flex items-center ${
            isScanning 
              ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <FiRefreshCw className={`mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning...' : 'Scan for Conflicts'}
        </button>
      </div>

      {conflicts.length === 0 && !isScanning ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No conflicts detected</div>
          <p className="text-gray-500">Click "Scan for Conflicts" to check for scheduling issues</p>
        </div>
      ) : isScanning ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Analyzing schedules for potential conflicts...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conflicts.map(conflict => (
            <div 
              key={conflict.id}
              id={`conflict-${conflict.id}`}
              className={`conflict-item p-5 border-l-4 rounded-r-xl ${getSeverityColor(conflict.severity)}`}
              style={{ borderLeftWidth: '4px' }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4">
                  {getSeverityIcon(conflict.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{conflict.title}</h3>
                  <p className="text-gray-600 mb-3">{conflict.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Conflicting Items:</h4>
                    <div className="space-y-2">
                      {conflict.items.map((item, i) => (
                        <div key={i} className="pl-4 border-l-2 border-gray-200">
                          <div className="text-sm font-medium text-gray-800">{item.type}: {item.name}</div>
                          <div className="text-xs text-gray-500">
                            {Object.entries(item)
                              .filter(([key]) => key !== 'type' && key !== 'name')
                              .map(([key, value]) => (
                                <span key={key} className="mr-3">{key}: {value}</span>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Fix:</h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                      {conflict.suggestedFix}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => applyFix(conflict.id, 1)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center"
                    >
                      <FaCheckCircle className="mr-2" />
                      Apply This Fix
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Ignore Conflict
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConflictDetector;