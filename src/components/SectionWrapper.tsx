import { useEffect, useRef, useState } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'none';
  delay?: number;
}

const SectionWrapper = ({ 
  children, 
  className = '', 
  animationType = 'fadeUp',
  delay = 0 
}: SectionWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    if (animationType === 'none') return '';
    
    const baseClass = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClass} opacity-0 translate-y-12`;
        case 'fadeLeft':
          return `${baseClass} opacity-0 -translate-x-12`;
        case 'fadeRight':
          return `${baseClass} opacity-0 translate-x-12`;
        case 'scale':
          return `${baseClass} opacity-0 scale-95`;
        default:
          return `${baseClass} opacity-0 translate-y-12`;
      }
    }
    
    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div 
      ref={sectionRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;