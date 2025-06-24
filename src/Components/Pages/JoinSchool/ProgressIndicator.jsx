import React from 'react';

const ProgressIndicator = ({ step }) => {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 left-0 right-0 -z-10"></div>
        <div 
          className="absolute h-1 bg-blue-500 top-1/2 transform -translate-y-1/2 left-0 -z-10 transition-all duration-500"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        ></div>
        
        {/* Steps */}
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= s ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'
            } font-bold`}>
              {s}
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
              {s === 1 ? 'Find School' : s === 2 ? 'Select Role' : 'Complete Profile'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;