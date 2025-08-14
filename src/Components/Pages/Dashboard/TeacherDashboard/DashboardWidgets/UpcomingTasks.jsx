// src/Components/Pages/TeacherDashboard/DashboardWidgets/UpcomingTasks.jsx
import React, { useState } from 'react';

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Grade Algebra Quiz', due: '2023-11-15', priority: 'high', completed: false },
    { id: 2, title: 'Prepare Calculus Exam', due: '2023-11-18', priority: 'medium', completed: false },
    { id: 3, title: 'Submit Attendance Report', due: '2023-11-16', priority: 'high', completed: true },
    { id: 4, title: 'Review Student Projects', due: '2023-11-20', priority: 'low', completed: false },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [taskPriority, setTaskPriority] = useState('medium');
  
  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Add new task
  const addNewTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      priority: taskPriority,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setShowForm(false);
  };
  
  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate days until due
  const daysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`px-6 py-4 flex items-start ${task.completed ? 'bg-gray-50' : ''}`}
          >
            <button 
              className={`mr-3 mt-1 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-indigo-500'
              }`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </p>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  Due: {formatDate(task.due)} • 
                  <span className={`ml-1 ${
                    daysUntilDue(task.due) <= 1 ? 'text-red-600 font-medium' : 
                    daysUntilDue(task.due) <= 3 ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {daysUntilDue(task.due) > 0 
                      ? `${daysUntilDue(task.due)} days left` 
                      : daysUntilDue(task.due) === 0 
                        ? 'Today' 
                        : 'Overdue'}
                  </span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => deleteTask(task.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showForm ? (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="mb-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {['high', 'medium', 'low'].map(priority => (
                <button
                  key={priority}
                  className={`px-3 py-1 text-xs rounded-full ${
                    taskPriority === priority
                      ? priority === 'high' ? 'bg-red-500 text-white' :
                        priority === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      : priority === 'high' ? 'bg-red-100 text-red-800' :
                        priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                  }`}
                  onClick={() => setTaskPriority(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button 
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                onClick={addNewTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          className="w-full text-center py-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-50 border-t border-gray-200"
          onClick={() => setShowForm(true)}
        >
          + Add New Task
        </button>
      )}
    </div>
  );
};

export default UpcomingTasks;