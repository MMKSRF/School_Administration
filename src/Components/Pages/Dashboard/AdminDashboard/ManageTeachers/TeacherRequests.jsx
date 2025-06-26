// src/AdminDashboard/ManageTeachers/TeacherRequests.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TeacherRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Alemu Bekele",
      phone: "0911123456",
      email: "alemu@example.com",
      teacherId: "T001",
      subjects: ["Math", "Science"],
      employmentType: "full-time",
      status: "pending"
    },
    {
      id: 2,
      name: "Tigist Worku",
      phone: "0922345678",
      email: "",
      teacherId: "T002",
      subjects: ["English", "Amharic"],
      employmentType: "part-time",
      partTimePeriod: { start: "08:00", end: "12:00" },
      status: "pending"
    },
    {
      id: 3,
      name: "Dawit Mekonnen",
      phone: "0933456789",
      email: "dawit@example.com",
      teacherId: "T003",
      subjects: ["History", "Geography"],
      employmentType: "part-time",
      partTimePeriod: { start: "13:00", end: "17:00" },
      status: "pending"
    }
  ]);
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.5,
        opacity: 100,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, []);

  const handleApprove = (id) => {
    const requestElement = document.getElementById(`request-${id}`);
    gsap.to(requestElement, {
      backgroundColor: "#DCFCE7",
      borderColor: "#16A34A",
      duration: 0.3,
      onComplete: () => {
        gsap.to(requestElement, {
          opacity:   0,
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.4,
          onComplete: () => {
            setRequests(prev => prev.filter(req => req.id !== id));
          }
        });
      }
    });
  };

  const handleReject = (id) => {
    const requestElement = document.getElementById(`request-${id}`);
    gsap.to(requestElement, {
      backgroundColor: "#FEE2E2",
      borderColor: "#DC2626",
      duration: 0.3,
      onComplete: () => {
        gsap.to(requestElement, {
          opacity: 0,
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.4,
          onComplete: () => {
            setRequests(prev => prev.filter(req => req.id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#374151' }}>
          Teacher Registration Requests
        </h1>
        <div className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
          {requests.length} pending requests
        </div>
      </div>

      <div ref={containerRef} className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="#4B5563">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium" style={{ color: '#374151' }}>No pending requests</h3>
            <p className="mt-1" style={{ color: '#4B5563' }}>All teacher registration requests have been processed</p>
          </div>
        ) : (
          requests.map((request) => (
            <div 
              key={request.id}
              id={`request-${request.id}`}
              className="bg-white rounded-lg border shadow-sm p-4 md:p-6 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#2563EB' }}>{request.name}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#4B5563">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span style={{ color: '#4B5563' }}>{request.phone}</span>
                    </div>
                    {request.email && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#4B5563">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span style={{ color: '#4B5563' }}>{request.email}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#4B5563">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span style={{ color: '#4B5563' }}>ID: {request.teacherId}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#374151' }}>Subjects Taught</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.subjects.map((subject, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="font-semibold mt-4 mb-2" style={{ color: '#374151' }}>Employment Type</h4>
                  <div className="flex items-center">
                    <span 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: request.employmentType === 'full-time' 
                          ? '#DCFCE7' 
                          : '#FEF3C7',
                        color: request.employmentType === 'full-time' 
                          ? '#16A34A' 
                          : '#CA8A04'
                      }}
                    >
                      {request.employmentType === 'full-time' ? 'Full-time' : 'Part-time'}
                    </span>
                  </div>
                  
                  {request.employmentType === 'part-time' && (
                    <div className="mt-2">
                      <h4 className="font-semibold mb-1" style={{ color: '#374151' }}>Availability</h4>
                      <p style={{ color: '#4B5563' }}>
                        {request.partTimePeriod.start} - {request.partTimePeriod.end}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col items-end">
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#FEF3C7', color: '#CA8A04' }}>
                      New Request
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 rounded-md text-sm md:text-base flex items-center"
                      style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-4 py-2 rounded-md text-sm md:text-base flex items-center"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherRequests;