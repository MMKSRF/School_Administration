import React from 'react';

const SchoolSetupStepper = ({ step }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">School Account Setup</h2>
        <div className="flex space-x-2">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                step === num 
                  ? 'bg-white text-blue-600 scale-110 shadow-sm' 
                  : 'bg-white/20'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <p className="text-blue-100 text-sm">
        {step === 1 
          ? 'Basic information about your school' 
          : step === 2 
          ? 'Administrator account details' 
          : 'Finalize your account creation'
        }
      </p>
    </div>
  );
};

export default SchoolSetupStepper;