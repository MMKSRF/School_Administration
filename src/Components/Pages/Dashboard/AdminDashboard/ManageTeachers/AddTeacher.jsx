// src/AdminDashboard/ManageTeachers/AddTeacher.jsx
import React, { useState } from 'react';

const AddTeacher = ({ onAddTeacher, onCancel }) => {
  const [teacherData, setTeacherData] = useState({
    name: '',
    email: '',
    type: 'Full-time',
    availability: '',
    subjects: []
  });
  
  const [newSubject, setNewSubject] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData(prev => ({ ...prev, [name]: value }));
  };

  const addSubject = () => {
    if (newSubject.trim() && !teacherData.subjects.includes(newSubject.trim())) {
      setTeacherData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const removeSubject = (subject) => {
    setTeacherData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeacher(teacherData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 md:p-6 mb-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Add New Teacher</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={teacherData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={teacherData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Full-time"
                  checked={teacherData.type === "Full-time"}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Full-time</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Part-time"
                  checked={teacherData.type === "Part-time"}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Part-time</span>
              </label>
            </div>
          </div>
          
          {teacherData.type === "Part-time" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input
                type="text"
                name="availability"
                value={teacherData.availability}
                onChange={handleChange}
                placeholder="e.g., 8:00-12:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
            <div className="flex">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Add subject"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addSubject}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {teacherData.subjects.map(subject => (
                <div key={subject} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;