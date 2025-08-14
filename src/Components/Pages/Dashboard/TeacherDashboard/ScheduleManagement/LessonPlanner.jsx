// src/Components/Pages/TeacherDashboard/ScheduleManagement/LessonPlanner.jsx
import React, { useState } from 'react';

const LessonPlanner = () => {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Linear Equations',
      subject: 'Algebra I',
      date: '2023-11-15',
      duration: '60 min',
      objectives: 'Understand basic linear equations, solve simple equations',
      resources: ['Textbook Chapter 3', 'Worksheet 1'],
      status: 'planned'
    },
    {
      id: 2,
      title: 'Triangle Congruence Theorems',
      subject: 'Geometry',
      date: '2023-11-16',
      duration: '60 min',
      objectives: 'Learn SSS, SAS, ASA congruence theorems',
      resources: ['Geometry Workbook', 'Online interactive tool'],
      status: 'planned'
    },
    {
      id: 3,
      title: 'Derivatives of Polynomial Functions',
      subject: 'Calculus',
      date: '2023-11-17',
      duration: '60 min',
      objectives: 'Master derivative rules for polynomial functions',
      resources: ['Calculus Textbook Chapter 4', 'Practice problems set'],
      status: 'completed'
    }
  ]);
  
  const [newLesson, setNewLesson] = useState({
    title: '',
    subject: '',
    date: '',
    duration: '60 min',
    objectives: '',
    resources: [],
    status: 'planned'
  });
  
  const [showForm, setShowForm] = useState(false);
  const [newResource, setNewResource] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'planned', 'completed'

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson({ ...newLesson, [name]: value });
  };

  // Add resource
  const addResource = () => {
    if (newResource.trim() === '') return;
    setNewLesson({
      ...newLesson,
      resources: [...newLesson.resources, newResource]
    });
    setNewResource('');
  };

  // Remove resource
  const removeResource = (index) => {
    const updatedResources = [...newLesson.resources];
    updatedResources.splice(index, 1);
    setNewLesson({ ...newLesson, resources: updatedResources });
  };

  // Add new lesson
  const addNewLesson = () => {
    if (!newLesson.title || !newLesson.subject || !newLesson.date) return;
    
    const newLessonObj = {
      id: Math.max(0, ...lessons.map(l => l.id)) + 1,
      ...newLesson
    };
    
    setLessons([...lessons, newLessonObj]);
    setShowForm(false);
    setNewLesson({
      title: '',
      subject: '',
      date: '',
      duration: '60 min',
      objectives: '',
      resources: [],
      status: 'planned'
    });
  };

  // Toggle lesson status
  const toggleLessonStatus = (id) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id 
        ? { ...lesson, status: lesson.status === 'completed' ? 'planned' : 'completed' } 
        : lesson
    ));
  };

  // Filter lessons
  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.status === filter);

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">Lesson Planner</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All Lessons
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === 'planned' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('planned')}
          >
            Planned
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === 'completed' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Lesson
        </button>
      </div>

      {showForm && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-3">Create New Lesson Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
              <input
                type="text"
                name="title"
                value={newLesson.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Lesson title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                name="subject"
                value={newLesson.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select subject</option>
                <option value="Algebra I">Algebra I</option>
                <option value="Geometry">Geometry</option>
                <option value="Pre-Calculus">Pre-Calculus</option>
                <option value="Calculus">Calculus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newLesson.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                name="duration"
                value={newLesson.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="30 min">30 minutes</option>
                <option value="60 min">60 minutes</option>
                <option value="90 min">90 minutes</option>
                <option value="120 min">120 minutes</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives</label>
              <textarea
                name="objectives"
                value={newLesson.objectives}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What students will learn..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Resources</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add resource (book, worksheet, etc.)"
                />
                <button
                  onClick={addResource}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newLesson.resources.map((resource, index) => (
                  <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {resource}
                    <button 
                      className="ml-2 text-indigo-600 hover:text-indigo-900"
                      onClick={() => removeResource(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              onClick={addNewLesson}
            >
              Create Lesson
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        {filteredLessons.length > 0 ? (
          <div className="space-y-4">
            {filteredLessons.map(lesson => (
              <div 
                key={lesson.id} 
                className={`border rounded-lg p-4 hover:bg-gray-50 ${
                  lesson.status === 'completed' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {lesson.subject}
                      </span>
                      <span>{lesson.date}</span>
                      <span>{lesson.duration}</span>
                      <span className={`px-2 py-1 rounded ${
                        lesson.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lesson.status === 'completed' ? 'Completed' : 'Planned'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className={`p-2 rounded-full ${
                        lesson.status === 'completed' 
                          ? 'bg-green-200 text-green-700 hover:bg-green-300' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => toggleLessonStatus(lesson.id)}
                    >
                      {lesson.status === 'completed' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                {lesson.objectives && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Learning Objectives</h4>
                    <p className="text-sm text-gray-600">{lesson.objectives}</p>
                  </div>
                )}
                
                {lesson.resources.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Resources</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {lesson.resources.map((resource, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No lesson plans</h3>
            <p className="mt-2 text-sm text-gray-500">
              {filter === 'completed' 
                ? "You haven't completed any lesson plans yet." 
                : "You don't have any lesson plans created."}
            </p>
            <button
              className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              onClick={() => setShowForm(true)}
            >
              Create your first lesson plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlanner;