import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Globe, TrendingUp, ArrowRight, Play, X } from 'lucide-react';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration, suffix = '', prefix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-gray-900">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ValueCard = ({ icon, title, description, delay }: ValueCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white border border-gray-200 p-8 transition-all duration-700 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 rounded-xl ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-xl">
          {icon}
        </div>
        <div className="absolute -inset-2 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>

      {/* Hover Border Animation */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    header: false,
    stats: false,
    story: false,
    values: false
  });
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const stats = [
    { end: 500, suffix: '+', label: t('about.stats.projects') },
    { end: 15, suffix: '+', label: t('about.stats.years') },
    { end: 50, suffix: '+', label: t('about.stats.cities') },
    { end: 98, suffix: '%', label: t('about.stats.satisfaction') }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  // Intersection Observer for section animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLElement>, key: keyof typeof sectionsVisible) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setSectionsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    };

    createObserver(headerRef, 'header');
    createObserver(statsRef, 'stats');
    createObserver(storyRef, 'story');
    createObserver(valuesRef, 'values');

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
      
      setActiveSection(Math.floor(scrollProgress * 3));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoClick = () => {
    setIsVideoExpanded(true);
  };

  const handleCloseVideo = () => {
    setIsVideoExpanded(false);
  };

  return (
    <section ref={sectionRef} id="about" className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            sectionsVisible.header 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="text-yellow-600 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10 rounded-full">
              {t('about.subtitle')}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {t('about.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 transition-all duration-1000 delay-200 ${
            sectionsVisible.stats 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className={`text-center group animate-fade-in-scale stagger-${index + 1}`}>
              <div className="relative">
                <Counter 
                  end={stat.end} 
                  duration={2000 + index * 200} 
                  suffix={stat.suffix}
                />
                <div className="absolute -inset-4 bg-yellow-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
              <p className="text-gray-600 mt-2 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div 
          ref={storyRef}
          className={`grid lg:grid-cols-2 gap-16 items-center mb-32 transition-all duration-1000 delay-400 ${
            sectionsVisible.story 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="space-y-8 animate-slide-in-left">
            <div className={`space-y-6 transition-all duration-700 ${
              isVideoExpanded ? 'opacity-0' : 'opacity-100'
            }`}>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t('about.story.title')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph2')}
              </p>
            </div>
            
            <button className={`group flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 rounded-lg ${
              isVideoExpanded ? 'opacity-0' : 'opacity-100'
            }`}>
              <span>{t('about.story.cta')}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="relative animate-slide-in-right">
            <div className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group rounded-xl transition-all duration-600 ${
              isVideoExpanded ? 'video-expand fixed inset-0 z-50 aspect-auto' : ''
            }`}>
              <img
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg"
                alt="Urban Development"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isVideoExpanded ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <button 
                  onClick={handleVideoClick}
                  className="w-20 h-20 bg-yellow-400/90 backdrop-blur-sm flex items-center justify-center hover:bg-yellow-400 transition-colors duration-200 rounded-full"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>

              {/* Close Button for Expanded Video */}
              {isVideoExpanded && (
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-200 rounded-full z-60"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
            
            {/* Decorative Elements - Hidden when video is expanded */}
            {!isVideoExpanded && (
              <>
                <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-yellow-400/30 rounded-lg"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400/10 backdrop-blur-sm rounded-lg"></div>
              </>
            )}
          </div>
        </div>

        {/* Values Section */}
        <div 
          ref={valuesRef}
          className={`transition-all duration-1000 delay-600 ${
            sectionsVisible.values 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.values.title')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {[0, 1, 2].map((section) => (
            <div
              key={section}
              className={`w-2 h-8 transition-all duration-300 rounded-full ${
                activeSection >= section ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Video Expanded Overlay */}
      {isVideoExpanded && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={handleCloseVideo} />
      )}
    </section>
  );
};

export default About;