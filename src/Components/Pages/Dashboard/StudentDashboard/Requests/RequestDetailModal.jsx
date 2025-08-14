// RequestDetailModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaTimes, FaPaperclip, FaExclamationTriangle, FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa';

const RequestDetailModal = ({ request, onClose }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    gsap.from(modalRef.current, {
      duration: 0.3,
      opacity: 100,
      y: 20,
      ease: 'power2.out'
    });
  }, []);

  const getStatusIcon = () => {
    switch(request.status) {
      case 'approved': return <FaCheckCircle className="text-green-500 text-xl mr-2" />;
      case 'rejected': return <FaExclamationTriangle className="text-red-500 text-xl mr-2" />;
      case 'in_review': return <FaClock className="text-blue-500 text-xl mr-2" />;
      default: return <FaClock className="text-yellow-500 text-xl mr-2" />;
    }
  };

  const getStatusColor = () => {
    switch(request.status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{request.title}</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600 mr-3">ID: {request.id}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor()}`}>
                {getStatusText(request.status)}
              </span>
            </div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">Request Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700">{request.description}</p>
              </div>
              
              {request.attachments > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-3">
                    {[...Array(request.attachments)].map((_, i) => (
                      <div key={i} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <FaPaperclip className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">
                          {request.title.replace(/\s+/g, '_')}_document_{i+1}.pdf
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Request Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{request.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Submitted To</div>
                    <div className="font-medium">{request.submittedTo}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date Submitted</div>
                    <div className="font-medium">{request.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Priority</div>
                    <div className={`font-medium ${request.priority === 'high' ? 'text-red-600' : request.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {request.priority === 'high' ? 'High' : request.priority === 'medium' ? 'Medium' : 'Low'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium flex items-center">
                      {getStatusIcon()}
                      {getStatusText(request.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {(request.status === 'approved' || request.status === 'rejected') && request.response && (
            <div className={`mb-6 p-4 rounded-lg border ${
              request.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Official Response</h3>
              <p className={request.status === 'approved' ? 'text-green-700' : 'text-red-700'}>
                {request.response}
              </p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Request History</h3>
            <div className="relative pl-8 border-l-2 border-indigo-200">
              {request.history.map((event, index) => (
                <div key={index} className="mb-4 relative">
                  <div className="absolute -left-[11px] top-1 w-4 h-4 rounded-full bg-indigo-500"></div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">{event.message}</div>
                      <div className="text-sm text-gray-500">{event.date.split(' ')[0]}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                      event.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                      event.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status === 'submitted' ? 'Submitted' :
                       event.status === 'in_review' ? 'In Review' :
                       event.status === 'approved' ? 'Approved' : 'Rejected'}
                    </div>
                  </div>
                </div>
              ))}
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

// Helper function (also used in ViewRequests)
function getStatusText(status) {
  switch(status) {
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'in_review': return 'In Review';
    default: return 'Pending';
  }
}

export default RequestDetailModal;