import  { useState } from 'react';

import DashboardHome from './DashboardHome';
import AttendanceTracker from './ManageStudents/AttendanceTracker';
import GradeBook from './ManageStudents/GradeBook';
import StudentProfiles from './ManageStudents/StudentProfiles';
import DailySchedule from './ScheduleManagement/DailySchedule';
import CalendarView from './ScheduleManagement/CalendarView';
import LessonPlanner from './ScheduleManagement/LessonPlanner';





export default function DashboardInside({activeSection}) {
    
    const [activeStudentTab, setActiveStudentTab] = useState(0);
    const [activeScheduleTab, setActiveScheduleTab] = useState(0);
   
    const teacherData = {
        name: 'Ms. Johnson',
        subjects: ['Algebra I', 'Geometry', 'Pre-Calculus'],
        classes: 4,
        students: 105,
        upcomingEvents: [
        { id: 1, title: 'Parent-Teacher Conference', date: '2023-11-15' },
        { id: 2, title: 'Algebra Midterm', date: '2023-11-20' },
        ]
    };

   





    return (
        <div>
            {activeSection === 'students' && <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {['Attendance', 'Grades', 'Profiles'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    activeStudentTab === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveStudentTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeStudentTab === 0 && <AttendanceTracker />}
            {activeStudentTab === 1 && <GradeBook />}
            {activeStudentTab === 2 && <StudentProfiles />}
          </div>}
          {activeSection === "schedule" && <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {['Daily', 'Calendar', 'Lessons'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    activeScheduleTab === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveScheduleTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeScheduleTab === 0 && <DailySchedule />}
            {activeScheduleTab === 1 && <CalendarView />}
            {activeScheduleTab === 2 && <LessonPlanner />}
          </div>}

          {activeSection === 'dashboard' && <DashboardHome teacherData={teacherData} />}
          {activeSection != 'students' && activeSection != 'students' && activeSection != 'schedule' && <DashboardHome teacherData={teacherData} />}
        </div>
    )
}















