
import { FaTimes, FaVideo, FaEnvelope, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const ClassDetailModal = ({ classItem, onClose, onJoin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-gray-500">
              {classItem.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{classItem.name}</h2>
              <p className="text-gray-600">{classItem.teacher}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <FaCalendar className="text-gray-500 mr-3 w-5" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-gray-900">{classItem.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-500 mr-3 w-5" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900">{classItem.room}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 w-5 flex justify-center">
                <div className={`w-3 h-3 rounded-full ${classItem.isLive ? 'bg-red-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={classItem.isLive ? 'text-red-600 font-medium' : 'text-gray-900'}>
                  {classItem.isLive ? 'Live Now' : 'Not in Session'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onJoin}
              disabled={!classItem.isLive}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center transition-all ${
                classItem.isLive 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaVideo className="mr-2" />
              {classItem.isLive ? 'Join Class Now' : 'Class Not Active'}
            </button>
            
            <a
              href={`mailto:${classItem.teacherEmail}`}
              className="flex-1 py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Email Teacher
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Recent Announcements</h3>
          <div className="text-sm text-gray-600">
            <p className="mb-1">• Final exam scheduled for next week</p>
            <p className="mb-1">• Project submissions due Friday</p>
            <p>• Extra credit opportunity available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailModal;