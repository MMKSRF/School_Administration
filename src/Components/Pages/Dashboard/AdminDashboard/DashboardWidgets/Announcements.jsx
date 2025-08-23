// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/Announcements.jsx
import React, { useState } from 'react';
import GetPriorityIcon  from "../../../../Ui/ColorsAndIcones/GetPriorityIcon.jsx";
import {
  FaBullhorn, FaTimes, FaExclamation, FaInfoCircle,
  FaPaperPlane, FaPlus, FaUser, FaClock, FaArrowLeft
} from 'react-icons/fa';






import {useDispatch, useSelector} from "react-redux";
import {
  selectAnnouncements,
  selectDismissedAnnouncements
} from "../../../../../Redux/Selectors/AdminSelectors/adminSelectors.js"
import {setDismissedAnnouncements, setAnnouncements} from "../../../../../Redux/Slices/AdminSlice/adminSlice.js";


// Moved outside component to prevent recreation
const defaultAnnouncements = [
  {
    id: 1,
    title: 'System Maintenance',
    content: 'The school portal will be down for maintenance this Saturday from 9 AM to 12 PM.',
    priority: 'medium',
    pinned: true,
    author: 'IT Department',
    date: '2023-10-20'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meetings',
    content: 'Quarterly parent-teacher meetings are scheduled for next week. Please book your slots.',
    priority: 'high',
    pinned: false,
    author: 'Principal Office',
    date: '2023-10-18'
  }
];

const Announcements = () => {
  const  dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncements)
  const dismissedAnnouncements = useSelector(selectDismissedAnnouncements)
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newAnnouncement, setNewAnnouncement] = useState({
    id: Date.now(), // Unique ID based on timestamp
    title: '',
    content: '',
    priority: 'low',
    pinned: false,
    author: 'Admin',
    date: new Date().toLocaleDateString(),
  });

  // const [dismissedAnnouncements, setDismissedAnnouncements] = useState([]);

  // Compute announcements directly
  const safeAnnouncements = announcements.length > 0 ? announcements : defaultAnnouncements;

  // Filter out dismissed announcements for both sections
  const pinnedAnnouncements = safeAnnouncements.filter(a =>
      a.pinned && !dismissedAnnouncements.includes(a.id)
  );

  const regularAnnouncements = safeAnnouncements.filter(a =>
      !a.pinned && !dismissedAnnouncements.includes(a.id)
  );



  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-indigo-100 text-indigo-800';
    }
  };

  const handleDismiss = (id) => {
    setDismissedAnnouncements(prev => [...prev, id]);
    dispatch(setDismissedAnnouncements(id));
  };

  const handleCreateAnnouncement = () => {
    // In a real app, this would be sent to the backend
    // console.log('Creating announcement:', newAnnouncement);
    defaultAnnouncements.push(newAnnouncement)

    // Reset form and close form view
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'low',
      pinned: false,
      author: 'Admin',
      date: new Date().toLocaleDateString()
    });

    dispatch(setAnnouncements(newAnnouncement))


    setShowCreateForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement({
      ...newAnnouncement,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
        {/* Header - same for both views */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBullhorn className="text-indigo-600 mr-2 text-xl" />
              <h3 className="text-xl font-bold text-gray-900">
                {showCreateForm ? "Create Announcement" : "School Announcements"}
              </h3>
            </div>
            {!showCreateForm && (
                <div className="text-sm text-indigo-600">
                  {regularAnnouncements.length + pinnedAnnouncements.length} active
                </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {showCreateForm ? (
              // Create Announcement Form View
              <div className="p-6">
                <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
                >
                  <FaArrowLeft className="mr-2" /> Back to announcements
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newAnnouncement.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter announcement title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                        name="content"
                        value={newAnnouncement.content}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your announcement here..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                          name="priority"
                          value={newAnnouncement.priority}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center mt-6">
                        <input
                            type="checkbox"
                            name="pinned"
                            checked={newAnnouncement.pinned}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Pin this announcement
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleCreateAnnouncement}
                      disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
                      className={`px-4 py-2 rounded-xl text-white ${
                          !newAnnouncement.title.trim() || !newAnnouncement.content.trim()
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                  >
                    <div className="flex items-center">
                      <FaPaperPlane className="mr-2" /> Publish Announcement
                    </div>
                  </button>
                </div>
              </div>
          ) : (
              // Announcements List View
              <>
                {/* Pinned Announcements */}
                {pinnedAnnouncements.length > 0 && (
                    <div className="bg-yellow-50 border-b border-yellow-100">
                      {pinnedAnnouncements.map((announcement) => (
                          <div
                              key={`pinned-${announcement.id}`}
                              className="p-5 border-b border-yellow-100 last:border-0"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <GetPriorityIcon priority={announcement.priority}/>
                              </div>
                              <div className="ml-3 flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pinned
                          </span>
                                </div>
                                <p className="mt-2 text-gray-600">{announcement.content}</p>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                          <span className="flex items-center">
                            <FaUser className="mr-1" /> {announcement.author}
                          </span>
                                  <span className="mx-2">•</span>
                                  <span className="flex items-center">
                            <FaClock className="mr-1" /> {announcement.date}
                          </span>
                                </div>
                                <div className="-mt-3 flex items-center justify-end items-center">
                                      <button
                                          onClick={() => handleDismiss(announcement.id)}
                                          className="text-gray-400 hover:text-gray-600 transition-colors"
                                          title="Dismiss announcement"
                                      >
                                        <FaTimes />
                                      </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}

                {/* Regular Announcements */}
                <div className="flex-1 overflow-y-auto">
                  {regularAnnouncements.length > 0 ? (
                      regularAnnouncements.map((announcement) => (
                          <div
                              key={announcement.id}
                              className="p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <GetPriorityIcon priority={announcement.priority}/>
                              </div>
                              <div className="ml-3 flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority}
                          </span>
                                </div>
                                <p className="mt-2 text-gray-600">{announcement.content}</p>


                                <div className="mt-3 flex items-center justify-between">
                                  <div className="text-xs text-gray-500 w-full">
                            <span className="flex items-center w-full">
                              <FaUser className="mr-1" /> {announcement.author}
                              <span className="mx-2 flex ">•  <FaClock className="mx-2" /> {announcement.date}</span>

                            </span>
                                    <span className="flex items-center justify-end">


                                      <button
                                          onClick={() => handleDismiss(announcement.id)}
                                          className="text-gray-400 hover:text-gray-600 transition-colors "
                                          title="Dismiss announcement"
                                      >
                                    <FaTimes />
                                  </button>
                            </span>
                                  </div>

                                </div>




                              </div>
                            </div>
                          </div>
                      ))
                  ) : (
                      <div className="p-8 text-center">
                        <FaBullhorn className="mx-auto text-gray-300 text-3xl mb-3" />
                        <h4 className="text-gray-500 font-medium">No active announcements</h4>
                        <p className="text-gray-400 text-sm mt-1">
                          Create a new announcement or check pinned messages
                        </p>
                      </div>
                  )}
                </div>
              </>
          )}
        </div>

        {/* Footer - conditionally rendered */}
        {!showCreateForm && (
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> Create New Announcement
              </button>
            </div>
        )}
      </div>
  );
};

export default Announcements;