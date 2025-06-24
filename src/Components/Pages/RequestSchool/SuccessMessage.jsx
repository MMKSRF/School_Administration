
const SuccessMessage = ({ schoolName }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted Successfully!</h2>
      <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
        Thank you! We've received your request to add <span className="font-semibold ">{schoolName}</span> to Aqimari. 
        We'll review your request and contact the school shortly. You'll be notified when your school is onboarded.
      </p>
      
      <div className="mt-10">
        <a 
          href="/" 
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default SuccessMessage;