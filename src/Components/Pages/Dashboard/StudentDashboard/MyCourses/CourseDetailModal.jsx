// CourseDetailModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaDownload, FaBook, FaClock, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';

const CourseDetailModal = ({ course, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownloadSyllabus = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate download completion
      alert(`Downloaded: ${course.syllabus}`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <div className="text-gray-600">{course.code} • {course.teacher}</div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Course Description</h3>
              <p className="text-gray-700">{course.description}</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Required Materials</h3>
              <ul className="list-disc pl-5 space-y-2">
                {course.materials
                  .filter(m => m.type === 'required')
                  .map((material, i) => (
                    <li key={i} className="text-gray-700">{material.name}</li>
                  ))}
              </ul>
              
              {course.materials.some(m => m.type === 'optional') && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Optional Materials</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.materials
                      .filter(m => m.type === 'optional')
                      .map((material, i) => (
                        <li key={i} className="text-gray-700">{material.name}</li>
                      ))}
                  </ul>
                </>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Schedule</div>
                      <div className="text-gray-900">{course.schedule}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-gray-900">{course.room}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaBook className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Credits</div>
                      <div className="text-gray-900">{course.credits}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaChartBar className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Current Grade</div>
                      <div className="text-xl font-bold text-indigo-700">{course.grade}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleDownloadSyllabus}
                disabled={isDownloading}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
                  isDownloading
                    ? 'bg-indigo-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <FaDownload className="mr-2" />
                {isDownloading ? 'Downloading...' : 'Download Syllabus'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;