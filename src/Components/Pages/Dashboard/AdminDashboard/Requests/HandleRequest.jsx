// src/Components/Pages/Dashboard/AdminDashboard/Requests/HandleRequest.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { fetchRequestDetails, updateRequest } from '../../../../../Redux/Slices/requestsSlice';
import { fetchRequestDetails } from '../../../../../Redux/Slices/requestsSlice';
import { FaArrowLeft, FaCheck, FaTimes, FaPaperclip, FaUser, FaClock, FaEnvelope } from 'react-icons/fa';

const HandleRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { request, status, error } = useSelector(state => state.requests);
  const containerRef = useRef();
  const [response, setResponse] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchRequestDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (request) {
      setStatusValue(request.status);
      setResponse(request.response || '');
    }
  }, [request]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.request-detail', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [request]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // dispatch(updateRequest({
    //   id,
    //   status: statusValue,
    //   response
    // }));
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/admin/requests');
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high':
        return <FaEnvelope className="text-red-500" />;
      case 'medium':
        return <FaEnvelope className="text-yellow-500" />;
      default:
        return <FaEnvelope className="text-blue-500" />;
    }
  };

  const getRequesterIcon = (type) => {
    switch(type) {
      case 'teacher':
        return <FaUser className="text-indigo-500" />;
      case 'student':
        return <FaUser className="text-green-500" />;
      case 'parent':
        return <FaUser className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  if (!request && status === 'loading') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Loading request details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/requests')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Handle Request</h2>
      </div>

      {request && (
        <div className="space-y-6">
          {/* Request Header */}
          <div className="request-detail p-5 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    {getRequesterIcon(request.requesterType)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{request.subject}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span>By {request.requesterName}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{request.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div>
                  {getPriorityIcon(request.priority)}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="request-detail grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Request Details</h4>
              <p className="text-gray-700 mb-6">{request.description}</p>
              
              {request.attachments && request.attachments.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaPaperclip className="mr-2" />
                    Attachments
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {request.attachments.map((file, index) => (
                      <a 
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Requester Information</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="font-medium">{request.requesterName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="font-medium capitalize">{request.requesterType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Contact Email</div>
                  <div className="font-medium">{request.requesterEmail}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Contact Phone</div>
                  <div className="font-medium">{request.requesterPhone || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Submitted On</div>
                  <div className="font-medium">{new Date(request.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Form */}
          <div className="request-detail bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Response</h4>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <select
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="flex items-center text-gray-700">
                    {getPriorityIcon(request.priority)}
                    <span className="ml-2 capitalize">{request.priority} priority</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your response to the requester..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/requests')}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-xl flex items-center ${
                    isSubmitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleRequest;