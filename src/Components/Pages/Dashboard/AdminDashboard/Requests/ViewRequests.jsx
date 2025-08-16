// src/Components/Pages/Dashboard/AdminDashboard/Requests/ViewRequests.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRequests, updateRequestStatus } from '../../../../../Redux/Slices/requestsSlice';
import { FaSearch, FaFilter, FaEnvelope, FaUser, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ViewRequests = () => {
  const dispatch = useDispatch();
  const { requests, status, error } = useSelector(state => state.requests);
  const containerRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'pending',
    type: 'all',
    priority: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.request-item', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [requests]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || request.status === filters.status;
    const matchesType = filters.type === 'all' || request.type === filters.type;
    const matchesPriority = filters.priority === 'all' || request.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleStatusChange = (id, status) => {
    dispatch(updateRequestStatus({ id, status }));
  };

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
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

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center">
          <FaClock className="mr-1" /> Pending
        </span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
          <FaCheck className="mr-1" /> Approved
        </span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
          <FaTimes className="mr-1" /> Rejected
        </span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">Completed</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
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

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Requests</h2>

      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests by subject or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            <FaFilter className="mr-2 text-gray-600" />
            Filters
            {showFilters ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronDown className="ml-2" />
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray极700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Types</option>
                <option value="leave">Leave Request</option>
                <option value="resource">Resource Request</option>
                <option value="transfer">Transfer Request</option>
                <option value="information">Information Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Requests List */}
      {status === 'loading' ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No requests found</div>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map(request => (
            <div 
              key={request.id}
              className="request-item bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(request.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    {getRequesterIcon(request.requesterType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">{request.subject}</h3>
                      <div className="flex items-center space-x-2">
                        <div>
                          {getPriorityIcon(request.priority)}
                        </div>
                        <div>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 truncate">{request.description}</p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <span>By {request.requesterName}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{request.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded View */}
              {expandedRequest === request.id && (
                <div className="bg-gray-50 border-t border-gray-200 p-5">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Request Details</h4>
                    <p className="text-gray-800">{request.description}</p>
                  </div>
                  
                  {request.attachments && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.attachments.map((file, index) => (
                          <a 
                            key={index}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            {file.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleStatusChange(request.id, 'approved')}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-xl hover:bg-green-200 flex items-center"
                      >
                        <FaCheck className="mr-2" /> Approve
                      </button>
                      <button 
                        onClick={() => handleStatusChange(request.id, 'rejected')}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 flex items-center"
                      >
                        <FaTimes className="mr-2" /> Reject
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200">
                        Request More Info
                      </button>
                    </div>
                  )}
                  
                  {request.status !== 'pending' && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Status updated by {request.handler || 'Admin'} on {new Date(request.updatedAt).toLocaleDateString()}</span>
                      {request.response && (
                        <div className="mt-2 bg-white p-3 rounded-lg border border-gray-200">
                          <p>{request.response}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRequests;