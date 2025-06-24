import React from 'react';

const ProgressStepper = ({ step }) => {
  return (
    <div className="flex space-x-2">
      {[1, 2, 3].map((num) => (
        <div 
          key={num}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            step >= num ? 'bg-white text-blue-600' : 'bg-white/20'
          }`}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;