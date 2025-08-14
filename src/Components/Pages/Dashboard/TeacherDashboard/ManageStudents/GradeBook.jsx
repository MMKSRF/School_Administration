// src/Components/Pages/TeacherDashboard/ManageStudents/GradeBook.jsx
import React, { useState } from 'react';

const GradeBook = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Algebra Quiz 1', dueDate: '2023-11-10', maxPoints: 20 },
    { id: 2, title: 'Geometry Homework', dueDate: '2023-11-15', maxPoints: 15 },
    { id: 3, title: 'Chapter 3 Test', dueDate: '2023-11-20', maxPoints: 100 },
  ]);
  
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      grades: { 
        1: { points: 18, feedback: 'Good job!' },
        2: { points: 14, feedback: '' }
      } 
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      grades: { 
        1: { points: 20, feedback: 'Perfect score!' },
        2: { points: 15, feedback: 'Excellent work' }
      } 
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      grades: { 
        1: { points: 15, feedback: 'Needs improvement' },
        2: { points: 12, feedback: '' }
      } 
    },
    { 
      id: 4, 
      name: 'David Williams', 
      grades: { 
        1: { points: 16, feedback: '' },
        2: { points: 13, feedback: 'Good effort' }
      } 
    },
    { 
      id: 5, 
      name: 'Olivia Martinez', 
      grades: { 
        1: { points: 19, feedback: 'Well done' },
        2: { points: 14, feedback: '' }
      } 
    },
  ]);
  
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    dueDate: '',
    maxPoints: 100
  });
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);

  // Handle grade change
  const handleGradeChange = (studentId, assignmentId, points) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          grades: {
            ...student.grades,
            [assignmentId]: {
              ...(student.grades[assignmentId] || {}),
              points: Number(points)
            }
          }
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
  };

  // Handle feedback change
  const handleFeedbackChange = (studentId, assignmentId, feedback) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          grades: {
            ...student.grades,
            [assignmentId]: {
              ...(student.grades[assignmentId] || { points: 0 }),
              feedback
            }
          }
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
  };

  // Add new assignment
  const addNewAssignment = () => {
    if (!newAssignment.title || !newAssignment.dueDate) return;
    
    const newAssignmentObj = {
      id: assignments.length + 1,
      title: newAssignment.title,
      dueDate: newAssignment.dueDate,
      maxPoints: newAssignment.maxPoints || 100
    };
    
    setAssignments([...assignments, newAssignmentObj]);
    setNewAssignment({ title: '', dueDate: '', maxPoints: 100 });
    setShowAssignmentForm(false);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate grade percentage
  const calculateGrade = (student) => {
    let totalPoints = 0;
    let maxPossible = 0;
    
    assignments.forEach(assignment => {
      if (student.grades[assignment.id]?.points !== undefined) {
        totalPoints += student.grades[assignment.id].points;
        maxPossible += assignment.maxPoints;
      }
    });
    
    return maxPossible > 0 ? Math.round((totalPoints / maxPossible) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Grade Book</h2>
      </div>
      
      <div className="p-6">
        {/* Class selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <div className="flex space-x-4">
            {['Algebra I', 'Geometry', 'Pre-Calculus', 'Calculus'].map((className, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedClass === className
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedClass(className)}
              >
                {className}
              </button>
            ))}
          </div>
        </div>
        
        {selectedClass ? (
          <>
            {/* Assignment management */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">{selectedClass} Assignments</h3>
              <button
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                onClick={() => setShowAssignmentForm(!showAssignmentForm)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Assignment
              </button>
            </div>
            
            {showAssignmentForm && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Create New Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Assignment title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Points</label>
                    <input
                      type="number"
                      value={newAssignment.maxPoints}
                      onChange={(e) => setNewAssignment({...newAssignment, maxPoints: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      min="1"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setShowAssignmentForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    onClick={addNewAssignment}
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            )}
            
            {/* Grade table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                      Student
                    </th>
                    {assignments.map(assignment => (
                      <th key={assignment.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <span className="font-medium">{assignment.title}</span>
                          <span className="text-xs text-gray-400">{formatDate(assignment.dueDate)} • {assignment.maxPoints} pts</span>
                        </div>
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overall Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
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
                      {assignments.map(assignment => {
                        const grade = student.grades[assignment.id] || { points: '', feedback: '' };
                        return (
                          <td key={`${student.id}-${assignment.id}`} className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                              <input
                                type="number"
                                min="0"
                                max={assignment.maxPoints}
                                value={grade.points}
                                onChange={(e) => handleGradeChange(student.id, assignment.id, e.target.value)}
                                className="w-16 text-center px-2 py-1 border border-gray-300 rounded-md text-sm"
                                placeholder="0"
                              />
                              <span className="text-xs mt-1 text-gray-500">
                                /{assignment.maxPoints}
                              </span>
                              <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">
                                Add feedback
                              </button>
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 text-center">
                        <div className="text-lg font-bold">
                          {calculateGrade(student)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {calculateGrade(student) >= 90 ? 'A' : 
                           calculateGrade(student) >= 80 ? 'B' : 
                           calculateGrade(student) >= 70 ? 'C' : 
                           calculateGrade(student) >= 60 ? 'D' : 'F'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No class selected</h3>
              <p className="mt-2 text-sm text-gray-500">Select a class to view and edit grades</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeBook; 