import React, { useEffect, useRef } from 'react';

import Header from '../Components/Pages/Header';
import Hero from '../Components/Pages/Hero';
import Features from '../Components/Pages/Features';
import HowItWorks from '../Components/Pages/HowItWorks';
import Footer from '../Components/Pages/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


function Layout() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.from('.logo', {
      duration: 1.2,
      opacity: 0,
      scale: 0.8,
      rotation: 10,
      ease: 'elastic.out(1, 0.75)',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <Header />

      <main>
        <div id="about" ref={(el) => (sectionRefs.current[0] = el)}>
          <Hero />
        </div>

        <div id="features" ref={(el) => (sectionRefs.current[1] = el)}>
          <Features />
        </div>

        <div id="how-it-works" ref={(el) => (sectionRefs.current[2] = el)}>
          <HowItWorks />
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default Layout;

