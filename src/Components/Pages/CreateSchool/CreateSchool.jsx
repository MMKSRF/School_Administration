import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import TopSection from '../../Ui/TopSection';
import BenefitsSection from '../../Ui/BenefitsSection';
import useCreateSchoolForm from './useCreateSchoolForm';
import Step1SchoolInfo from './Step1SchoolInfo';
import Step2AdminInfo from './Step2AdminInfo';
import Step3ConfirmTerms from './Step3ConfirmTerms';
import SuccessMessage from './SuccessMessage';
import FailureMessage from './FailureMessage'; // Import the new component
import SchoolSetupStepper from './SchoolSetupStepper';

const CreateSchool = () => {
  const {
    formData,
    errors,
    loading,
    success,
    error,
    step,
   

    ethiopianRegions,
    handleChange,
    handleAcademicLevelChange,
    handleNext,
    handleSubmit,
    schoolSizes,
    setStep,
    setFormData,
    setError
  } = useCreateSchoolForm();
  
  const formRef = useRef();

useEffect(() => {
  // Animate form sections
  gsap.fromTo(
    '.form-section',
    {
      y: 40,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      delay: 0.06,
    }
  );

  // Animate benefit cards
  gsap.fromTo(
    '.benefit-card',
    {
      y: 50,
      opacity: 0,
      rotateX: 20,
      transformOrigin: 'top center',
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      ease: 'back.out(1.7)',
      stagger: 0.15,
      delay: 0.1,
    }
  );

  // Animate error message with a pop and shake
  if (error) {
    gsap.fromTo(
      '.error-message',
      {
        y: -20,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.04,
      }
    );

    gsap.fromTo(
      '.error-message',
      { x: -5 },
      {
        x: 5,
        repeat: 3,
        yoyo: true,
        duration: 0.1,
        ease: 'power1.inOut',
        delay: 0.1,
      }
    );
  }
}, [step, error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <TopSection 
          tope="Create Your School Account" 
          bottom="Join hundreds of Ethiopian schools using Aqimari to simplify scheduling and administration" 
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <SchoolSetupStepper step={step} />
                  </div>
                  
                  <div className="p-6 md:p-8">
                    {success ? (
                      <SuccessMessage />
                    ) : error ? (
                      <div className="error-message">
                        <FailureMessage 
                          errorMessage={error.message}
                          onRetry={() => setError(null)}
                        />
                      </div>
                    ) : (
                      <form onSubmit={step === 3 ? handleSubmit : undefined} ref={formRef}>
                        {step === 1 && (
                          <Step1SchoolInfo
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                            handleAcademicLevelChange={handleAcademicLevelChange}
                            handleNext={handleNext}
                          />
                        )}
                        
                        {step === 2 && (
                          <Step2AdminInfo
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                            handleNext={handleNext}
                            setStep={setStep}
                            setFormData={setFormData}
                            ethiopianRegions={ethiopianRegions}
                            schoolSizes={schoolSizes}
                    
                          />
                        )}
                        
                        {step === 3 && (
                          <Step3ConfirmTerms
                            loading={loading}
                            handleSubmit={handleSubmit}
                          />
                        )}
                      </form>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
              
              <BenefitsSection
                heading="Why Schools Love Aqimari"
                subheading="Join the educational revolution with tools designed specifically for Ethiopian schools"
                benefits={[
                  {
                    title: 'Smart Scheduling',
                    description: 'Automatically generate conflict-free timetables that respect teacher availability and classroom constraints.',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    iconPath:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  },
                  {
                    title: 'Teacher & Student Portals',
                    description: 'Dedicated dashboards for teachers and students with real-time schedule updates and notifications.',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    iconPath: "M17 20h5v-2a3 3 0 00-3-3h-3M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  },
                  {
                    title: 'Comprehensive Reporting',
                    description: 'Generate attendance reports, academic performance analytics, and resource utilization statistics.',
                    iconBg: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  },
                  {
                    title: 'Resource Management',
                    description: 'Efficiently allocate classrooms, labs, and equipment to maximize utilization and minimize conflicts.',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    iconPath: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  }
                ]}
                trustedBy={['AAU', 'HU', 'JU', 'MU', 'DU', 'BU']}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateSchool;