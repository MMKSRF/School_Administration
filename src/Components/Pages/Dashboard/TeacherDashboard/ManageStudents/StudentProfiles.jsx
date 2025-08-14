// src/Components/Pages/TeacherDashboard/ManageStudents/StudentProfiles.jsx
import React, { useState } from 'react';

const StudentProfiles = () => {
  const [selectedClass, setSelectedClass] = useState('Algebra I');
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      studentId: 'S-2023-001',
      email: 'sarah.johnson@school.edu',
      phone: '(555) 123-4567',
      emergencyContact: 'Mary Johnson (555) 987-6543',
      performance: {
        attendance: '96%',
        averageGrade: 'A-',
        lastAssessment: 'Geometry Quiz: 92%'
      },
      notes: 'Excellent participation, struggles with quadratic equations'
    },
    {
      id: 2,
      name: 'Michael Chen',
      studentId: 'S-2023-002',
      email: 'michael.chen@school.edu',
      phone: '(555) 234-5678',
      emergencyContact: 'James Chen (555) 876-5432',
      performance: {
        attendance: '100%',
        averageGrade: 'A+',
        lastAssessment: 'Algebra Test: 100%'
      },
      notes: 'Exceptional math skills, helps peers with homework'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      studentId: 'S-2023-003',
      email: 'emily.rodriguez@school.edu',
      phone: '(555) 345-6789',
      emergencyContact: 'Carlos Rodriguez (555) 765-4321',
      performance: {
        attendance: '89%',
        averageGrade: 'B',
        lastAssessment: 'Chapter 3 Quiz: 85%'
      },
      notes: 'Needs extra help with word problems'
    },
    {
      id: 4,
      name: 'David Williams',
      studentId: 'S-2023-004',
      email: 'david.williams@school.edu',
      phone: '(555) 456-7890',
      emergencyContact: 'Susan Williams (555) 654-3210',
      performance: {
        attendance: '92%',
        averageGrade: 'B+',
        lastAssessment: 'Homework 5: 88%'
      },
      notes: 'Improving steadily, more confident in class'
    },
    {
      id: 5,
      name: 'Olivia Martinez',
      studentId: 'S-2023-005',
      email: 'olivia.martinez@school.edu',
      phone: '(555) 567-8901',
      emergencyContact: 'Robert Martinez (555) 543-2109',
      performance: {
        attendance: '94%',
        averageGrade: 'A-',
        lastAssessment: 'Midterm Exam: 91%'
      },
      notes: 'Creative problem solver, sometimes rushes through work'
    }
  ]);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setEditedStudent({ ...student });
    setEditMode(false);
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value
    });
  };

  // Save edited student
  const saveStudent = () => {
    const updatedStudents = students.map(student => 
      student.id === editedStudent.id ? editedStudent : student
    );
    
    setStudents(updatedStudents);
    setSelectedStudent(editedStudent);
    setEditMode(false);
    alert('Student profile updated successfully!');
  };

  // Classes for demonstration
  const classes = ['Algebra I', 'Geometry', 'Pre-Calculus', 'Calculus'];

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Student Profiles</h2>
      </div>
      
      <div className="p-6">
        {/* Class selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <div className="flex flex-wrap gap-2">
            {classes.map((className, index) => (
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
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Student list */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900">{selectedClass}</h3>
              <p className="text-sm text-gray-500">{students.length} students</p>
            </div>
            
            <div className="space-y-3">
              {students.map(student => (
                <button
                  key={student.id}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedStudent?.id === student.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectStudent(student)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Student details */}
          <div className="md:w-2/3">
            {selectedStudent ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={editedStudent.name}
                          onChange={handleInputChange}
                          className="text-xl font-bold border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        />
                      ) : (
                        selectedStudent.name
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="mr-4">
                        ID: {editMode ? (
                          <input
                            type="text"
                            name="studentId"
                            value={editedStudent.studentId}
                            onChange={handleInputChange}
                            className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          />
                        ) : (
                          selectedStudent.studentId
                        )}
                      </span>
                      <span>Class: {selectedClass}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {editMode ? (
                      <>
                        <button
                          className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-lg"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg font-medium"
                          onClick={saveStudent}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        onClick={() => setEditMode(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Email</label>
                        {editMode ? (
                          <input
                            type="email"
                            name="email"
                            value={editedStudent.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          />
                        ) : (
                          <div className="text-sm">{selectedStudent.email}</div>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Phone</label>
                        {editMode ? (
                          <input
                            type="tel"
                            name="phone"
                            value={editedStudent.phone}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          />
                        ) : (
                          <div className="text-sm">{selectedStudent.phone}</div>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Emergency Contact</label>
                        {editMode ? (
                          <input
                            type="text"
                            name="emergencyContact"
                            value={editedStudent.emergencyContact}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          />
                        ) : (
                          <div className="text-sm">{selectedStudent.emergencyContact}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Attendance</label>
                        <div className="text-sm">{selectedStudent.performance.attendance}</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Average Grade</label>
                        <div className="text-sm">{selectedStudent.performance.averageGrade}</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Last Assessment</label>
                        <div className="text-sm">{selectedStudent.performance.lastAssessment}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Teacher Notes */}
                  <div className="md:col-span-2 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Teacher Notes</h4>
                    {editMode ? (
                      <textarea
                        name="notes"
                        value={editedStudent.notes}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-700">{selectedStudent.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No student selected</h3>
                  <p className="mt-2 text-sm text-gray-500">Select a student to view their profile</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfiles;