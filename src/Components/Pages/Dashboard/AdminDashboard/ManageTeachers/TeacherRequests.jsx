// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherRequests.jsx
import React, { useEffect, useRef , useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeacherRequests, respondToRequest } from '../../../../../Redux/Slices/teachersSlice';
import { FaClock, FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TeacherRequests = () => {
  const dispatch = useDispatch();
  const { requests, status, error } = useSelector(state => state.teachers);
  const containerRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'pending',
    type: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchTeacherRequests());
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
    const matchesSearch = request.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || request.status === filters.status;
    const matchesType = filters.type === 'all' || request.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleRespond = (id, response) => {
    dispatch(respondToRequest({ id, response }));
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
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getRequestType = (type) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Requests</h2>

      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests by teacher or type..."
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
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
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
                <option value="schedule_change">Schedule Change</option>
                <option value="resource">Resource Request</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Requests List */}
      {status === 'loading' ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
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
              className="request-item p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {request.teacherName?.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{request.teacherName}</h3>
                      <p className="text-sm text-gray-500">{getRequestType(request.type)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    {getStatusBadge(request.status)}
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRespond(request.id, 'approved')}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 flex items-center"
                      >
                        <FaCheck className="mr-1" /> Approve
                      </button>
                      <button 
                        onClick={() => handleRespond(request.id, 'rejected')}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 flex items-center"
                      >
                        <FaTimes className="mr-1" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-700">{request.details}</p>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span>Submitted on {new Date(request.createdAt).toLocaleDateString()}</span>
                  {request.attachments && (
                    <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                      View Attachments
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;