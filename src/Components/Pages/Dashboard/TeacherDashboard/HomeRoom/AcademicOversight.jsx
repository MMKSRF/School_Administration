// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/AcademicOversight.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaChartLine, FaCheck, FaTimes, 
  FaSearch, FaFilter, FaFileExport, FaInfoCircle,
  FaUserGraduate, FaPlus, FaUserFriends, FaBook,
  FaChartBar, FaBalanceScale, FaClipboardList
} from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AcademicOversight = () => {
  const [students, setStudents] = useState([]);
  const [promotionRequests, setPromotionRequests] = useState([]);
  const [classPerformance, setClassPerformance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('promotion');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionDecision, setPromotionDecision] = useState({});
  const [newNote, setNewNote] = useState('');
//   const [comparisonCriteria, setComparisonCriteria] = useState('overall');
  const [reportType, setReportType] = useState('summary');

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
        performance: {
          overall: 92.5,
          subjects: [
            { name: 'Mathematics', grade: 95, trend: 'up' },
            { name: 'Science', grade: 98, trend: 'up' },
            { name: 'Literature', grade: 85, trend: 'down' },
            { name: 'History', grade: 90, trend: 'stable' }
          ],
          history: {
            q1: 88,
            q2: 90,
            q3: 91,
            q4: 92.5
          }
        },
        promotionStatus: 'pending',
        teacherNotes: [
          { date: '2023-09-15', teacher: 'Ms. Davis', note: 'Excelling in STEM subjects' },
          { date: '2023-10-01', teacher: 'Mr. Johnson', note: 'Needs to improve writing skills' }
        ]
      },
      {
        id: 's2', 
        name: 'Noah Williams', 
        status: 'suspended', 
        grade: '10', 
        className: 'Science A',
        performance: {
          overall: 75.5,
          subjects: [
            { name: 'Mathematics', grade: 80, trend: 'stable' },
            { name: 'Science', grade: 85, trend: 'up' },
            { name: 'Literature', grade: 65, trend: 'down' },
            { name: 'History', grade: 72, trend: 'down' }
          ],
          history: {
            q1: 78,
            q2: 76,
            q3: 74,
            q4: 75.5
          }
        },
        promotionStatus: 'at-risk',
        teacherNotes: [
          { date: '2023-10-10', teacher: 'Mr. Johnson', note: 'Struggling with attendance affecting grades' }
        ]
      },
      {
        id: 's3', 
        name: 'Olivia Brown', 
        status: 'active', 
        grade: '9', 
        className: 'Math B',
        performance: {
          overall: 88.0,
          subjects: [
            { name: 'Mathematics', grade: 92, trend: 'up' },
            { name: 'Science', grade: 85, trend: 'stable' },
            { name: 'Literature', grade: 90, trend: 'up' },
            { name: 'History', grade: 85, trend: 'down' }
          ],
          history: {
            q1: 85,
            q2: 86,
            q3: 87,
            q4: 88
          }
        },
        promotionStatus: 'recommended',
        teacherNotes: [
          { date: '2023-09-20', teacher: 'Ms. Roberts', note: 'Excellent participation in class discussions' }
        ]
      },
      {
        id: 's4', 
        name: 'Liam Davis', 
        status: 'expelled', 
        grade: '11', 
        className: 'History C',
        performance: {
          overall: 65.0,
          subjects: [
            { name: 'Mathematics', grade: 60, trend: 'down' },
            { name: 'Science', grade: 55, trend: 'down' },
            { name: 'Literature', grade: 70, trend: 'stable' },
            { name: 'History', grade: 75, trend: 'up' }
          ],
          history: {
            q1: 70,
            q2: 68,
            q3: 66,
            q4: 65
          }
        },
        promotionStatus: 'not-recommended',
        teacherNotes: [
          { date: '2023-09-05', teacher: 'Mr. Thompson', note: 'Falling behind in multiple subjects' }
        ]
      },
      {
        id: 's5', 
        name: 'Ava Miller', 
        status: 'active', 
        grade: '11', 
        className: 'History C',
        performance: {
          overall: 95.0,
          subjects: [
            { name: 'Mathematics', grade: 97, trend: 'up' },
            { name: 'Science', grade: 96, trend: 'up' },
            { name: 'Literature', grade: 92, trend: 'stable' },
            { name: 'History', grade: 95, trend: 'up' }
          ],
          history: {
            q1: 93,
            q2: 94,
            q3: 94.5,
            q4: 95
          }
        },
        promotionStatus: 'approved',
        teacherNotes: [
          { date: '2023-10-15', teacher: 'Ms. Davis', note: 'Exceptional performance across all subjects' }
        ]
      }
    ];

    // Mock promotion requests
    const mockPromotionRequests = [
      { id: 'pr1', studentId: 's1', currentGrade: '10', requestedGrade: '11', status: 'pending', date: '2023-10-15' },
      { id: 'pr2', studentId: 's2', currentGrade: '10', requestedGrade: '11', status: 'review', date: '2023-10-10' },
      { id: 'pr3', studentId: 's3', currentGrade: '9', requestedGrade: '10', status: 'approved', date: '2023-10-12' },
      { id: 'pr4', studentId: 's5', currentGrade: '11', requestedGrade: '12', status: 'approved', date: '2023-10-08' }
    ];

    // Mock class performance data
    const mockClassPerformance = [
      { subject: 'Mathematics', average: 85.2, improvement: 3.4, topStudent: 'Emma Johnson' },
      { subject: 'Science', average: 82.7, improvement: 2.1, topStudent: 'Ava Miller' },
      { subject: 'Literature', average: 78.9, improvement: -1.2, topStudent: 'Olivia Brown' },
      { subject: 'History', average: 81.5, improvement: 4.7, topStudent: 'Ava Miller' },
      { subject: 'Art', average: 88.3, improvement: 5.6, topStudent: 'Olivia Brown' },
      { subject: 'Physical Education', average: 90.1, improvement: 1.8, topStudent: 'Noah Williams' }
    ];

    setStudents(mockStudents);
    setPromotionRequests(mockPromotionRequests);
    setClassPerformance(mockClassPerformance);
    
    // Initialize promotion decisions
    const initialDecisions = {};
    mockPromotionRequests.forEach(req => {
      initialDecisions[req.id] = req.status === 'approved' ? 'approve' : req.status === 'denied' ? 'deny' : 'pending';
    });
    setPromotionDecision(initialDecisions);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.promotionStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': 
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'pending': 
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'at-risk': 
      case 'not-recommended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <span className="text-green-500">↑</span>;
      case 'down': return <span className="text-red-500">↓</span>;
      case 'stable': return <span className="text-gray-500">→</span>;
      default: return null;
    }
  };

  const handlePromotionDecision = (requestId, decision) => {
    setPromotionDecision(prev => ({
      ...prev,
      [requestId]: decision
    }));
    
    // In a real app, this would save to the backend
    console.log(`Set promotion decision for request ${requestId} to ${decision}`);
  };

  const submitPromotionDecisions = () => {
    const decisions = [];
    Object.keys(promotionDecision).forEach(requestId => {
      if (promotionDecision[requestId] !== 'pending') {
        decisions.push({
          requestId,
          decision: promotionDecision[requestId]
        });
      }
    });
    
    // In a real app, this would submit to the backend
    alert(`Submitted ${decisions.length} promotion decisions`);
    setShowPromotionModal(false);
  };

  const addTeacherNote = (studentId) => {
    if (newNote.trim() !== '') {
      setStudents(prev => prev.map(student => {
        if (student.id === studentId) {
          const newNoteObj = {
            date: new Date().toISOString().split('T')[0],
            teacher: 'Home Room Teacher',
            note: newNote
          };
          return {
            ...student,
            teacherNotes: [...student.teacherNotes, newNoteObj]
          };
        }
        return student;
      }));
      setNewNote('');
    }
  };

  const promotionChartData = {
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

  const classPerformanceData = {
    labels: classPerformance.map(c => c.subject),
    datasets: [
      {
        label: 'Class Average',
        data: classPerformance.map(c => c.average),
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'School Average',
        data: [82.1, 80.5, 76.8, 79.2, 84.7, 88.9],
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 2,
        fill: false
      }
    ]
  };

  const renderPromotionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Student Promotion Management</h3>
          <button 
            onClick={() => setShowPromotionModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
          >
            <FaClipboardList className="mr-2" />
            Review All Decisions
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotion Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.className}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Grade {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.performance.overall}%</div>
                    <div className="text-xs text-gray-500">
                      {student.performance.history.q3}% last quarter
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(student.promotionStatus)}`}>
                      {student.promotionStatus.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedStudent(student.id);
                          setPromotionDecision(prev => ({
                            ...prev,
                            [student.id]: student.promotionStatus === 'approved' ? 'approve' : 
                                          student.promotionStatus === 'not-recommended' ? 'deny' : 'pending'
                          }));
                        }}
                        className={`px-3 py-1 rounded ${
                          student.promotionStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                          student.promotionStatus === 'not-recommended' ? 'bg-red-100 text-red-800' : 
                          'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {student.promotionStatus === 'approved' ? 'Approved' : 
                         student.promotionStatus === 'not-recommended' ? 'Denied' : 
                         'Review'}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Promotion Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FaUserGraduate className="text-green-500 mr-3" />
                <div>
                  <div className="font-medium">Recommended for Promotion</div>
                  <div className="text-sm text-gray-600">Students meeting all academic requirements</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.promotionStatus === 'recommended' || s.promotionStatus === 'approved').length}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <FaBalanceScale className="text-yellow-500 mr-3" />
                <div>
                  <div className="font-medium">Review Required</div>
                  <div className="text-sm text-gray-600">Students with borderline performance</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {students.filter(s => s.promotionStatus === 'pending' || s.promotionStatus === 'review').length}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <FaBook className="text-red-500 mr-3" />
                <div>
                  <div className="font-medium">Not Recommended</div>
                  <div className="text-sm text-gray-600">Students not meeting academic standards</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {students.filter(s => s.promotionStatus === 'not-recommended' || s.promotionStatus === 'at-risk').length}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Comparison</h3>
          <div className="h-64">
            <Bar 
              data={promotionChartData}
              options={{ 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: false, min: 60, max: 100 } },
                plugins: { legend: { position: 'top' } }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Class Performance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">85.2%</div>
            <div className="text-sm text-indigo-800">Class Average</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">+3.1%</div>
            <div className="text-sm text-green-800">Quarterly Improvement</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-purple-800">Top Performers (90%+)</div>
          </div>
        </div>
        
        <div className="h-96">
          <Line 
            data={classPerformanceData}
            options={{ 
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: false, min: 70, max: 95 } },
              plugins: { 
                legend: { position: 'top' },
                tooltip: {
                  callbacks: {
                    title: (items) => items[0].label,
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
                  }
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Subject Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comparison</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classPerformance.map((subject, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="h-2.5 rounded-full bg-indigo-600" 
                          style={{ width: `${subject.average}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{subject.average}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${subject.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {subject.improvement >= 0 ? '+' : ''}{subject.improvement}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.topStudent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {subject.average > 85 ? 'Above' : subject.average > 75 ? 'At' : 'Below'} school average
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

  const renderStudentDetail = () => {
    if (!selectedStudent) return null;
    
    const student = students.find(s => s.id === selectedStudent);
    if (!student) return null;
    
    const promotionRequest = promotionRequests.find(pr => pr.studentId === selectedStudent);
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{student.name}'s Academic Profile</h3>
            <div className="flex items-center mt-2">
              <span className={`px-2 py-1 text-xs rounded-full mr-2 ${getStatusColor(student.promotionStatus)}`}>
                {student.promotionStatus.replace('-', ' ')}
              </span>
              <span className="text-sm text-gray-600">Grade {student.grade} • {student.className}</span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedStudent(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Academic Performance</h4>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-500">Overall</div>
                  <div className="text-2xl font-bold">{student.performance.overall}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Q1</div>
                  <div className="text-xl">{student.performance.history.q1}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Q2</div>
                  <div className="text-xl">{student.performance.history.q2}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Q3</div>
                  <div className="text-xl">{student.performance.history.q3}%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {student.performance.subjects.map((subject, index) => (
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
            <h4 className="text-lg font-medium text-gray-800 mb-4">Promotion Status</h4>
            
            {promotionRequest ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                <div className="font-medium mb-2">Promotion Request</div>
                <div className="text-sm mb-3">
                  From Grade {promotionRequest.currentGrade} to Grade {promotionRequest.requestedGrade}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePromotionDecision(promotionRequest.id, 'approve')}
                    className={`flex-1 py-2 rounded-lg ${
                      promotionDecision[promotionRequest.id] === 'approve' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handlePromotionDecision(promotionRequest.id, 'deny')}
                    className={`flex-1 py-2 rounded-lg ${
                      promotionDecision[promotionRequest.id] === 'deny' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
                <div className="font-medium mb-2">No Promotion Request</div>
                <p className="text-sm mb-3">
                  This student hasn't been recommended for promotion yet.
                </p>
                <button className="w-full py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200">
                  Initiate Promotion Review
                </button>
              </div>
            )}
            
            <h4 className="text-lg font-medium text-gray-800 mb-4 mt-6">Teacher Notes</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {student.teacherNotes.map((note, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{note.teacher}</span>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-sm">{note.note}</p>
                </div>
              ))}
              
              {student.teacherNotes.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No notes yet
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows="2"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                placeholder="Add a new note..."
              />
              <button 
                onClick={() => addTeacherNote(student.id)}
                disabled={!newNote.trim()}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="recommended">Recommended</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="review">Review Required</option>
              <option value="at-risk">At Risk</option>
              <option value="not-recommended">Not Recommended</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="promotion">Promotion Report</option>
            <option value="subject">Subject Analysis</option>
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
            onClick={() => setActiveTab('promotion')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'promotion'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaGraduationCap className={`inline mr-2 ${activeTab === 'promotion' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Promotion Management
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'performance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaChartBar className={`inline mr-2 ${activeTab === 'performance' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Class Performance
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {selectedStudent ? renderStudentDetail() : (
          activeTab === 'promotion' ? renderPromotionTab() : renderPerformanceTab()
        )}
      </div>
      
      {/* Promotion Decision Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Review Promotion Decisions</h3>
              <button 
                onClick={() => setShowPromotionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-96 pr-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {promotionRequests.map(request => {
                    const student = students.find(s => s.id === request.studentId);
                    if (!student) return null;
                    
                    return (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              {student.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.className}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Grade {request.currentGrade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Grade {request.requestedGrade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{student.performance.overall}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handlePromotionDecision(request.id, 'approve')}
                              className={`px-3 py-1 rounded ${
                                promotionDecision[request.id] === 'approve' 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handlePromotionDecision(request.id, 'deny')}
                              className={`px-3 py-1 rounded ${
                                promotionDecision[request.id] === 'deny' 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              Deny
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPromotionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitPromotionDecisions}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Submit Decisions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicOversight;