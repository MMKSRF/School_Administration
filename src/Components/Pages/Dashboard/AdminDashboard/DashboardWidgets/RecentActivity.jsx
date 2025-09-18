// // src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/RecentActivity.jsx
// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/RecentActivity.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector } from "react-redux";
import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt
} from 'react-icons/fa';
import {
  selectRecentActivity
} from "../../../../../Redux/Selectors/AdminSelectors/adminSelectors.js";

const RecentActivity = ({
                          // Configuration props
                          title = "Recent Activity",
                          viewAllText = "View All",
                          emptyStateText = "No recent activities",
                          emptyStateSubtext = "All caught up! New activities will appear here.",
                          enableAnimations = true,
                          animationType = "stagger",
                          maxItems = 10,
                          // Styling props
                          theme = "default",
                          editable = false,
                          onViewAll,
                          onEditActivity,
                          onDeleteActivity,
                          onAddActivity,
                          onResolveActivity,
                          // Data source customization
                          useRedux = true,
                          customActivities = null
                        }) => {
  // State management
  const reduxActivities = useSelector(selectRecentActivity);
  const [activities, setActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'default',
    title: '',
    description: '',
    time: new Date().toLocaleTimeString()
  });
  const [expandedItems, setExpandedItems] = useState([]);
  const [resolvingItems, setResolvingItems] = useState([]);
  const [resolveResult, setResolveResult] = useState({ show: false, success: true, message: '' });

  // Refs for animation
  const containerRef = useRef();
  const itemRefs = useRef([]);

  // Initialize activities based on data source
  useEffect(() => {
    if (useRedux && !customActivities) {
      setActivities(reduxActivities.slice(0, maxItems));
    } else if (customActivities) {
      setActivities(customActivities.slice(0, maxItems));
    }
  }, [reduxActivities, customActivities, useRedux, maxItems]);

  // Animation setup with GSAP
  useEffect(() => {
    if (!enableAnimations) return;

    const ctx = gsap.context(() => {
      switch(animationType) {
        case "stagger":
          gsap.from(itemRefs.current, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
          });
          break;
        case "fade":
          gsap.from(itemRefs.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'sine.inOut'
          });
          break;
        case "scale":
          gsap.from(itemRefs.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.7)'
          });
          break;
        default:
          gsap.from(itemRefs.current, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activities, enableAnimations, animationType]);

  // Theme configuration
  const themeConfig = {
    default: {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-100',
      button: 'text-indigo-600 hover:text-indigo-800'
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-gray-100',
      border: 'border-gray-700',
      button: 'text-indigo-400 hover:text-indigo-300'
    },
    minimal: {
      bg: 'bg-white',
      text: 'text-gray-800',
      border: 'border-gray-200',
      button: 'text-gray-600 hover:text-gray-800'
    }
  };

  const currentTheme = themeConfig[theme] || themeConfig.default;

  // Icon and color mapping
  const getActivityIcon = (type) => {
    const iconConfig = {
      enrollment: <FaUserPlus className="text-green-500" />,
      approval: <FaCheckCircle className="text-blue-500" />,
      conflict: <FaExclamationTriangle className="text-yellow-500" />,
      teacher: <FaChalkboardTeacher className="text-indigo-500" />,
      default: <FaClock className="text-gray-500" />
    };
    return iconConfig[type] || iconConfig.default;
  };

  const getActivityColor = (type) => {
    const colorConfig = {
      enrollment: 'bg-green-100 text-green-800',
      approval: 'bg-blue-100 text-blue-800',
      conflict: 'bg-yellow-100 text-yellow-800',
      teacher: 'bg-indigo-100 text-indigo-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colorConfig[type] || colorConfig.default;
  };

  // Toggle item expansion
  const toggleExpand = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(i => i !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  // Handle view all button click
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      // Default behavior: show all activities without limit
      if (useRedux && !customActivities) {
        setActivities(reduxActivities);
      } else if (customActivities) {
        setActivities(customActivities);
      }
    }
  };

  // Handle resolve button click
  const handleResolve = async (index) => {
    setResolvingItems([...resolvingItems, index]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Randomly determine success for demo purposes
      const success = Math.random() > 0.3;

      if (onResolveActivity) {
        onResolveActivity(index, activities[index], success);
      }

      setResolveResult({
        show: true,
        success,
        message: success
            ? 'Activity resolved successfully!'
            : 'Failed to resolve activity. Please try again.'
      });

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setResolveResult({ show: false, success: true, message: '' });
      }, 3000);

      // Remove from resolving state
      setResolvingItems(resolvingItems.filter(i => i !== index));

      // If successful, remove the activity
      if (success) {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
      }
    } catch (error) {
      setResolvingItems(resolvingItems.filter(i => i !== index));
      setResolveResult({
        show: true,
        success: false,
        message: 'An error occurred while resolving the activity.'
      });

      setTimeout(() => {
        setResolveResult({ show: false, success: true, message: '' });
      }, 3000);
    }
  };

  // Edit handlers
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditForm({
      title: activities[index].title,
      description: activities[index].description
    });
  };

  const handleSaveEdit = (index) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      title: editForm.title,
      description: editForm.description
    };

    setActivities(updatedActivities);
    if (onEditActivity) {
      onEditActivity(index, updatedActivities[index]);
    }
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      const updatedActivities = activities.filter((_, i) => i !== index);
      setActivities(updatedActivities);
      if (onDeleteActivity) {
        onDeleteActivity(index);
      }
    }
  };

  const handleAddActivity = () => {
    if (newActivity.title.trim() === '') return;

    const updatedActivities = [newActivity, ...activities].slice(0, maxItems);
    setActivities(updatedActivities);
    setIsAdding(false);
    setNewActivity({
      type: 'default',
      title: '',
      description: '',
      time: new Date().toLocaleTimeString()
    });

    if (onAddActivity) {
      onAddActivity(newActivity);
    }
  };






  return (
      <div
          ref={containerRef}
          className={`${currentTheme.bg} rounded-2xl shadow-xl p-6 relative`}
      >
        {/* Resolve Result Popup */}
        {resolveResult.show && (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
                resolveResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center">
                {resolveResult.success ? (
                    <FaCheckCircle className="mr-2 text-green-600" />
                ) : (
                    <FaExclamationTriangle className="mr-2 text-red-600" />
                )}
                <span>{resolveResult.message}</span>
              </div>
            </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${currentTheme.text}`}>{title}</h3>
          <div className="flex space-x-3">
            {editable && (
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`p-2 rounded-full ${currentTheme.button} hover:bg-gray-100 transition-colors`}
                    aria-label="Add new activity"
                >
                  {isAdding ? <FaTimes /> : <FaPlus />}
                </button>
            )}
            <button
                onClick={handleViewAll}
                className={`text-sm font-medium ${currentTheme.button} flex items-center`}
            >
              {viewAllText} <FaExternalLinkAlt className="ml-1" size={12} />
            </button>
          </div>
        </div>

        {/* Add new activity form */}
        {isAdding && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Add New Activity</h4>
              <div className="space-y-3">
                <div>
                  <select
                      value={newActivity.type}
                      onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="enrollment">Enrollment</option>
                    <option value="approval">Approval</option>
                    <option value="conflict">Conflict</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Title"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
              <textarea
                  placeholder="Description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows="2"
              />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleAddActivity}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
        )}

        <div className="space-y-4">
          {activities?.map((activity, index) => (
              <div
                  key={index}
                  ref={el => itemRefs.current[index] = el}
                  className={`flex items-start pb-4 border-b ${currentTheme.border} last:border-0 last:pb-0`}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                <div className="ml-4 flex-1 min-w-0">
                  {editingIndex === index ? (
                      <div className="space-y-2">
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            rows="2"
                        />
                        <div className="flex space-x-2">
                          <button
                              onClick={() => handleSaveEdit(index)}
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 text-xs bg-gray-300 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-medium ${currentTheme.text} truncate`}>
                            {activity.title}
                          </p>
                          <button
                              onClick={() => toggleExpand(index)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            {expandedItems.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>

                        <p className={`text-sm text-gray-500 mt-1 ${expandedItems.includes(index) ? '' : 'line-clamp-2'}`}>
                          {activity.description}
                        </p>

                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <span>{activity.time}</span>

                          {activity.action === 'View' && (
                              <button
                                  onClick={() => toggleExpand(index)}
                                  className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                              >
                                {expandedItems.includes(index) ? 'Collapse' : 'View'}
                              </button>
                          )}

                          {activity.action === 'Resolve' && (
                              <button
                                  onClick={() => handleResolve(index)}
                                  disabled={resolvingItems.includes(index)}
                                  className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium flex items-center disabled:opacity-50"
                              >
                                {resolvingItems.includes(index) ? (
                                    <>
                                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Resolving...
                                    </>
                                ) : 'Resolve'}
                              </button>
                          )}
                        </div>
                      </>
                  )}
                </div>

                {editable && editingIndex !== index && (
                    <div className="flex space-x-2 ml-2">
                      <button
                          onClick={() => handleEditClick(index)}
                          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                          aria-label="Edit activity"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                          onClick={() => handleDeleteClick(index)}
                          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                          aria-label="Delete activity"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                )}
              </div>
          ))}

          {activities?.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">{emptyStateText}</div>
                <p className="text-gray-500 text-sm">
                  {emptyStateSubtext}
                </p>
              </div>
          )}
        </div>
      </div>
  );
};

