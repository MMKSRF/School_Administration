// GradeDetailModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaPaperclip, FaComment, FaExclamationTriangle, FaStar } from 'react-icons/fa';

const GradeDetailModal = ({ assignment, onClose }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after success
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }, 1200);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getFeedback = () => {
    if (assignment.score >= 90) {
      return "Excellent work! You've demonstrated a strong understanding of the concepts.";
    } else if (assignment.score >= 80) {
      return "Good job! There are a few areas where you can improve to reach excellence.";
    } else if (assignment.score >= 70) {
      return "Fair effort. Review the concepts and see the feedback for areas to improve.";
    } else {
      return "Needs improvement. Please review the material and consider attending office hours.";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-5 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{assignment.title}</h2>
              <div className="flex items-center mt-2">
                <span className={`text-xl font-bold mr-3 ${getScoreColor(assignment.score)}`}>
                  {assignment.score}/{assignment.total}
                </span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  Weight: {assignment.weight}%
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Feedback</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaComment className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">Teacher's Feedback</div>
                    <div className="mt-1 text-gray-700">
                      {getFeedback()}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      <div className="flex items-center mt-1">
                        <FaExclamationTriangle className="text-yellow-500 mr-1" />
                        <span>Need to show more work on problem #5</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <FaStar className="text-green-500 mr-1" />
                        <span>Excellent approach on problem #7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">{assignment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class Average:</span>
                    <span className="font-medium">84%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentile:</span>
                    <span className="font-medium">92nd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Graded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Attachments</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <FaPaperclip className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Assignment_Instructions.pdf</span>
              </div>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <FaPaperclip className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Your_Submission.pdf</span>
              </div>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <FaPaperclip className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Graded_Assignment.pdf</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Rubric Breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Problem Solving</span>
                  <span className="text-sm font-medium text-gray-900">18/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Accuracy</span>
                  <span className="text-sm font-medium text-gray-900">22/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-400" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Methodology</span>
                  <span className="text-sm font-medium text-gray-900">40/45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Presentation</span>
                  <span className="text-sm font-medium text-gray-900">14/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Request Clarification</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="If you have questions about your grade, please describe them here..."
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    isSubmitted 
                      ? 'bg-green-600 text-white' 
                      : isSubmitting
                        ? 'bg-indigo-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FaCheck className="mr-2" />
                      Request Sent!
                    </>
                  ) : (
                    'Submit Question'
                  )}
                </button>
              </div>
            </form>
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

export default GradeDetailModal;