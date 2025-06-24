import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Header from '../Header';
import Footer from '../Footer';
import useJoinSchoolForm from './useJoinSchoolForm';
import ProgressIndicator from './ProgressIndicator';
import Step1SchoolSelection from './Step1SchoolSelection';
import Step2RoleSelection from './Step2RoleSelection';
import Step3CompleteProfile from './Step3CompleteProfile';
import SuccessMessage from './SuccessMessage';

const JoinSchool = () => {
  const {
    step,
    selectedSchool,
    role,
    formData,
    loading,
    success,
    schools,
    gradeLevels,
    sections,
    subjects,
    handleInputChange,
    handleSubjectChange,
    handleSchoolSelect,
    handleRoleSelect,
    handleSubmit,
    setStep
  } = useJoinSchoolForm();

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(sectionRef.current, {
      opacity: 0,
      y: 20,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    // Animate content on step change
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, {
        opacity: 0,
        x: -20,
      }, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.9,
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
              Join Your School on Aqimari
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your school, select your role, and complete your info to access your dashboard
            </p>
          </div>
          
          {!success && (
            <ProgressIndicator step={step} />
          )}
          
          <div ref={contentRef}>
            {success ? (
              <SuccessMessage 
                school={selectedSchool} 
                role={role} 
              />
            ) : (
              <>
                {step === 1 && (
                  <Step1SchoolSelection 
                    schools={schools} 
                    onSchoolSelect={handleSchoolSelect} 
                  />
                )}
                {step === 2 && (
                  <Step2RoleSelection 
                    school={selectedSchool} 
                    onRoleSelect={handleRoleSelect} 
                    onBack={() => setStep(1)}
                  />
                )}
                {step === 3 && (
                  <Step3CompleteProfile 
                    school={selectedSchool} 
                    role={role}
                    formData={formData}
                    gradeLevels={gradeLevels}
                    sections={sections}
                    subjects={subjects}
                    onInputChange={handleInputChange}
                    onSubjectChange={handleSubjectChange}
                    onSubmit={handleSubmit}
                    onBack={() => setStep(2)}
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

export default JoinSchool;