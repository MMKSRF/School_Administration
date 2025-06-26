// src/AdminDashboard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  ClockIcon, 
  CalendarIcon, 
  TableCellsIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: HomeIcon },
    { name: 'Manage Teachers', path: '/admin-dashboard/teachers', icon: UsersIcon },
    { name: 'Set Periods', path: '/admin-dashboard/periods', icon: ClockIcon },
    { name: 'Create Schedule', path: '/admin-dashboard/schedule/create', icon: CalendarIcon },
    { name: 'View Timetable', path: '/admin-dashboard/timetable', icon: TableCellsIcon },
    { name: 'Conflict Checker', path: '/admin-dashboard/conflicts', icon: ExclamationTriangleIcon },
    { name: 'School Stats', path: '/admin-dashboard/stats', icon: ChartBarIcon },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-600 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-blue-700">
        {isOpen && <h1 className="text-xl font-bold">Aqimari Admin</h1>}
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          }
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 transition-colors ${
                    isActive 
                      ? 'bg-blue-500 border-l-4 border-yellow-600' 
                      : 'hover:bg-blue-500'
                  }`
                }
              >
                <item.icon className="h-6 w-6" />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-blue-200">admin@school.edu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;