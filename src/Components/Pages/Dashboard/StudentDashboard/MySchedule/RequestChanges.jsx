// RequestChanges.jsx
import  { useState, useRef , useEffect} from 'react';
import { gsap } from 'gsap';
import { FaTimes, FaPaperclip, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const RequestChanges = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    changeType: 'class',
    classId: '',
    newTime: '',
    reason: '',
    explanation: '',
    attachment: null,
    conflictDetected: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const modalRef = useRef(null);
  
  useEffect(() => {
    gsap.from(modalRef.current, {
      duration: 0.3,
      opacity: 100,
      y: 20,
      ease: 'power2.out'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simulate conflict detection when time changes
    if (name === 'newTime' && value) {
      const hasConflict = Math.random() > 0.7;
      setFormData(prev => ({ ...prev, conflictDetected: hasConflict }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Close after success
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Request Schedule Changes</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Change
              </label>
              <select
                name="changeType"
                value={formData.changeType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="class">Change Class</option>
                <option value="time">Change Time</option>
                <option value="teacher">Change Teacher</option>
                <option value="room">Change Room</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select a class</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="literature">Literature</option>
                <option value="history">History</option>
                <option value="cs">Computer Science</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Time
              </label>
              <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                <FaCalendarAlt className="text-gray-500 mr-3" />
                <span>Monday, 8:00 AM - 9:30 AM</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requested New Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="newTime"
                  value={formData.newTime}
                  onChange={handleChange}
                  placeholder="e.g. Tuesday, 10:00 AM - 11:30 AM"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.conflictDetected && (
                  <div className="absolute top-3 right-3 text-yellow-600">
                    <FaExclamationTriangle title="Potential conflict detected" />
                  </div>
                )}
              </div>
              {formData.conflictDetected && (
                <div className="text-xs text-yellow-600 mt-1">
                  Potential conflict detected with your Science Club meeting
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Change
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
              required
            >
              <option value="">Select a reason</option>
              <option value="conflict">Schedule Conflict</option>
              <option value="health">Health Reasons</option>
              <option value="transport">Transportation Issues</option>
              <option value="preference">Learning Preference</option>
              <option value="other">Other</option>
            </select>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              placeholder="Please provide details about your request..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Documents (Optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaPaperclip className="text-gray-500 text-2xl mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, or images (max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
              </label>
            </div>
            {formData.attachment && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{formData.attachment.name}</div>
                  <div className="text-xs text-gray-500">{(formData.attachment.size / 1024).toFixed(1)} KB</div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
          
          {formData.conflictDetected && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-700">
                <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Potential Conflict Detected</h3>
                  <p className="text-sm mt-1">
                    Your requested time conflicts with an existing commitment. 
                    You can still submit the request, but it may require additional approval.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className={`px-4 py-2 rounded-lg flex items-center ${
                submitSuccess 
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
              ) : submitSuccess ? (
                <>
                  <FaCheck className="mr-2" />
                  Request Submitted!
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestChanges;