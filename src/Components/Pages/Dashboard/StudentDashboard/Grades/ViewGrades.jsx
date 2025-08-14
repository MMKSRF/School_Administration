// ViewGrades.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaChevronDown, FaChevronUp, FaSearch, FaFilter, FaChartLine } from 'react-icons/fa';
import AssignmentGrades from './AssignmentGrades';
import ProgressChart from './ProgressChart';
import GradeDetailModal from './GradeDetailModal';

const ViewGrades = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const classData = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Mr. Johnson',
      overallGrade: 92.5,
      letterGrade: 'A',
      assignments: [
        { id: 101, title: 'Algebra Final Exam', date: '2023-11-15', score: 94, total: 100, weight: 30 },
        { id: 102, title: 'Quadratic Equations Quiz', date: '2023-11-05', score: 88, total: 100, weight: 15 },
        { id: 103, title: 'Linear Functions Project', date: '2023-10-20', score: 96, total: 100, weight: 20 },
      ],
      trend: [90, 89, 92, 91, 93, 92.5],
      assessments: [
        { type: 'Tests', weight: 50, average: 91.2 },
        { type: 'Quizzes', weight: 20, average: 89.5 },
        { type: 'Homework', weight: 20, average: 94.0 },
        { type: 'Participation', weight: 10, average: 95.0 },
      ]
    },
    {
      id: 2,
      name: 'Science',
      teacher: 'Dr. Williams',
      overallGrade: 87.3,
      letterGrade: 'B+',
      assignments: [
        { id: 201, title: 'Chemistry Lab Report', date: '2023-11-18', score: 85, total: 100, weight: 25 },
        { id: 202, title: 'Physics Midterm', date: '2023-11-10', score: 89, total: 100, weight: 30 },
        { id: 203, title: 'Biology Presentation', date: '2023-10-25', score: 90, total: 100, weight: 20 },
      ],
      trend: [85, 84, 86, 87, 88, 87.3],
      assessments: [
        { type: 'Labs', weight: 40, average: 86.5 },
        { type: 'Exams', weight: 40, average: 88.0 },
        { type: 'Projects', weight: 20, average: 87.0 },
      ]
    },
    // More classes...
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      animateContent();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      animateContent();
    }
  }, [expandedClass, filter, loading]);

  const animateContent = () => {
    if (containerRef.current) {
      gsap.from(containerRef.current.querySelectorAll('.grade-item, .filter-bar, .chart-container'), {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  };

  const toggleClassExpand = (classId) => {
    if (expandedClass === classId) {
      setExpandedClass(null);
    } else {
      setExpandedClass(classId);
      setSelectedClass(classData.find(c => c.id === classId));
    }
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const filteredClasses = classData.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'above90') return matchesSearch && cls.overallGrade >= 90;
    if (filter === '80to90') return matchesSearch && cls.overallGrade >= 80 && cls.overallGrade < 90;
    if (filter === 'below80') return matchesSearch && cls.overallGrade < 80;
    return matchesSearch;
  });

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-yellow-600';
    if (grade >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Grades</h2>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search classes or teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center text-sm px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('all')}
              >
                All Grades
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'above90' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('above90')}
              >
                A (90+)
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === '80to90' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('80to90')}
              >
                B (80-89)
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${filter === 'below80' ? 'bg-gray-100 font-medium' : 'text-gray-700'} hover:bg-gray-100`}
                onClick={() => setFilter('below80')}
              >
                Below 80
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setShowChart(!showChart)}
            className={`flex items-center text-sm px-4 py-3 rounded-lg transition-colors ${
              showChart 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaChartLine className="mr-2" />
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
        </div>
      </div>
      
      {showChart && selectedClass && (
        <div className="chart-container mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <ProgressChart data={selectedClass.trend} />
        </div>
      )}
      
      <div ref={containerRef} className="space-y-4">
        {filteredClasses.length > 0 ? (
          filteredClasses.map(cls => (
            <div 
              key={cls.id} 
              className="grade-item border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md"
            >
              <div 
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  expandedClass === cls.id ? 'bg-indigo-50' : 'bg-white'
                }`}
                onClick={() => toggleClassExpand(cls.id)}
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{cls.name}</h3>
                  <p className="text-gray-600">{cls.teacher}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <span className={`text-2xl font-bold ${getGradeColor(cls.overallGrade)}`}>
                      {cls.overallGrade}%
                    </span>
                    <div className="text-sm text-gray-600">Overall Grade</div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl bg-white">
                    <span className={getGradeColor(cls.overallGrade)}>
                      {cls.letterGrade}
                    </span>
                  </div>
                  
                  <button className="ml-4 text-gray-500">
                    {expandedClass === cls.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
              
              {expandedClass === cls.id && (
                <div className="border-t border-gray-200">
                  <div className="p-4 bg-gray-50 flex flex-wrap gap-4">
                    {cls.assessments.map((assessment, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 flex-1 min-w-[150px]">
                        <div className="text-sm text-gray-500">{assessment.type}</div>
                        <div className="flex justify-between items-end">
                          <span className="text-xl font-bold text-gray-900">{assessment.average}%</span>
                          <span className="text-sm text-gray-500">{assessment.weight}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="h-2 rounded-full bg-indigo-600" 
                            style={{ width: `${assessment.average}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Assignments</h4>
                    <AssignmentGrades 
                      assignments={cls.assignments} 
                      onAssignmentClick={handleAssignmentClick}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">No classes found</div>
            <div className="text-gray-600">Try changing your search or filter criteria</div>
          </div>
        )}
      </div>
      
      {isModalOpen && selectedAssignment && (
        <GradeDetailModal 
          assignment={selectedAssignment} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewGrades;