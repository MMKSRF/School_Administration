// DownloadSchedule.jsx
import React, { useRef, useState, useEffect} from 'react';
import { gsap } from 'gsap';
import { FaTimes, FaDownload, FaFilePdf, FaFileImage, FaCheck } from 'react-icons/fa';

const DownloadSchedule = ({ scheduleData, onClose }) => {
  const [format, setFormat] = useState('pdf');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const modalRef = useRef(null);
  
  useEffect(() => {
    gsap.from(modalRef.current, {
      duration: 0.3,
      opacity: 100,
      y: 20,
      ease: 'power2.out'
    });
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      
      // Reset after success
      setTimeout(() => {
        setIsDownloaded(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Export Schedule</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-5">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                  format === 'pdf' 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FaFilePdf className={`text-2xl ${format === 'pdf' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className="mt-2 font-medium">PDF</span>
              </button>
              <button
                onClick={() => setFormat('image')}
                className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                  format === 'image' 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FaFileImage className={`text-2xl ${format === 'image' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className="mt-2 font-medium">Image</span>
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={() => setIncludeDetails(!includeDetails)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Include class details (teachers, rooms)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Include current date range
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Color-code subjects
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleDownload}
              disabled={isDownloading || isDownloaded}
              className={`px-4 py-2 rounded-lg flex items-center ${
                isDownloaded 
                  ? 'bg-green-600 text-white' 
                  : isDownloading
                    ? 'bg-indigo-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Preparing...
                </>
              ) : isDownloaded ? (
                <>
                  <FaCheck className="mr-2" />
                  Download Complete!
                </>
              ) : (
                <>
                  <FaDownload className="mr-2" />
                  Download Schedule
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSchedule;