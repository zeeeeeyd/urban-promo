import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface LifestyleVideo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

const UrbanPromoLifestyle = () => {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const lifestyleVideos: LifestyleVideo[] = [
    {
      id: 1,
      title: t('lifestyle.videos.celebrating.title'),
      subtitle: t('lifestyle.videos.celebrating.subtitle'),
      description: t('lifestyle.videos.celebrating.description'),
      videoUrl: "https://videos.pexels.com/video-files/3571077/3571077-uhd_2560_1440_30fps.mp4",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
      id: 2,
      title: t('lifestyle.videos.inspiring.title'),
      subtitle: t('lifestyle.videos.inspiring.subtitle'),
      description: t('lifestyle.videos.inspiring.description'),
      videoUrl: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
    },
    {
      id: 3,
      title: t('lifestyle.videos.curated.title'),
      subtitle: t('lifestyle.videos.curated.subtitle'),
      description: t('lifestyle.videos.curated.description'),
      videoUrl: "https://videos.pexels.com/video-files/3209821/3209821-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
    }
  ];

  const currentVideo = lifestyleVideos[currentVideoIndex];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % lifestyleVideos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + lifestyleVideos.length) % lifestyleVideos.length);
    setIsPlaying(false);
  };

  return (
    <section ref={sectionRef} id="lifestyle" className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="inline-block mb-4">
            <span className="text-yellow-600 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10 rounded-full">
              {t('lifestyle.subtitle')}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {t('lifestyle.title')}
          </h2>
          
          <p className="text-md text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('lifestyle.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Player */}
          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative aspect-video bg-gray-900 overflow-hidden group rounded-lg">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={currentVideo.thumbnail}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
              </video>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlayPause}
                  className="w-20 h-20 bg-yellow-400/90 backdrop-blur-sm flex items-center justify-center hover:bg-yellow-400 transition-all duration-200 hover:scale-110 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Video Navigation */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={prevVideo}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-200 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex space-x-2">
                  {lifestyleVideos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleVideoSelect(index)}
                      className={`w-2 h-2 transition-all duration-300 rounded-full ${
                        index === currentVideoIndex
                          ? 'bg-yellow-400 w-8'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextVideo}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-200 rounded-full"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-yellow-400/30 rounded-lg"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400/10 backdrop-blur-sm rounded-lg"></div>
          </div>

          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            {/* Current Video Info */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-yellow-600 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-4 py-1 backdrop-blur-sm bg-yellow-400/10 rounded-full">
                  {currentVideo.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {currentVideo.title}
              </h3>

              <p className="text-md text-gray-600 leading-relaxed">
                {currentVideo.description}
              </p>
            </div>

            {/* Video Thumbnails */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900">
                {t('lifestyle.explore')}
              </h4>
              
              <div className="grid grid-cols-3 gap-4">
                {lifestyleVideos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(index)}
                    className={`group relative aspect-video overflow-hidden transition-all duration-300 rounded-lg ${
                      index === currentVideoIndex
                        ? 'ring-2 ring-yellow-400 scale-105'
                        : 'hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-8 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 rounded-full ${
                        index === currentVideoIndex ? 'bg-yellow-400' : 'group-hover:bg-white/30'
                      }`}>
                        <Play className="w-3 h-3 text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 rounded-lg">
                <span>{t('lifestyle.cta')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrbanPromoLifestyle;