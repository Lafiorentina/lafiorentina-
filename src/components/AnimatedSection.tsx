import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  staggerChildren?: boolean;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = '',
  staggerChildren = false,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, once]);

  const getAnimationClass = () => {
    if (animation === 'none') return '';

    const baseClass = 'animate-on-scroll';
    const directionClass = {
      'fade-up': '',
      'fade-down': 'from-top',
      'fade-left': 'from-left',
      'fade-right': 'from-right',
      'scale': 'scale',
    }[animation];

    return `${baseClass} ${directionClass}`.trim();
  };

  const visibleClass = isVisible ? 'is-visible' : '';
  const staggerClass = staggerChildren ? 'stagger-children' : '';

  return (
    <div
      ref={sectionRef}
      className={`${getAnimationClass()} ${visibleClass} ${staggerClass} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
