// src/Components/Pages/Dashboard/TeacherDashboard/HomeRoom/CommunicationTools.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaComments, FaEnvelope, FaCalendarPlus, FaSearch, 
  FaFilter, FaPaperclip, FaPaperPlane, FaUserCircle,
  FaTimes, FaBell, FaHistory, FaUserFriends, FaChartLine
} from 'react-icons/fa';

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participants, setParticipants] = useState([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Initialize mock data
  useEffect(() => {
    // Mock student data
    const mockStudents = [
      { id: 's1', name: 'Emma Johnson', role: 'student' },
      { id: 's2', name: 'Noah Williams', role: 'student' },
      { id: 's3', name: 'Olivia Brown', role: 'student' },
      { id: 's4', name: 'Liam Davis', role: 'student' },
      { id: 's5', name: 'Ava Miller', role: 'student' }
    ];
    
    // Mock teacher data
    const mockTeachers = [
      { id: 't1', name: 'Mr. Johnson', role: 'teacher' },
      { id: 't2', name: 'Ms. Davis', role: 'teacher' },
      { id: 't3', name: 'Mr. Thompson', role: 'teacher' },
      { id: 't4', name: 'Ms. Roberts', role: 'teacher' }
    ];
    
    // Mock messages
    const mockMessages = [
      {
        id: 'm1',
        sender: 't1',
        recipient: 's1',
        content: 'Emma, your recent science project was exceptional! Let me know if you need any guidance for the next one.',
        timestamp: '2023-10-15 14:30',
        read: true
      },
      {
        id: 'm2',
        sender: 's2',
        recipient: 't1',
        content: 'Mr. Johnson, I\'m struggling with the math assignment. Can we schedule some extra help?',
        timestamp: '2023-10-14 09:15',
        read: false
      },
      {
        id: 'm3',
        sender: 't3',
        recipient: 't1',
        content: 'Team meeting tomorrow at 3 PM to discuss the upcoming parent-teacher conferences.',
        timestamp: '2023-10-13 16:45',
        read: true
      },
      {
        id: 'm4',
        sender: 's5',
        recipient: 't1',
        content: 'I completed the history assignment early. Should I start on the next chapter?',
        timestamp: '2023-10-12 18:20',
        read: true
      }
    ];
    
    // Mock announcements
    const mockAnnouncements = [
      {
        id: 'a1',
        title: 'Science Fair Reminder',
        content: 'Just a reminder that science fair projects are due next Friday. Please submit your proposals by tomorrow.',
        timestamp: '2023-10-15 10:00',
        recipients: ['s1', 's2', 's3', 's4', 's5']
      },
      {
        id: 'a2',
        title: 'Parent-Teacher Conferences',
        content: 'Parent-teacher conferences will be held next week. Please ensure your parents have scheduled a time slot.',
        timestamp: '2023-10-12 14:30',
        recipients: ['s1', 's2', 's3', 's4', 's5']
      },
      {
        id: 'a3',
        title: 'Field Trip Permission',
        content: 'Permission slips for the museum field trip are due by Wednesday. Make sure to return them signed.',
        timestamp: '2023-10-10 09:15',
        recipients: ['s1', 's2', 's3', 's4', 's5']
      }
    ];
    
    // Mock meetings
    const mockMeetings = [
      {
        id: 'mt1',
        title: 'Quarterly Review',
        date: '2023-10-20',
        time: '15:00',
        duration: '60 min',
        participants: ['t1', 't2', 't3', 't4'],
        status: 'scheduled'
      },
      {
        id: 'mt2',
        title: 'Parent Meeting - Noah Williams',
        date: '2023-10-18',
        time: '14:00',
        duration: '30 min',
        participants: ['t1', 's2'],
        status: 'confirmed'
      },
      {
        id: 'mt3',
        title: 'Science Department Meeting',
        date: '2023-10-16',
        time: '10:30',
        duration: '45 min',
        participants: ['t1', 't2', 't3'],
        status: 'completed'
      }
    ];
    
    setStudents(mockStudents);
    setTeachers(mockTeachers);
    setMessages(mockMessages);
    setAnnouncements(mockAnnouncements);
    setMeetings(mockMeetings);
  }, []);

  const getPersonName = (id) => {
    const student = students.find(s => s.id === id);
    if (student) return student.name;
    
    const teacher = teachers.find(t => t.id === id);
    if (teacher) return teacher.name;
    
    return 'Unknown';
  };

  const getPersonRole = (id) => {
    const student = students.find(s => s.id === id);
    if (student) return 'Student';
    
    const teacher = teachers.find(t => t.id === id);
    if (teacher) return 'Teacher';
    
    return 'Unknown';
  };

  const sendMessage = () => {
    if (newMessage.trim() && recipient) {
      const newMsg = {
        id: `m${messages.length + 1}`,
        sender: 't1', // Current teacher
        recipient,
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        read: false
      };
      
      setMessages(prev => [newMsg, ...prev]);
      setNewMessage('');
      setRecipient('');
      setShowMessageModal(false);
    }
  };

  const sendAnnouncement = () => {
    if (announcement.trim()) {
      const newAnn = {
        id: `a${announcements.length + 1}`,
        title: 'Class Announcement',
        content: announcement,
        timestamp: new Date().toLocaleString(),
        recipients: students.map(s => s.id)
      };
      
      setAnnouncements(prev => [newAnn, ...prev]);
      setAnnouncement('');
      setShowAnnouncementModal(false);
    }
  };

  const scheduleMeeting = () => {
    if (meetingTitle && meetingDate && meetingTime && participants.length > 0) {
      const newMeeting = {
        id: `mt${meetings.length + 1}`,
        title: meetingTitle,
        date: meetingDate,
        time: meetingTime,
        duration: '60 min',
        participants,
        status: 'scheduled'
      };
      
      setMeetings(prev => [newMeeting, ...prev]);
      setMeetingTitle('');
      setMeetingDate('');
      setMeetingTime('');
      setParticipants([]);
      setShowMeetingModal(false);
    }
  };

  const toggleParticipant = (id) => {
    if (participants.includes(id)) {
      setParticipants(prev => prev.filter(p => p !== id));
    } else {
      setParticipants(prev => [...prev, id]);
    }
  };

  const renderMessagesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Conversations</h3>
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {[...new Set(messages.map(m => 
              m.sender === 't1' ? m.recipient : m.sender
            ))].map((personId, i) => {
              const personName = getPersonName(personId);
              const personRole = getPersonRole(personId);
              const unread = messages.filter(m => 
                (m.recipient === 't1' && m.sender === personId && !m.read)
              ).length;
              
              const lastMessage = messages.find(m => 
                m.sender === personId || m.recipient === personId
              );
              
              return (
                <div 
                  key={i} 
                  className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setRecipient(personId)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      {personName.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {personName}
                        </h4>
                        {unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unread}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          {lastMessage?.content.substring(0, 30)}...
                        </p>
                        <span className="text-xs text-gray-400">
                          {lastMessage?.timestamp.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {personRole}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              {recipient ? `Chat with ${getPersonName(recipient)}` : 'Select a conversation'}
            </h3>
            <button 
              onClick={() => setShowMessageModal(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              New Message
            </button>
          </div>
          
          <div className="h-[500px] overflow-y-auto p-4">
            {recipient ? (
              <>
                {messages
                  .filter(m => 
                    (m.sender === 't1' && m.recipient === recipient) || 
                    (m.sender === recipient && m.recipient === 't1')
                  )
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((message, i) => (
                    <div 
                      key={i} 
                      className={`mb-4 ${message.sender === 't1' ? 'text-right' : 'text-left'}`}
                    >
                      <div className="inline-block max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-indigo-100 rounded-xl p-3">
                        <div className="text-gray-800">{message.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))
                }
                
                <div className="mt-4 flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`px-4 py-3 rounded-r-xl ${
                      !newMessage.trim() 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaComments className="mx-auto text-4xl mb-3 text-gray-400" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnouncementsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Class Announcements</h3>
        <button 
          onClick={() => setShowAnnouncementModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
        >
          <FaBullhorn className="mr-2" /> New Announcement
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((ann, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100">
              <h4 className="font-medium text-indigo-700">{ann.title}</h4>
              <div className="text-xs text-indigo-500 mt-1">
                {ann.timestamp}
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{ann.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Sent to all students
              </div>
            </div>
          </div>
        ))}
        
        {announcements.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-gray-300 rounded-xl">
            <FaBullhorn className="mx-auto text-gray-400 text-3xl mb-3" />
            <h4 className="text-gray-500 font-medium">No announcements yet</h4>
            <p className="text-gray-400 text-sm mt-1">
              Create your first announcement to share with the class
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMeetingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Scheduled Meetings</h3>
        <button 
          onClick={() => setShowMeetingModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
        >
          <FaCalendarPlus className="mr-2" /> Schedule Meeting
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className={`p-4 border-b ${
              meeting.status === 'scheduled' ? 'bg-yellow-50 border-yellow-100' :
              meeting.status === 'confirmed' ? 'bg-green-50 border-green-100' :
              'bg-gray-50 border-gray-100'
            }`}>
              <div className="flex justify-between">
                <h4 className="font-medium">{meeting.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                  meeting.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  meeting.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {meeting.status}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2" />
                  {meeting.date} at {meeting.time} ({meeting.duration})
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Participants:</div>
              <div className="flex flex-wrap gap-2">
                {meeting.participants.map((p, j) => (
                  <span key={j} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {getPersonName(p)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {meetings.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-gray-300 rounded-xl">
            <FaCalendarAlt className="mx-auto text-gray-400 text-3xl mb-3" />
            <h4 className="text-gray-500 font-medium">No meetings scheduled</h4>
            <p className="text-gray-400 text-sm mt-1">
              Schedule your first meeting with students or colleagues
            </p>
          </div>
        )}
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
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
              <option value="parents">Parents</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
            <FaHistory className="mr-2" />
            View History
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'messages'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaComments className={`inline mr-2 ${activeTab === 'messages' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'announcements'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaBell className={`inline mr-2 ${activeTab === 'announcements' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Announcements
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-6 py-4 font-medium text-sm border-b-2 ${
              activeTab === 'meetings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalendarPlus className={`inline mr-2 ${activeTab === 'meetings' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Meetings
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'messages' ? renderMessagesTab() : 
         activeTab === 'announcements' ? renderAnnouncementsTab() : 
         renderMeetingsTab()}
      </div>
      
      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">New Message</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select recipient</option>
                <optgroup label="Students">
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Student)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Teachers">
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} (Teacher)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your message..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !recipient}
                className={`px-4 py-2 rounded-xl text-white ${
                  !newMessage.trim() || !recipient
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">New Announcement</h3>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Announcement</label>
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your announcement to the class..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAnnouncementModal(false)}
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
                Post Announcement
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Schedule Meeting</h3>
              <button 
                onClick={() => setShowMeetingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
                <input
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter meeting title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                <div className="border border-gray-300 rounded-xl p-3 max-h-40 overflow-y-auto">
                  <div className="font-medium text-gray-700 mb-2">Students:</div>
                  <div className="space-y-2">
                    {students.map(student => (
                      <div key={student.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`student-${student.id}`}
                          checked={participants.includes(student.id)}
                          onChange={() => toggleParticipant(student.id)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`student-${student.id}`} className="ml-2 text-sm text-gray-700">
                          {student.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="font-medium text-gray-700 mt-4 mb-2">Teachers:</div>
                  <div className="space-y-2">
                    {teachers.map(teacher => (
                      <div key={teacher.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`teacher-${teacher.id}`}
                          checked={participants.includes(teacher.id)}
                          onChange={() => toggleParticipant(teacher.id)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`teacher-${teacher.id}`} className="ml-2 text-sm text-gray-700">
                          {teacher.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={scheduleMeeting}
                disabled={!meetingTitle || !meetingDate || !meetingTime || participants.length === 0}
                className={`px-4 py-2 rounded-xl text-white ${
                  !meetingTitle || !meetingDate || !meetingTime || participants.length === 0
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationTools;