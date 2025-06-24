import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ NEW
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
  const location = useLocation(); // ✅
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    // Animate sections on scroll
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

    // ✅ Scroll to section if URL has search param like ?scrollTo=features
    const params = new URLSearchParams(location.search);
    const targetId = params.get('scrollTo');
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        gsap.to(window, {
          duration: 1,
          scrollTo: element,
          ease: 'power2.inOut',
          onComplete: () => {
            // ✅ Clean the URL (remove the ?scrollTo=...)
            navigate(location.pathname, { replace: true });
          },
        });
      }
    }
  }, [location, navigate]);

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