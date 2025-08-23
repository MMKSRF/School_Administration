
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPlus, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';

const WelcomeBanner = ({userName, message, userRoleMessage,quickActions}) => {
    // const userName =  'perez'
    // const message = 'welcome endale besher '
    // const userRoleMessage = "This is perez endale from dunamis"


    // const quickActions = [
    //     {
    //         label: 'Add Teacher',
    //         icon: <FaUserPlus className="mr-2" />,
    //         action: () => console.log('Add Teacher clicked')
    //     },
    //     {
    //         label: 'Create Class',
    //         icon: <FaPlus className="mr-2" />,
    //         action: () => console.log('Create Class clicked')
    //     },
    //     {
    //         label: 'Set Schedule',
    //         icon: <FaCalendarAlt className="mr-2" />,
    //         action: () => console.log('Set Schedule clicked')
    //     },
    //     {
    //         label:"View Schedule",
    //         icon:<FaCalendarAlt className="mr-2" />,
    //         action: () => console.log('view Schedule clicked')
    //     },
    //     {
    //         label: "Add New Task ",
    //         icon:<FaCalendarAlt className="mr-2" />,
    //         action: () => console.log(' Add New Task is clicked')
    //     }
    // ];



    const bannerRef = useRef();
    const buttonRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Banner animation
            gsap.from(bannerRef.current, {
                y: 0,
                opacity: 100,
                duration: 0.2,
                ease: 'power2.out'
            });

            // Button animations
            gsap.from(buttonRefs.current, {
                y: 0,
                opacity: 100,
                stagger: 0.15,
                delay: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });

            // Pulse animation for buttons
            buttonRefs.current.forEach(ref => {
                gsap.to(ref, {
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.3)',
                    repeat: 1,
                    yoyo: true,
                    duration: 1.5,
                    delay: 1.2
                });
            });
        });

        return () => ctx.revert();
    }, []);


    return (
        <div
            ref={bannerRef}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Welcome back {userName && `,  ${userName.toUpperCase()}`}
                    </h2>
                    <p className="text-indigo-100 mt-2 max-w-2xl">
                        {message}
                    </p>
                </div>



                <div className="flex items-center space-x-4">
                    <div className="flex space-x-3">
                        {quickActions?.map((action, index) => (
                            <button
                                key={index}
                                ref={el => buttonRefs.current[index] = el}
                                onClick={action.action}
                                className="flex items-center bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-xl transition-all duration-300"
                            >
                                {action.icon}
                                {action.label}
                            </button>
                        ))}
                    </div>

                   
                </div>







            </div>

             {userRoleMessage ?  <div className=" px-6 py-0 pb-5 text-indigo-100 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>

                {userRoleMessage}
            </div> : null}
        </div>
    );
};

export default WelcomeBanner;