// src/AdminDashboard/ManagePeriods/SetPeriods.jsx
import React, { useState } from 'react';

const SetPeriods = () => {
  const [periods, setPeriods] = useState([
    { id: 1, name: 'Period 1', start: '08:00', end: '08:45' },
    { id: 2, name: 'Period 2', start: '08:50', end: '09:35' },
    { id: 3, name: 'Period 3', start: '09:40', end: '10:25' },
    { id: 4, name: 'Period 4', start: '10:30', end: '11:15' },
    { id: 5, name: 'Break', start: '11:15', end: '11:45' },
    { id: 6, name: 'Period 5', start: '11:45', end: '12:30' },
    { id: 7, name: 'Period 6', start: '12:35', end: '13:20' },
    { id: 8, name: 'Period 7', start: '13:25', end: '14:10' },
  ]);
  
  const [newPeriod, setNewPeriod] = useState({
    name: '',
    start: '',
    end: ''
  });
  
  const handleInputChange = (id, field, value) => {
    setPeriods(prev => prev.map(period => 
      period.id === id ? { ...period, [field]: value } : period
    ));
  };
  
  const handleNewPeriodChange = (e) => {
    const { name, value } = e.target;
    setNewPeriod(prev => ({ ...prev, [name]: value }));
  };
  
  const addPeriod = () => {
    if (newPeriod.name && newPeriod.start && newPeriod.end) {
      setPeriods(prev => [
        ...prev, 
        { 
          id: prev.length + 1, 
          ...newPeriod 
        }
      ]);
      setNewPeriod({ name: '', start: '', end: '' });
    }
  };
  
  const removePeriod = (id) => {
    setPeriods(prev => prev.filter(period => period.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">Set Period Times</h2>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Period Name</label>
            <input
              type="text"
              name="name"
              value={newPeriod.name}
              onChange={handleNewPeriodChange}
              placeholder="e.g., Period 1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="start"
              value={newPeriod.start}
              onChange={handleNewPeriodChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="end"
              value={newPeriod.end}
              onChange={handleNewPeriodChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addPeriod}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add Period
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Period</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Start Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">End Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {periods.map(period => {
              const start = new Date(`2000-01-01T${period.start}:00`);
              const end = new Date(`2000-01-01T${period.end}:00`);
              const duration = (end - start) / (1000 * 60);
              
              return (
                <tr key={period.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={period.name}
                      onChange={(e) => handleInputChange(period.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={period.start}
                      onChange={(e) => handleInputChange(period.id, 'start', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={period.end}
                      onChange={(e) => handleInputChange(period.id, 'end', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {duration} minutes
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => removePeriod(period.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Save Periods
        </button>
      </div>
    </div>
  );
};

export default SetPeriods;