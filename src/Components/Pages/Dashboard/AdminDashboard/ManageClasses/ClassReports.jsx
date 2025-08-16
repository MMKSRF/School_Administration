// src/Components/Pages/Dashboard/AdminDashboard/ManageClasses/ClassReports.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClassReport } from '../../../../../Redux/Slices/classesSlice';
import { FaSearch, FaFilter, FaChartBar, FaFileExport, FaArrowLeft } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ClassReports = () => {
  const dispatch = useDispatch();
  const { report, status, error } = useSelector(state => state.classes);
  const containerRef = useRef();
  const [selectedClass, setSelectedClass] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchClassReport({ classId: selectedClass, range: timeRange }));
    }
  }, [dispatch, selectedClass, timeRange]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.report-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      if (report) {
        gsap.from('.stat-card', {
          scale: 0.8,
          opacity: 100,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.2)'
        });
        
        gsap.fromTo(
      '.chart-bar',
      { height: 0 },
      {
        height: (index, target) => {
          console.log(`Bar ${index} percent:`, target.dataset.percent); // <-- log here
          return `${target.dataset.percent}`;
        },
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1
      }
);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [report]);

  const handleExport = () => {
    // In a real app, this would generate and download a report
    console.log('Exporting class report');
  };

  // Sample classes data
  const classes = [
    { id: 'c1', name: 'Math 101', grade: 9, subject: 'Mathematics' },
    { id: 'c2', name: 'Science A', grade: 10, subject: 'Science' },
    { id: 'c3', name: 'English Literature', grade: 11, subject: 'English' }
  ];

  // Sample report data
  const sampleReport = {
    attendance: {
      present: 85,
      absent: 8,
      late: 7,
      excused: 2
    },
    performance: {
      average: 87,
      distribution: [
        { grade: 'A', count: 12, percent: 100 },
        { grade: 'B', count: 18, percent: 45 },
        { grade: 'C', count: 6, percent: 15 },
        { grade: 'D', count: 3, percent: 7.5 },
        { grade: 'F', count: 1, percent: 2.5 }
      ]
    },
    topStudents: [
      { name: 'Emma Johnson', grade: 98 },
      { name: 'Noah Williams', grade: 96 },
      { name: 'Olivia Brown', grade: 94 }
    ],
    strugglingStudents: [
      { name: 'Liam Davis', grade: 62 },
      { name: 'Ava Miller', grade: 58 }
    ]
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaChartBar className="text-indigo-500 mr-3" />
          Class Performance Reports
        </h2>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 flex items-center"
        >
          <FaFileExport className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Class Selection and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a class to view report</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} (Grade {cls.grade} {cls.subject})
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
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

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="semester">Current Semester</option>
                <option value="year">Current School Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Summary Report</option>
                <option>Detailed Report</option>
                <option>Attendance Only</option>
                <option>Performance Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Filter</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>All Students</option>
                <option>Struggling Students Only</option>
                <option>Top Performers</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {!selectedClass ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
            <FaChartBar className="text-indigo-500 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Class</h3>
          <p className="text-gray-500">Choose a class from the dropdown above to view its performance report</p>
        </div>
      ) : status === 'loading' ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Generating report for {classes.find(c => c.id === selectedClass)?.name}...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : (
        <div className="report-card space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat-card bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <div className="text-sm font-medium text-indigo-700 mb-1">Average Grade</div>
              <div className="text-3xl font-bold text-indigo-600">{sampleReport.performance.average}%</div>
            </div>
            <div className="stat-card bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-sm font-medium text-green-700 mb-1">Attendance Rate</div>
              <div className="text-3xl font-bold text-green-600">{sampleReport.attendance.present}%</div>
            </div>
            <div className="stat-card bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              <div className="text-sm font-medium text-yellow-700 mb-1">Struggling Students</div>
              <div className="text-3xl font-bold text-yellow-600">{sampleReport.strugglingStudents.length}</div>
            </div>
            <div className="stat-card bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="text-sm font-medium text-purple-700 mb-1">Top Performers</div>
              <div className="text-3xl font-bold text-purple-600">{sampleReport.topStudents.length}</div>
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
            <div className="flex items-end h-40 space-x-2 mt-0">
              {sampleReport.performance.distribution.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                 
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg chart-bar"
                    data-percent={item.percent}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{item.grade}</div>
                  <div className="text-xs font-medium">{item.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top and Struggling Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {sampleReport.topStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade: {student.grade}%</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Top {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Students Needing Attention</h3>
              <div className="space-y-3">
                {sampleReport.strugglingStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade: {student.grade}%</div>
                      </div>
                    </div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{sampleReport.attendance.present}%</div>
                <div className="text-sm text-green-800">Present</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{sampleReport.attendance.absent}%</div>
                <div className="text-sm text-red-800">Absent</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{sampleReport.attendance.late}%</div>
                <div className="text-sm text-yellow-800">Late</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{sampleReport.attendance.excused}%</div>
                <div className="text-sm text-blue-800">Excused</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassReports;