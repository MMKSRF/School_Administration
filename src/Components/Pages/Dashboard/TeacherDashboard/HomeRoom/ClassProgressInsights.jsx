// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/ClassProgressInsights.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaChartBar, FaTable, FaSearch, FaFilter, 
  FaFileExport, FaInfoCircle, FaUserGraduate, FaUserFriends,
  FaBook, FaLightbulb, FaBullhorn, FaCalendarAlt
} from 'react-icons/fa';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
         PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, 
                 LineElement, Title, Tooltip, Legend, ArcElement);

const ClassProgressInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('quarter');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [classStats, setClassStats] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  // Initialize mock data
  useEffect(() => {
    // Mock student data
    const mockStudents = [
      {
        id: 's1', 
        name: 'Emma Johnson', 
        grade: '10', 
        className: 'Science A',
        performance: {
          overall: 92.5,
          trend: 'up',
          subjects: [
            { name: 'Mathematics', grade: 95, trend: 'up' },
            { name: 'Science', grade: 98, trend: 'up' },
            { name: 'Literature', grade: 85, trend: 'down' },
            { name: 'History', grade: 90, trend: 'stable' }
          ],
          history: {
            q1: 88, q2: 90, q3: 91, q4: 92.5
          }
        },
        assignments: {
          completed: 45, total: 48, late: 3
        },
        participation: 95,
        riskLevel: 'low'
      },
      {
        id: 's2', 
        name: 'Noah Williams', 
        grade: '10', 
        className: 'Science A',
        performance: {
          overall: 75.5,
          trend: 'down',
          subjects: [
            { name: 'Mathematics', grade: 80, trend: 'stable' },
            { name: 'Science', grade: 85, trend: 'up' },
            { name: 'Literature', grade: 65, trend: 'down' },
            { name: 'History', grade: 72, trend: 'down' }
          ],
          history: {
            q1: 78, q2: 76, q3: 74, q4: 75.5
          }
        },
        assignments: {
          completed: 32, total: 48, late: 10
        },
        participation: 65,
        riskLevel: 'high'
      },
      {
        id: 's3', 
        name: 'Olivia Brown', 
        grade: '9', 
        className: 'Math B',
        performance: {
          overall: 88.0,
          trend: 'up',
          subjects: [
            { name: 'Mathematics', grade: 92, trend: 'up' },
            { name: 'Science', grade: 85, trend: 'stable' },
            { name: 'Literature', grade: 90, trend: 'up' },
            { name: 'History', grade: 85, trend: 'down' }
          ],
          history: {
            q1: 85, q2: 86, q3: 87, q4: 88
          }
        },
        assignments: {
          completed: 46, total: 48, late: 2
        },
        participation: 92,
        riskLevel: 'low'
      },
      {
        id: 's4', 
        name: 'Liam Davis', 
        grade: '11', 
        className: 'History C',
        performance: {
          overall: 65.0,
          trend: 'down',
          subjects: [
            { name: 'Mathematics', grade: 60, trend: 'down' },
            { name: 'Science', grade: 55, trend: 'down' },
            { name: 'Literature', grade: 70, trend: 'stable' },
            { name: 'History', grade: 75, trend: 'up' }
          ],
          history: {
            q1: 70, q2: 68, q3: 66, q4: 65
          }
        },
        assignments: {
          completed: 28, total: 48, late: 15
        },
        participation: 50,
        riskLevel: 'high'
      },
      {
        id: 's5', 
        name: 'Ava Miller', 
        grade: '11', 
        className: 'History C',
        performance: {
          overall: 95.0,
          trend: 'up',
          subjects: [
            { name: 'Mathematics', grade: 97, trend: 'up' },
            { name: 'Science', grade: 96, trend: 'up' },
            { name: 'Literature', grade: 92, trend: 'stable' },
            { name: 'History', grade: 95, trend: 'up' }
          ],
          history: {
            q1: 93, q2: 94, q3: 94.5, q4: 95
          }
        },
        assignments: {
          completed: 48, total: 48, late: 0
        },
        participation: 99,
        riskLevel: 'low'
      }
    ];

    // Mock class statistics
    const mockClassStats = {
      overallAverage: 83.2,
      improvement: 2.5,
      topStudents: ['Ava Miller', 'Emma Johnson'],
      strugglingStudents: ['Noah Williams', 'Liam Davis'],
      assignmentCompletion: 89.3,
      participationRate: 80.2,
      subjectAverages: {
        'Mathematics': 85.2,
        'Science': 82.7,
        'Literature': 78.9,
        'History': 81.5
      }
    };

    // Extract unique subjects
    const uniqueSubjects = [...new Set(mockStudents.flatMap(
      student => student.performance.subjects.map(sub => sub.name)
    ))];

    setStudents(mockStudents);
    setClassStats(mockClassStats);
    setSubjects(['all', ...uniqueSubjects]);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || 
      student.performance.subjects.some(sub => sub.name === subjectFilter);
    return matchesSearch && matchesSubject;
  });

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <span className="text-green-500">↑</span>;
      case 'down': return <span className="text-red-500">↓</span>;
      case 'stable': return <span className="text-gray-500">→</span>;
      default: return null;
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendAnnouncement = () => {
    if (announcement.trim()) {
      // In a real app, this would send to backend
      alert(`Announcement sent: ${announcement}`);
      setAnnouncement('');
      setShowAnnouncementModal(false);
    }
  };

  // Chart data
  const performanceChartData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: 'Current Performance',
        data: students.map(s => s.performance.overall),
        backgroundColor: '#3B82F6',
        borderWidth: 0
      },
      {
        label: 'Previous Quarter',
        data: students.map(s => s.performance.history.q3),
        backgroundColor: '#94A3B8',
        borderWidth: 0
      }
    ]
  };

  const subjectChartData = {
    labels: Object.keys(classStats.subjectAverages || {}),
    datasets: [
      {
        label: 'Class Average',
        data: Object.values(classStats.subjectAverages || {}),
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 2,
        fill: false
      }
    ]
  };

  const riskDistributionData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [
          students.filter(s => s.riskLevel === 'low').length,
          students.filter(s => s.riskLevel === 'medium').length,
          students.filter(s => s.riskLevel === 'high').length
        ],
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
        borderWidth: 0
      }
    ]
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 flex items-center justify-center">
            <FaUserGraduate className="mr-2" /> Class Average
          </div>
          <div className="text-3xl font-bold text-indigo-600 mt-1">
            {classStats.overallAverage}%
          </div>
          <div className={`mt-1 flex items-center justify-center ${
            classStats.improvement >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {classStats.improvement >= 0 ? '+' : ''}{classStats.improvement}% from last quarter
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 flex items-center justify-center">
            <FaBook className="mr-2" /> Assignment Completion
          </div>
          <div className="text-3xl font-bold text-green-600 mt-1">
            {classStats.assignmentCompletion}%
          </div>
          <div className="mt-1 text-gray-500">
            {students.reduce((sum, s) => sum + s.assignments.completed, 0)} / 
            {students.reduce((sum, s) => sum + s.assignments.total, 0)} assignments
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 flex items-center justify-center">
            <FaUserFriends className="mr-2" /> Participation Rate
          </div>
          <div className="text-3xl font-bold text-blue-600 mt-1">
            {classStats.participationRate}%
          </div>
          <div className="mt-1 text-gray-500">
            Based on class engagement metrics
          </div>
        </div>
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Student Performance Comparison</h3>
          <div className="h-72">
            <Bar 
              data={performanceChartData}
              options={{ 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: false, min: 60, max: 100 } }
              }}
            />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Subject Performance</h3>
          <div className="h-72">
            <Line 
              data={subjectChartData}
              options={{ 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: false, min: 70, max: 95 } }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Student Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Top Performers</h3>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
            >
              <FaBullhorn className="inline mr-1" /> Recognize
            </button>
          </div>
          <div className="space-y-3">
            {classStats.topStudents?.slice(0, 3).map((student, i) => (
              <div key={i} className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  {student.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-medium">{student}</div>
                  <div className="text-sm text-gray-600">
                    Average: {students.find(s => s.name === student)?.performance.overall}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Students Needing Support</h3>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
            >
              <FaBullhorn className="inline mr-1" /> Notify
            </button>
          </div>
          <div className="space-y-3">
            {classStats.strugglingStudents?.slice(0, 3).map((student, i) => (
              <div key={i} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  {student.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-medium">{student}</div>
                  <div className="text-sm text-gray-600">
                    Average: {students.find(s => s.name === student)?.performance.overall}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailedTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="flex items-center cursor-pointer" 
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowStudentDetail(true);
                      }}
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.className}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{student.performance.overall}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {getTrendIcon(student.performance.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {student.assignments.completed}/{student.assignments.total} 
                      <span className="text-red-500 ml-1">
                        ({student.assignments.late} late)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{student.participation}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRiskColor(student.riskLevel)}`}>
                      {student.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowAnnouncementModal(true);
                      }}
                    >
                      Send Message
                    </button>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Risk Level Distribution</h3>
          <div className="h-64">
            <Pie 
              data={riskDistributionData}
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
              }}
            />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Assignment Completion</h3>
          <div className="space-y-3">
            {students.map(student => (
              <div key={student.id} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{student.name}</span>
                  <span className="text-sm font-medium">
                    {Math.round((student.assignments.completed / student.assignments.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-blue-600" 
                    style={{ 
                      width: `${(student.assignments.completed / student.assignments.total) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
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
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="quarter">This Quarter</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
            <FaFileExport className="mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaChartBar className={`inline mr-2 ${activeTab === 'overview' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'detailed'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaTable className={`inline mr-2 ${activeTab === 'detailed' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Detailed Analysis
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'trends'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaChartLine className={`inline mr-2 ${activeTab === 'trends' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Performance Trends
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'overview' ? renderOverviewTab() : 
         activeTab === 'detailed' ? renderDetailedTab() : 
         <div className="bg-white p-6 rounded-xl shadow">
           <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Trends</h3>
           <div className="h-96">
             <Line 
               data={{
                 labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                 datasets: students.slice(0, 5).map(student => ({
                   label: student.name,
                   data: [
                     student.performance.history.q1,
                     student.performance.history.q2,
                     student.performance.history.q3,
                     student.performance.history.q4
                   ],
                   borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                   tension: 0.3
                 }))
               }}
               options={{ maintainAspectRatio: false }}
             />
           </div>
         </div>
        }
      </div>
      
      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedStudent 
                ? `Message to ${selectedStudent.name}` 
                : 'Class Announcement'}
            </h3>
            
            <div className="mb-4">
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={selectedStudent 
                  ? `Write a message to ${selectedStudent.name}...` 
                  : 'Write an announcement to the entire class...'}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAnnouncementModal(false);
                  setAnnouncement('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={sendAnnouncement}
                disabled={!announcement.trim()}
                className={`px-4 py-2 rounded-xl text-white ${
                  !announcement.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Student Detail Modal */}
      {showStudentDetail && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}'s Academic Profile</h3>
              <button 
                onClick={() => setShowStudentDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Subject Performance</h4>
                
                <div className="space-y-4">
                  {selectedStudent.performance.subjects.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{subject.name}</span>
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{subject.grade}%</span>
                          {getTrendIcon(subject.trend)}
                        </div>
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
                <h4 className="text-lg font-medium text-gray-800 mb-4">Key Metrics</h4>
                
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                    <div className="font-medium mb-1">Overall Performance</div>
                    <div className="text-2xl font-bold">{selectedStudent.performance.overall}%</div>
                    <div className="text-sm mt-1">
                      Trend: {getTrendIcon(selectedStudent.performance.trend)}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="font-medium mb-1">Assignments</div>
                    <div className="text-xl font-bold">
                      {selectedStudent.assignments.completed}/{selectedStudent.assignments.total} completed
                    </div>
                    <div className="text-sm text-red-500 mt-1">
                      {selectedStudent.assignments.late} late submissions
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="font-medium mb-1">Participation Rate</div>
                    <div className="text-2xl font-bold">{selectedStudent.participation}%</div>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div className="font-medium mb-1">Risk Level</div>
                    <div className="text-xl font-bold capitalize">
                      <span className={`px-2 py-1 rounded ${getRiskColor(selectedStudent.riskLevel)}`}>
                        {selectedStudent.riskLevel}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                    onClick={() => {
                      setShowStudentDetail(false);
                      setShowAnnouncementModal(true);
                    }}
                  >
                    Send Personalized Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassProgressInsights;