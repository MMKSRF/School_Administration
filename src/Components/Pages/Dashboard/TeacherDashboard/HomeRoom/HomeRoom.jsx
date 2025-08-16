// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/HomeRoom.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaUserFriends, FaGraduationCap, FaChartLine, FaBullhorn, 
  FaClipboardList, FaCalendarAlt, FaBell, FaCog, FaSignOutAlt,
  FaHome, FaUserGraduate, FaChartBar, FaComments, FaFileAlt,
  FaClock, FaExclamationTriangle, FaPlus, FaSearch, FaFilter
} from 'react-icons/fa';
import StudentManagement from './StudentManagement';
import AcademicOversight from './AcademicOversight';
import AttendanceBehavior from './AttendanceBehavior';
import ClassProgressInsights from './ClassProgressInsights';
import CommunicationTools from './CommunicationTools';
import ReportsHistory from './ReportsHistory';

const HomeRoom = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [classStats, setClassStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

  // Initialize mock data
  useEffect(() => {
    // Mock notifications
    const mockNotifications = [
      { id: 'n1', title: 'New Assignment Submitted', content: 'Emma Johnson submitted the science project', time: '10 min ago', read: false },
      { id: 'n2', title: 'Parent Meeting Request', content: 'Mr. Williams requested a meeting', time: '2 hours ago', read: false },
      { id: 'n3', title: 'Attendance Alert', content: 'Noah Williams was absent today', time: '1 day ago', read: true },
      { id: 'n4', title: 'Report Generated', content: 'Quarterly academic report is ready', time: '2 days ago', read: true }
    ];
    
    // Mock class statistics
    const mockClassStats = {
      totalStudents: 24,
      averagePerformance: 85.2,
      attendanceRate: 92.5,
      behaviorIncidents: 3,
      pendingPromotions: 2,
      incompleteAssignments: 5
    };
    
    // Mock recent activity
    const mockRecentActivity = [
      { id: 'a1', action: 'Graded assignments', subject: 'Mathematics', time: '30 min ago' },
      { id: 'a2', action: 'Sent announcement', subject: 'Science Fair Reminder', time: '2 hours ago' },
      { id: 'a3', action: 'Updated student record', subject: 'Liam Davis', time: '1 day ago' },
      { id: 'a4', action: 'Scheduled meeting', subject: 'Parent-Teacher Conference', time: '2 days ago' }
    ];
    
    // Mock upcoming events
    const mockUpcomingEvents = [
      { id: 'e1', title: 'Science Fair', date: '2023-11-15', time: '10:00 AM' },
      { id: 'e2', title: 'Parent-Teacher Conference', date: '2023-11-18', time: '2:00 PM' },
      { id: 'e3', title: 'Field Trip - Museum', date: '2023-11-22', time: '9:00 AM' },
      { id: 'e4', title: 'Quarter Exams', date: '2023-11-30', time: 'All Day' }
    ];
    
    // Mock pending tasks
    const mockPendingTasks = [
      { id: 't1', title: 'Review promotion requests', priority: 'high', due: 'Today' },
      { id: 't2', title: 'Submit quarterly reports', priority: 'medium', due: 'Tomorrow' },
      { id: 't3', title: 'Prepare parent meeting notes', priority: 'low', due: 'In 3 days' }
    ];
    
    setNotifications(mockNotifications);
    setUnreadNotifications(mockNotifications.filter(n => !n.read).length);
    setClassStats(mockClassStats);
    setRecentActivity(mockRecentActivity);
    setUpcomingEvents(mockUpcomingEvents);
    setPendingTasks(mockPendingTasks);
  }, []);

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadNotifications(prev => prev - 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadNotifications(0);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm opacity-80">Total Students</div>
              <div className="text-3xl font-bold mt-1">{classStats.totalStudents}</div>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <FaUserFriends className="text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm flex items-center">
            <span className="bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">5 new this year</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm opacity-80">Class Performance</div>
              <div className="text-3xl font-bold mt-1">{classStats.averagePerformance}%</div>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <FaChartLine className="text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${classStats.averagePerformance}%` }}
              ></div>
            </div>
            <div className="text-xs opacity-80 mt-1">+3.2% from last quarter</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm opacity-80">Attendance Rate</div>
              <div className="text-3xl font-bold mt-1">{classStats.attendanceRate}%</div>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <FaClock className="text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm flex items-center">
            <span className="bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
              {classStats.behaviorIncidents} incidents this month
            </span>
          </div>
        </div>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaClipboardList />
                  </div>
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-500 mt-1">{activity.subject}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-4">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
            <button className="text-indigo-600 text-sm font-medium">View Calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaCalendarAlt />
                  </div>
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {event.date} • {event.time}
                  </div>
                </div>
                <button className="text-indigo-600 text-sm font-medium">Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Pending Tasks</h3>
          <button className="text-indigo-600 text-sm font-medium flex items-center">
            <FaPlus className="mr-1" /> Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingTasks.map(task => (
            <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <h4 className="font-medium">{task.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Due: <span className="font-medium">{task.due}</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200">
                  Mark Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Access */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('students')}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
              <FaUserGraduate className="text-xl" />
            </div>
            <span className="text-sm font-medium">Student Management</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('academics')}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <FaGraduationCap className="text-xl" />
            </div>
            <span className="text-sm font-medium">Academic Oversight</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('attendance')}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-amber-50 hover:border-amber-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
              <FaClock className="text-xl" />
            </div>
            <span className="text-sm font-medium">Attendance & Behavior</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('reports')}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
              <FaFileAlt className="text-xl" />
            </div>
            <span className="text-sm font-medium">Reports & History</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/*
      <div className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-5 flex items-center justify-center border-b border-indigo-700">
          <div className="text-2xl font-bold">Class<span className="text-indigo-300">Portal</span></div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaHome className="mr-3" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'students' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaUserGraduate className="mr-3" />
              <span>Student Management</span>
            </button>
            
            <button
              onClick={() => setActiveTab('academics')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'academics' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaGraduationCap className="mr-3" />
              <span>Academic Oversight</span>
            </button>
            
            <button
              onClick={() => setActiveTab('attendance')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'attendance' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaClock className="mr-3" />
              <span>Attendance & Behavior</span>
            </button>
            
            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'progress' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaChartBar className="mr-3" />
              <span>Class Progress Insights</span>
            </button>
            
            <button
              onClick={() => setActiveTab('communication')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'communication' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaComments className="mr-3" />
              <span>Communication Tools</span>
            </button>






           









            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'reports' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              <FaFileAlt className="mr-3" />
              <span>Reports & History</span>
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-indigo-700">
          <button className="w-full flex items-center px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50 transition-colors">
            <FaCog className="mr-3" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50 transition-colors">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10">



        
          




          {/* Secondary Navigation */}
          <div className="border-t border-gray-200 px-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'dashboard'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'students'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('academics')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'academics'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Academics
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'attendance'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'reports'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reports
              </button>
              <button
                onClick={() => setActiveTab('communication')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'communication'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Communication
              </button>
              
              <button
                onClick={() => setActiveTab('progress')}
                
                 className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'progress'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>Class Progress Insights</span>
              </button>

            


            
            </div>
          </div>
        </header>
        
        {/* Notification Panel */}
        {showNotificationPanel && (
          <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Notifications</h3>
              <button 
                onClick={markAllAsRead}
                className="text-sm text-indigo-600"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{notification.title}</div>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{notification.content}</div>
                  <div className="text-xs text-gray-400 mt-2">{notification.time}</div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No notifications
                </div>
              )}
            </div>
            <div className="p-3 text-center border-t border-gray-200">
              <button className="text-sm text-indigo-600">View all notifications</button>
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'academics' && <AcademicOversight />}
          {activeTab === 'attendance' && <AttendanceBehavior />}
          {activeTab === 'progress' && <ClassProgressInsights />}
          {activeTab === 'communication' && <CommunicationTools />}
          {activeTab === 'reports' && <ReportsHistory />}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ClassPortal • Homeroom Teacher Dashboard v2.0
        </footer>
      </div>
    </div>
  );
};

export default HomeRoom;