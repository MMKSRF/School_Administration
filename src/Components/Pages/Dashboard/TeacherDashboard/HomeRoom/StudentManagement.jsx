// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/StudentManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaUserTimes, FaUserCheck, FaInfoCircle, FaSearch, 
  FaFilter, FaGraduationCap, FaChartLine, FaUserEdit,
  FaHistory, FaExclamationTriangle, FaUserClock, FaUserAlt
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(1);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('students');
  const [disciplineHistory, setDisciplineHistory] = useState([]);
  const [stats, setStats] = useState({});

  // Initialize mock data
  useEffect(() => {
    // Mock student data
    const mockStudents = [
      {
        id: 's1', 
        name: 'Emma Johnson', 
        status: 'active', 
        grade: '10', 
        className: 'Science A',
        profile: {
          photo: null,
          contact: 'emma.j@school.edu',
          parentContact: 'johnson.parents@email.com',
          healthNotes: 'Allergic to peanuts',
          extracurricular: 'Basketball, Debate Club',
          awards: ['Science Fair Winner 2023', 'Perfect Attendance Q1'],
          notes: 'Excellent in science, needs improvement in literature'
        },
        performance: {
          average: 92.5,
          subjects: [
            { name: 'Mathematics', grade: 95 },
            { name: 'Science', grade: 98 },
            { name: 'Literature', grade: 85 },
            { name: 'History', grade: 90 }
          ]
        },
        attendance: {
          present: 96,
          absent: 2,
          late: 2,
          excused: 1
        }
      },
      {
        id: 's2', 
        name: 'Noah Williams', 
        status: 'suspended', 
        grade: '10', 
        className: 'Science A',
        profile: {
          photo: null,
          contact: 'noah.w@school.edu',
          parentContact: 'williams.parents@email.com',
          healthNotes: 'None',
          extracurricular: 'Robotics Club',
          awards: [],
          notes: 'Struggling with attendance, needs counseling support'
        },
        performance: {
          average: 75.5,
          subjects: [
            { name: 'Mathematics', grade: 80 },
            { name: 'Science', grade: 85 },
            { name: 'Literature', grade: 65 },
            { name: 'History', grade: 72 }
          ]
        },
        attendance: {
          present: 82,
          absent: 10,
          late: 5,
          excused: 3
        }
      },
      {
        id: 's3', 
        name: 'Olivia Brown', 
        status: 'active', 
        grade: '9', 
        className: 'Math B',
        profile: {
          photo: null,
          contact: 'olivia.b@school.edu',
          parentContact: 'brown.parents@email.com',
          healthNotes: 'Asthma',
          extracurricular: 'Choir, Drama Club',
          awards: ['Math Olympiad Bronze'],
          notes: 'Very creative, excels in arts'
        },
        performance: {
          average: 88.0,
          subjects: [
            { name: 'Mathematics', grade: 92 },
            { name: 'Science', grade: 85 },
            { name: 'Literature', grade: 90 },
            { name: 'History', grade: 85 }
          ]
        },
        attendance: {
          present: 98,
          absent: 1,
          late: 1,
          excused: 0
        }
      },
      {
        id: 's4', 
        name: 'Liam Davis', 
        status: 'expelled', 
        grade: '11', 
        className: 'History C',
        profile: {
          photo: null,
          contact: 'liam.d@school.edu',
          parentContact: 'davis.parents@email.com',
          healthNotes: 'ADHD medication',
          extracurricular: 'Football',
          awards: [],
          notes: 'Behavioral issues, multiple suspensions'
        },
        performance: {
          average: 65.0,
          subjects: [
            { name: 'Mathematics', grade: 60 },
            { name: 'Science', grade: 55 },
            { name: 'Literature', grade: 70 },
            { name: 'History', grade: 75 }
          ]
        },
        attendance: {
          present: 70,
          absent: 20,
          late: 8,
          excused: 2
        }
      },
      {
        id: 's5', 
        name: 'Ava Miller', 
        status: 'active', 
        grade: '11', 
        className: 'History C',
        profile: {
          photo: null,
          contact: 'ava.m@school.edu',
          parentContact: 'miller.parents@email.com',
          healthNotes: 'None',
          extracurricular: 'Student Council, Yearbook',
          awards: ['Honor Roll', 'Community Service Award'],
          notes: 'Class president, excellent leadership skills'
        },
        performance: {
          average: 95.0,
          subjects: [
            { name: 'Mathematics', grade: 97 },
            { name: 'Science', grade: 96 },
            { name: 'Literature', grade: 92 },
            { name: 'History', grade: 95 }
          ]
        },
        attendance: {
          present: 100,
          absent: 0,
          late: 0,
          excused: 0
        }
      }
    ];

    // Mock discipline history
    const mockDiscipline = [
      { id: 'd1', studentId: 's2', action: 'suspended', reason: 'Repeated classroom disruptions', date: '2023-10-10', duration: 3, by: 'Mr. Johnson' },
      { id: 'd2', studentId: 's2', action: 'warning', reason: 'Late submission of assignments', date: '2023-09-15', duration: 0, by: 'Ms. Davis' },
      { id: 'd3', studentId: 's4', action: 'expelled', reason: 'Violence against another student', date: '2023-09-28', duration: 0, by: 'Admin' },
      { id: 'd4', studentId: 's4', action: 'suspended', reason: 'Bullying behavior', date: '2023-09-10', duration: 5, by: 'Mr. Johnson' },
      { id: 'd5', studentId: 's3', action: 'warning', reason: 'Talking during class', date: '2023-10-05', duration: 0, by: 'Ms. Roberts' }
    ];

    // Calculate stats
    const activeCount = mockStudents.filter(s => s.status === 'active').length;
    const suspendedCount = mockStudents.filter(s => s.status === 'suspended').length;
    const expelledCount = mockStudents.filter(s => s.status === 'expelled').length;
    
    const avgAttendance = mockStudents.reduce((sum, student) => sum + student.attendance.present, 0) / mockStudents.length;
    const avgPerformance = mockStudents.reduce((sum, student) => sum + student.performance.average, 0) / mockStudents.length;
    
    setStats({
      total: mockStudents.length,
      active: activeCount,
      suspended: suspendedCount,
      expelled: expelledCount,
      avgAttendance,
      avgPerformance
    });

    setStudents(mockStudents);
    setDisciplineHistory(mockDiscipline);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (studentId, action) => {
    setSelectedStudent(studentId);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedStudent && reason) {
      // Update student status in state
      setStudents(prev => prev.map(student => 
        student.id === selectedStudent ? { ...student, status: actionType } : student
      ));
      
      // Add to discipline history
    //   const student = students.find(s => s.id === selectedStudent);
      const newRecord = {
        id: `d${disciplineHistory.length + 1}`,
        studentId: selectedStudent,
        action: actionType,
        reason,
        date: new Date().toISOString().split('T')[0],
        duration: actionType === 'suspended' ? duration : 0,
        by: 'Home Room Teacher'
      };
      
      setDisciplineHistory(prev => [...prev, newRecord]);
      
      // Reset and close modal
      setSelectedStudent(null);
      setReason('');
      setDuration(1);
      setShowActionModal(false);
    }
  };

  const openStudentProfile = (studentId) => {
    setSelectedStudent(studentId);
    setShowStudentProfile(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'expelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'expelled': return 'bg-red-500';
      case 'suspended': return 'bg-yellow-500';
      case 'warning': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Chart data for statistics
  const statusChartData = {
    labels: ['Active', 'Suspended', 'Expelled'],
    datasets: [
      {
        data: [stats.active, stats.suspended, stats.expelled],
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
        borderWidth: 0
      }
    ]
  };

  const performanceChartData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: 'Average Performance',
        data: students.map(s => s.performance.average),
        backgroundColor: '#3B82F6',
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="text-gray-500 flex items-center">
            <FaUserAlt className="mr-2" />
            Total Students
          </div>
          <div className="text-3xl font-bold mt-2">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="text-gray-500 flex items-center">
            <FaUserCheck className="text-green-500 mr-2" />
            Active Students
          </div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="text-gray-500 flex items-center">
            <FaUserClock className="text-yellow-500 mr-2" />
            Suspended
          </div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.suspended}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="text-gray-500 flex items-center">
            <FaUserTimes className="text-red-500 mr-2" />
            Expelled
          </div>
          <div className="text-3xl font-bold text-red-600 mt-2">{stats.expelled}</div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium text-gray-800 mb-3">Student Status Distribution</h3>
          <div className="h-64">
            <Pie 
              data={statusChartData}
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
              }}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium text-gray-800 mb-3">Student Performance</h3>
          <div className="h-64">
            <Bar 
              data={performanceChartData}
              options={{ 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100 } }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 md:mb-0">
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
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="expelled">Expelled</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
            onClick={() => {
              // Implement bulk action functionality
            }}
          >
            <FaGraduationCap className="mr-2" />
            Promote Students
          </button>
        </div>
      </div>
      
      {/* Student Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center cursor-pointer" onClick={() => openStudentProfile(student.id)}>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade {student.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-full rounded-full bg-green-500" 
                          style={{ width: `${student.performance.average}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{student.performance.average}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.attendance.present}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {student.status !== 'suspended' && student.status !== 'expelled' && (
                        <button 
                          onClick={() => handleAction(student.id, 'suspended')}
                          className="text-yellow-600 hover:text-yellow-900 flex items-center"
                        >
                          <FaUserClock className="mr-1" /> Suspend
                        </button>
                      )}
                      {student.status !== 'expelled' && (
                        <button 
                          onClick={() => handleAction(student.id, 'expelled')}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <FaUserTimes className="mr-1" /> Expel
                        </button>
                      )}
                      {(student.status === 'suspended' || student.status === 'expelled') && (
                        <button 
                          onClick={() => handleAction(student.id, 'active')}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <FaUserCheck className="mr-1" /> Reinstate
                        </button>
                      )}
                      <button 
                        onClick={() => openStudentProfile(student.id)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <FaUserEdit className="mr-1" /> Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <FaInfoCircle className="mx-auto text-gray-400 text-3xl mb-3" />
              <h4 className="text-gray-500 font-medium">No students found</h4>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {actionType === 'suspended' ? 'Suspend Student' : 
               actionType === 'expelled' ? 'Expel Student' : 'Reinstate Student'}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter reason..."
              />
            </div>
            
            {actionType === 'suspended' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={!reason}
                className={`px-4 py-2 rounded-xl text-white ${
                  !reason ? 'bg-gray-400 cursor-not-allowed' : 
                  actionType === 'suspended' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  actionType === 'expelled' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Student Profile Drawer */}
      {showStudentProfile && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
          <div className="bg-white h-full w-full max-w-2xl shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Student Profile</h3>
                <button 
                  onClick={() => setShowStudentProfile(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {(() => {
                const student = students.find(s => s.id === selectedStudent);
                if (!student) return null;
                
                return (
                  <>
                    {/* Profile Header */}
                    <div className="flex items-start mb-6">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
                          {student.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full mr-2 ${getStatusColor(student.status)}`}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-600">Grade {student.grade} • {student.className}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                      <nav className="flex -mb-px">
                        <button 
                          className={`px-4 py-2 font-medium text-sm border-b-2 ${
                            activeTab === 'profile' 
                              ? 'border-indigo-500 text-indigo-600' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveTab('profile')}
                        >
                          Profile
                        </button>
                        <button 
                          className={`px-4 py-2 font-medium text-sm border-b-2 ${
                            activeTab === 'performance' 
                              ? 'border-indigo-500 text-indigo-600' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveTab('performance')}
                        >
                          Academic Performance
                        </button>
                        <button 
                          className={`px-4 py-2 font-medium text-sm border-b-2 ${
                            activeTab === 'discipline' 
                              ? 'border-indigo-500 text-indigo-600' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveTab('discipline')}
                        >
                          Discipline History
                        </button>
                      </nav>
                    </div>
                    
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500">Student Email</div>
                              <div className="font-medium">{student.profile.contact}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500">Parent Email</div>
                              <div className="font-medium">{student.profile.parentContact}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Health Information</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">Medical Notes</div>
                            <div className="font-medium">{student.profile.healthNotes}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Extracurricular Activities</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium">{student.profile.extracurricular}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Awards & Recognition</h4>
                          <div className="space-y-2">
                            {student.profile.awards.length > 0 ? (
                              student.profile.awards.map((award, i) => (
                                <div key={i} className="flex items-center bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{award}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500">No awards recorded</div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Teacher Notes</h4>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                            defaultValue={student.profile.notes}
                          ></textarea>
                          <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                            Save Notes
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Performance Tab */}
                    {activeTab === 'performance' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                            <div className="text-sm text-gray-500">Overall Average</div>
                            <div className="text-3xl font-bold text-indigo-600 mt-1">{student.performance.average}%</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                            <div className="text-sm text-gray-500">Highest Subject</div>
                            <div className="text-xl font-bold text-green-600 mt-1">
                              {student.performance.subjects.reduce((max, sub) => 
                                sub.grade > max.grade ? sub : max, 
                                student.performance.subjects[0]
                              ).name}: {Math.max(...student.performance.subjects.map(s => s.grade))}%
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                            <div className="text-sm text-gray-500">Lowest Subject</div>
                            <div className="text-xl font-bold text-red-600 mt-1">
                              {student.performance.subjects.reduce((min, sub) => 
                                sub.grade < min.grade ? sub : min, 
                                student.performance.subjects[0]
                              ).name}: {Math.min(...student.performance.subjects.map(s => s.grade))}%
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Subject Performance</h4>
                          <div className="space-y-3">
                            {student.performance.subjects.map((subject, i) => (
                              <div key={i}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">{subject.name}</span>
                                  <span className="text-sm font-bold">{subject.grade}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="h-2.5 rounded-full bg-indigo-600" 
                                    style={{ width: `${subject.grade}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Trend</h4>
                          <div className="bg-white p-4 rounded-xl border border-gray-200 h-64">
                            <Bar 
                              data={{
                                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                                datasets: [
                                  {
                                    label: 'Average Performance',
                                    data: [85, 78, 92, student.performance.average],
                                    backgroundColor: '#3B82F6'
                                  }
                                ]
                              }}
                              options={{ maintainAspectRatio: false }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Discipline Tab */}
                    {activeTab === 'discipline' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-700">Disciplinary History</h4>
                          <button 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm"
                            onClick={() => {
                              setActiveTab('profile');
                              setTimeout(() => {
                                handleAction(student.id, 'suspended');
                              }, 300);
                            }}
                          >
                            + Add New Record
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {disciplineHistory
                            .filter(record => record.studentId === student.id)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((record, i) => (
                              <div key={i} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className={`w-3 h-3 rounded-full mr-2 ${getActionColor(record.action)}`}></div>
                                      <span className="font-medium capitalize">{record.action}</span>
                                      {record.duration > 0 && (
                                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                          {record.duration} days
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">{record.reason}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-gray-500">{record.date}</div>
                                    <div className="text-xs text-gray-400">by {record.by}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                          {disciplineHistory.filter(r => r.studentId === student.id).length === 0 && (
                            <div className="text-center py-6 border border-dashed border-gray-300 rounded-xl">
                              <FaExclamationTriangle className="mx-auto text-gray-400 text-2xl mb-2" />
                              <p className="text-gray-500">No disciplinary records found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;