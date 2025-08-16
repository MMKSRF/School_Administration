// src/Components/Pages/Dashboard/AdminDashboard/Reports/PerformanceSummary.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPerformanceSummary } from '../../../../../Redux/Slices/reportsSlice';
import { FaSearch, FaFilter, FaChartLine, FaUserGraduate, FaMedal, FaExclamationTriangle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PerformanceSummary = () => {
  const dispatch = useDispatch();
  const { performanceSummary, status, error } = useSelector(state => state.reports);
  const containerRef = useRef();
  const [term, setTerm] = useState('semester1');
  const [filters, setFilters] = useState({
    grade: 'all',
    subject: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchPerformanceSummary({ term, ...filters }));
  }, [dispatch, term, filters]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.summary-card', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      if (performanceSummary) {
        gsap.from('#chart-bar', {
          width: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [performanceSummary]);

  const terms = [
    { id: 'semester1', name: 'Semester 1' },
    { id: 'semester2', name: 'Semester 2' },
    { id: 'final', name: 'Final Year' }
  ];

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Music'];

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaChartLine className="text-indigo-500 mr-3" />
          Performance Summary
        </h2>
      </div>

      {/* Term Selection and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {terms.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 mt-5"
            >
              <FaFilter className="mr-2 text-gray-600" />
              Filters
              {showFilters ? (
                <FiChevronUp className="ml-2" />
              ) : (
                <FiChevronDown className="ml-2" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({...filters, grade: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Grades</option>
                {[9, 10, 11, 12].map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {status === 'loading' ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Generating performance report...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : performanceSummary ? (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="summary-card grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <div className="text-sm font-medium text-indigo-700 mb-1">Overall Average</div>
              <div className="text-3xl font-bold text-indigo-600">{performanceSummary.overallAverage}%</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-sm font-medium text-green-700 mb-1">Pass Rate</div>
              <div className="text-3xl font-bold text-green-600">{performanceSummary.passRate}%</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="text-sm font-medium text-purple-700 mb-1">Top Performers</div>
              <div className="text-3xl font-bold text-purple-600">{performanceSummary.topPerformersCount}</div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="summary-card bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Subject-wise Performance</h3>
            <div className="space-y-4">
              {performanceSummary.subjectPerformance?.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{subject.name}</span>
                    <span>{subject.average}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${subject.average}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>High: {subject.highScore}%</span>
                    <span>Low: {subject.lowScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="summary-card bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
            <div className="flex items-end h-40 space-x-2 mt-8">
              {performanceSummary.gradeDistribution?.map((grade, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-3/4 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg"
                    id='chart-bar'
                    style={{ height: `${grade.percent}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{grade.range}</div>
                  <div className="text-xs font-medium">{grade.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top and Struggling Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="summary-card bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaMedal className="mr-2 text-yellow-500" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {performanceSummary.topPerformers?.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade {student.grade}, {student.class}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-indigo-600">{student.average}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-card bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-500" />
                Students Needing Support
              </h3>
              <div className="space-y-3">
                {performanceSummary.strugglingStudents?.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade {student.grade}, {student.class}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-red-600">{student.average}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
            <FaUserGraduate className="text-indigo-500 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Performance Data</h3>
          <p className="text-gray-500">Select a term to view performance reports</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceSummary;