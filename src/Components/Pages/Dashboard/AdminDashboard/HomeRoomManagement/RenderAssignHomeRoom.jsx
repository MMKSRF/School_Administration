import React from 'react';
import {FaUserTie,FaExchangeAlt} from "react-icons/fa";
import  {classes, teachers} from "./MockData.js";



const RenderAssignHomeRoom = ({
                                  selectedTeacher,
                                  setSelectedTeacher,
                                  selectedClass,
                                  setSelectedClass,
                                  reassignData,
                                  setReassignData

}) => {

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaUserTie className="text-indigo-600 mr-2" />
                    Assign Home Room Teacher
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
                        <select
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Choose a teacher</option>
                            {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name} ({teacher.subject})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Choose a class</option>
                            {classes
                                .filter(cls => !cls.teacher) // Only show unassigned classes
                                .map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => {
                            if (selectedTeacher && selectedClass) {
                                // In a real app, this would update the backend
                                alert(`Assigned teacher ${teachers.find(t => t.id === selectedTeacher).name} to class ${classes.find(c => c.id === selectedClass).name}`);
                                setSelectedTeacher('');
                                setSelectedClass('');
                            }
                        }}
                        disabled={!selectedTeacher || !selectedClass}
                        className={`px-4 py-2 rounded-lg ${!selectedTeacher || !selectedClass
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        Assign Teacher
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaExchangeAlt className="text-indigo-600 mr-2" />
                    Reassign Home Room Teacher
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
                        <select
                            value={reassignData.teacher}
                            onChange={(e) => setReassignData({...reassignData, teacher: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Choose a teacher</option>
                            {teachers
                                .filter(teacher => teacher.assignedClass) // Only show assigned teachers
                                .map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} - {classes.find(c => c.id === teacher.assignedClass)?.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign to New Class</label>
                        <select
                            value={reassignData.class}
                            onChange={(e) => setReassignData({...reassignData, class: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Choose a class</option>
                            {classes
                                .filter(cls => !cls.teacher) // Only show unassigned classes
                                .map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => {
                            if (reassignData.teacher && reassignData.class) {
                                // In a real app, this would update the backend
                                alert(`Reassigned teacher ${teachers.find(t => t.id === reassignData.teacher).name} to class ${classes.find(c => c.id === reassignData.class).name}`);
                                setReassignData({ teacher: '', class: '' });
                            }
                        }}
                        disabled={!reassignData.teacher || !reassignData.class}
                        className={`px-4 py-2 rounded-lg ${!reassignData.teacher || !reassignData.class
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        Reassign Teacher
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Current Home Room Assignments</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Room Teacher</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {classes.map(cls => {
                            const teacher = cls.teacher ? teachers.find(t => t.id === cls.teacher) : null;
                            return (
                                <tr key={cls.id} className={cls.teacher ? '' : 'bg-red-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {teacher ? teacher.name : 'Unassigned'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {teacher ? teacher.subject : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                          teacher ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {teacher ? 'Assigned' : 'Unassigned'}
                      </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RenderAssignHomeRoom;



