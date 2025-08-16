// src/Components/Pages/Dashboard/AdminDashboard/ManageTeachers/SetPeriods.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeriods, addPeriod, updatePeriod, deletePeriod } from '../../../../../Redux/Slices/teachersSlice';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const SetPeriods = () => {
  const dispatch = useDispatch();
  const { periods, status, error } = useSelector(state => state.teachers);
  const containerRef = useRef();
  const [editingId, setEditingId] = useState(null);
  const [newPeriod, setNewPeriod] = useState({
    name: '',
    startTime: '08:00',
    endTime: '09:00'
  });
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(fetchPeriods());
  }, [dispatch]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.period-row', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [periods]);

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.startTime && newPeriod.endTime) {
      dispatch(addPeriod(newPeriod));
      setNewPeriod({
        name: '',
        startTime: '08:00',
        endTime: '09:00'
      });
    }
  };

  const handleEdit = (period) => {
    setEditingId(period.id);
    setEditData({
      name: period.name,
      startTime: period.startTime,
      endTime: period.endTime
    });
  };

  const handleSaveEdit = (id) => {
    dispatch(updatePeriod({ id, ...editData }));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewPeriod(prev => ({ ...prev, [name]: value }));
  };

  const formatTimeDisplay = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const validateTimeOrder = (start, end) => {
    return start < end;
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">School Periods Configuration</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* Add New Period */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Period</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period Name</label>
            <input
              type="text"
              name="name"
              value={newPeriod.name}
              onChange={handleNewChange}
              placeholder="e.g., Period 1, Morning Session"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={newPeriod.startTime}
              onChange={handleNewChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={newPeriod.endTime}
              onChange={handleNewChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddPeriod}
              disabled={!newPeriod.name || !newPeriod.startTime || !newPeriod.endTime || 
                      !validateTimeOrder(newPeriod.startTime, newPeriod.endTime)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                !newPeriod.name || !newPeriod.startTime || !newPeriod.endTime || 
                !validateTimeOrder(newPeriod.startTime, newPeriod.endTime)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <FaPlus className="mr-2" />
              Add Period
            </button>
          </div>
        </div>
        {!validateTimeOrder(newPeriod.startTime, newPeriod.endTime) && (
          <p className="mt-2 text-sm text-red-600">End time must be after start time</p>
        )}
      </div>

      {/* Periods List */}
      {status === 'loading' ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : periods.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No periods configured</div>
          <p className="text-gray-500">Add your school's daily periods using the form above</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Range
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {periods.map((period) => (
                <tr key={period.id} className="period-row hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === period.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{period.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === period.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          name="startTime"
                          value={editData.startTime}
                          onChange={handleEditChange}
                          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          name="endTime"
                          value={editData.endTime}
                          onChange={handleEditChange}
                          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {formatTimeDisplay(period.startTime)} - {formatTimeDisplay(period.endTime)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calculateDuration(period.startTime, period.endTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === period.id ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEdit(period.id)}
                          disabled={!editData.name || !editData.startTime || !editData.endTime || 
                                    !validateTimeOrder(editData.startTime, editData.endTime)}
                          className={`p-2 rounded-lg ${
                            !editData.name || !editData.startTime || !editData.endTime || 
                            !validateTimeOrder(editData.startTime, editData.endTime)
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(period)}
                          className="p-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this period?')) {
                              dispatch(deletePeriod(period.id));
                            }
                          }}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
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

// Helper function to calculate duration between two times
function calculateDuration(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  let hours = endHour - startHour;
  let minutes = endMinute - startMinute;
  
  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  
  return `${hours}h ${minutes}m`;
}

export default SetPeriods;