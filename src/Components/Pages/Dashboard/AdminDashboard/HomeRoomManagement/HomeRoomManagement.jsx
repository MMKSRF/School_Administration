// src/Components/Pages/Dashboard/AdminDashboard/HomeRoomManagement/HomeRoomManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaUserTie, FaExchangeAlt, FaUserGraduate, FaUserSlash, 
         FaUserCheck, FaChartLine, FaSearch, FaFilter, FaCrown } from 'react-icons/fa';

const HomeRoomManagement = () => {
  // Mock data
  const classes = [
    { id: 'c1', name: 'Grade 10 A', teacher: null },
    { id: 'c2', name: 'Grade 10 B', teacher: 't1' },
    { id: 'c3', name: 'Grade 9 A', teacher: 't3' },
    { id: 'c4', name: 'Grade 9 B', teacher: null },
    { id: 'c5', name: 'Grade 11 Science', teacher: 't2' },
    { id: 'c6', name: 'Grade 11 Arts', teacher: null },
  ];

  const teachers = [
    { id: 't1', name: 'Sarah Johnson', subject: 'Mathematics', assignedClass: 'c2' },
    { id: 't2', name: 'Michael Chen', subject: 'Computer Science', assignedClass: 'c5' },
    { id: 't3', name: 'Jennifer Williams', subject: 'English Literature', assignedClass: 'c3' },
    { id: 't4', name: 'Robert Garcia', subject: 'History', assignedClass: null },
  ];

  const students = [
    { id: 's1', name: 'Emma Johnson', grade: '10', class: 'c2', status: 'Active' },
    { id: 's2', name: 'Noah Williams', grade: '10', class: 'c2', status: 'Suspended' },
    { id: 's3', name: 'Olivia Brown', grade: '9', class: 'c3', status: 'Active' },
    { id: 's4', name: 'Liam Davis', grade: '11', class: 'c5', status: 'Expelled' },
    { id: 's5', name: 'Ava Miller', grade: '11', class: 'c5', status: 'Active' },
    { id: 's6', name: 'James Wilson', grade: '9', class: 'c3', status: 'Active' },
  ];

  const promotionRequests = [
    { id: 'pr1', class: 'c2', teacher: 't1', students: ['s1', 's2'], status: 'Pending', date: '2023-10-15' },
    { id: 'pr2', class: 'c3', teacher: 't3', students: ['s3', 's6'], status: 'Approved', date: '2023-10-10' },
    { id: 'pr3', class: 'c5', teacher: 't2', students: ['s4', 's5'], status: 'Pending', date: '2023-10-12' },
  ];

  // State
  const [activeTab, setActiveTab] = useState('assign');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [reassignData, setReassignData] = useState({ teacher: '', class: '' });
  const [overrideStudent, setOverrideStudent] = useState('');
  const [overrideAction, setOverrideAction] = useState('reinstate');
//   const [promotionDecisions, setPromotionDecisions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Initialize promotion decisions
  useEffect(() => {
    const initialDecisions = {};
    promotionRequests.forEach(req => {
      req.students.forEach(studentId => {
        initialDecisions[`${req.id}-${studentId}`] = 'approve';
      });
    });
    // setPromotionDecisions(initialDecisions);
  }, []);

  // Tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'assign':
        return renderAssignHomeRoom();
      case 'permissions':
        return renderPermissions();
      case 'students':
        return renderStudentManagement();
      case 'promotion':
        return renderPromotionManagement();
      case 'monitoring':
        return renderMonitoring();
      default:
        return null;
    }
  };

  // Assign Home Room Teachers
  const renderAssignHomeRoom = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserTie className="text-indigo-600 mr-2" />
          Assign Home Room Teacher
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.subject})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose a class</option>
              {classes
                .filter(cls => !cls.teacher) // Only show unassigned classes
                .map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (selectedTeacher && selectedClass) {
                // In a real app, this would update the backend
                alert(`Assigned teacher ${teachers.find(t => t.id === selectedTeacher).name} to class ${classes.find(c => c.id === selectedClass).name}`);
                setSelectedTeacher('');
                setSelectedClass('');
              }
            }}
            disabled={!selectedTeacher || !selectedClass}
            className={`px-4 py-2 rounded-lg ${!selectedTeacher || !selectedClass 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Assign Teacher
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaExchangeAlt className="text-indigo-600 mr-2" />
          Reassign Home Room Teacher
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
            <select
              value={reassignData.teacher}
              onChange={(e) => setReassignData({...reassignData, teacher: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose a teacher</option>
              {teachers
                .filter(teacher => teacher.assignedClass) // Only show assigned teachers
                .map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {classes.find(c => c.id === teacher.assignedClass)?.name}
                  </option>
                ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to New Class</label>
            <select
              value={reassignData.class}
              onChange={(e) => setReassignData({...reassignData, class: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose a class</option>
              {classes
                .filter(cls => !cls.teacher) // Only show unassigned classes
                .map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (reassignData.teacher && reassignData.class) {
                // In a real app, this would update the backend
                alert(`Reassigned teacher ${teachers.find(t => t.id === reassignData.teacher).name} to class ${classes.find(c => c.id === reassignData.class).name}`);
                setReassignData({ teacher: '', class: '' });
              }
            }}
            disabled={!reassignData.teacher || !reassignData.class}
            className={`px-4 py-2 rounded-lg ${!reassignData.teacher || !reassignData.class 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Reassign Teacher
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Home Room Assignments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Room Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map(cls => {
                const teacher = cls.teacher ? teachers.find(t => t.id === cls.teacher) : null;
                return (
                  <tr key={cls.id} className={cls.teacher ? '' : 'bg-red-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher ? teacher.name : 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher ? teacher.subject : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        teacher ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {teacher ? 'Assigned' : 'Unassigned'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Manage Permissions
  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Home Room Teacher Permissions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers
                .filter(teacher => teacher.assignedClass)
                .map(teacher => (
                  <tr key={teacher.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <FaUserTie />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                          <div className="text-sm text-gray-500">{teacher.subject}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classes.find(c => c.id === teacher.assignedClass)?.name || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Manage class students</li>
                        <li>Initiate suspensions</li>
                        <li>Recommend expulsions</li>
                        <li>Approve student promotions</li>
                        <li>View class performance</li>
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-red-600 hover:text-red-900">
                          Revoke Permissions
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Transfer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Student Management (Override Power)
  const renderStudentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Student Status Management</h3>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Suspended">Suspended</option>
              <option value="Expelled">Expelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students
                .filter(student => 
                  (filterStatus === 'All' || student.status === filterStatus) &&
                  (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   student.class.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .filter(student => student.status !== 'Active')
                .map(student => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <FaUserGraduate />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">Grade {student.grade}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classes.find(c => c.id === student.class)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.status === 'Suspended' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teachers.find(t => t.assignedClass === student.class)?.name || 'System'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setOverrideStudent(student.id);
                            setOverrideAction('reinstate');
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Reinstate
                        </button>
                        {student.status === 'Suspended' && (
                          <button 
                            onClick={() => {
                              setOverrideStudent(student.id);
                              setOverrideAction('expel');
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Expel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
        {overrideStudent && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Override Status for {students.find(s => s.id === overrideStudent)?.name}
            </h4>
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select
                  value={overrideAction}
                  onChange={(e) => setOverrideAction(e.target.value)}
                  className="border border-gray-300 rounded-xl p-2"
                >
                  <option value="reinstate">Reinstate Student</option>
                  <option value="expel">Expel Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  placeholder="Enter reason for override"
                  className="border border-gray-300 rounded-xl p-2"
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={() => {
                    alert(`Performed ${overrideAction} action on student ${students.find(s => s.id === overrideStudent)?.name}`);
                    setOverrideStudent('');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Confirm Override
                </button>
                <button
                  onClick={() => setOverrideStudent('')}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Promotion & Year Advancement
  const renderPromotionManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Promotion Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray极500 uppercase tracking-wider">Home Room Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Decision</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotionRequests.map(request => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {classes.find(c => c.id === request.class)?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teachers.find(t => t.id === request.teacher)?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {request.students.map(studentId => {
                        const student = students.find(s => s.id === studentId);
                        return student ? (
                          <span key={studentId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {student.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'Pending' ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert(`Approved promotion for class ${classes.find(c => c.id === request.class)?.name}`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => alert(`Rejected promotion for class ${classes.find(c => c.id === request.class)?.name}`)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">Decision made</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Final Promotion Approval</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Approval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Decision</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students
                .filter(student => student.status === 'Active')
                .map(student => {
                  {/* const teacher = teachers.find(t => t.assignedClass === student.class); */}
                  const request = promotionRequests.find(req => 
                    req.class === student.class && req.students.includes(student.id)
                  );
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <FaUserGraduate />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{classes.find(c => c.id === student.class)?.name || 'Unknown'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Grade {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request && request.status === 'Approved' ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => alert(`Approved promotion for ${student.name}`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => alert(`Rejected promotion for ${student.name}`)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
            <FaCrown className="mr-2" />
            Generate Final Promotion Report
          </button>
        </div>
      </div>
    </div>
  );

  // Monitoring & Reporting
  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Home Room Coverage</h3>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">
                {classes.filter(c => c.teacher).length}/{classes.length}
              </div>
              <p className="text-gray-600 mt-2">Classes with Home Room Teachers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Disciplinary Actions</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Suspensions</span>
                <span className="font-medium">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expulsions</span>
                <span className="font-medium">3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '15%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admin Overrides</span>
                <span className="font-medium">4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-indigo-500 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Promotion Status</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Approval</span>
                <span className="font-medium">24</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approved</span>
                <span className="font-medium">56</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected</span>
                <span className="font-medium">5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '6%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Home Room Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-17</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Grade 10 A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Submitted promotion list</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-16</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Michael Chen</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Grade 11 Science</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Recommended expulsion for Liam Davis</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jennifer Williams</td>
                <td className="px极6 py-4 whitespace-nowrap text-sm text-gray-500">Grade 9 A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Suspended Olivia Brown</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-14</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">System</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Reinstated Noah Williams</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Home Room Performance Reports</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
            <FaChartLine className="mr-2" />
            Generate Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Class Performance Summary</h4>
            <p className="text-gray-600">Overview of academic performance by home room class</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Disciplinary Report</h4>
            <p className="text-gray-600">Analysis of disciplinary actions by home room teacher</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Promotion Success Rate</h4>
            <p className="text-gray-600">Report on promotion approval rates by class</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Teacher Activity Log</h4>
            <p className="text-gray-600">Detailed log of home room teacher activities</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaCrown className="text-indigo-600 mr-3" />
          Home Room Management
        </h2>
        <p className="text-gray-600 mt-2">
          Assign home room teachers, manage permissions, override decisions, and monitor performance
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto -mb-px">
          <button
            onClick={() => setActiveTab('assign')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'assign'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserTie className={`inline mr-2 ${activeTab === 'assign' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Assign Teachers
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'permissions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserCheck className={`inline mr-2 ${activeTab === 'permissions' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Permissions
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'students'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserSlash className={`inline mr-2 ${activeTab === 'students' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Student Management
          </button>
          <button
            onClick={() => setActiveTab('promotion')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'promotion'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserGraduate className={`inline mr-2 ${activeTab === 'promotion' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Promotion
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'monitoring'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaChartLine className={`inline mr-2 ${activeTab === 'monitoring' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Monitoring & Reports
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HomeRoomManagement;