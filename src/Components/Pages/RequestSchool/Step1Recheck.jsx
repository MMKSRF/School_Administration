import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Step1Recheck = ({ 
  formData, 
  searchResults, 
  schoolFound, 
  handleInputChange, 
  handleRecheck, 
  setStep,
  loading
}) => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recheck School Registration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schools are being added daily — please recheck before submitting a new request.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              School Name
            </label>
            <input
              type="text"
              name="searchSchool"
              value={formData.searchSchool}
              onChange={handleInputChange}
              placeholder="Enter school name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Region (Optional)
            </label>
            <select
              name="searchRegion"
              value={formData.searchRegion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleRecheck}
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
                Searching...
              </div>
            ) : (
              'Recheck School Registration'
            )}
          </button>
        </div>
      </div>
      
      {searchResults.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">School Found!</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            Your school is already on Aqimari. You can now join directly.
          </p>
          
          <div className="space-y-4">
            {searchResults.map(school => (
              <div key={school.id} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg">
                    {school.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{school.name}</h4>
                    <p className="text-gray-600 text-sm">{school.region} • {school.type}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <a 
                    href="/join-school" 
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                  >
                    Join School
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {searchResults.length === 0 && schoolFound === false && formData.searchSchool && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">School Not Found</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            We couldn't find your school in our system. You can request to add it below.
          </p>
          
          <NavLink
            onClick={() => dispatch(setStep(2))}
            to={"/request-school"}
            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
              shadow-md transition-all duration-300 transform hover:from-blue-600 hover:to-indigo-700"
          >
            Request Your School to Join Aqimari
          </NavLink>
        </div>
      )}
    </div>
  );
};

const regions = [
  "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
  "Dire Dawa", "Gambela", "Harari", "Oromia", 
  "Sidama", "Somali", "South West Ethiopia", 
  "Southern Nations, Nationalities, and Peoples", "Tigray"
];

export default Step1Recheck;