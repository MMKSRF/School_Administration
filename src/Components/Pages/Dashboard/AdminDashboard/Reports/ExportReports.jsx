// src/Components/Pages/Dashboard/AdminDashboard/Reports/ExportReports.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaFilePdf, FaFileExcel, FaFileCsv, FaDownload, FaCalendarAlt } from 'react-icons/fa';

const ExportReports = () => {
  const containerRef = useRef();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState('attendance');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.export-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDateChange = (e, field) => {
    setDateRange({ ...dateRange, [field]: e.target.value });
  };

  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadUrl('https://example.com/report.' + selectedFormat);
      
      // Simulate download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `report-${new Date().toISOString().slice(0, 10)}.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    }, 2000);
  };

  const formatOptions = [
    { id: 'pdf', name: 'PDF', icon: <FaFilePdf className="text-red-500" /> },
    { id: 'excel', name: 'Excel', icon: <FaFileExcel className="text-green-500" /> },
    { id: 'csv', name: 'CSV', icon: <FaFileCsv className="text-indigo-500" /> }
  ];

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report' },
    { id: 'performance', name: 'Performance Report' },
    { id: 'financial', name: 'Financial Report' },
    { id: 'inventory', name: 'Inventory Report' },
    { id: 'staff', name: 'Staff Report' },
    { id: 'student', name: 'Student Report' }
  ];

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Export Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="export-card lg:col-span-2 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Configure Report</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-indigo-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => handleDateChange(e, 'start')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-indigo-500" />
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => handleDateChange(e, 'end')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <div className="grid grid-cols-3 gap-3">
                {formatOptions.map(format => (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 border rounded-xl flex flex-col items-center justify-center ${
                      selectedFormat === format.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {format.icon}
                    </div>
                    <div className="font-medium">{format.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview and Actions */}
        <div className="export-card bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview & Export</h3>
          
          <div className="mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
              <div className="text-center py-8 text-gray-400">
                Report Preview
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Report Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span>{reportTypes.find(t => t.id === reportType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format:</span>
                  <span className="uppercase">{selectedFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date Range:</span>
                  <span>{dateRange.start} to {dateRange.end}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Generated On:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className={`w-full py-3 rounded-xl flex items-center justify-center ${
              isGenerating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 极8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FaDownload className="mr-2" />
                Generate & Download
              </>
            )}
          </button>
          
          {downloadUrl && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              Report generated successfully! Your download should start shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportReports;