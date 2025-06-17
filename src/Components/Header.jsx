import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header animation on scroll
    gsap.to(headerRef.current, {
      backgroundColor: window.scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
      boxShadow: window.scrollY > 50 ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
      duration: 0.3,
      scrollTrigger: {
        start: 50,
        onUpdate: self => {
          gsap.to(headerRef.current, {
            backgroundColor: self.scroll() > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: self.scroll() > 50 ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
            duration: 0.3
          });
        }
      }
    });

    // Highlight nav links based on section in view
    const sections = ['about', 'features', 'how-it-works', 'contact'];

    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      gsap.to(window, {
        duration: 1,
        scrollTo: element,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm py-4 transition-all duration-300"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-2xl font-bold text-blue-600">Aqimari</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['about', 'features', 'how-it-works'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`font-medium capitalize transition-colors cursor-pointer ${
                activeSection === item ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 active:text-blue-400 focus:text-blue-600`}
            >
              {item.replace('-', ' ')}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              activeSection === 'contact' ? 'bg-blue-700' : 'bg-blue-600'
            } text-white hover:bg-blue-700`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {['about', 'features', 'how-it-works'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`font-medium capitalize text-left transition-colors py-2 ${
                  activeSection === item ? 'text-blue-600' : 'text-gray-700'
                } hover:text-blue-600`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                activeSection === 'contact' ? 'bg-blue-700' : 'bg-blue-600'
              } text-white hover:bg-blue-700`}
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
