// src/Components/Pages/Dashboard/AdminDashboard/ManageStudents/AssignClasses.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, fetchClasses, assignStudentToClass } from '../../../../../Redux/Slices/studentsSlice';
import { FaSearch, FaUserCheck, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const AssignClasses = () => {
  const dispatch = useDispatch();
  const { students, classes, status, error } = useSelector(state => state.students);
  const containerRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.student-card', {
        y: 20,
        opacity: 100,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [students]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const handleAssign = () => {
    if (selectedClass && selectedStudents.length > 0) {
      dispatch(assignStudentToClass({
        classId: selectedClass,
        studentIds: selectedStudents
      }));
      setSelectedStudents([]);
      setSelectedClass('');
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Students to Classes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {status === 'loading' ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No students found</div>
              <p className="text-gray-500">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map(student => (
                <div 
                  key={student.id}
                  className={`student-card p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedStudents.includes(student.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                  onClick={() => toggleStudentSelection(student.id)}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      selectedStudents.includes(student.id)
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedStudents.includes(student.id) ? (
                        <FaUserCheck />
                      ) : (
                        <span>{student.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{student.name}</h3>
                      <p className="text-xs text-gray-500">ID: {student.id} • Grade {student.grade}</p>
                      {student.class && (
                        <p className="text-xs text-gray-500 mt-1">
                          Current Class: <span className="font-medium">{student.class}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assignment Panel */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaUsers className="mr-2 text-indigo-500" />
            Assignment Summary
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaChalkboardTeacher className="mr-2 text-indigo-500" />
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} (Grade {cls.grade}, {(cls.students?.length || 0)} students)
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Selected Students: {selectedStudents.length}
              </span>
              {selectedStudents.length > 0 && (
                <button 
                  onClick={() => setSelectedStudents([])}
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {selectedStudents.length === 0 ? (
              <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-400">No students selected</p>
                <p className="text-xs text-gray-400 mt-1">Click on students to select them</p>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {students
                  .filter(student => selectedStudents.includes(student.id))
                  .map(student => (
                    <div key={student.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm truncate">{student.name}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudents(prev => prev.filter(id => id !== student.id));
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <button
            onClick={handleAssign}
            disabled={!selectedClass || selectedStudents.length === 0}
            className={`w-full py-3 rounded-xl flex items-center justify-center ${
              !selectedClass || selectedStudents.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <FaUserCheck className="mr-2" />
            Assign to Class
          </button>

          {selectedClass && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <h4 className="text-sm font-medium text-indigo-800 mb-2">Class Info:</h4>
              {classes.find(c => c.id === selectedClass) ? (
                <>
                  <p className="text-sm text-indigo-700">
                    <span className="font-medium">Teacher:</span> {classes.find(c => c.id === selectedClass).teacher || 'Not assigned'}
                  </p>
                 <p className="text-sm text-indigo-700">
                    <span className="font-medium">Current Students:</span> 
                    {classes.find(c => c.id === selectedClass)?.students?.length || 0}
                 </p>
                  <p className="text-sm text-indigo-700">
                    <span className="font-medium">Capacity:</span> {classes.find(c => c.id === selectedClass).capacity || 'No limit'}
                  </p>
                </>
              ) : (
                <p className="text-sm text-indigo-700">Select a class to view details</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignClasses;