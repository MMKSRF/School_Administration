// AssignmentDetailModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaPaperclip, FaBell, FaCheck, FaCalendarAlt, FaBook, FaFlag, FaComment } from 'react-icons/fa';

const AssignmentDetailModal = ({ assignment, onClose }) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(assignment.completed);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleComplete = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsCompleted(!isCompleted);
      setIsSubmitting(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  const handleReminder = () => {
    // Add reminder logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-5 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{assignment.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  {assignment.subject}
                </span>
                <span className="text-sm px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  Due: {assignment.dueDate}
                </span>
                <span className={`text-sm px-2.5 py-1 rounded-full ${
                  assignment.priority === 'high' ? 'bg-red-100 text-red-800' :
                  assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {assignment.priority} priority
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{assignment.description}</p>
              </div>
              
              {assignment.attachments > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Attachments ({assignment.attachments})</h3>
                  <div className="flex flex-wrap gap-3">
                    {[...Array(assignment.attachments)].map((_, i) => (
                      <div key={i} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <FaPaperclip className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">Document_{i + 1}.pdf</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Your Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your personal notes about this assignment..."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Assignment Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Due Date</div>
                      <div className="text-gray-900">{assignment.dueDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaBook className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Subject</div>
                      <div className="text-gray-900">{assignment.subject}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaFlag className="text-gray-500 mr-3 w-5" />
                    <div>
                      <div className="text-sm text-gray-500">Priority</div>
                      <div className="text-gray-900 capitalize">{assignment.priority}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-3 w-5 flex justify-center">
                      <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className={isCompleted ? 'text-green-600 font-medium' : 'text-yellow-600'}>
                        {isCompleted ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
                    isSaved 
                      ? 'bg-green-600 text-white' 
                      : isSubmitting
                        ? 'bg-indigo-400 text-white cursor-not-allowed'
                        : isCompleted
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : isSaved ? (
                    <>
                      <FaCheck className="mr-2" />
                      Status Updated!
                    </>
                  ) : isCompleted ? (
                    'Mark as Incomplete'
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-3 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200">
                  <FaBell className="mr-2" />
                  Set Reminder
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                  <FaComment className="mr-2" />
                  Ask Teacher
                </button>
              </div>
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

export default AssignmentDetailModal;