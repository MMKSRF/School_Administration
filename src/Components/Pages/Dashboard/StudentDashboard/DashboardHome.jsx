// DashboardHome.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ClassOverview from './DashboardWidgets/ClassOverview';
import AttendanceSummary from './DashboardWidgets/AttendanceSummary';
import UpcomingAssignments from './DashboardWidgets/UpcomingAssignments';
import WelcomeBanner from './WelcomeBanner';

const DashboardHome = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.6,
        y: 20,
        opacity: 100,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <WelcomeBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClassOverview />
        </div>
        <div>
          <AttendanceSummary />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAssignments />
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <a href="/student/grades" className="flex items-center p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Grades
              </a>
              <a href="/student/schedule" className="flex items-center p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Schedule
              </a>
              <a href="/student/requests" className="flex items-center p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Submit Request
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <div className="font-medium text-gray-900">Science Fair</div>
                <div className="text-sm text-gray-600">Dec 15, 2023 • 9:00 AM</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <div className="font-medium text-gray-900">Final Exams Begin</div>
                <div className="text-sm text-gray-600">Dec 18, 2023 • All Day</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <div className="font-medium text-gray-900">Winter Break Starts</div>
                <div className="text-sm text-gray-600">Dec 22, 2023 • After School</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;