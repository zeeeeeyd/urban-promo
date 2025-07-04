import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Play, Pause } from 'lucide-react';

interface VideoContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  cta: string;
}

const Hero = () => {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 1,
      title: t('hero.video1.title'),
      subtitle: t('hero.video1.subtitle'),
      description: t('hero.video1.description'),
      videoUrl: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
      cta: t('hero.video1.cta')
    },
    {
      id: 2,
      title: t('hero.video2.title'),
      subtitle: t('hero.video2.subtitle'),
      description: t('hero.video2.description'),
      videoUrl: "https://videos.pexels.com/video-files/3571077/3571077-uhd_2560_1440_30fps.mp4",
      cta: t('hero.video2.cta')
    },
    {
      id: 3,
      title: t('hero.video3.title'),
      subtitle: t('hero.video3.subtitle'),
      description: t('hero.video3.description'),
      videoUrl: "https://videos.pexels.com/video-files/3209821/3209821-uhd_2560_1440_25fps.mp4",
      cta: t('hero.video3.cta')
    }
  ];

  const currentContent = videoContent[currentVideoIndex];

  useEffect(() => {
    // Trigger content animation when video changes
    setContentVisible(false);
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentVideoIndex, t]);

  useEffect(() => {
    // Auto-advance videos every 15 seconds
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videoContent.length);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, videoContent.length]);

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentContent.id}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop={false}
          onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % videoContent.length)}
        >
          <source src={currentContent.videoUrl} type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content Container - Positioned in left corner for large screens */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-xl">
          {/* Animated Content */}
          <div 
            className={`transform transition-all duration-1000 ease-out ${
              contentVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Subtitle */}
            <div 
              className={`inline-block mb-3 transform transition-all duration-700 delay-200 ${
                contentVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <span className="text-yellow-400 text-xs font-semibold tracking-wider uppercase border border-yellow-400/30 px-3 py-1 backdrop-blur-sm bg-yellow-400/10">
                {currentContent.subtitle}
              </span>
            </div>

            {/* Main Title */}
            <h1 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transform transition-all duration-700 delay-400 ${
                contentVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {currentContent.title}
            </h1>

            {/* Description */}
            <p 
              className={`text-base md:text-lg text-gray-200 mb-6 max-w-lg leading-relaxed transform transition-all duration-700 delay-600 ${
                contentVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {currentContent.description}
            </p>

            {/* CTA Button */}
            <div 
              className={`transform transition-all duration-700 delay-800 ${
                contentVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <button className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-zinc-900 bg-yellow-400 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 transform">
                <span className="relative z-10">{currentContent.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 rounded-lg"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Video Indicators */}
          <div className="flex space-x-2">
            {videoContent.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`w-12 h-1 transition-all duration-300 rounded-full ${
                  index === currentVideoIndex
                    ? 'bg-yellow-400'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              >
                <div 
                  className={`h-full bg-yellow-400 transition-all duration-300 rounded-full ${
                    index === currentVideoIndex && isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    width: index === currentVideoIndex ? '100%' : '0%'
                  }}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-sm font-medium tracking-wider">{t('hero.scroll')}</span>
          <ChevronDown 
            size={24} 
            className="animate-bounce"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300"
          style={{
            width: `${((currentVideoIndex + 1) / videoContent.length) * 100}%`
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;