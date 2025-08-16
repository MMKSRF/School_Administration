// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/Announcements.jsx
import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
import { FaBullhorn, FaTimes, FaExclamation, FaInfoCircle } from 'react-icons/fa';

const Announcements = ({ announcements = [] }) => { // default to empty array
  const containerRef = useRef();
  const itemRefs = useRef([]);
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState([]);
  
  useEffect(() => {
    const safeAnnouncements = announcements || [];

    // Separate pinned announcements
    const pinned = safeAnnouncements.filter(a => a.pinned);
    // const notPinned = safeAnnouncements.filter(a => !a.pinned);
    setPinnedAnnouncements(pinned);
    
    // const ctx = gsap.context(() => {
    //   gsap.from(containerRef.current, {
    //     y: 20,
    //     opacity: 100,
    //     duration: 0.6,
    //     ease: 'power2.out'
    //   });
      
    //   gsap.from(itemRefs.current, {
    //     y: 12,
    //     opacity: 0,
    //     stagger: 0.1,
    //     duration: 0.5,
    //     delay: 0.3,
    //     ease: 'back.out(1.2)'
    //   });
      
    //   if (pinned.length > 0) {
    //     gsap.from('.pinned-announcement', {
    //       height: 0,
    //       opacity: 0,
    //       duration: 0.8,
    //       ease: 'power2.out',
    //       stagger: 0.2
    //     });
    //   }
    // }, containerRef);
    
    // return () => ctx.revert();
  }, [announcements]);

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high':
        return <FaExclamation className="text-red-500" />;
      case 'medium':
        return <FaInfoCircle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-indigo-500" />;
    }
  };

  const handleDismiss = (id) => {
    console.log('Dismiss announcement:', id);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center">
          <FaBullhorn className="text-indigo-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">School Announcements</h3>
        </div>
      </div>
      
      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-100">
          {pinnedAnnouncements.map((announcement, index) => (
            <div 
              key={`pinned-${index}`}
              className="pinned-announcement p-5 border-b border-yellow-100 last:border-0"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pinned
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{announcement.content}</p>
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <span>Posted by {announcement.author}</span>
                    <span className="mx-2">•</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Regular Announcements */}
      <div className="divide-y divide-gray-100">
        {(announcements || [])
          .filter(a => !a.pinned)
          .map((announcement, index) => (
            <div 
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="p-5 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                  <p className="mt-2 text-gray-600">{announcement.content}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span>Posted by {announcement.author}</span>
                      <span className="mx-2">•</span>
                      <span>{announcement.date}</span>
                    </div>
                    <button 
                      onClick={() => handleDismiss(announcement.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        
        {(announcements || []).length === 0 && (
          <div className="p-8 text-center">
            <FaBullhorn className="mx-auto text-gray-300 text-3xl mb-3" />
            <h4 className="text-gray-500 font-medium">No announcements</h4>
            <p className="text-gray-400 text-sm mt-1">
              Check back later for updates or create a new announcement
            </p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50">
        <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-indigo-600 hover:bg-gray-100 font-medium transition-colors duration-200">
          Create New Announcement
        </button>
      </div>
    </div>
  );
};

export default Announcements;