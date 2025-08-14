// src/Components/Pages/TeacherDashboard/ManageStudents/AttendanceTracker.jsx
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const AttendanceTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [classes, setClasses] = useState([
    { id: 1, name: 'Algebra I', period: 'Period 1', students: 28 },
    { id: 2, name: 'Geometry', period: 'Period 2', students: 25 },
  ]);
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Sarah Johnson', photo: '', attendance: {} },
    { id: 2, name: 'Michael Chen', photo: '', attendance: {} },
    { id: 3, name: 'Emily Rodriguez', photo: '', attendance: {} },
    { id: 4, name: 'David Williams', photo: '', attendance: {} },
    { id: 5, name: 'Olivia Martinez', photo: '', attendance: {} },
  ]);

  // Initialize attendance records
  useEffect(() => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const initialRecords = {};
    
    students.forEach(student => {
      initialRecords[student.id] = student.attendance[dateKey] || 'present';
    });
    
    setAttendanceRecords(initialRecords);
  }, [selectedDate, students, selectedClass]);

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [studentId]: status
    });
  };

  // Save attendance
  const saveAttendance = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    
    const updatedStudents = students.map(student => ({
      ...student,
      attendance: {
        ...student.attendance,
        [dateKey]: attendanceRecords[student.id]
      }
    }));
    
    setStudents(updatedStudents);
    alert(`Attendance saved for ${selectedDate.toLocaleDateString()}!`);
  };

  // Get attendance stats
  const getAttendanceStats = () => {
    const present = Object.values(attendanceRecords).filter(status => status === 'present').length;
    const absent = Object.values(attendanceRecords).filter(status => status === 'absent').length;
    const late = Object.values(attendanceRecords).filter(status => status === 'late').length;
    const excused = Object.values(attendanceRecords).filter(status => status === 'excused').length;
    
    return { present, absent, late, excused };
  };
  
  const stats = getAttendanceStats();
  
  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Attendance Tracker</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar and class selection */}
          <div className="md:w-1/3">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <Calendar
                date={selectedDate}
                onChange={setSelectedDate}
                className="border rounded-lg shadow-sm"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <div className="space-y-2">
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      selectedClass?.id === cls.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedClass(cls)}
                  >
                    <div className="font-medium text-gray-900">{cls.name}</div>
                    <div className="text-sm text-gray-500">{cls.period} • {cls.students} students</div>
                  </button>
                ))}
              </div>
            </div>
            
            {selectedClass && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Attendance Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-green-800 font-bold text-xl">{stats.present}</div>
                    <div className="text-green-700 text-sm">Present</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-red-800 font-bold text-xl">{stats.absent}</div>
                    <div className="text-red-700 text-sm">Absent</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="text-yellow-800 font-bold text-xl">{stats.late}</div>
                    <div className="text-yellow-700 text-sm">Late</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-blue-800 font-bold text-xl">{stats.excused}</div>
                    <div className="text-blue-700 text-sm">Excused</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Attendance list */}
          <div className="md:w-2/3">
            {selectedClass ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedClass.name}</h3>
                    <p className="text-gray-600">{formatDate(selectedDate)}</p>
                  </div>
                  <button
                    onClick={saveAttendance}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Save Attendance
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-700 font-medium">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {['present', 'late', 'absent', 'excused'].map(status => (
                                <button
                                  key={status}
                                  className={`px-3 py-1 text-xs rounded-full capitalize ${
                                    attendanceRecords[student.id] === status
                                      ? status === 'present' ? 'bg-green-500 text-white' :
                                        status === 'late' ? 'bg-yellow-500 text-white' :
                                        status === 'absent' ? 'bg-red-500 text-white' :
                                        'bg-blue-500 text-white'
                                      : status === 'present' ? 'bg-green-100 text-green-800' :
                                        status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                        status === 'absent' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                  }`}
                                  onClick={() => handleAttendanceChange(student.id, status)}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              placeholder="Add notes..."
                              className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-indigo-500 text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No class selected</h3>
                  <p className="mt-2 text-sm text-gray-500">Select a class and date to track attendance</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;