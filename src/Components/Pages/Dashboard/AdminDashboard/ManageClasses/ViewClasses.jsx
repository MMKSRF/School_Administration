// src/Components/Pages/Dashboard/AdminDashboard/ManageClasses/ViewClasses.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClasses, deleteClass } from '../../../../../Redux/Slices/classesSlice';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaUsers, FaChartLine } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ViewClasses = () => {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector(state => state.classes);
  const containerRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    grade: 'all',
    subject: 'all',
    teacher: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.class-card', {
        y: 20,
        opacity: 100,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [classes]);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filters.grade === 'all' || cls.grade === parseInt(filters.grade);
    const matchesSubject = filters.subject === 'all' || cls.subject === filters.subject;
    const matchesTeacher = filters.teacher === 'all' || cls.teacherId === filters.teacher;

    return matchesSearch && matchesGrade && matchesSubject && matchesTeacher;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class? All associated data will be removed.')) {
      dispatch(deleteClass(id));
    }
  };

  const getTeacherName = (teacherId) => {
    // In a real app, this would come from the teachers slice
    const teachers = {
      't1': 'Mr. Johnson',
      't2': 'Ms. Davis',
      't3': 'Dr. Smith'
    };
    return teachers[teacherId] || 'Not assigned';
  };

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Music', 'Physical Education'];
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Manage Classes</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center">
          <FaPlus className="mr-2" />
          Create New Class
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            <FaFilter className="mr-2 text-gray-600" />
            Filters
            {showFilters ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronDown className="ml极2" />
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({...filters, grade: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
              <select
                value={filters.teacher}
                onChange={(e) => setFilters({...filters, teacher: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2"
              >
                <option value="all">All Teachers</option>
                <option value="t1">Mr. Johnson</option>
                <option value="t2">Ms. Davis</option>
                <option value="t3">Dr. Smith</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Classes Grid */}
      {status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No classes found</div>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
            <FaPlus className="inline mr-2" />
            Create New Class
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(cls => (
            <div 
              key={cls.id}
              className="class-card bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 mr-2">
                        Grade {cls.grade}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        {cls.subject}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(cls.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FaUsers className="mr-2" />
                  <span>{cls.students.length} students</span>
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FaChartLine className="mr-2" />
                  <span>Avg. Performance: {cls.avgPerformance || 'N/A'}</span>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-1">Teacher</div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {getTeacherName(cls.teacherId).charAt(0)}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      {getTeacherName(cls.teacherId)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Room {cls.room}
                </span>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewClasses;