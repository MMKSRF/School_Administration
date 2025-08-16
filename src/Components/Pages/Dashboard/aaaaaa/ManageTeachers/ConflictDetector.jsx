// src/AdminDashboard/ManageSchedule/ConflictDetector.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const ConflictDetector = () => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      type: 'Teacher Conflict',
      severity: 'high',
      description: 'Teacher Alemu Bekele is scheduled for two classes at the same time',
      details: {
        teacher: 'Alemu Bekele',
        day: 'Monday',
        period: 'Period 1',
        conflictingClasses: ['Grade 9A Math', 'Grade 10B Physics']
      },
      resolved: false
    },
    {
      id: 2,
      type: 'Room Conflict',
      severity: 'medium',
      description: 'Room 101 is double-booked for the same period',
      details: {
        room: 'Room 101',
        day: 'Tuesday',
        period: 'Period 3',
        conflictingClasses: ['Grade 9B English', 'Grade 10A History']
      },
      resolved: false
    }
  ]);

  useEffect(() => {
    gsap.from(contentRef.current.children, {
      y: 0,
      opacity: 100,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });
  }, []);

  const resolveConflict = (id) => {
    setConflicts(prev => prev.map(conflict => 
      conflict.id === id ? { ...conflict, resolved: true } : conflict
    ));
  };

  const unresolveConflict = (id) => {
    setConflicts(prev => prev.map(conflict => 
      conflict.id === id ? { ...conflict, resolved: false } : conflict
    ));
  };

  const deleteConflict = (id) => {
    setConflicts(prev => prev.filter(conflict => conflict.id !== id));
  };

  const handleRunDetection = () => {
    gsap.to('.refresh-icon', {
      rotation: 360,
      duration: 1,
      ease: 'power2.out'
    });
    
    setTimeout(() => {
      setConflicts(prev => [
        ...prev,
        {
          id: Date.now(),
          type: 'Subject Overload',
          severity: 'medium',
          description: 'Grade 9A has 5 consecutive Math periods this week',
          details: {
            class: 'Grade 9A',
            subject: 'Math',
            occurrences: 5
          },
          resolved: false
        }
      ]);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unresolvedConflicts = conflicts.filter(c => !c.resolved);
  const resolvedConflicts = conflicts.filter(c => c.resolved);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">Conflict Detector</h2>
        
        <button 
          onClick={handleRunDetection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
               className="h-5 w-5 mr-1 refresh-icon" 
               viewBox="0 0 20 20" 
               fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Detect Conflicts
        </button>
      </div>
      
      <div ref={contentRef}>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              Unresolved Conflicts
              {unresolvedConflicts.length > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                  {unresolvedConflicts.length}
                </span>
              )}
            </h3>
            <button 
              onClick={() => navigate('/admin-dashboard/schedule/create')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Go to Schedule Editor
            </button>
          </div>
          
          {unresolvedConflicts.length > 0 ? (
            <div className="space-y-4">
              {unresolvedConflicts.map(conflict => (
                <div key={conflict.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(conflict.severity)}`}>
                          {conflict.severity.toUpperCase()}
                        </span>
                        <span className="font-medium text-red-800">{conflict.type}</span>
                      </div>
                      <p className="text-gray-700">{conflict.description}</p>
                      
                      <div className="mt-3 bg-white p-3 rounded-md text-sm">
                        {Object.entries(conflict.details).map(([key, value]) => (
                          <div key={key} className="flex mb-1">
                            <span className="font-medium text-gray-700 w-32 capitalize">{key}:</span>
                            <span className="text-gray-900">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => resolveConflict(conflict.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Mark Resolved
                      </button>
                      <button
                        onClick={() => deleteConflict(conflict.id)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-green-50 rounded-lg border border-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="mt-3 text-lg font-medium text-green-800">No Conflicts Found</h4>
              <p className="text-gray-600 mt-1">Your schedule is currently conflict-free!</p>
            </div>
          )}
        </div>
        
        {resolvedConflicts.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                Resolved Conflicts
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {resolvedConflicts.length}
                </span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {resolvedConflicts.map(conflict => (
                <div key={conflict.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(conflict.severity)}`}>
                          {conflict.severity.toUpperCase()}
                        </span>
                        <span className="font-medium text-gray-800">{conflict.type}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          RESOLVED
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{conflict.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => unresolveConflict(conflict.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Re-open
                      </button>
                      <button
                        onClick={() => deleteConflict(conflict.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConflictDetector;