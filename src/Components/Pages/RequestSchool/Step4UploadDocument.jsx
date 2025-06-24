import React from 'react';

const Step4UploadDocument = ({ 
  formData, 
  handleFileChange, 
  handleSubmit, 
  setStep,
  loading 
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Supporting Document (Optional)</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a document to verify your connection to the school (school ID, letter, etc.)
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Upload a PDF, JPG, or PNG file (max 5MB)
          </p>
          
          <div className="mt-4">
            <label className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-colors">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
          </div>
          
          {formData.document && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 inline-block">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700">{formData.document.name}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleSubmit}
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
                Submitting Request...
              </div>
            ) : (
              'Submit School Request'
            )}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setStep(3)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to School Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4UploadDocument;