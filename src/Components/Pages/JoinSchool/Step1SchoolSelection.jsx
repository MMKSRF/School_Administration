import React from 'react';
import { NavLink } from 'react-router-dom';

const Step1SchoolSelection = ({ schools, onSchoolSelect }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your School</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search for your school to join the Aqimari platform. Start by typing your school's name or location.
        </p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 shadow-sm">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by school name or region..."
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {schools.map(school => (
          <div 
            key={school.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSchoolSelect(school)}
          >
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg">
                {school.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-800">{school.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{school.region} Region</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 font-medium flex items-center">
                Select School
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Can't find your school?{' '}
          <NavLink to="/request-school" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
           Recheck or Request your school to join Aqimari
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Step1SchoolSelection;