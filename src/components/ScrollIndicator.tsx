import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ScrollIndicator = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'hero', name: t('nav.home') || 'Home' },
    { id: 'about', name: t('nav.about') },
    { id: 'projects', name: t('nav.projects') },
    { id: 'showcase', name: t('nav.showcase') },
    { id: 'lifestyle', name: t('nav.world') },
    { id: 'faq', name: 'FAQ' },
    { id: 'contact', name: t('nav.contact') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${section.name}`}
            />
            
            {/* Tooltip */}
            <div className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all duration-200 ${
              activeSection === index ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
            }`}>
              {section.name}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;