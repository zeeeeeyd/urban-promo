import { useEffect } from 'react';
import './i18n';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import PropertyGallery from './components/PropertyGallery';
import UrbanPromoLifestyle from './components/UrbanPromoLifestyle';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import SectionWrapper from './components/SectionWrapper';

function App() {
  useEffect(() => {
    // Set document language based on i18n
    const handleLanguageChange = () => {
      document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
    };

    handleLanguageChange();
    window.addEventListener('languagechange', handleLanguageChange);

    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* <ScrollIndicator /> */}
      
      <div id="hero">
        <Hero />
      </div>
      
      <SectionWrapper animationType="fadeUp" delay={100}>
        <div id="about">
          <About />
        </div>
      </SectionWrapper>
      
      <SectionWrapper animationType="fadeLeft" delay={200}>
        <div id="projects">
          <PropertyGallery />
        </div>
      </SectionWrapper>
      
      <SectionWrapper animationType="fadeRight" delay={100}>
        <div id="lifestyle">
          <UrbanPromoLifestyle />
        </div>
      </SectionWrapper>
      
      <SectionWrapper animationType="scale" delay={150}>
        <div id="faq">
          <FAQ />
        </div>
      </SectionWrapper>
      
      <SectionWrapper animationType="fadeUp" delay={100}>
        <div id="contact">
          <Contact />
        </div>
      </SectionWrapper>
      <Footer />
    </>
  );
}

export default App;