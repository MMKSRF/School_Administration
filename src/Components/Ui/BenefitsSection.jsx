import React from 'react';

const BenefitsSection = ({
  heading,
  subheading,
  benefits,
  trustedBy,
}) => {
  return (
    <div className="lg:w-1/2">
      <div className="sticky top-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{heading}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">{subheading}</p>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start">
                  <div className={`${benefit.iconBg} ${benefit.iconColor} rounded-lg p-3 mr-4`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={benefit.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Trusted by Ethiopian Schools</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {trustedBy.map((school, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm w-20 h-20 flex items-center justify-center font-bold text-gray-700 border border-gray-200"
                >
                  {school}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
