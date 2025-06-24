import React, { Children } from 'react';

const BasicInput = ({ 
  label, 
  name, 
  type , 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon ,
  buttons
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
          {icon}
        </div>

        {buttons}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BasicInput;