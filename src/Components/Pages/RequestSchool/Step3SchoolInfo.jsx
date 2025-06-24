import {useDispatch} from "react-redux";

const Step3SchoolInfo = ({ 
  formData, 
  regions, 
  schoolTypes, 
  gradeRanges, 
  handleInputChange, 
  setStep 
}) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">School Information</h2>
        <p className="text-gray-600">
          Tell us about the school you'd like to join Aqimari
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              School Name
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              placeholder="Official school name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              School Type
            </label>
            <select
              name="schoolType"
              value={formData.schoolType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select School Type</option>
              {schoolTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Grade Range
            </label>
            <select
              name="gradeRange"
              value={formData.gradeRange}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Grade Range</option>
              {gradeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Region
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sub-city
            </label>
            <input
              type="text"
              name="subCity"
              value={formData.subCity}
              onChange={handleInputChange}
              placeholder="Sub-city or district"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Woreda/Zone
            </label>
            <input
              type="text"
              name="woreda"
              value={formData.woreda}
              onChange={handleInputChange}
              placeholder="Woreda or zone"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              School Email
            </label>
            <input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleInputChange}
              placeholder="Official school email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              School Phone Number
            </label>
            <input
              type="tel"
              name="schoolPhone"
              value={formData.schoolPhone}
              onChange={handleInputChange}
              placeholder="Official school phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              School Website or Social Media (Optional)
            </label>
            <input
              type="text"
              name="schoolWebsite"
              value={formData.schoolWebsite}
              onChange={handleInputChange}
              placeholder="Website, Facebook page, etc."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Why do you want your school to join Aqimari? Any additional information..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button 
            onClick={() =>dispatch(setStep(2))}
            className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Your Info
          </button>
          <button 
            onClick={() => dispatch(setStep(4))}
            className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
          >
            Continue to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3SchoolInfo;