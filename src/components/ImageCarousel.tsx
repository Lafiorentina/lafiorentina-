import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: { url: string; alt?: string; caption?: string }[];
  showKenBurns?: boolean;
  height?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  showKenBurns = false,
  height = "500px"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-elegant flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-elegant-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-secondary" />
      </button>
    );

  const renderArrowNext = (onClickHandler: () => void, hasNext: boolean) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-elegant flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-elegant-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-secondary" />
      </button>
    );

  const renderIndicator = (
    onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number
  ) => (
    <button
      type="button"
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      className={`mx-1 transition-all duration-300 rounded-full ${
        isSelected
          ? "w-8 h-2 bg-primary"
          : "w-2 h-2 bg-white/50 hover:bg-white/80"
      }`}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isSelected}
    />
  );

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-elegant-lg"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        selectedItem={currentIndex}
        onChange={setCurrentIndex}
        autoPlay={!isHovered}
        infiniteLoop
        interval={5000}
        showStatus={false}
        showThumbs={false}
        showArrows={true}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        renderIndicator={renderIndicator}
        emulateTouch
        swipeable
        dynamicHeight={false}
        className="h-full"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="h-full"
            style={{ height }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={image.url}
                alt={image.alt || (image.caption || `La Fiorentina restaurant image ${index + 1} - Italian restaurant in Lisbon`)}
                className={`w-full h-full object-cover object-center ${
                  showKenBurns && currentIndex === index ? "ken-burns" : ""
                }`}
                style={{ height, objectPosition: 'center 40%' }}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Caption if provided */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-lg font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
