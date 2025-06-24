import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import TopSection from '../../Ui/TopSection';
import BenefitsSection from '../../Ui/BenefitsSection';
import LoginForm from './LoginForm';

const Login = () => {
  useEffect(() => {
    // Entrance animations
    gsap.fromTo('.login-form', {
      y: -50,
      opacity: 0
    },{
      duration: 0.8,
      y: 0,
      opacity: 100,
      stagger: 0.2,
      delay: 0.2
    });
    
    gsap.fromTo('.benefit-card', {
      y: 50,
      opacity: 0
    },{
      duration: 0.6,
      y: 0,
      opacity: 100,
      stagger: 0.1,
      delay: 0.2
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <TopSection 
          tope="Welcome Back to Aqimari" 
          bottom="Access your school's scheduling dashboard and continue managing your institution efficiently" 
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Login Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Login to Your Account</h2>
                      <div className="bg-white/20 rounded-full px-4 py-1 text-sm">
                        Secure Access
                      </div>
                    </div>
                    <p className="text-blue-100 mt-2">
                      Enter your credentials to access your school's dashboard
                    </p>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <LoginForm />
                  </div>
                </div>
                
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/join-school" className="text-blue-600 font-medium hover:text-blue-800">
                      Join Your School on Aqimari
                    </Link>
                  </p>
                </div>
              </div>
              



              
              {/* Right Column - Benefits */}
              <BenefitsSection
                heading="Why Schools Love Aqimari"
                subheading="Join hundreds of educational institutions that have transformed their scheduling"
                benefits={[
                  {
                    title: 'Effortless Scheduling',
                    description: 'Create conflict-free timetables in minutes, not hours, with our intelligent algorithm.',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    iconPath:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  },
                  {
                    title: 'Real-Time Collaboration',
                    description: 'Teachers and administrators can coordinate schedules in real-time from any device.',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    iconPath: "M17 20h5v-2a3 3 0 00-3-3h-3M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  },
                  {
                    title: 'Comprehensive Analytics',
                    description: 'Gain insights into resource utilization, teacher workload, and student performance.',
                    iconBg: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  },
                  {
                    title: 'Resource Optimization',
                    description: 'Maximize classroom and facility usage with our smart resource allocation system.',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    iconPath: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  }
                ]}
                trustedBy={['AASTU', 'HU', 'JU', 'MU', 'DU', 'BU']}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;