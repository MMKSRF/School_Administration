import React from 'react';

const Step3CompleteProfile = ({ 
  school, 
  role,
  formData,
  gradeLevels,
  sections,
  subjects,
  onInputChange,
  onSubjectChange,
  onSubmit,
  onBack,
  loading
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {role === 'student' ? 'Student Registration' : 'Teacher Registration'}
        </h2>
        <p className="text-gray-600">
          Join {school.name} as a {role}
        </p>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {role === 'student' ? (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Grade Level
                  </label>
                  <select
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Grade Level</option>
                    {gradeLevels.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Section
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Student ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={onInputChange}
                    placeholder="Enter your student ID"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Parent Contact (Optional)
                  </label>
                  <input
                    type="text"
                    name="parentContact"
                    value={formData.parentContact}
                    onChange={onInputChange}
                    placeholder="Parent phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onInputChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Teacher ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={onInputChange}
                    placeholder="Enter your teacher ID"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Subjects Taught
                  </label>
                  <p className="text-gray-500 text-sm mb-3">Select all subjects you teach</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {subjects.map(subject => (
                      <button
                        key={subject}
                        type="button"
                        className={`py-2 px-3 rounded-lg border text-center ${
                          formData.subjectsTaught.includes(subject) 
                            ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => onSubjectChange(subject)}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onInputChange}
                placeholder="Create a strong password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onInputChange}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
              </label>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                  shadow-md transition-all duration-300 transform hover:from-blue-600 hover:to-indigo-700 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Join ${school.name} as a ${role}`
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to role selection
        </button>
      </div>
    </div>
  );
};

export default Step3CompleteProfile;