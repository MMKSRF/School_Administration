// ViewRequests.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaSearch, FaFilter, FaSort, FaSync, FaExclamationTriangle, FaCheckCircle, FaClock, FaPlus } from 'react-icons/fa';
import SubmitRequest from './SubmitRequest';
import RequestDetailModal from './RequestDetailModal';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  
  // Mock request data
  const mockRequests = [
    {
      id: 'REQ-2023-001',
      title: 'Schedule Change Request',
      type: 'Schedule',
      status: 'pending',
      date: '2023-12-10',
      submittedTo: 'Mr. Johnson',
      priority: 'high',
      description: 'Request to change math class from period 1 to period 3 due to transportation issues',
      response: '',
      attachments: 2,
      history: [
        { date: '2023-12-10 09:30', status: 'submitted', message: 'Request submitted by student' },
      ]
    },
    {
      id: 'REQ-2023-002',
      title: 'Assignment Extension',
      type: 'Academic',
      status: 'approved',
      date: '2023-12-05',
      submittedTo: 'Dr. Williams',
      priority: 'medium',
      description: 'Request for 2-day extension on science project due to illness',
      response: 'Your extension request has been approved. New deadline: Dec 15',
      attachments: 1,
      history: [
        { date: '2023-12-05 14:15', status: 'submitted', message: 'Request submitted by student' },
        { date: '2023-12-06 10:30', status: 'in_review', message: 'Request assigned to Dr. Williams' },
        { date: '2023-12-07 15:45', status: 'approved', message: 'Request approved with comments' },
      ]
    },
    {
      id: 'REQ-2023-003',
      title: 'Textbook Replacement',
      type: 'Resource',
      status: 'rejected',
      date: '2023-11-28',
      submittedTo: 'Library Department',
      priority: 'low',
      description: 'Request for replacement of damaged literature textbook',
      response: 'Rejected: Textbook is still under warranty, please contact publisher directly',
      attachments: 3,
      history: [
        { date: '2023-11-28 11:20', status: 'submitted', message: 'Request submitted by student' },
        { date: '2023-11-29 09:45', status: 'in_review', message: 'Request received by library staff' },
        { date: '2023-11-30 16:10', status: 'rejected', message: 'Request rejected with explanation' },
      ]
    },
    {
      id: 'REQ-2023-004',
      title: 'Counseling Appointment',
      type: 'Other',
      status: 'in_review',
      date: '2023-12-12',
      submittedTo: 'Guidance Office',
      priority: 'high',
      description: 'Request for college counseling session next week',
      response: 'Your request is being processed. We will contact you within 2 business days.',
      attachments: 0,
      history: [
        { date: '2023-12-12 08:45', status: 'submitted', message: 'Request submitted by student' },
        { date: '2023-12-12 10:30', status: 'in_review', message: 'Request assigned to counselor' },
      ]
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch requests
    const fetchRequests = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 700));
      setRequests(mockRequests);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.6,
        y: 20,
        opacity: 100,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  }, [loading, filter, sortBy]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'in_review': return 'In Review';
      default: return 'Pending';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <FaExclamationTriangle className="mr-1" />;
      case 'medium': return <FaClock className="mr-1" />;
      default: return <FaCheckCircle className="mr-1" />;
    }
  };

  const refreshRequests = () => {
    setLoading(true);
    gsap.to('.refresh-icon', {
      rotation: 360,
      duration: 0.8,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        setLoading(false);
      }
    });
  };

  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           request.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'all') return matchesSearch;
      return matchesSearch && request.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="h-28 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Requests</h2>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button 
            onClick={refreshRequests}
            className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaSync className="refresh-icon" />
          </button>
          
          <button 
            onClick={() => setIsSubmitOpen(true)}
            className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            New Request
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          
          {showFilters && (
            <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('all')}
              >
                All Requests
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'pending' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'in_review' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('in_review')}
              >
                In Review
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'approved' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('approved')}
              >
                Approved
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'rejected' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('rejected')}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center text-sm px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaSort className="mr-2" />
            Sort
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
            <button 
              className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
              onClick={() => setSortBy('newest')}
            >
              Newest First
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'oldest' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
              onClick={() => setSortBy('oldest')}
            >
              Oldest First
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'priority' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
              onClick={() => setSortBy('priority')}
            >
              By Priority
            </button>
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
            <div 
              key={request.id} 
              className="border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => handleRequestClick(request)}
            >
              <div className="p-4 flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{request.title}</h3>
                    <span className="ml-3 text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      {request.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 truncate">
                    {request.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getPriorityColor(request.priority)}`}>
                      {getPriorityIcon(request.priority)}
                      {request.priority === 'high' ? 'High Priority' : request.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      Submitted: {request.date}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      To: {request.submittedTo}
                    </span>
                    {request.attachments > 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {request.attachments} attachment{request.attachments > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col items-end">
                  <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                  <div className="text-xs text-gray-500 mt-2">
                    ID: {request.id}
                  </div>
                </div>
              </div>
              
              {request.status === 'rejected' && request.response && (
                <div className="bg-red-50 p-3 border-t border-red-100">
                  <div className="text-sm text-red-700 font-medium">
                    Response: {request.response}
                  </div>
                </div>
              )}
              
              {request.status === 'approved' && request.response && (
                <div className="bg-green-50 p-3 border-t border-green-100">
                  <div className="text-sm text-green-700 font-medium">
                    Response: {request.response}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">No requests found</div>
            <div className="text-gray-600">
              {filter === 'all' 
                ? 'You haven\'t submitted any requests yet' 
                : `You have no ${filter.replace('_', ' ')} requests`}
            </div>
            <button 
              onClick={() => setIsSubmitOpen(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Submit Your First Request
            </button>
          </div>
        )}
      </div>
      
      {isSubmitOpen && (
        <SubmitRequest 
          onClose={() => setIsSubmitOpen(false)}
          onSubmit={(newRequest) => {
            setRequests([newRequest, ...requests]);
            setIsSubmitOpen(false);
            // Show success notification
          }}
        />
      )}
      
      {isModalOpen && selectedRequest && (
        <RequestDetailModal 
          request={selectedRequest} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewRequests;