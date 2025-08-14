
// AttendanceChart.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AttendanceChart = ({ data }) => {
  const chartRef = useRef(null);
  const maxValue = Math.max(...data, 100);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const bars = chartRef.current.querySelectorAll('.chart-bar');
    gsap.from(bars, {
      height: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });
  }, [data]);

  return (
    <div className="flex items-end h-24 space-x-1 mt-2" ref={chartRef}>
      {data.map((value, index) => {
        const height = (value / maxValue) * 80;
        const color = value >= 95 ? 'bg-green-500' : 
                     value >= 90 ? 'bg-yellow-400' : 
                     'bg-red-400';
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`w-full rounded-t ${color} chart-bar`}
              style={{ height: `${height}%` }}
            ></div>
            <div className="text-2xs text-gray-500 mt-1">{index + 1}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceChart;