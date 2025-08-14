// UpcomingAssignments.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaFilter, FaPlus, FaSort, FaCalendarAlt, FaBook, FaBell } from 'react-icons/fa';
import AssignmentModal from './AssignmentModal';

const UpcomingAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockData = [
        { 
          id: 1, 
          title: 'Algebra Final Exam', 
          subject: 'Mathematics', 
          dueDate: '2023-12-15', 
          daysLeft: 3,
          priority: 'high',
          completed: false,
          submitted: false,
          description: 'Comprehensive exam covering chapters 5-9. Calculators allowed.',
          attachments: 3,
          reminders: 2
        },
        { 
          id: 2, 
          title: 'Science Project', 
          subject: 'Science', 
          dueDate: '2023-12-18', 
          daysLeft: 6,
          priority: 'medium',
          completed: false,
          submitted: true,
          description: 'Group project on renewable energy sources. Presentation required.',
          attachments: 5,
          reminders: 1
        },
        { 
          id: 3, 
          title: 'Book Report', 
          subject: 'Literature', 
          dueDate: '2023-12-20', 
          daysLeft: 8,
          priority: 'low',
          completed: true,
          submitted: true,
          description: 'Report on "To Kill a Mockingbird". 5-7 pages, double spaced.',
          attachments: 1,
          reminders: 0
        },
        { 
          id: 4, 
          title: 'WWII Essay', 
          subject: 'History', 
          dueDate: '2023-12-22', 
          daysLeft: 10,
          priority: 'low',
          completed: false,
          submitted: false,
          description: 'Essay on the causes of World War II. Minimum 1500 words.',
          attachments: 2,
          reminders: 3
        },
        { 
          id: 5, 
          title: 'Chemistry Lab Report', 
          subject: 'Science', 
          dueDate: '2023-12-12', 
          daysLeft: 1,
          priority: 'high',
          completed: false,
          submitted: false,
          description: 'Lab report for experiment #7: Chemical Reactions.',
          attachments: 4,
          reminders: 0
        },
      ];
      
      setAssignments(mockData);
      setLoading(false);
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current) return;
    
    gsap.from(containerRef.current.children, {
      duration: 0.6,
      y: 20,
      opacity: 100,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.7
    });
  }, [loading, filter, sortBy]);

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      default: return 'Low Priority';
    }
  };

  const toggleCompletion = (id) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, completed: !assignment.completed } 
        : assignment
    ));
  };

  const handleReminder = (id) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, reminders: assignment.reminders + 1 } 
        : assignment
    ));
    
    // Animation for reminder button
    gsap.to(`#reminder-${id}`, {
      y: -5,
      duration: 0.2,
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  };

  const filteredAssignments = assignments
    .filter(assignment => {
      if (filter === 'completed') return assignment.completed;
      if (filter === 'pending') return !assignment.completed;
      if (filter === 'submitted') return assignment.submitted;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse p-3 border border-gray-200 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Assignments</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaFilter className="mr-1.5 text-sm" />
              Filter
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => { setFilter('all'); setShowFilters(false); }}
                >
                  All Assignments
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'pending' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => { setFilter('pending'); setShowFilters(false); }}
                >
                  Pending
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'completed' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => { setFilter('completed'); setShowFilters(false); }}
                >
                  Completed
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'submitted' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => { setFilter('submitted'); setShowFilters(false); }}
                >
                  Submitted
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaSort className="mr-1.5 text-sm" />
              Sort
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'dueDate' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setSortBy('dueDate')}
              >
                By Due Date
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'priority' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setSortBy('priority')}
              >
                By Priority
              </button>
            </div>
          </div>
          
          <button className="flex items-center text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FaPlus className="mr-1.5 text-sm" />
            Add Task
          </button>
        </div>
      </div>
      
      <div ref={containerRef} className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className={`p-3 border rounded-lg transition-all hover:shadow-sm relative ${
                assignment.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => handleAssignmentClick(assignment)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start w-full">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompletion(assignment.id);
                    }}
                    className="mt-0.5 mr-3"
                  >
                    {assignment.completed ? (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      assignment.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {assignment.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
                        <FaBook className="mr-1" />
                        {assignment.subject}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(assignment.priority)}`}>
                        {getPriorityText(assignment.priority)}
                      </span>
                      {assignment.attachments > 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {assignment.attachments} attachment{assignment.attachments > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 pl-8">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-1.5 text-sm" />
                  <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    assignment.daysLeft <= 1 ? 'text-red-600' : 
                    assignment.daysLeft <= 3 ? 'text-yellow-600' : 'text-gray-900'
                  }`}>
                    {assignment.daysLeft} {assignment.daysLeft === 1 ? 'day' : 'days'} left
                  </span>
                  
                  <button 
                    id={`reminder-${assignment.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReminder(assignment.id);
                    }}
                    className={`p-1.5 rounded-full ${
                      assignment.reminders > 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <FaBell />
                    {assignment.reminders > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-2xs rounded-full w-4 h-4 flex items-center justify-center">
                        {assignment.reminders}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No assignments found</div>
            <div className="text-sm text-gray-500">Try changing your filters or add a new assignment</div>
          </div>
        )}
      </div>
      
      {isModalOpen && selectedAssignment && (
        <AssignmentModal 
          assignment={selectedAssignment} 
          onClose={() => setIsModalOpen(false)}
          onComplete={() => toggleCompletion(selectedAssignment.id)}
        />
      )}
    </div>
  );
};

export default UpcomingAssignments;
