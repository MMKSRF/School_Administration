// ScheduleConflictModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const ScheduleConflictModal = ({ data, onClose }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    gsap.from(modalRef.current, {
      duration: 0.3,
      opacity: 100,
      y: 20,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            Schedule Conflicts Detected
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-5">
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Conflicts</h3>
            <div className="space-y-3">
              {data.conflicts.map(conflict => (
                <div key={conflict.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-700">
                    <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Time Conflict</div>
                      <div className="text-sm mt-1">
                        {conflict.class1} conflicts with {conflict.class2} at {conflict.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {data.warnings.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Warnings</h3>
              <div className="space-y-3">
                {data.warnings.map(warning => (
                  <div key={warning.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center text-yellow-700">
                      <FaInfoCircle className="mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Attendance Warning</div>
                        <div className="text-sm mt-1">{warning.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Recommended Actions</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Request schedule changes for conflicting classes</li>
              <li>Discuss alternatives with your teachers</li>
              <li>Consider prioritizing classes with attendance warnings</li>
              <li>Use the "Request Changes" feature to resolve conflicts</li>
            </ul>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConflictModal;