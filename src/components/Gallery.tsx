import React, { useEffect, useRef } from 'react';
import ImageCarousel from './ImageCarousel';

interface GalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('active');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Need 7 images: 1 featured + 6 for grid
  const displayImages = images.slice(0, 7);
  const featuredImage = displayImages[0];
  const gridImages = displayImages.slice(1, 7); // 6 images

  // If no images, show nothing
  if (!displayImages || displayImages.length === 0) {
    return null;
  }

  // Grid layout: featured image spans 2 cols x 3 rows
  const getGridStyles = (index: number): string => {
    if (index === 0) {
      return 'md:col-span-2 md:row-span-3'; // Featured image: 2 cols, 3 rows
    }
    return 'md:col-span-1 md:row-span-1';
  };

  return (
    <>
      {/* Mobile: Elegant Carousel */}
      <div className="md:hidden">
        <ImageCarousel images={displayImages} height="400px" />
      </div>

      {/* Desktop: Featured + Grid Layout */}
      <div
        ref={galleryRef}
        className="hidden md:grid grid-cols-4 auto-rows-[200px] gap-4"
      >
        {/* Featured Image - Left side, spans 2 cols x 3 rows */}
        {featuredImage && (
          <div
            key={featuredImage.url}
            className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer md:col-span-2 md:row-span-3"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0s`,
            }}
          >
            {/* Image */}
            <img
              src={featuredImage.url}
              alt={featuredImage.alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: 'center 60%' }}
              loading="lazy"
              width="800"
              height="1200"
              decoding="async"
            />

            {/* Gradient Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500" />


            {/* Corner accent on hover */}
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[3px] border-t-[3px] border-gold opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[3px] border-b-[3px] border-gold opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-br-2xl" />
          </div>
        )}

        {/* Grid - Right side */}
        {gridImages.map((image, index) => (
          <div
            key={image.url}
            className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer md:col-span-1 md:row-span-1"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 0.1}s`,
            }}
          >
            {/* Image */}
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ 
                objectPosition: image.url.includes('7d05cce5e0b5a192b0f3ee9f4027823fa0d43637')
                  ? 'center 90%' 
                  : image.url.includes('fc05711e86bc82e2c08458856cf3bafa396af7e8') 
                  ? 'center 85%' 
                  : image.url.includes('294d764719da57b6caa2e45629496af4bb241aa9')
                  ? 'center 30%'
                  : 'center 60%' 
              }}
              loading="lazy"
              width="600"
              height="600"
              decoding="async"
            />

            {/* Gradient Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500" />


            {/* Corner accent on hover */}
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[3px] border-t-[3px] border-gold opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[3px] border-b-[3px] border-gold opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-br-2xl" />
          </div>
        ))}
      </div>

      {/* CSS for active state */}
      <style>{`
        .gallery-item.active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
};

export default Gallery;
