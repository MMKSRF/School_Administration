// src/pages/PasswordResetSuccess.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

const PasswordResetSuccess = () => {
  useEffect(() => {
    // Success animation
    gsap.from('.success-content', {
      duration: 1,
      y: 0,
      opacity: 100,
      stagger: 0.2,
      delay: 0.3
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Password Reset Successful!</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Your account password has been successfully updated
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
                  <h2 className="text-2xl font-bold">Success!</h2>
                  <p>Your password has been updated</p>
                </div>
                
                <div className="p-10 text-center success-content">
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Password Reset Complete</h3>
                  <p className="text-gray-600 mb-8">
                    Your password has been successfully updated. You can now log in to your account with your new password.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                      to="/login" 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      Back to Login
                    </Link>
                    <Link 
                      to="/" 
                      className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all"
                    >
                      Return to Homepage
                    </Link>
                  </div>
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

export default PasswordResetSuccess;