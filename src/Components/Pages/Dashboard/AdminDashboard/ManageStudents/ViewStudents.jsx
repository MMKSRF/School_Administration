// src/Components/Pages/Dashboard/AdminDashboard/ManageStudents/ViewStudents.jsx
import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaIdCard } from 'react-icons/fa';

const ViewStudents = () => {
  // Mock data for students
  const [students, setStudents] = useState([
    {
      id: 's1',
      name: 'Emma Johnson',
      email: 'emma@school.edu',
      phone: '(555) 123-4567',
      grade: '10',
      studentId: 'S-2023-001',
      classes: ['Math 101', 'Biology'],
      status: 'Active',
      enrollmentDate: '2022-08-15',
      lastActivity: '2023-10-16 14:30:22'
    },
    {
      id: 's2',
      name: 'Noah Williams',
      email: 'noah@school.edu',
      phone: '(555) 987-6543',
      grade: '11',
      studentId: 'S-2023-002',
      classes: ['AP Physics', 'English Literature'],
      status: 'Active',
      enrollmentDate: '2022-08-15',
      lastActivity: '2023-10-17 09:15:45'
    },
    {
      id: 's3',
      name: 'Olivia Brown',
      email: 'olivia@school.edu',
      phone: '(555) 456-7890',
      grade: '9',
      studentId: 'S-2023-003',
      classes: ['Algebra I', 'World History'],
      status: 'Active',
      enrollmentDate: '2023-08-20',
      lastActivity: '2023-10-16 11:20:30'
    },
    {
      id: 's4',
      name: 'Liam Davis',
      email: 'liam@school.edu',
      phone: '(555) 321-6549',
      grade: '12',
      studentId: 'S-2023-004',
      classes: ['Calculus', 'Computer Science'],
      status: 'Inactive',
      enrollmentDate: '2021-08-10',
      lastActivity: '2023-09-28 08:45:15'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    studentId: '',
    classes: [],
    status: 'Active',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const [classInput, setClassInput] = useState('');

  // Filter students based on search and status filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle adding a new student
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.grade) {
      setStudents([...students, { 
        ...newStudent, 
        id: `s${students.length + 1}`,
        studentId: `S-2023-${(students.length + 1).toString().padStart(3, '0')}`
      }]);
      setShowAddModal(false);
      setNewStudent({
        name: '',
        email: '',
        phone: '',
        grade: '',
        studentId: '',
        classes: [],
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  // Handle editing a student
  const handleEditStudent = () => {
    if (currentStudent) {
      const updatedStudents = students.map(student => 
        student.id === currentStudent.id ? currentStudent : student
      );
      setStudents(updatedStudents);
      setShowEditModal(false);
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Add a class to the new student form
  const addClass = () => {
    if (classInput && !newStudent.classes.includes(classInput)) {
      setNewStudent({
        ...newStudent,
        classes: [...newStudent.classes, classInput]
      });
      setClassInput('');
    }
  };

  // Grade options
  const gradeOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600 mt-1">Manage all student records and enrollment</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
        >
          <FaUserPlus className="mr-2" />
          Enroll New Student
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students by name, email, or ID..."
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
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
          </select>
          <button className="px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center">
            <FaFilter className="mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Info</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaUser />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaIdCard className="mr-1" />
                        {student.studentId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    {student.email}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <FaPhone className="mr-2 text-gray-500" />
                    {student.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FaGraduationCap className="mr-2 text-gray-500" />
                    Grade {student.grade}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    Enrolled: {student.enrollmentDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    student.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : student.status === 'Graduated'
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {student.classes.map((cls, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {cls}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setCurrentStudent(student);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteStudent(student.id)}
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="text-sm text-blue-800 font-medium">Total Students</div>
          <div className="text-2xl font-bold text-blue-900 mt-1">{students.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="text-sm text-green-800 font-medium">Active Students</div>
          <div className="text-2xl font-bold text-green-900 mt-1">
            {students.filter(s => s.status === 'Active').length}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="text-sm text-purple-800 font-medium">Average Classes</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">
            {(students.reduce((acc, curr) => acc + curr.classes.length, 0) / students.length).toFixed(1)}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <div className="text-sm text-yellow-800 font-medium">New This Year</div>
          <div className="text-2xl font-bold text-yellow-900 mt-1">
            {students.filter(s => new Date(s.enrollmentDate).getFullYear() === new Date().getFullYear()).length}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <FaUserPlus className="mr-2 text-indigo-600" />
                Enroll New Student
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade*</label>
                  <select
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Grade</option>
                    {gradeOptions.map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                  <input
                    type="date"
                    value={newStudent.enrollmentDate}
                    onChange={(e) => setNewStudent({...newStudent, enrollmentDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
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
                  {newStudent.classes.map((cls, idx) => (
                    <div key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {cls}
                      <button 
                        onClick={() => setNewStudent({
                          ...newStudent, 
                          classes: newStudent.classes.filter((_, i) => i !== idx)
                        })}
                        className="ml-2 text-blue-600 hover:text-blue-900"
                      >
                        &times;
                      </button>
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
                onClick={handleAddStudent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                disabled={!newStudent.name || !newStudent.email || !newStudent.grade}
              >
                Enroll Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && currentStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <FaEdit className="mr-2 text-indigo-600" />
                Edit Student: {currentStudent.name}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    value={currentStudent.name}
                    onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    value={currentStudent.email}
                    onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={currentStudent.phone}
                    onChange={(e) => setCurrentStudent({...currentStudent, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade*</label>
                  <select
                    value={currentStudent.grade}
                    onChange={(e) => setCurrentStudent({...currentStudent, grade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    {gradeOptions.map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    value={currentStudent.studentId}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={currentStudent.status}
                    onChange={(e) => setCurrentStudent({...currentStudent, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentStudent.classes.map((cls, idx) => (
                    <div key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {cls}
                      <button 
                        onClick={() => setCurrentStudent({
                          ...currentStudent, 
                          classes: currentStudent.classes.filter((_, i) => i !== idx)
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
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add a class"
                  />
                  <button 
                    onClick={() => {
                      if (classInput && !currentStudent.classes.includes(classInput)) {
                        setCurrentStudent({
                          ...currentStudent,
                          classes: [...currentStudent.classes, classInput]
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
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditStudent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                disabled={!currentStudent.name || !currentStudent.email || !currentStudent.grade}
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

export default ViewStudents;