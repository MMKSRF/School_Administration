
// AssignmentModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaPaperclip, FaBell, FaCheck } from 'react-icons/fa';

const AssignmentModal = ({ assignment, onClose, onComplete }) => {
  const [notes, setNotes] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 pb-4 border-b border-gray-200">
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
        
        <div className="flex-1 overflow-y-auto p-6">
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
          
          <div className="flex items-center">
            <button 
              onClick={onComplete}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaCheck className="mr-2" />
              {assignment.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ml-3">
              <FaBell className="mr-2" />
              Set Reminder
            </button>
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

export default AssignmentModal;