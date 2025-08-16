// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherSettings.jsx
import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBook, FaCalendarAlt, FaLock } from 'react-icons/fa';

const ViewTeachers = () => {
  // Mock data for teachers
  const [teachers, setTeachers] = useState([
    {
      id: 't1',
      name: 'Sarah Johnson',
      email: 'sarah@school.edu',
      phone: '(555) 123-4567',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Grade 10 Math', 'AP Physics'],
      status: 'Active',
      permissions: ['View grades', 'Edit attendance'],
      lastLogin: '2023-10-15 08:45:23'
    },
    {
      id: 't2',
      name: 'Michael Chen',
      email: 'michael@school.edu',
      phone: '(555) 987-6543',
      subjects: ['Computer Science', 'Robotics'],
      classes: ['Intro to Programming', 'Robotics Club'],
      status: 'Active',
      permissions: ['Full access'],
      lastLogin: '2023-10-16 09:12:45'
    },
    {
      id: 't3',
      name: 'Jennifer Williams',
      email: 'jennifer@school.edu',
      phone: '(555) 456-7890',
      subjects: ['English Literature', 'Creative Writing'],
      classes: ['Grade 11 English', 'Creative Writing Workshop'],
      status: 'On Leave',
      permissions: ['View grades'],
      lastLogin: '2023-09-28 10:30:15'
    },
    {
      id: 't4',
      name: 'Robert Garcia',
      email: 'robert@school.edu',
      phone: '(555) 321-6549',
      subjects: ['History', 'Political Science'],
      classes: ['US History', 'AP Government'],
      status: 'Active',
      permissions: ['View grades', 'Edit attendance'],
      lastLogin: '2023-10-17 07:58:32'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: [],
    classes: [],
    status: 'Active',
    permissions: ['View grades']
  });

  const [subjectInput, setSubjectInput] = useState('');
  const [classInput, setClassInput] = useState('');

  // Filter teachers based on search and status filter
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle adding a new teacher
  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email) {
      setTeachers([...teachers, { ...newTeacher, id: `t${teachers.length + 1}` }]);
      setShowAddModal(false);
      setNewTeacher({
        name: '',
        email: '',
        phone: '',
        subjects: [],
        classes: [],
        status: 'Active',
        permissions: ['View grades']
      });
    }
  };

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

  // Add a subject to the new teacher form
  const addSubject = () => {
    if (subjectInput && !newTeacher.subjects.includes(subjectInput)) {
      setNewTeacher({
        ...newTeacher,
        subjects: [...newTeacher.subjects, subjectInput]
      });
      setSubjectInput('');
    }
  };

  // Add a class to the new teacher form
  const addClass = () => {
    if (classInput && !newTeacher.classes.includes(classInput)) {
      setNewTeacher({
        ...newTeacher,
        classes: [...newTeacher.classes, classInput]
      });
      setClassInput('');
    }
  };

  // Permission options
  const permissionOptions = [
    'View grades',
    'Edit grades',
    'Take attendance',
    'Edit attendance',
    'Create assignments',
    'Manage classes',
    'Full access'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
          <p className="text-gray-600 mt-1">Manage all teaching staff and their permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
        >
          <FaUserPlus className="mr-2" />
          Add New Teacher
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center">
            <FaFilter className="mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects & Classes</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaUser />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      <div className="text-sm text-gray-500">{teacher.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{teacher.email}</div>
                  <div className="text-sm text-gray-500">{teacher.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <div className="font-medium">Subjects:</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-900">
                    <div className="font-medium">Classes:</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {teacher.classes.map((cls, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    teacher.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : teacher.status === 'On Leave' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.permissions.map((perm, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setCurrentTeacher(teacher);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="text-red-600 hover:text-red-900"
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

      {/* Statistics Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="text-sm text-purple-800 font-medium">Subjects Covered</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">
            {[...new Set(teachers.flatMap(t => t.subjects))].length}
          </div>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <FaUserPlus className="mr-2 text-indigo-600" />
                Add New Teacher
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newTeacher.status}
                    onChange={(e) => setNewTeacher({...newTeacher, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add a subject"
                  />
                  <button 
                    onClick={addSubject}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newTeacher.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {subject}
                      <button 
                        onClick={() => setNewTeacher({
                          ...newTeacher, 
                          subjects: newTeacher.subjects.filter((_, i) => i !== idx)
                        })}
                        className="ml-2 text-blue-600 hover:text-blue-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add a class"
                  />
                  <button 
                    onClick={addClass}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newTeacher.classes.map((cls, idx) => (
                    <div key={idx} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {cls}
                      <button 
                        onClick={() => setNewTeacher({
                          ...newTeacher, 
                          classes: newTeacher.classes.filter((_, i) => i !== idx)
                        })}
                        className="ml-2 text-purple-600 hover:text-purple-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissionOptions.map((perm, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newTeacher.permissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewTeacher({
                              ...newTeacher,
                              permissions: [...newTeacher.permissions, perm]
                            });
                          } else {
                            setNewTeacher({
                              ...newTeacher,
                              permissions: newTeacher.permissions.filter(p => p !== perm)
                            });
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">{perm}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && currentTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <FaEdit className="mr-2 text-indigo-600" />
                Edit Teacher: {currentTeacher.name}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={currentTeacher.name}
                    onChange={(e) => setCurrentTeacher({...currentTeacher, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentTeacher.email}
                    onChange={(e) => setCurrentTeacher({...currentTeacher, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={currentTeacher.phone}
                    onChange={(e) => setCurrentTeacher({...currentTeacher, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={currentTeacher.status}
                    onChange={(e) => setCurrentTeacher({...currentTeacher, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentTeacher.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {subject}
                      <button 
                        onClick={() => setCurrentTeacher({
                          ...currentTeacher, 
                          subjects: currentTeacher.subjects.filter((_, i) => i !== idx)
                        })}
                        className="ml-2 text-blue-600 hover:text-blue-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add a subject"
                  />
                  <button 
                    onClick={() => {
                      if (subjectInput && !currentTeacher.subjects.includes(subjectInput)) {
                        setCurrentTeacher({
                          ...currentTeacher,
                          subjects: [...currentTeacher.subjects, subjectInput]
                        });
                        setSubjectInput('');
                      }
                    }}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentTeacher.classes.map((cls, idx) => (
                    <div key={idx} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {cls}
                      <button 
                        onClick={() => setCurrentTeacher({
                          ...currentTeacher, 
                          classes: currentTeacher.classes.filter((_, i) => i !== idx)
                        })}
                        className="ml-2 text-purple-600 hover:text-purple-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add a class"
                  />
                  <button 
                    onClick={() => {
                      if (classInput && !currentTeacher.classes.includes(classInput)) {
                        setCurrentTeacher({
                          ...currentTeacher,
                          classes: [...currentTeacher.classes, classInput]
                        });
                        setClassInput('');
                      }
                    }}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissionOptions.map((perm, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentTeacher.permissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCurrentTeacher({
                              ...currentTeacher,
                              permissions: [...currentTeacher.permissions, perm]
                            });
                          } else {
                            setCurrentTeacher({
                              ...currentTeacher,
                              permissions: currentTeacher.permissions.filter(p => p !== perm)
                            });
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">{perm}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditTeacher}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeachers;
// // src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ViewTeachers.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTeachers, deleteTeacher } from '../../../../../Redux/Slices/teachersSlice';
// import { FaSearch, FaFilter, FaUserEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
// import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// const ViewTeachers = () => {
//   const dispatch = useDispatch();
//   const { teachers, status, error } = useSelector(state => state.teachers);
//   const containerRef = useRef();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     type: 'all',
//     subject: 'all'
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);

//   useEffect(() => {
//     dispatch(fetchTeachers());
//   }, [dispatch]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from('.teacher-row', {
//         y: 20,
//         opacity: 100,
//         stagger: 0.05,
//         duration: 0.4,
//         ease: 'power2.out'
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [teachers]);

//   const filteredTeachers = teachers.filter(teacher => {
//     const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filters.status === 'all' || teacher.status === filters.status;
//     const matchesType = filters.type === 'all' || teacher.type === filters.type;
//     const matchesSubject = filters.subject === 'all' || 
//                           teacher.subjects.some(sub => sub === filters.subject);

//     return matchesSearch && matchesStatus && matchesType && matchesSubject;
//   });

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this teacher?')) {
//       dispatch(deleteTeacher(id));
//     }
//   };

//   const handleBulkAction = (action) => {
//     // Implement bulk actions (email, status change, etc.)
//     console.log(`${action} selected teachers:`, selectedTeachers);
//   };

//   const toggleSelectTeacher = (id) => {
//     setSelectedTeachers(prev => 
//       prev.includes(id) 
//         ? prev.filter(teacherId => teacherId !== id) 
//         : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedTeachers.length === filteredTeachers.length) {
//       setSelectedTeachers([]);
//     } else {
//       setSelectedTeachers(filteredTeachers.map(t => t.id));
//     }
//   };

//   return (
//     <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Manage Teachers</h2>
//         <div className="flex space-x-3">
//           <button 
//             onClick={() => handleBulkAction('email')}
//             disabled={selectedTeachers.length === 0}
//             className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 disabled:opacity-50"
//           >
//             Email Selected
//           </button>
//           <button 
//             onClick={() => handleBulkAction('deactivate')}
//             disabled={selectedTeachers.length === 0}
//             className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50"
//           >
//             Deactivate
//           </button>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="mb-6">
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="relative flex-1">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search teachers by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
//           >
//             <FaFilter className="mr-2 text-gray-600" />
//             Filters
//             {showFilters ? (
//               <FiChevronUp className="ml-2" />
//             ) : (
//               <FiChevronDown className="ml-2" />
//             )}
//           </button>
//         </div>

//         {/* Expanded Filters */}
//         {showFilters && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 value={filters.status}
//                 onChange={(e) => setFilters({...filters, status: e.target.value})}
//                 className="w-full border border-gray-300 rounded-xl p-2"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="active">Active</option>
//                 <option value="on_leave">On Leave</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//               <select
//                 value={filters.type}
//                 onChange={(e) => setFilters({...filters, type: e.target.value})}
//                 className="w-full border border-gray-300 rounded-xl p-2"
//               >
//                 <option value="all">All Types</option>
//                 <option value="full_time">Full-time</option>
//                 <option value="part_time">Part-time</option>
//                 <option value="substitute">Substitute</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//               <select
//                 value={filters.subject}
//                 onChange={(e) => setFilters({...filters, subject: e.target.value})}
//                 className="w-full border border-gray-300 rounded-xl p-2"
//               >
//                 <option value="all">All Subjects</option>
//                 <option value="math">Mathematics</option>
//                 <option value="science">Science</option>
//                 <option value="english">English</option>
//                 <option value="history">History</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Teachers Table */}
//       {status === 'loading' ? (
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
//           ))}
//         </div>
//       ) : error ? (
//         <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
//       ) : filteredTeachers.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">No teachers found</div>
//           <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
//             <FaUserPlus className="inline mr-2" />
//             Add New Teacher
//           </button>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   <input
//                     type="checkbox"
//                     checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
//                     onChange={toggleSelectAll}
//                     className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                   />
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Subjects
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTeachers.map((teacher) => (
//                 <tr key={teacher.id} className="teacher-row hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedTeachers.includes(teacher.id)}
//                       onChange={() => toggleSelectTeacher(teacher.id)}
//                       className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
//                         {teacher.name.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
//                         <div className="text-sm text-gray-500">{teacher.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {teacher.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex flex-wrap gap-1">
//                       {teacher.subjects.slice(0, 3).map((subject, i) => (
//                         <span key={i} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
//                           {subject}
//                         </span>
//                       ))}
//                       {teacher.subjects.length > 3 && (
//                         <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
//                           +{teacher.subjects.length - 3}
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       teacher.type === 'full_time' 
//                         ? 'bg-green-100 text-green-800' 
//                         : teacher.type === 'part_time' 
//                           ? 'bg-blue-100 text-blue-800' 
//                           : 'bg-purple-100 text-purple-800'
//                     }`}>
//                       {(teacher.type ?? '').replace('_', ' ') || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       teacher.status === 'active' 
//                         ? 'bg-green-100 text-green-800' 
//                         : teacher.status === 'on_leave' 
//                           ? 'bg-yellow-100 text-yellow-800' 
//                           : 'bg-red-100 text-red-800'
//                     }`}>
//                       {(teacher.type ?? '').replace('_', ' ') || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-4">
//                       <FaUserEdit className="inline" />
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(teacher.id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <FaTrash className="inline" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination would go here */}
//     </div>
//   );
// };

// export default ViewTeachers;