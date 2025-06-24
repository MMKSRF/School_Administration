import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Header from '../Header';
import Footer from '../Footer';
import useRequestSchoolForm from './useRequestSchoolForm';
import Step1Recheck from './Step1Recheck';
import Step2RequesterInfo from './Step2RequesterInfo';
import Step3SchoolInfo from './Step3SchoolInfo';
import Step4UploadDocument from './Step4UploadDocument';
import SuccessMessage from './SuccessMessage';
import ProgressIndicator from './ProgressIndicator';

const RequestSchool = () => {
  const {
    step,
    formData,
    searchResults,
    schoolFound,
    loading,
    success,
    regions,
    schoolTypes,
    gradeRanges,
    requesterRoles,
    handleInputChange,
    handleFileChange,
    handleRecheck,
    handleSubmit,
    setStep
  } = useRequestSchoolForm();

  const sectionRef = React.useRef(null);
  const contentRef = React.useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.from(sectionRef.current, {
      y: 0,
      opacity: 100,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate content on step change
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 0,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      
      <section ref={sectionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Request Your School to Join Aqimari
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If your school is not yet on Aqimari, you can request it to be added
            </p>
          </div>
          
          {/* Progress indicator */}
          {!success && step > 1 && (
            <ProgressIndicator step={step} />
          )}
          
          <div ref={contentRef}>
            {success ? (
              <SuccessMessage schoolName={formData.schoolName} />
            ) : (
              <>
                {step === 1 && (
                  <Step1Recheck 
                    formData={formData}
                    searchResults={searchResults}
                    schoolFound={schoolFound}
                    handleInputChange={handleInputChange}
                    handleRecheck={handleRecheck}
                    setStep={setStep}
                    loading={loading}
                  />
                )}
                
                {step === 2 && (
                  <Step2RequesterInfo 
                    formData={formData}
                    requesterRoles={requesterRoles}
                    handleInputChange={handleInputChange}
                    setStep={setStep}
                  />
                )}
                
                {step === 3 && (
                  <Step3SchoolInfo 
                    formData={formData}
                    regions={regions}
                    schoolTypes={schoolTypes}
                    gradeRanges={gradeRanges}
                    handleInputChange={handleInputChange}
                    setStep={setStep}
                  />
                )}
                
                {step === 4 && (
                  <Step4UploadDocument 
                    formData={formData}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    setStep={setStep}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RequestSchool;