// src/Components/Pages/TeacherDashboard/DashboardWidgets/RecentAnnouncements.jsx
import React, { useState } from 'react';

const RecentAnnouncements = ({ announcements }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState([1]);
  
  // Toggle announcement expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Toggle pin status
  const togglePin = (id) => {
    if (pinnedAnnouncements.includes(id)) {
      setPinnedAnnouncements(pinnedAnnouncements.filter(pinId => pinId !== id));
    } else {
      setPinnedAnnouncements([...pinnedAnnouncements, id]);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Announcements</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {announcements.map(announcement => (
          <div 
            key={announcement.id} 
            className={`px-6 py-4 ${pinnedAnnouncements.includes(announcement.id) ? 'bg-yellow-50' : ''}`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                  {pinnedAnnouncements.includes(announcement.id) && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pinned
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(announcement.date)} • By {announcement.author}
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="text-gray-400 hover:text-yellow-600"
                  onClick={() => togglePin(announcement.id)}
                >
                  {pinnedAnnouncements.includes(announcement.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                </button>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => toggleExpand(announcement.id)}
                >
                  {expandedId === announcement.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {expandedId === announcement.id && (
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  This is a detailed description of the announcement. It provides more context and information about the event or news being shared. 
                  Teachers can read the full details here to stay informed about important school updates.
                </p>
                <div className="mt-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm">
                    View attached document
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
          View All Announcements
        </button>
      </div>
    </div>
  );
};

export default RecentAnnouncements;