// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/ReportsHistory.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaFilePdf, FaFileExcel, FaPrint, FaCalendarAlt, FaSearch, 
  FaFilter, FaHistory, FaChartBar, FaUserGraduate, FaClipboardList,
  FaFileDownload, FaClock, FaPlus, FaTrash, FaShareAlt, FaSyncAlt
} from 'react-icons/fa';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
         PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, 
                 LineElement, Title, Tooltip, Legend, ArcElement);

const ReportsHistory = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const [timeRange, setTimeRange] = useState('quarter');
  const [reportType, setReportType] = useState('summary');
  const [reports, setReports] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'weekly',
    day: 'monday',
    time: '09:00',
    reportType: 'academic-summary',
    recipients: []
  });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [students, setStudents] = useState([]);

  // Initialize mock data
  useEffect(() => {
    // Mock student data
    const mockStudents = [
      { id: 's1', name: 'Emma Johnson', grade: '10', className: 'Science A' },
      { id: 's2', name: 'Noah Williams', grade: '10', className: 'Science A' },
      { id: 's3', name: 'Olivia Brown', grade: '9', className: 'Math B' },
      { id: 's4', name: 'Liam Davis', grade: '11', className: 'History C' },
      { id: 's5', name: 'Ava Miller', grade: '11', className: 'History C' }
    ];
    
    // Mock reports
    const mockReports = [
      {
        id: 'r1',
        type: 'academic',
        title: 'Quarter 1 Academic Summary',
        date: '2023-10-15',
        generatedBy: 'Home Room Teacher',
        status: 'generated',
        content: {
          classAverage: 85.2,
          topPerformer: 'Ava Miller (95%)',
          strugglingStudents: ['Noah Williams', 'Liam Davis'],
          improvement: '+3.1% from last quarter'
        }
      },
      {
        id: 'r2',
        type: 'attendance',
        title: 'September Attendance Report',
        date: '2023-10-01',
        generatedBy: 'System',
        status: 'generated',
        content: {
          attendanceRate: 92.5,
          absentStudents: 3,
          tardyStudents: 5,
          perfectAttendance: ['Emma Johnson', 'Ava Miller']
        }
      },
      {
        id: 'r3',
        type: 'behavior',
        title: 'Behavior Incidents - Q1',
        date: '2023-10-10',
        generatedBy: 'Home Room Teacher',
        status: 'generated',
        content: {
          totalIncidents: 12,
          resolved: 8,
          unresolved: 4,
          mostCommonIssue: 'Tardiness'
        }
      },
      {
        id: 'r4',
        type: 'comprehensive',
        title: 'Mid-Year Comprehensive Report',
        date: '2023-12-15',
        generatedBy: 'Scheduled',
        status: 'scheduled',
        content: null
      }
    ];
    
    // Mock scheduled reports
    const mockScheduledReports = [
      {
        id: 'sr1',
        reportType: 'academic-summary',
        frequency: 'weekly',
        day: 'monday',
        time: '09:00',
        nextRun: '2023-10-23 09:00',
        recipients: ['admin@school.edu', 'principal@school.edu'],
        status: 'active'
      },
      {
        id: 'sr2',
        reportType: 'attendance-detail',
        frequency: 'monthly',
        day: '1',
        time: '08:00',
        nextRun: '2023-11-01 08:00',
        recipients: ['admin@school.edu'],
        status: 'active'
      },
      {
        id: 'sr3',
        reportType: 'comprehensive',
        frequency: 'quarterly',
        day: 'last friday',
        time: '10:00',
        nextRun: '2023-12-29 10:00',
        recipients: ['admin@school.edu', 'principal@school.edu', 'district@edu.org'],
        status: 'paused'
      }
    ];
    
    setStudents(mockStudents);
    setReports(mockReports);
    setScheduledReports(mockScheduledReports);
  }, []);

  const generateReport = () => {
    setGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: `r${reports.length + 1}`,
        type: activeTab,
        title: `${timeRange} ${reportType} Report - ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString().split('T')[0],
        generatedBy: 'Home Room Teacher',
        status: 'generated',
        content: {
          // Mock content based on report type
          ...(activeTab === 'academic' && {
            classAverage: Math.floor(Math.random() * 20) + 80,
            topPerformer: students[Math.floor(Math.random() * students.length)].name,
            improvement: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 5).toFixed(1)}%`
          }),
          ...(activeTab === 'attendance' && {
            attendanceRate: Math.floor(Math.random() * 20) + 80,
            absentStudents: Math.floor(Math.random() * 5),
            tardyStudents: Math.floor(Math.random() * 8),
            perfectAttendance: [students[0].name, students[4].name]
          }),
          ...(activeTab === 'behavior' && {
            totalIncidents: Math.floor(Math.random() * 15),
            resolved: Math.floor(Math.random() * 10),
            mostCommonIssue: ['Tardiness', 'Disruption', 'Incomplete Work'][Math.floor(Math.random() * 3)]
          })
        }
      };
      
      setReports(prev => [newReport, ...prev]);
      setPreviewReport(newReport);
      setGeneratingReport(false);
    }, 1500);
  };

  const scheduleReport = () => {
    const newSchedule = {
      id: `sr${scheduledReports.length + 1}`,
      ...scheduleConfig,
      nextRun: calculateNextRun(scheduleConfig),
      status: 'active'
    };
    
    setScheduledReports(prev => [newSchedule, ...prev]);
    setShowScheduleModal(false);
  };

  const calculateNextRun = (config) => {
    const now = new Date();
    
    switch(config.frequency) {
      case 'daily':
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate() + 1).padStart(2, '0')} ${config.time}`;
      case 'weekly':
        { const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + (7 - now.getDay() + 1) % 7 || 7);
        return `${nextMonday.getFullYear()}-${String(nextMonday.getMonth() + 1).padStart(2, '0')}-${String(nextMonday.getDate()).padStart(2, '0')} ${config.time}`; }
      case 'monthly':
        { const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-01 ${config.time}`; }
      default:
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${config.time}`;
    }
  };

  const deleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
    if (previewReport?.id === id) setPreviewReport(null);
  };

  const toggleScheduleStatus = (id) => {
    setScheduledReports(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, status: schedule.status === 'active' ? 'paused' : 'active' } 
          : schedule
      )
    );
  };

  const deleteSchedule = (id) => {
    setScheduledReports(prev => prev.filter(s => s.id !== id));
  };

  const renderReportPreview = () => {
    if (!previewReport) return null;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{previewReport.title}</h3>
            <div className="text-sm text-gray-500 mt-1">
              Generated on {previewReport.date} by {previewReport.generatedBy}
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FaShareAlt />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FaFileDownload />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FaPrint />
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          {previewReport.type === 'academic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700">Class Average</div>
                  <div className="text-2xl font-bold">{previewReport.content.classAverage}%</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-700">Top Performer</div>
                  <div className="text-xl font-bold">{previewReport.content.topPerformer}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-700">Improvement</div>
                  <div className="text-xl font-bold">{previewReport.content.improvement}</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Student Performance Distribution</h4>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: students.map(s => s.name),
                      datasets: [{
                        label: 'Performance %',
                        data: students.map(() => Math.floor(Math.random() * 30) + 70),
                        backgroundColor: '#3B82F6'
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {previewReport.type === 'attendance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700">Attendance Rate</div>
                  <div className="text-2xl font-bold">{previewReport.content.attendanceRate}%</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-700">Absent Students</div>
                  <div className="text-2xl font-bold">{previewReport.content.absentStudents}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-700">Tardy Students</div>
                  <div className="text-2xl font-bold">{previewReport.content.tardyStudents}</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Attendance Trend</h4>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                      datasets: [{
                        label: 'Attendance %',
                        data: [92, 89, 95, 94],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {previewReport.type === 'behavior' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700">Total Incidents</div>
                  <div className="text-2xl font-bold">{previewReport.content.totalIncidents}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-700">Resolved</div>
                  <div className="text-2xl font-bold">{previewReport.content.resolved}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-700">Most Common Issue</div>
                  <div className="text-xl font-bold">{previewReport.content.mostCommonIssue}</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Incident Types Distribution</h4>
                <div className="h-64">
                  <Pie 
                    data={{
                      labels: ['Tardiness', 'Disruption', 'Incomplete Work', 'Other'],
                      datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: ['#EF4444', '#FBBF24', '#3B82F6', '#8B5CF6']
                      }]
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 flex items-center">
              <FaFilePdf className="mr-2" /> Export PDF
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 flex items-center">
              <FaFileExcel className="mr-2" /> Export Excel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderReportsList = () => (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports
              .filter(report => 
                (filterStatus === 'all' || report.status === filterStatus) &&
                report.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'generated' ? 'bg-green-100 text-green-800' : 
                      report.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setPreviewReport(report)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteReport(report.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {reports.filter(r => 
          (filterStatus === 'all' || r.status === filterStatus) &&
          r.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-12">
            <FaClipboardList className="mx-auto text-gray-400 text-3xl mb-3" />
            <h4 className="text-gray-500 font-medium">No reports found</h4>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or generate a new report
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderScheduledReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledReports.map(schedule => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {schedule.reportType.replace('-', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {schedule.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.nextRun}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {schedule.recipients.length} recipients
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      schedule.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleScheduleStatus(schedule.id)}
                        className={`px-2 py-1 rounded ${
                          schedule.status === 'active' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {schedule.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => deleteSchedule(schedule.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center mx-auto"
        >
          <FaPlus className="mr-2" /> New Scheduled Report
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Report Generator</h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-700">Time Range:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="quarter">Quarter</option>
                <option value="semester">Semester</option>
                <option value="year">Year</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-700">Report Type:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2"
              >
                <option value="summary">Summary</option>
                <option value="detailed">Detailed</option>
                <option value="comparative">Comparative</option>
              </select>
            </div>
            
            <button
              onClick={generateReport}
              disabled={generatingReport}
              className={`px-4 py-2 rounded-xl flex items-center ${
                generatingReport 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {generatingReport ? (
                <>
                  <FaSyncAlt className="animate-spin mr-2" /> Generating...
                </>
              ) : (
                <>
                  <FaFilePdf className="mr-2" /> Generate Report
                </>
              )}
            </button>
          </div>
        </div>
        
        {previewReport && renderReportPreview()}
      </div>
      
      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 md:mb-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
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
              <option value="generated">Generated</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
            <FaHistory className="mr-2" />
            View Archive
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'academic'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaUserGraduate className={`inline mr-2 ${activeTab === 'academic' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Academic Reports
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'attendance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaClock className={`inline mr-2 ${activeTab === 'attendance' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Attendance Reports
          </button>
          <button
            onClick={() => setActiveTab('behavior')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'behavior'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaChartBar className={`inline mr-2 ${activeTab === 'behavior' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Behavior Reports
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'scheduled'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalendarAlt className={`inline mr-2 ${activeTab === 'scheduled' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Scheduled Reports
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'scheduled' ? renderScheduledReports() : renderReportsList()}
      </div>
      
      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Schedule New Report</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={scheduleConfig.reportType}
                  onChange={(e) => setScheduleConfig({...scheduleConfig, reportType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="academic-summary">Academic Summary</option>
                  <option value="academic-detailed">Academic Detailed</option>
                  <option value="attendance-summary">Attendance Summary</option>
                  <option value="attendance-detail">Attendance Detail</option>
                  <option value="behavior-summary">Behavior Summary</option>
                  <option value="comprehensive">Comprehensive Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={scheduleConfig.frequency}
                  onChange={(e) => setScheduleConfig({...scheduleConfig, frequency: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semester">Semester</option>
                </select>
              </div>
              
              {scheduleConfig.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
                  <select
                    value={scheduleConfig.day}
                    onChange={(e) => setScheduleConfig({...scheduleConfig, day: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
              )}
              
              {scheduleConfig.frequency === 'monthly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day of Month</label>
                  <select
                    value={scheduleConfig.day}
                    onChange={(e) => setScheduleConfig({...scheduleConfig, day: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="1">1st</option>
                    <option value="15">15th</option>
                    <option value="last">Last Day</option>
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={scheduleConfig.time}
                  onChange={(e) => setScheduleConfig({...scheduleConfig, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients (comma separated)</label>
                <textarea
                  value={scheduleConfig.recipients.join(', ')}
                  onChange={(e) => setScheduleConfig({...scheduleConfig, recipients: e.target.value.split(',').map(e => e.trim())})}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter email addresses separated by commas"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={scheduleReport}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsHistory;