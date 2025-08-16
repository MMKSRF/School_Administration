// src/AdminDashboard/ManageTeachers/ViewTeachers.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddTeacher from './AddTeacher';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Alemu Bekele", email: "alemu@school.edu", type: "Full-time", subjects: ["Math", "Physics"] },
    { id: 2, name: "Tigist Worku", email: "tigist@school.edu", type: "Part-time", availability: "8:00-12:00", subjects: ["Chemistry"] },
    { id: 3, name: "Dawit Mekonnen", email: "dawit@school.edu", type: "Full-time", subjects: ["English", "Literature"] },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const removeTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const addTeacher = (newTeacher) => {
    setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }]);
    setShowAddForm(false);
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">Manage Teachers</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Teacher
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teachers..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <AddTeacher 
          onAddTeacher={addTeacher} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Subjects</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      {teacher.type === "Part-time" && (
                        <div className="text-xs text-gray-600">{teacher.availability}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    teacher.type === "Full-time" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {teacher.type}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map(subject => (
                      <span key={subject} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => removeTeacher(teacher.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTeachers;