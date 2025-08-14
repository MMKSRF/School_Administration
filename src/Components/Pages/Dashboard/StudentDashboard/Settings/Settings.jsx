// src/Components/Pages/Dashboard/StudentDashboard/Settings/Settings.jsx
import  { useState, useRef ,useEffect } from 'react';
import { gsap } from 'gsap';
import { FaUser, FaLock, FaBell, FaPalette, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@school.edu',
    phone: '(555) 123-4567',
    notifications: {
      email: true,
      push: true,
      reminders: true
    },
    theme: 'light',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.6,
        y: 20,
        opacity: 100,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [field]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => setIsSaved(false), 2000);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5" ref={containerRef}>
      <div className="flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
          
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                activeTab === 'profile' 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className="mr-3" />
              Profile
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                activeTab === 'security' 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <FaLock className="mr-3" />
              Security
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                activeTab === 'notifications' 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell className="mr-3" />
              Notifications
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                activeTab === 'appearance' 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('appearance')}
            >
              <FaPalette className="mr-3" />
              Appearance
            </button>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="md:w-3/4">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={isSaving || isSaved}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      isSaved 
                        ? 'bg-green-600 text-white' 
                        : isSaving
                          ? 'bg-indigo-400 text-white cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <FaSave className="mr-2" />
                        Saved!
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={isSaving || isSaved}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      isSaved 
                        ? 'bg-green-600 text-white' 
                        : isSaving
                          ? 'bg-indigo-400 text-white cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Email Notifications</div>
                      <div className="text-sm text-gray-600">Receive important updates via email</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications.email"
                        checked={formData.notifications.email}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Push Notifications</div>
                      <div className="text-sm text-gray-600">Get alerts on your mobile device</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications.push"
                        checked={formData.notifications.push}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Assignment Reminders</div>
                      <div className="text-sm text-gray-600">Get reminders for upcoming assignments</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications.reminders"
                        checked={formData.notifications.reminders}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={isSaving || isSaved}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      isSaved 
                        ? 'bg-green-600 text-white' 
                        : isSaving
                          ? 'bg-indigo-400 text-white cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Appearance Settings</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                        formData.theme === 'light' 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-16 h-16 bg-white border border-gray-300 rounded-lg mb-2"></div>
                      <span>Light Theme</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                        formData.theme === 'dark' 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg mb-2"></div>
                      <span>Dark Theme</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={isSaving || isSaved}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      isSaved 
                        ? 'bg-green-600 text-white' 
                        : isSaving
                          ? 'bg-indigo-400 text-white cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? 'Applying...' : 'Apply Theme'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;