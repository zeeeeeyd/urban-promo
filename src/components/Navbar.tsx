import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Menu, X } from 'lucide-react';
import ProjectDropdown from './ProjectDropdown';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects', hasDropdown: true },
    { name: t('nav.showcase'), href: '#showcase' },
    { name: t('nav.world'), href: '#urban-promo' }
  ];

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-16 z-40 pointer-events-auto"
        onMouseEnter={() => setIsVisible(true)}
      />
      
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 0%, rgba(24,24,27,0.7) 50%, rgba(24,24,27,0.5) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-white text-xl font-bold tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                URBAN PROMO
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className={item.hasDropdown ? 'relative group' : ''}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group/link"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover/link:w-full"></span>
                    </a>
                    
                    {/* Project Dropdown */}
                    {item.hasDropdown && <ProjectDropdown />}
                  </div>
                ))}
                
                {/* Language Selector */}
                <LanguageSelector />
                
                <button 
                  className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 px-6 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {t('nav.contact')}
                </button>
                
                {/* Location Icon */}
                <button className="text-yellow-400 hover:text-white p-2 hover:bg-white/10 transition-all duration-200">
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSelector />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(24,24,27,0.95) 0%, rgba(24,24,27,0.9) 100%)',
            backdropFilter: 'blur(15px)'
          }}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-white/5"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            <div className="flex items-center space-x-4 px-3 pt-4">
              <button 
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-6 py-3 text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {t('nav.contact')}
              </button>
              
              <button className="text-yellow-400 hover:text-white p-3 hover:bg-white/10 transition-all duration-200">
                <MapPin size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;