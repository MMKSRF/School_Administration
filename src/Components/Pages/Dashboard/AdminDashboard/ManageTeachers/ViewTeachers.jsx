  // src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherSettings.jsx
  import React, { useState } from 'react';
  import AddTeacher from './AddTeacher.jsx';
  import TeacherEditModal from './TeacherEditModal.jsx';
  import TeacherRequests from './TeacherRequests.jsx';
  import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBook, FaCalendarAlt, FaLock, FaHome, FaBars, FaTimes } from 'react-icons/fa';

  const ViewTeachers = () => {
    // Mock data for teachers with new class assignment fields
    const [teachers, setTeachers] = useState([
      {
        id: 't1',
        name: 'Sarah Johnson',
        email: 'sarah@school.edu',
        phone: '(555) 123-4567',
        subjects: ['Mathematics', 'Physics'],
        assignedClasses: ['Grade 10A', 'Grade 10B', 'Grade 11D'],
        homeroomClass: 'Grade 10A',
        status: 'Active',
        permissions: ['View grades', 'Edit attendance'],
        lastLogin: '2023-10-15 08:45:23',
        type: 'full_time',
        qualifications: 'M.Sc. Mathematics, B.Ed.',
        joiningDate: '2022-08-15'
      },
      {
        id: 't2',
        name: 'Michael Chen',
        email: 'michael@school.edu',
        phone: '(555) 987-6543',
        subjects: ['Computer Science', 'Robotics'],
        assignedClasses: ['Grade 11A', 'Grade 12B'],
        homeroomClass: 'Grade 11A',
        status: 'Active',
        permissions: ['Full access'],
        lastLogin: '2023-10-16 09:12:45',
        type: 'full_time',
        qualifications: 'M.Sc. Computer Science, B.Ed.',
        joiningDate: '2021-01-10'
      },
      {
        id: 't3',
        name: 'Jennifer Williams',
        email: 'jennifer@school.edu',
        phone: '(555) 456-7890',
        subjects: ['English Literature', 'Creative Writing'],
        assignedClasses: ['Grade 9C', 'Grade 10D'],
        homeroomClass: '',
        status: 'On Leave',
        permissions: ['View grades'],
        lastLogin: '2023-09-28 10:30:15',
        type: 'part_time',
        qualifications: 'M.A. English Literature',
        joiningDate: '2023-03-20'
      },
      {
        id: 't4',
        name: 'Robert Garcia',
        email: 'robert@school.edu',
        phone: '(555) 321-6549',
        subjects: ['History', 'Political Science'],
        assignedClasses: ['Grade 12A', 'Grade 12C'],
        homeroomClass: 'Grade 12A',
        status: 'Active',
        permissions: ['View grades', 'Edit attendance'],
        lastLogin: '2023-10-17 07:58:32',
        type: 'full_time',
        qualifications: 'Ph.D. History, M.Ed.',
        joiningDate: '2020-09-01'
      },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Filter teachers based on search and status filter
    const filteredTeachers = teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          teacher.subjects.some(subject => 
                            subject.toLowerCase().includes(searchTerm.toLowerCase())
                          ) ||
                          teacher.assignedClasses.some(cls => 
                            cls.toLowerCase().includes(searchTerm.toLowerCase())
                          );
      const matchesStatus = filterStatus === 'All' || teacher.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    // Handle editing a teacher
    const handleEditTeacher = () => {
      if (currentTeacher) {
        const updatedTeachers = teachers.map(teacher => 
          teacher.id === currentTeacher.id ? currentTeacher : teacher
        );
        setTeachers(updatedTeachers);
        setShowEditModal(false);
      }
    };

    // Handle deleting a teacher
    const handleDeleteTeacher = (id) => {
      if (window.confirm('Are you sure you want to delete this teacher?')) {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
      }
    };

    // Status badge styling
    const getStatusBadge = (status) => {
      const baseClasses = "px-2 py-1 text-xs rounded-full";
      const universtalStatus = status.toLowerCase()
      console.log(status)
      switch (universtalStatus) {
        case 'active':
          return `${baseClasses} bg-green-100 text-green-800`;
        case 'on leave':
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'inactive':
          return `${baseClasses} bg-red-100 text-red-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    };

    // Type badge styling
    const getTypeBadge = (type) => {
      const baseClasses = "px-2 py-1 text-xs rounded-full";
      switch (type) {
        case 'full_time':
          return `${baseClasses} bg-blue-100 text-blue-800`;
        case 'part_time':
          return `${baseClasses} bg-purple-100 text-purple-800`;
        case 'substitute':
          return `${baseClasses} bg-orange-100 text-orange-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    };

    // Mobile teacher card component
    const MobileTeacherCard = ({ teacher }) => (
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FaUser />
            </div>
            <div className="ml-3">
              <div className="text-base font-semibold text-gray-900">{teacher.name}</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <FaGraduationCap className="mr-1 text-xs" />
                {teacher.qualifications}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => {
                setCurrentTeacher(teacher);
                setShowEditModal(true);
              }}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit teacher"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => handleDeleteTeacher(teacher.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete teacher"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-2 mb-3">
          <div className="text-sm text-gray-900 flex items-center">
            <FaEnvelope className="mr-2 text-gray-400 flex-shrink-0" />
            <span className="truncate">{teacher.email}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <FaPhone className="mr-2 text-gray-400 flex-shrink-0" />
            {teacher.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-400 flex-shrink-0" />
            Joined: {new Date(teacher.joiningDate).toLocaleDateString()}
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Subjects</div>
          <div className="flex flex-wrap gap-1">
            {teacher.subjects.map((subject, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div className="mb-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Classes</div>
          <div className="flex flex-wrap gap-1">
            {teacher.assignedClasses.map((cls, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {cls}
              </span>
            ))}
          </div>
        </div>

        {/* Homeroom */}
        {teacher.homeroomClass && (
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Homeroom</div>
            <div className="flex items-center">
              <FaHome className="mr-1 text-purple-500 text-xs" />
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                {teacher.homeroomClass}
              </span>
            </div>
          </div>
        )}

        {/* Status and Type */}
        <div className="flex justify-between items-center mb-3">
          <span className={getStatusBadge(teacher.status)}>
            {teacher.status}
          </span>
          <span className={getTypeBadge(teacher.type)}>
            {teacher.type === 'full_time' ? 'Full-time' : 
            teacher.type === 'part_time' ? 'Part-time' : 'Substitute'}
          </span>
        </div>

        {/* Permissions */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Permissions</div>
          <div className="flex flex-wrap gap-1">
            {teacher.permissions.slice(0, 2).map((perm, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {perm}
              </span>
            ))}
            {teacher.permissions.length > 2 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                +{teacher.permissions.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Last Login */}
        <div className="text-xs text-gray-500 mt-2 text-center">
          Last login: {new Date(teacher.lastLogin).toLocaleDateString()}
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex justify-between items-center w-full md:w-auto">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Teacher Management</h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Manage all teaching staff and their permissions</p>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center transition-colors w-full md:w-auto justify-center"
          >
            <FaUserPlus className="mr-2" />
            Add New Teacher
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className={`flex flex-col md:flex-row gap-4 mb-6 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers by name, email, subjects, or classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base flex-1"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center transition-colors text-sm md:text-base">
              <FaFilter className="mr-1" />
              <span className="hidden md:inline">More Filters</span>
            </button>
          </div>
        </div>

        {/* Mobile View - Teacher Cards */}
        <div className="md:hidden">
          {filteredTeachers.map((teacher) => (
            <MobileTeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        {/* Desktop View - Teachers Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact & Details</th>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects & Classes</th>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Type</th>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FaUser />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <FaGraduationCap className="mr-1 text-xs" />
                          {teacher.qualifications}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center mb-1">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      {teacher.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mb-1">
                      <FaPhone className="mr-2 text-gray-400" />
                      {teacher.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      Joined: {new Date(teacher.joiningDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Subjects</div>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subject, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Assigned Classes</div>
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedClasses.map((cls, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {teacher.homeroomClass && (
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Homeroom Class</div>
                        <div className="flex items-center">
                          <FaHome className="mr-1 text-purple-500 text-xs" />
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                            {teacher.homeroomClass}
                          </span>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div>
                        <span className={getStatusBadge(teacher.status)}>
                          {teacher.status.toUpperCase()}  
                        </span>
                      </div>
                      <div>
                        <span className={getTypeBadge(teacher.type)}>
                          {teacher.type === 'full_time' ? 'Full-time' : 
                          teacher.type === 'part_time' ? 'Part-time' : 'Substitute'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last login: {new Date(teacher.lastLogin).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {teacher.permissions.slice(0, 3).map((perm, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {perm}
                        </span>
                      ))}
                      {teacher.permissions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                          +{teacher.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentTeacher(teacher);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit teacher"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete teacher"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first teacher'
              }
            </p>
            {(searchTerm || filterStatus !== 'All') ? (
              <button 
                onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear filters
              </button>
            ) : (
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center mx-auto transition-colors"
              >
                <FaUserPlus className="mr-2" />
                Add New Teacher
              </button>
            )}
          </div>
        )}

        {/* Statistics Section */}
        {filteredTeachers.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="text-sm text-blue-800 font-medium">Total Teachers</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{teachers.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-sm text-green-800 font-medium">Active Teachers</div>
              <div className="text-2xl font-bold text-green-900 mt-1">
                {teachers.filter(t => t.status === 'Active').length}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="text-sm text-purple-800 font-medium">Homeroom Teachers</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">
                {teachers.filter(t => t.homeroomClass).length}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <div className="text-sm text-orange-800 font-medium">Classes Covered</div>
              <div className="text-2xl font-bold text-orange-900 mt-1">
                {[...new Set(teachers.flatMap(t => t.assignedClasses))].length}
              </div>
            </div>
          </div>
        )}

        {/* Add Teacher Modal */}
        {showAddModal && <AddTeacher setShowAddModal={setShowAddModal} setTeachers={setTeachers} />}

        {/* Edit Teacher Modal */}
        {showEditModal && currentTeacher && (
          <TeacherEditModal 
            setShowEditModal={setShowEditModal} 
            currentTeacher={currentTeacher} 
            setCurrentTeacher={setCurrentTeacher} 
            handleEditTeacher={handleEditTeacher} 
          />
        )}

        {/* Other Components */}
        <div className="mt-8">
          <TeacherRequests />
        </div>
      </div>
    );
  };

  export default ViewTeachers;   




  // rember in adding a teacher there is not id so in the backend or in the redux you should add id before 
  // you put it in the sql or make the sql asine and send it back to the forntend 