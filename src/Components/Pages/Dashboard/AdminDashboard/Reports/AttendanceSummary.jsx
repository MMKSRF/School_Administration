// src/Components/Pages/Dashboard/AdminDashboard/Reports/AttendanceSummary.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttendanceSummary } from '../../../../../Redux/Slices/reportsSlice';
import { FaSearch, FaFilter, FaCalendarAlt, FaChartBar, FaUserGraduate } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AttendanceSummary = () => {
  const dispatch = useDispatch();
  const { attendanceSummary, status, error } = useSelector(state => state.reports);
  const containerRef = useRef();
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [filters, setFilters] = useState({
    grade: 'all',
    class: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchAttendanceSummary({ ...dateRange, ...filters }));
  }, [dispatch, dateRange, filters]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.summary-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      if (attendanceSummary) {
        gsap.from('.chart-bar', {
          height: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [attendanceSummary]);

  const handleDateChange = (e, field) => {
    setDateRange({ ...dateRange, [field]: e.target.value });
  };

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaChartBar className="text-indigo-500 mr-3" />
          Attendance Summary
        </h2>
      </div>

      {/* Date Range and Filters */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-500" />
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateChange(e, 'start')}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-500" />
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateChange(e, 'end')}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full h-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 mt-5"
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
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={filters.class}
                onChange={(e) => setFilters({...filters, class: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Classes</option>
                <option value="class1">Class A</option>
                <option value="class2">Class B</option>
                <option value="class3">Class C</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {status === 'loading' ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Generating attendance report...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : attendanceSummary ? (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="summary-card grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <div className="text-sm font-medium text-indigo-700 mb-1">Total Students</div>
              <div className="text-3xl font-bold text-indigo-600">{attendanceSummary.totalStudents}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-sm font-medium text-green-700 mb-1">Overall Attendance Rate</div>
              <div className="text-3xl font-bold text-green-600">{attendanceSummary.overallAttendance}%</div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <div className="text-sm font-medium text-red-700 mb-1">Absenteeism Rate</div>
              <div className="text-3xl font-bold text-red-600">{attendanceSummary.absenteeismRate}%</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              <div className="text-sm font-medium text-yellow-700 mb-1">Average Late Arrivals</div>
              <div className="text-3xl font-bold text-yellow-600">{attendanceSummary.avgLateArrivals}</div>
            </div>
          </div>

          {/* Attendance Trends */}
          <div className="summary-card bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Trends</h3>
            <div className="flex items-end h-48 space-x-2 mt-8">
              {attendanceSummary.dailyTrends?.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg"
                    style={{ height: `${day.attendancePercent}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{day.date}</div>
                  <div className="text-xs font-medium">{day.attendancePercent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade-wise Breakdown */}
          <div className="summary-card bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grade-wise Attendance</h3>
            <div className="space-y-4">
              {attendanceSummary.gradeBreakdown?.map((grade, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Grade {grade.grade}</span>
                    <span>{grade.attendancePercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${grade.attendancePercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{grade.present} present</span>
                    <span>{grade.absent} absent</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top and Bottom Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="summary-card bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-green-500" />
                Best Attendance Classes
              </h3>
              <div className="space-y-3">
                {attendanceSummary.topClasses?.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                    <div className="font-medium">{cls.name}</div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {cls.attendance}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-card bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-red-500" />
                Classes Needing Improvement
              </h3>
              <div className="space-y-3">
                {attendanceSummary.bottomClasses?.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="font-medium">{cls.name}</div>
                    <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {cls.attendance}%
                    </div>
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
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Attendance Data</h3>
          <p className="text-gray-500">Select a date range to view attendance reports</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceSummary;