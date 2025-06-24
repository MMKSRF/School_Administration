import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Header from '../Header';
import Footer from '../Footer';
import useForgotPasswordForm from './useForgotPasswordForm';
import Step1AccountRecovery from './Step1AccountRecovery';
import Step2IdentityVerification from './Step2IdentityVerification';
import Step3PasswordReset from './Step3PasswordReset';
import ProgressStepper from './ProgressStepper';

const ForgotPassword = () => {
  const {
    step,
    formData,
    loading,
    errors,
    countdown,
    handleChange,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    setStep
  } = useForgotPasswordForm();

  useEffect(() => {
    // Entrance animations
    gsap.from('.form-section', {
      duration: 0.8,
      y: 0,
      opacity: 100,
      stagger: 0.2,
      delay: 0.3
    });
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {step === 1 ? 'Reset Your Password' : 
               step === 2 ? 'Verify Your Identity' : 
               'Create New Password'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              {step === 1 ? 'Enter your school information to recover your account' : 
               step === 2 ? 'Enter the verification code sent to your contact method' : 
               'Create a new secure password for your account'}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      {step === 1 ? 'Account Recovery' : 
                       step === 2 ? 'Identity Verification' : 
                       'Password Reset'}
                    </h2>
                    <ProgressStepper step={step} />
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  {step === 1 && (
                    <Step1AccountRecovery 
                      formData={formData}
                      errors={errors}
                      handleChange={handleChange}
                      handleSendCode={handleSendCode}
                      loading={loading}
                    />
                  )}
                  
                  {step === 2 && (
                    <Step2IdentityVerification 
                      formData={formData}
                      errors={errors}
                      countdown={countdown}
                      handleChange={handleChange}
                      handleVerifyCode={handleVerifyCode}
                      handleResendCode={handleResendCode}
                      setStep={setStep}
                      loading={loading}
                    />
                  )}
                  
                  {step === 3 && (
                    <Step3PasswordReset 
                      formData={formData}
                      errors={errors}
                      handleChange={handleChange}
                      handleResetPassword={handleResetPassword}
                      setStep={setStep}
                      loading={loading}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;