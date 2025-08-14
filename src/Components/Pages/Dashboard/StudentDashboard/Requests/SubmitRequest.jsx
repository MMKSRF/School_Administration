// SubmitRequest.jsx
import { useState, useRef , useEffect } from 'react';
import {FaClock} from 'react-icons/fa';
import { gsap } from 'gsap';
import { FaTimes, FaPaperclip, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const SubmitRequest = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'academic',
    title: '',
    recipient: '',
    priority: 'medium',
    description: '',
    attachment: null,
    isUrgent: false
  });
  
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.recipient) {
      newErrors.recipient = 'Recipient is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake form on validation error
      gsap.to(modalRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Create new request object
      const newRequest = {
        id: `REQ-2023-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        type: formData.type === 'academic' ? 'Academic' : 
              formData.type === 'schedule' ? 'Schedule' : 
              formData.type === 'resource' ? 'Resource' : 'Other',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        submittedTo: formData.recipient,
        priority: formData.priority,
        description: formData.description,
        response: '',
        attachments: formData.attachment ? 1 : 0,
        history: [
          { 
            date: new Date().toISOString(), 
            status: 'submitted', 
            message: 'Request submitted by student' 
          }
        ]
      };
      
      // Reset after success
      setTimeout(() => {
        onSubmit(newRequest);
        setSubmitSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  const recipientOptions = [
    { value: 'math_teacher', label: 'Mathematics Teacher' },
    { value: 'science_teacher', label: 'Science Teacher' },
    { value: 'english_teacher', label: 'Literature Teacher' },
    { value: 'history_teacher', label: 'History Teacher' },
    { value: 'counselor', label: 'Guidance Counselor' },
    { value: 'principal', label: 'Principal' },
    { value: 'admin', label: 'Administration Office' },
    { value: 'library', label: 'Library Department' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Submit New Request</h2>
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
                Request Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'academic' }))}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                    formData.type === 'academic' 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <FaCheckCircle className="text-indigo-600" />
                  </div>
                  <span>Academic</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'schedule' }))}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                    formData.type === 'schedule' 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <FaClock className="text-indigo-600" />
                  </div>
                  <span>Schedule</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'resource' }))}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                    formData.type === 'resource' 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <FaInfoCircle className="text-indigo-600" />
                  </div>
                  <span>Resource</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'other' }))}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                    formData.type === 'other' 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <FaExclamationTriangle className="text-indigo-600" />
                  </div>
                  <span>Other</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief summary of your request"
                  className={`w-full p-3 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: 'low' }))}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      formData.priority === 'low' 
                        ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: 'medium' }))}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      formData.priority === 'medium' 
                        ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: 'high' }))}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      formData.priority === 'high' 
                        ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    High
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient
              </label>
              <select
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.recipient ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              >
                <option value="">Select recipient</option>
                {recipientOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.recipient && (
                <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents (Optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {formData.attachment ? (
                    <div className="pt-5 pb-6 text-center">
                      <div className="font-medium text-gray-900 truncate max-w-xs">
                        {formData.attachment.name}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.attachment.size / 1024).toFixed(1)} KB
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="pt-5 pb-6">
                      <FaPaperclip className="text-gray-500 text-2xl mb-2 mx-auto" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or images (max 5MB)
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide a detailed explanation of your request..."
              rows="5"
              className={`w-full p-3 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Minimum 20 characters. Include all relevant details to help us process your request faster.
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="urgent"
              checked={formData.isUrgent}
              onChange={() => setFormData(prev => ({ ...prev, isUrgent: !prev.isUrgent }))}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="urgent" className="ml-3 text-sm text-gray-700">
              This is an urgent request that requires immediate attention
            </label>
          </div>
          
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
                  <FaCheckCircle className="mr-2" />
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

export default SubmitRequest;