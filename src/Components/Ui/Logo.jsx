//  src/components/Logo.js





import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Logo = () => {
  const logoRef = useRef();

  useEffect(() => {
    const logo = logoRef.current;

    // Entrance animation on page load
    gsap.fromTo(
      logo,
      { autoAlpha: 0, scale: 0.5, rotate: -90 },
      {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: 'power3.out',
      }
    );

    // Scroll-triggered spin animation
    gsap.to(logo, {
      scrollTrigger: {
        trigger: logo,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      rotate: 360,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <svg
      ref={logoRef}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
    >
      <rect x="10" y="10" width="80" height="80" rx="5" fill="#2563EB" />
      <line x1="10" y1="30" x2="90" y2="30" stroke="#93C5FD" strokeWidth="2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#93C5FD" strokeWidth="2" />
      <line x1="10" y1="70" x2="90" y2="70" stroke="#93C5FD" strokeWidth="2" />
      <line x1="30" y1="10" x2="30" y2="90" stroke="#93C5FD" strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#93C5FD" strokeWidth="2" />
      <line x1="70" y1="10" x2="70" y2="90" stroke="#93C5FD" strokeWidth="2" />

      <path
        d="M40,65 L50,45 L60,65 M45,58 L55,58"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <line
        x1="75"
        y1="25"
        x2="85"
        y2="25"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="25"
        x2="75"
        y2="15"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;















//   return (
//             <svg 
//   viewBox="0 0 100 100" 
//   xmlns="http://www.w3.org/2000/svg"
//   width="40" 
//   height="40"
// >

//   <rect x="10" y="10" width="80" height="80" rx="5" fill="#2563EB" />
 
//   <line x1="10" y1="30" x2="90" y2="30" stroke="#93C5FD" strokeWidth="2" />
//   <line x1="10" y1="50" x2="90" y2="50" stroke="#93C5FD" strokeWidth="2" />
//   <line x1="10" y1="70" x2="90" y2="70" stroke="#93C5FD" strokeWidth="2" />
//   <line x1="30" y1="10" x2="30" y2="90" stroke="#93C5FD" strokeWidth="2" />
//   <line x1="50" y1="10" x2="50" y2="90" stroke="#93C5FD" strokeWidth="2" />
//   <line x1="70" y1="10" x2="70" y2="90" stroke="#93C5FD" strokeWidth="2" />

//   <path 
//     d="M40,65 L50,45 L60,65 M45,58 L55,58" 
//     stroke="#FFFFFF" 
//     strokeWidth="5" 
//     strokeLinecap="round"
//     fill="none"
//   />
  

//   <line 
//     x1="75" 
//     y1="25" 
//     x2="85" 
//     y2="25" 
//     stroke="#FBBF24" 
//     strokeWidth="3" 
//     strokeLinecap="round"
//   />
//   <line 
//     x1="75" 
//     y1="25" 
//     x2="75" 
//     y2="15" 
//     stroke="#FBBF24" 
//     strokeWidth="3" 
//     strokeLinecap="round"
//   />
// </svg>
//   );
// };

// export default Logo;