export default RecentActivity;

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import {
//   selectRecentActivity
// } from "../../../../../Redux/Selectors/AdminSelectors/adminSelectors.js";
// import {useSelector} from "react-redux";
// import {
//   FaUserPlus,
//   FaChalkboardTeacher,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaClock
// } from 'react-icons/fa';
//
//
// const RecentActivity = () => {
//
//   const activities = useSelector(selectRecentActivity)
//
//   const containerRef = useRef();
//   const itemRefs = useRef([]);
//
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(itemRefs.current, {
//         y: 16,
//         opacity: 100,
//         stagger: 0.1,
//         duration: 0.5,
//         ease: 'power2.out'
//       });
//     }, containerRef);
//
//     return () => ctx.revert();
//   }, [activities]);
//
//   const getActivityIcon = (type) => {
//     switch(type) {
//       case 'enrollment':
//         return <FaUserPlus className="text-green-500" />;
//       case 'approval':
//         return <FaCheckCircle className="text-blue-500" />;
//       case 'conflict':
//         return <FaExclamationTriangle className="text-yellow-500" />;
//       case 'teacher':
//         return <FaChalkboardTeacher className="text-indigo-500" />;
//       default:
//         return <FaClock className="text-gray-500" />;
//     }
//   };
//
//   const getActivityColor = (type) => {
//     switch(type) {
//       case 'enrollment':
//         return 'bg-green-100 text-green-800';
//       case 'approval':
//         return 'bg-blue-100 text-blue-800';
//       case 'conflict':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'teacher':
//         return 'bg-indigo-100 text-indigo-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//
//   return (
//     <div
//       ref={containerRef}
//       className="bg-white rounded-2xl shadow-xl p-6"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
//         <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//           View All
//         </button>
//       </div>
//
//       <div className="space-y-4">
//         {activities?.map((activity, index) => (
//           <div
//             key={index}
//             ref={el => itemRefs.current[index] = el}
//             className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
//           >
//             <div className="flex-shrink-0 mt-1">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
//                 {getActivityIcon(activity.type)}
//               </div>
//             </div>
//
//             <div className="ml-4 flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {activity.title}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {activity.description}
//               </p>
//               <div className="flex items-center mt-2 text-xs text-gray-400">
//                 <span>{activity.time}</span>
//                 {activity.action && (
//                   <button className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium">
//                     {activity.action}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//
//         {activities?.length === 0 && (
//           <div className="text-center py-8">
//             <div className="text-gray-400 mb-2">No recent activities</div>
//             <p className="text-gray-500 text-sm">
//               All caught up! New activities will appear here.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default RecentActivity;