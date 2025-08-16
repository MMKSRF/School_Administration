// src/Components/Pages/Dashboard/AdminDashboard/ManageClasses/AssignTeachers.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClasses, fetchTeachers, assignTeacherToClass } from '../../../../../Redux/Slices/classesSlice';

import { FaSearch, FaUserCheck, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const AssignTeachers = () => {
  const dispatch = useDispatch();
  const { classes, teachers, status, error } = useSelector(state => state.classes);
  const containerRef = useRef();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.selection-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [classes, teachers]);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchClass.toLowerCase()) || 
    cls.subject.toLowerCase().includes(searchClass.toLowerCase())
  );

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) || 
    teacher.subjects.some(sub => sub.toLowerCase().includes(searchTeacher.toLowerCase()))
  );

  const handleAssign = () => {
    if (selectedClass && selectedTeacher) {
      dispatch(assignTeacherToClass({
        classId: selectedClass,
        teacherId: selectedTeacher
      }));
      setSelectedClass('');
      setSelectedTeacher('');
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Teachers to Classes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classes Panel */}
        <div className="selection-card bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaUsers className="mr-2 text-indigo-500" />
            Select a Class
          </h3>

          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {status === 'loading' ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
          ) : filteredClasses.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400">No classes found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredClasses.map(cls => (
                <div
                  key={cls.id}
                  className={`p-4 bg-white rounded-xl border cursor-pointer transition-all ${
                    selectedClass === cls.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                  onClick={() => setSelectedClass(cls.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{cls.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded mr-2">
                          Grade {cls.grade}
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                          {cls.subject}
                        </span>
                      </div>
                    </div>
                    {cls.teacher && (
                      <div className="text-xs text-gray-500 text-right">
                        <div>Current Teacher:</div>
                        <div className="font-medium">{cls.teacher}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teachers Panel */}
        <div className="selection-card bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaChalkboardTeacher className="mr-2 text-indigo-500" />
            Select a Teacher
          </h3>

          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTeacher}
                onChange={(e) => setSearchTeacher(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {status === 'loading' ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400">No teachers found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredTeachers.map(teacher => (
                <div
                  key={teacher.id}
                  className={`p-4 bg-white rounded-xl border cursor-pointer transition-all ${
                    selectedTeacher === teacher.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                  onClick={() => setSelectedTeacher(teacher.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {teacher.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{teacher.name}</h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {teacher.subjects.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assignment Panel */}
      <div className="mt-6 p-6 bg-indigo-50 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-gray-900">Assignment Summary</h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedClass && (
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500">Selected Class</div>
                  <div className="font-medium">
                    {classes.find(c => c.id === selectedClass)?.name || 'No class selected'}
                  </div>
                </div>
              )}
              {selectedTeacher && (
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500">Selected Teacher</div>
                  <div className="font-medium">
                    {teachers.find(t => t.id === selectedTeacher)?.name || 'No teacher selected'}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAssign}
            disabled={!selectedClass || !selectedTeacher}
            className={`px-6 py-3 rounded-xl flex items-center ${
              !selectedClass || !selectedTeacher
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <FaUserCheck className="mr-2" />
            Assign Teacher
          </button>
        </div>

        {selectedClass && selectedTeacher && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
            <h4 className="text-sm font-medium text-indigo-800 mb-2">Compatibility Check:</h4>
            <div className="text-sm text-indigo-700">
              <p className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Subject match: {classes.find(c => c.id === selectedClass)?.subject} is in {teachers.find(t => t.id === selectedTeacher)?.subjects.join(', ')}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Schedule availability: Free during class time
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignTeachers;