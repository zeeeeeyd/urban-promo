import { useEffect } from 'react';
import './i18n';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  useEffect(() => {
    // Set document language based on i18n
    const handleLanguageChange = () => {
      document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
    };

    handleLanguageChange();
    window.addEventListener('languagechange', handleLanguageChange);

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;