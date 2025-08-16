// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/AttendanceBehavior.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaClock, FaUserCheck, FaUserTimes, 
  FaExclamationTriangle, FaSearch, FaFilter, FaChartBar,
  FaPlus, FaFileExport, FaInfoCircle, FaUserEdit, 
  FaCheck, FaTimes, FaHistory, FaUserFriends
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AttendanceBehavior = () => {
  const [attendance, setAttendance] = useState([]);
  const [behaviorIncidents, setBehaviorIncidents] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);
  const [newIncident, setNewIncident] = useState({
    type: 'tardiness',
    severity: 'low',
    description: '',
    action: 'warning'
  });
  const [newAttendance, setNewAttendance] = useState({
    status: 'present',
    reason: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('attendance');
  const [stats, setStats] = useState({});
  const [calendarView, setCalendarView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateIncidents, setDateIncidents] = useState([]);

  // Initialize mock data
  useEffect(() => {
    // Mock student data
    const mockStudents = [
      { id: 's1', name: 'Emma Johnson', className: 'Science A' },
      { id: 's2', name: 'Noah Williams', className: 'Science A' },
      { id: 's3', name: 'Olivia Brown', className: 'Math B' },
      { id: 's4', name: 'Liam Davis', className: 'History C' },
      { id: 's5', name: 'Ava Miller', className: 'History C' },
    ];

    // Mock attendance data
    const mockAttendance = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      mockStudents.forEach(student => {
        let status = 'present';
        let reason = '';
        
        // Simulate some absences and tardies
        if (i % 7 === 0 && student.id === 's2') {
          status = 'absent';
          reason = 'Sick';
        } else if (i % 5 === 0 && student.id === 's4') {
          status = 'tardy';
          reason = 'Late arrival';
        } else if (i % 9 === 0 && student.id === 's3') {
          status = 'absent';
          reason = 'Family trip';
        }
        
        mockAttendance.push({
          id: `a${i}-${student.id}`,
          studentId: student.id,
          date: date.toISOString().split('T')[0],
          status,
          reason,
          recordedBy: 'Home Room Teacher'
        });
      });
    }

    // Mock behavior incidents
    const mockIncidents = [
      {
        id: 'b1',
        studentId: 's2',
        date: '2023-10-15',
        type: 'disruption',
        severity: 'medium',
        description: 'Repeatedly talking during instruction',
        actionTaken: 'warning',
        followUp: 'Parent notified',
        resolved: false
      },
      {
        id: 'b2',
        studentId: 's4',
        date: '2023-10-10',
        type: 'disrespect',
        severity: 'high',
        description: 'Refused to follow instructions, argued with teacher',
        actionTaken: 'detention',
        followUp: 'Meeting with principal scheduled',
        resolved: false
      },
      {
        id: 'b3',
        studentId: 's3',
        date: '2023-10-05',
        type: 'tardiness',
        severity: 'low',
        description: 'Late to class 3 times this week',
        actionTaken: 'warning',
        followUp: 'Monitoring',
        resolved: true
      },
      {
        id: 'b4',
        studentId: 's2',
        date: '2023-09-28',
        type: 'incomplete_work',
        severity: 'low',
        description: 'Consistently not completing homework',
        actionTaken: 'extra assignment',
        followUp: 'Parent conference',
        resolved: true
      }
    ];

    setStudents(mockStudents);
    setAttendance(mockAttendance);
    setBehaviorIncidents(mockIncidents);
    
    // Calculate stats
    const presentCount = mockAttendance.filter(a => a.status === 'present').length;
    const absentCount = mockAttendance.filter(a => a.status === 'absent').length;
    const tardyCount = mockAttendance.filter(a => a.status === 'tardy').length;
    const totalRecords = mockAttendance.length;
    
    const lowSeverity = mockIncidents.filter(i => i.severity === 'low').length;
    const mediumSeverity = mockIncidents.filter(i => i.severity === 'medium').length;
    const highSeverity = mockIncidents.filter(i => i.severity === 'high').length;
    const unresolved = mockIncidents.filter(i => !i.resolved).length;
    
    setStats({
      attendanceRate: Math.round((presentCount / totalRecords) * 100),
      absentRate: Math.round((absentCount / totalRecords) * 100),
      tardyRate: Math.round((tardyCount / totalRecords) * 100),
      incidentCount: mockIncidents.length,
      lowSeverity,
      mediumSeverity,
      highSeverity,
      unresolved
    });
  }, []);

//   const filteredStudents = students.filter(student => {
//     const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          student.className.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

  const getAttendanceForDate = (dateStr) => {
    return attendance.filter(a => a.date === dateStr);
  };

  const getIncidentsForDate = (dateStr) => {
    return behaviorIncidents.filter(i => i.date === dateStr);
  };

  const handleDateClick = (dateStr) => {
    setSelectedDate(new Date(dateStr));
    setDateIncidents(getIncidentsForDate(dateStr));
  };

//   const handleAddAttendance = (studentId) => {
//     setSelectedStudent(studentId);
//     setShowAttendanceModal(true);
//   };

  const handleAddBehavior = (studentId) => {
    setSelectedStudent(studentId);
    setShowBehaviorModal(true);
  };

  const saveAttendance = () => {
    if (selectedStudent) {
      const newRecord = {
        id: `a-${Date.now()}`,
        studentId: selectedStudent,
        date: new Date().toISOString().split('T')[0],
        status: newAttendance.status,
        reason: newAttendance.reason,
        recordedBy: 'Home Room Teacher'
      };
      
      setAttendance(prev => [...prev, newRecord]);
      setShowAttendanceModal(false);
      setNewAttendance({ status: 'present', reason: '' });
    }
  };

  const saveBehaviorIncident = () => {
    if (selectedStudent) {
      const newRecord = {
        id: `b-${Date.now()}`,
        studentId: selectedStudent,
        date: new Date().toISOString().split('T')[0],
        ...newIncident,
        resolved: false
      };
      
      setBehaviorIncidents(prev => [...prev, newRecord]);
      setShowBehaviorModal(false);
      setNewIncident({
        type: 'tardiness',
        severity: 'low',
        description: '',
        action: 'warning'
      });
    }
  };

  const resolveIncident = (incidentId) => {
    setBehaviorIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId ? { ...incident, resolved: true } : incident
      )
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'tardy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'detention': return 'bg-orange-100 text-orange-800';
      case 'suspension': return 'bg-red-100 text-red-800';
      case 'conference': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Chart data
  const attendanceChartData = {
    labels: ['Present', 'Absent', 'Tardy'],
    datasets: [
      {
        data: [stats.attendanceRate, stats.absentRate, stats.tardyRate],
        backgroundColor: ['#10B981', '#EF4444', '#FBBF24'],
        borderWidth: 0
      }
    ]
  };

  const behaviorChartData = {
    labels: ['Low', 'Medium', 'High', 'Unresolved'],
    datasets: [
      {
        data: [stats.lowSeverity, stats.mediumSeverity, stats.highSeverity, stats.unresolved],
        backgroundColor: ['#3B82F6', '#FBBF24', '#EF4444', '#8B5CF6'],
        borderWidth: 0
      }
    ]
  };

  const renderAttendanceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FaUserCheck className="text-green-500 mr-3" />
                <div>
                  <div className="font-medium">Attendance Rate</div>
                  <div className="text-sm text-gray-600">Percentage of students present</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {stats.attendanceRate}%
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <FaUserTimes className="text-red-500 mr-3" />
                <div>
                  <div className="font-medium">Absence Rate</div>
                  <div className="text-sm text-gray-600">Percentage of students absent</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {stats.absentRate}%
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <FaClock className="text-yellow-500 mr-3" />
                <div>
                  <div className="font-medium">Tardy Rate</div>
                  <div className="text-sm text-gray-600">Percentage of students late</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.tardyRate}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Distribution</h3>
          <div className="h-64">
            <Pie 
              data={attendanceChartData}
              options={{ 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.parsed}%`
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Attendance Records</h3>
          <div className="flex space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-1"
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="tardy">Tardy</option>
            </select>
            <button 
              onClick={() => setShowAttendanceModal(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
            >
              <FaPlus className="mr-1" /> Add
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recorded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance
                .filter(a => filterStatus === 'all' || a.status === filterStatus)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10)
                .map(record => {
                  const student = students.find(s => s.id === record.studentId);
                  return (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student ? student.name : 'Unknown Student'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.reason || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.recordedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleAddBehavior(record.studentId)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Add Behavior Note
                        </button>
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

  const renderBehaviorTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Behavior Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-blue-500 mr-3" />
                <div>
                  <div className="font-medium">Total Incidents</div>
                  <div className="text-sm text-gray-600">All behavior issues recorded</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.incidentCount}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <FaClock className="text-yellow-500 mr-3" />
                <div>
                  <div className="font-medium">Unresolved Cases</div>
                  <div className="text-sm text-gray-600">Requiring follow-up</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.unresolved}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-3" />
                <div>
                  <div className="font-medium">High Severity</div>
                  <div className="text-sm text-gray-600">Serious behavior issues</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {stats.highSeverity}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Behavior Incident Distribution</h3>
          <div className="h-64">
            <Pie 
              data={behaviorChartData}
              options={{ 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { position: 'right' }
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Behavior Incidents</h3>
          <button 
            onClick={() => setShowBehaviorModal(true)}
            className="px-3 py-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
          >
            <FaPlus className="mr-1" /> Add Incident
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Taken</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {behaviorIncidents
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10)
                .map(incident => {
                  const student = students.find(s => s.id === incident.studentId);
                  return (
                    <tr key={incident.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student ? student.name : 'Unknown Student'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {incident.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {incident.type.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getActionColor(incident.actionTaken)}`}>
                          {incident.actionTaken}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {incident.resolved ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Resolved
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!incident.resolved && (
                          <button 
                            onClick={() => resolveIncident(incident.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Mark Resolved
                          </button>
                        )}
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

  const renderCalendarView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    // Generate calendar days
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dateAttendance = getAttendanceForDate(dateStr);
      const dateIncidents = getIncidentsForDate(dateStr);
      
      let status = 'normal';
      if (dateIncidents.length > 0) status = 'incident';
      if (dateAttendance.filter(a => a.status !== 'present').length > 0) status = 'absent';
      
      days.push({
        date: i,
        dateStr,
        status,
        attendance: dateAttendance,
        incidents: dateIncidents
      });
    }
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Attendance Calendar</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                const prevMonth = new Date(currentDate);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                setCurrentDate(prevMonth);
              }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &larr;
            </button>
            <h4 className="text-md font-medium">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h4>
            <button 
              onClick={() => {
                const nextMonth = new Date(currentDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setCurrentDate(nextMonth);
              }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &rarr;
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`min-h-20 border rounded-lg p-2 cursor-pointer hover:bg-gray-50 ${
                day ? `${
                  day.status === 'incident' ? 'bg-red-50 border-red-200' : 
                  day.status === 'absent' ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-white border-gray-200'
                }` : 'bg-gray-50'
              }`}
              onClick={() => day && handleDateClick(day.dateStr)}
            >
              {day ? (
                <>
                  <div className="text-right font-medium">{day.date}</div>
                  <div className="mt-1 text-xs">
                    {day.attendance.filter(a => a.status !== 'present').length > 0 && (
                      <div className="text-yellow-600">
                        {day.attendance.filter(a => a.status === 'absent').length} absent
                      </div>
                    )}
                    {day.incidents.length > 0 && (
                      <div className="text-red-600">
                        {day.incidents.length} incident{day.incidents.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
        
        {selectedDate && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium mb-2">
              Details for {selectedDate.toISOString().split('T')[0]}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Attendance Records</h5>
                {getAttendanceForDate(selectedDate.toISOString().split('T')[0]).length > 0 ? (
                  <div className="space-y-2">
                    {getAttendanceForDate(selectedDate.toISOString().split('T')[0]).map(record => {
                      const student = students.find(s => s.id === record.studentId);
                      return (
                        <div key={record.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>{student ? student.name : 'Unknown'}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No attendance records for this date</div>
                )}
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Behavior Incidents</h5>
                {dateIncidents.length > 0 ? (
                  <div className="space-y-2">
                    {dateIncidents.map(incident => {
                      const student = students.find(s => s.id === incident.studentId);
                      return (
                        <div key={incident.id} className="p-2 bg-red-50 rounded">
                          <div className="flex justify-between">
                            <span className="font-medium">{student ? student.name : 'Unknown'}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </span>
                          </div>
                          <div className="text-sm">{incident.description}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No behavior incidents for this date</div>
                )}
              </div>
            </div>
          </div>
        )}
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
              value={calendarView}
              onChange={(e) => setCalendarView(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="month">Month View</option>
              <option value="week">Week View</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
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
            onClick={() => setActiveTab('attendance')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'attendance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserCheck className={`inline mr-2 ${activeTab === 'attendance' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('behavior')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'behavior'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaExclamationTriangle className={`inline mr-2 ${activeTab === 'behavior' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Behavior
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'calendar'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalendarAlt className={`inline mr-2 ${activeTab === 'calendar' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Calendar
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'attendance' ? renderAttendanceTab() : 
         activeTab === 'behavior' ? renderBehaviorTab() : 
         renderCalendarView()}
      </div>
      
      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Record Attendance for {students.find(s => s.id === selectedStudent)?.name || 'Student'}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={newAttendance.status}
                onChange={(e) => setNewAttendance({...newAttendance, status: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="tardy">Tardy</option>
              </select>
            </div>
            
            {newAttendance.status !== 'present' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <input
                  type="text"
                  value={newAttendance.reason}
                  onChange={(e) => setNewAttendance({...newAttendance, reason: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter reason..."
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveAttendance}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Behavior Incident Modal */}
      {showBehaviorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Record Behavior Incident for {students.find(s => s.id === selectedStudent)?.name || 'Student'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
                <select
                  value={newIncident.type}
                  onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="tardiness">Tardiness</option>
                  <option value="disruption">Classroom Disruption</option>
                  <option value="disrespect">Disrespect to Staff</option>
                  <option value="incomplete_work">Incomplete Work</option>
                  <option value="bullying">Bullying</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the incident..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Taken</label>
                <select
                  value={newIncident.action}
                  onChange={(e) => setNewIncident({...newIncident, action: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="warning">Verbal Warning</option>
                  <option value="detention">Detention</option>
                  <option value="conference">Parent Conference</option>
                  <option value="suspension">Suspension</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowBehaviorModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveBehaviorIncident}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Record Incident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceBehavior;