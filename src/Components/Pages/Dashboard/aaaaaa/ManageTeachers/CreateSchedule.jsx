// src/AdminDashboard/ManageSchedule/CreateSchedule.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
// import { useNavigate } from 'react-router-dom';

const CreateSchedule = () => {
  // const navigate = useNavigate();
  // const [selectedClass, setSelectedClass] = useState('Grade 9A');
  const [conflicts, setConflicts] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showConflictPanel, setShowConflictPanel] = useState(false);
  
  // Mock data
  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'];
  const subjects = ['Math', 'English', 'Science', 'History', 'Amharic'];
  const teachers = [
    { id: 1, name: 'Alemu Bekele', subjects: ['Math', 'Science'] },
    { id: 2, name: 'Tigist Worku', subjects: ['English', 'Amharic'] },
    { id: 3, name: 'Dawit Mekonnen', subjects: ['History', 'Geography'] },
  ];
  
  // Updated to 7 periods
  const periods = [
    { id: 1, name: 'Period 1', start: '08:00', end: '08:45' },
    { id: 2, name: 'Period 2', start: '08:50', end: '09:35' },
    { id: 3, name: 'Period 3', start: '09:40', end: '10:25' },
    { id: 4, name: 'Period 4', start: '10:30', end: '11:15' },
    { id: 5, name: 'Period 5', start: '11:20', end: '12:05' },
    { id: 6, name: 'Period 6', start: '12:10', end: '12:55' },
    { id: 7, name: 'Period 7', start: '13:00', end: '13:45' },
  ];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const [schedule, setSchedule] = useState(() => 
    classes.map(cls => ({
      class: cls,
      days: days.map(day => ({
        day,
        periods: periods.map(period => ({
          period: period.name,
          subject: '',
          teacher: ''
        }))
      }))
    })
  ));
  
  useEffect(() => {
    if (conflicts.length > 0) {
      gsap.to('.conflict-cell', {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        border: '2px solid #DC2626',
        duration: 0.5,
        yoyo: true,
        repeat: 1
      });
      
      setShowConflictPanel(true);
    }
  }, [conflicts]);
  
  const handleCellChange = (classIndex, dayIndex, periodIndex, field, value) => {
    setSchedule(prev => {
      const newSchedule = [...prev];
      newSchedule[classIndex].days[dayIndex].periods[periodIndex][field] = value;
      return newSchedule;
    });
  };
  
  const detectConflicts = () => {
    const newConflicts = [];
    const teacherAssignments = {};
    
    schedule.forEach((cls, /*classIndex*/) => {
      cls.days.forEach((day, /*dayIndex*/) => {
        day.periods.forEach((period, periodIndex) => {
          if (period.teacher) {
            const key = `${period.teacher}-${day.day}-${period.period}`;
            
            if (teacherAssignments[key]) {
              newConflicts.push({
                teacher: period.teacher,
                day: day.day,
                period: period.period,
                classes: [
                  ...teacherAssignments[key],
                  { class: cls.class, periodIndex }
                ]
              });
            } else {
              teacherAssignments[key] = [{ class: cls.class, periodIndex }];
            }
          }
        });
      });
    });
    
    setConflicts(newConflicts);
    return newConflicts;
  };
  
  const resolveConflict = (conflictIndex) => {
    setConflicts(prev => prev.filter((_, i) => i !== conflictIndex));
  };
  
  const getTeachersForSubject = (subject) => {
    return teachers.filter(teacher => 
      teacher.subjects.includes(subject)
    ).map(t => t.name);
  };
  
  const generateSchedule = () => {
    const detectedConflicts = detectConflicts();
    if (detectedConflicts.length === 0) {
      alert('Schedule generated successfully with no conflicts!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">Create Schedule</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={detectConflicts}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center text-sm md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Check Conflicts
          </button>
          <button 
            onClick={generateSchedule}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center text-sm md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Generate Schedule
          </button>
        </div>
      </div>
      
      {showConflictPanel && conflicts.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-red-800">Schedule Conflicts Detected</h3>
            <button 
              onClick={() => setShowConflictPanel(false)}
              className="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {conflicts.map((conflict, index) => (
              <div key={index} className="p-3 bg-red-100 rounded-md">
                <div className="font-medium text-red-800">
                  Conflict: Teacher {conflict.teacher} double-booked on {conflict.day} during {conflict.period}
                </div>
                <div className="text-sm text-red-700 mt-1">
                  Classes: {conflict.classes.map(c => c.class).join(', ')}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button 
                    onClick={() => {
                      const [/*firstClass*/, ...otherClasses] = conflict.classes;
                      setSchedule(prev => {
                        const newSchedule = [...prev];
                        otherClasses.forEach(({ class: className, periodIndex }) => {
                          const classIndex = newSchedule.findIndex(c => c.class === className);
                          const dayIndex = days.findIndex(d => d === conflict.day);
                          if (classIndex !== -1 && dayIndex !== -1) {
                            newSchedule[classIndex].days[dayIndex].periods[periodIndex].teacher = '';
                          }
                        });
                        return newSchedule;
                      });
                      resolveConflict(index);
                    }}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Auto-clear
                  </button>
                  <button 
                    onClick={() => resolveConflict(index)}
                    className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    Mark as resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        {schedule.map((cls, classIndex) => (
          <div key={cls.class} className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-4">{cls.class}</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-gray-100 border border-gray-300 p-2 min-w-[90px]">
                      Day / Period
                    </th>
                    {periods.map(period => (
                      <th key={period.name} className="border border-gray-300 p-2 bg-gray-100 min-w-[110px]">
                        <div className="font-normal">{period.name}</div>
                        <div className="text-xs text-gray-600">{period.start} - {period.end}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cls.days.map((day, dayIndex) => (
                    <tr key={day.day}>
                      <td className="sticky left-0 z-10 bg-gray-50 border border-gray-300 p-2 font-medium min-w-[90px]">
                        {day.day}
                      </td>
                      {day.periods.map((period, periodIndex) => {
                        const hasConflict = conflicts.some(conflict => 
                          conflict.classes.some(c => 
                            c.class === cls.class && 
                            c.day === day.day && 
                            c.period === period.period
                          )
                        );
                        
                        return (
                          <td 
                            key={`${dayIndex}-${periodIndex}`}
                            className={`border border-gray-300 p-1 ${
                              hasConflict ? 'conflict-cell' : ''
                            } ${
                              selectedCell?.classIndex === classIndex && 
                              selectedCell?.dayIndex === dayIndex && 
                              selectedCell?.periodIndex === periodIndex
                                ? 'bg-blue-100' 
                                : 'bg-white'
                            }`}
                            onClick={() => setSelectedCell({
                              classIndex, 
                              dayIndex, 
                              periodIndex
                            })}
                          >
                            <div className="p-1 h-20 md:h-24 flex flex-col">
                              <select
                                value={period.subject}
                                onChange={(e) => handleCellChange(
                                  classIndex, 
                                  dayIndex, 
                                  periodIndex, 
                                  'subject', 
                                  e.target.value
                                )}
                                className="w-full mb-1 px-1 py-1 text-xs md:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select Subject</option>
                                {subjects.map(subject => (
                                  <option key={subject} value={subject}>
                                    {subject}
                                  </option>
                                ))}
                              </select>
                              
                              {period.subject && (
                                <select
                                  value={period.teacher}
                                  onChange={(e) => handleCellChange(
                                    classIndex, 
                                    dayIndex, 
                                    periodIndex, 
                                    'teacher', 
                                    e.target.value
                                  )}
                                  className="w-full mt-1 px-1 py-1 text-xs md:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select Teacher</option>
                                  {getTeachersForSubject(period.subject).map(teacher => (
                                    <option key={teacher} value={teacher}>
                                      {teacher}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSchedule;