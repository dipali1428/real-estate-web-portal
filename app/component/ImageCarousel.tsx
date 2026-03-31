"use client";

import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  delay?: number;
}

const BASE_S3_URL = `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public`;

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt, delay = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only set interval if there is more than one image
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images.length, delay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-60 overflow-hidden rounded-t-2xl group">
      {/* Images Container with Scroll Transition */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => {
          // Construct the full URL
          // This logic ensures we don't get double slashes if the image string starts with one
          const fullImageUrl = image.startsWith('http') 
            ? image 
            : `${BASE_S3_URL}/${image.startsWith('/') ? image.slice(1) : image}`;

          return (
            <div key={index} className="w-full h-full shrink-0">
              <img
                src={fullImageUrl}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Only show if images.length > 1 */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if images.length > 1 */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};