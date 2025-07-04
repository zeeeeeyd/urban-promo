import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Globe, TrendingUp, ArrowRight, Play } from 'lucide-react';

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
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-white">
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
      className={`group relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl border border-zinc-700/50 p-8 transition-all duration-700 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="absolute -inset-2 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
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
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { end: 500, suffix: '+', label: t('about.stats.projects') },
    { end: 15, suffix: '+', label: t('about.stats.years') },
    { end: 50, suffix: '+', label: t('about.stats.cities') },
    { end: 98, suffix: '%', label: t('about.stats.satisfaction') }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-zinc-900" />,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: <Users className="w-8 h-8 text-zinc-900" />,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: <Globe className="w-8 h-8 text-zinc-900" />,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-zinc-900" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

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

  return (
    <section ref={sectionRef} id="about" className="relative py-32 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10">
              {t('about.subtitle')}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            {t('about.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <Counter 
                  end={stat.end} 
                  duration={2000 + index * 200} 
                  suffix={stat.suffix}
                />
                <div className="absolute -inset-4 bg-yellow-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
              <p className="text-zinc-400 mt-2 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {t('about.story.title')}
              </h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                {t('about.story.paragraph2')}
              </p>
            </div>
            
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 px-8 py-4 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105">
              <span>{t('about.story.cta')}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg"
                alt="Urban Development"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-20 h-20 bg-yellow-400/90 backdrop-blur-sm flex items-center justify-center hover:bg-yellow-400 transition-colors duration-200">
                  <Play className="w-8 h-8 text-zinc-900 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-yellow-400/30"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400/10 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('about.values.title')}
          </h3>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
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

      {/* Section Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {[0, 1, 2].map((section) => (
            <div
              key={section}
              className={`w-2 h-8 transition-all duration-300 ${
                activeSection >= section ? 'bg-yellow-400' : 'bg-zinc-700'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;