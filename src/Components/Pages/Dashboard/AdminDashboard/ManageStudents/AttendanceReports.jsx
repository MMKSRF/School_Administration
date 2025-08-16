// src/Components/Pages/Dashboard/AdminDashboard/ManageStudents/AttendanceReports.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttendance, updateAttendance } from '../../../../../Redux/Slices/studentsSlice';
import { FaSearch, FaFilter, FaCalendarAlt, FaFileExport, FaChartBar } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AttendanceReports = () => {
  const dispatch = useDispatch();
  const { attendance, status, error } = useSelector(state => state.students);
  const containerRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    grade: 'all',
    class: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    dispatch(fetchAttendance(dateRange));
  }, [dispatch, dateRange]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.attendance-row', {
        y: 20,
        opacity: 100,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [attendance]);

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.studentId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filters.date || record.date === filters.date;
    const matchesGrade = filters.grade === 'all' || record.grade === filters.grade;
    const matchesClass = filters.class === 'all' || record.classId === filters.class;
    const matchesStatus = filters.status === 'all' || record.status === filters.status;

    return matchesSearch && matchesDate && matchesGrade && matchesClass && matchesStatus;
  });

  const handleStatusChange = (recordId, newStatus) => {
    dispatch(updateAttendance({ recordId, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    // In a real app, this would generate and download a CSV file
    console.log('Exporting attendance data to CSV');
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
          <FaChartBar className="text-indigo-500 mr-3" />
          Attendance Reports
        </h2>
        <button 
          onClick={exportToCSV}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 flex items-center"
        >
          <FaFileExport className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-500" />
          Select Date Range
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search attendance records..."
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
              <FiChevronDown className="ml-2" />
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specific Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({...filters, grade: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Grades</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Statuses</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="excused">Excused</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Attendance Summary Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="text-sm font-medium text-green-800 mb-1">Present</div>
          <div className="text-2xl font-bold text-green-600">
            {attendance.filter(a => a.status === 'present').length}
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <div className="text-sm font-medium text-red-800 mb-1">Absent</div>
          <div className="text-2xl font-bold text-red-600">
            {attendance.filter(a => a.status === 'absent').length}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <div className="text-sm font-medium text-yellow-800 mb-1">Late</div>
          <div className="text-2xl font-bold text-yellow-600">
            {attendance.filter(a => a.status === 'late').length}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="text-sm font-medium text-blue-800 mb-1">Excused</div>
          <div className="text-2xl font-bold text-blue-600">
            {attendance.filter(a => a.status === 'excused').length}
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      {status === 'loading' ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
      ) : filteredAttendance.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No attendance records found</div>
          <p className="text-gray-500">Try adjusting your date range or filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="attendance-row hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {record?.studentName?.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                        <div className="text-sm text-gray-500">{record.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Grade {record.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.class || 'Not assigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={record.status}
                      onChange={(e) => handleStatusChange(record.id, e.target.value)}
                      className={`p-2 rounded-lg text-sm ${getStatusColor(record.status)}`}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="excused">Excused</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="text"
                      defaultValue={record.notes || ''}
                      placeholder="Add notes..."
                      className="p-2 border border-gray-300 rounded-lg text-sm w-full"
                      onBlur={(e) => {
                        if (e.target.value !== record.notes) {
                          dispatch(updateAttendance({ 
                            recordId: record.id, 
                            notes: e.target.value 
                          }));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceReports;