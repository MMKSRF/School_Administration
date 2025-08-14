// AssignmentGrades.jsx
import React from 'react';
import { FaChevronRight, FaComment, FaExclamationTriangle } from 'react-icons/fa';

const AssignmentGrades = ({ assignments, onAssignmentClick }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreClass = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    if (score >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 text-sm font-medium text-gray-500">Assignment</th>
            <th className="p-3 text-sm font-medium text-gray-500">Date</th>
            <th className="p-3 text-sm font-medium text-gray-500">Score</th>
            <th className="p-3 text-sm font-medium text-gray-500">Weight</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr 
              key={assignment.id} 
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onAssignmentClick(assignment)}
            >
              <td className="p-3">
                <div className="font-medium text-gray-900">{assignment.title}</div>
                {assignment.score < 70 && (
                  <div className="flex items-center text-red-600 text-xs mt-1">
                    <FaExclamationTriangle className="mr-1" />
                    <span>Below class average</span>
                  </div>
                )}
              </td>
              <td className="p-3 text-sm text-gray-500 text-center">{assignment.date}</td>
              <td className="p-3 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreClass(assignment.score)}`}>
                  {assignment.score}/{assignment.total}
                </span>
                <div className={`text-xs font-medium mt-1 ${getScoreColor(assignment.score)}`}>
                  {assignment.score >= 90 ? 'Excellent' : 
                   assignment.score >= 80 ? 'Good' : 
                   assignment.score >= 70 ? 'Fair' : 'Needs Improvement'}
                </div>
              </td>
              <td className="p-3 text-center text-gray-700">{assignment.weight}%</td>
              <td className="p-3 text-center">
                <button className="text-gray-400 hover:text-indigo-600">
                  <FaChevronRight />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {assignments.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No assignments found for this class
        </div>
      )}
    </div>
  );
};

export default AssignmentGrades;