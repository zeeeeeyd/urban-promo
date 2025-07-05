import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      code: 'en', 
      name: t('languages.en'), 
      flag: (
        <svg className="w-4 h-3" viewBox="0 0 640 480">
          <defs>
            <clipPath id="us">
              <path d="M0 0h640v480H0z"/>
            </clipPath>
          </defs>
          <g clipPath="url(#us)">
            <path fill="#bd3d44" d="M0 0h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z"/>
            <path fill="#fff" d="M0 37h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z"/>
            <path fill="#192f5d" d="M0 0h364v259H0z"/>
          </g>
        </svg>
      )
    },
    { 
      code: 'fr', 
      name: t('languages.fr'), 
      flag: (
        <svg className="w-4 h-3" viewBox="0 0 640 480">
          <path fill="#fff" d="M0 0h640v480H0z"/>
          <path fill="#002654" d="M0 0h213v480H0z"/>
          <path fill="#ce1126" d="M427 0h213v480H427z"/>
        </svg>
      )
    },
    { 
      code: 'es', 
      name: t('languages.es'), 
      flag: (
        <svg className="w-4 h-3" viewBox="0 0 640 480">
          <path fill="#aa151b" d="M0 0h640v480H0z"/>
          <path fill="#f1bf00" d="M0 120h640v240H0z"/>
        </svg>
      )
    },
    { 
      code: 'de', 
      name: t('languages.de'), 
      flag: (
        <svg className="w-4 h-3" viewBox="0 0 640 480">
          <path fill="#000" d="M0 0h640v160H0z"/>
          <path fill="#de0000" d="M0 160h640v160H0z"/>
          <path fill="#ffce00" d="M0 320h640v160H0z"/>
        </svg>
      )
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop Language Selector */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200 group"
        >
          <Globe size={16} />
          <div className="flex items-center justify-center w-5 h-4 rounded-sm overflow-hidden border border-gray-300">
            {currentLanguage.flag}
          </div>
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl z-50 rounded-lg">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  i18n.language === language.code ? 'bg-zinc-800 text-yellow-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center w-6 h-4 rounded-sm overflow-hidden border border-gray-400">
                  {language.flag}
                </div>
                <span className="text-sm font-medium">{language.name}</span>
                {i18n.language === language.code && (
                  <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Language Selector */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 hover:bg-white/5 transition-all duration-200 rounded-lg"
        >
          <Globe size={20} />
          <div className="flex items-center justify-center w-5 h-4 rounded-sm overflow-hidden border border-gray-300">
            {currentLanguage.flag}
          </div>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl z-50 rounded-lg">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  i18n.language === language.code ? 'bg-zinc-800 text-yellow-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center w-5 h-4 rounded-sm overflow-hidden border border-gray-400">
                  {language.flag}
                </div>
                <span className="text-sm">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click Outside Handler */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;