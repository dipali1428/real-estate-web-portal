"use client";

import React, { useEffect, useRef, useState } from "react";
import { eventsByYear, Event } from "../../data/events";
import { successContests } from "../../data/contests";
import { getEventImages } from "../../data/eventImages";
import { featuredVideos } from "../../data/youtubeVideos";

// Lazy loading wrapper component
interface LazyLoadProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  rootMargin = "50px", 
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : (
        <div className="min-h-[400px] bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
};

// Image Carousel Component with Error Handling
interface ImageCarouselProps {
  images: string[];
  alt: string;
  delay: number;
  onError?: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  alt, 
  delay,
  onError 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => clearInterval(interval);
  }, [images.length, delay]);

  const handleImageError = (index: number) => {
    console.error(`Failed to load image: ${images[index]}`);
    setFailedImages(prev => new Set(prev).add(index));
    
    // If all images fail, trigger the error callback
    if (failedImages.size + 1 === images.length) {
      onError?.();
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  // Filter out failed images
  const validImages = images.filter((_, index) => !failedImages.has(index));

  // If no valid images, show error
  if (validImages.length === 0) {
    return (
      <div className="h-64 md:h-80 bg-gray-200 rounded-t-2xl flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="text-lg mb-2">No images available</div>
          <div className="text-sm text-gray-400">Failed to load event images</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 md:h-80 bg-gray-100 rounded-t-2xl overflow-hidden">
      {validImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onError={() => handleImageError(index)}
          onLoad={() => handleImageLoad(index)}
        />
      ))}
      
      {/* Loading indicator */}
      {loadedImages.size === 0 && validImages.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-gray-400">Loading image...</div>
        </div>
      )}
      
      {/* Image indicators */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Lazy Image Carousel component with enhanced error handling
interface LazyImageCarouselProps {
  images: string[];
  alt: string;
  delay: number;
}

const LazyImageCarousel: React.FC<LazyImageCarouselProps> = ({ 
  images, 
  alt, 
  delay 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Reset error state when images change or component becomes visible
  useEffect(() => {
    if (isVisible) {
      setImageError(false);
    }
  }, [images, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleRetry = () => {
    setImageError(false);
    setRetryCount(prev => prev + 1);
  };

  return (
    <div ref={ref}>
      {isVisible ? (
        imageError ? (
          <div className="h-64 md:h-80 bg-gray-200 rounded-t-2xl flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-lg mb-2">Failed to load images</div>
              <div className="text-sm text-gray-400 mb-4">
                {retryCount > 0 ? `Retry attempt ${retryCount}` : 'Check your connection'}
              </div>
              <button 
                onClick={handleRetry}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Retry Loading
              </button>
            </div>
          </div>
        ) : (
          <ImageCarousel 
            key={retryCount} // Force re-render on retry
            images={images} 
            alt={alt} 
            delay={delay}
            onError={() => setImageError(true)}
          />
        )
      ) : (
        <div className="h-64 md:h-80 bg-gray-200 rounded-t-2xl animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading images...</div>
        </div>
      )}
    </div>
  );
};

// Image Debugger Component (Remove in production)
interface ImageDebuggerProps {
  images: string[];
}

const ImageDebugger: React.FC<ImageDebuggerProps> = ({ images }) => {
  const [status, setStatus] = useState<{ [key: string]: string }>({});

  // Utility function to check if image exists
  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      // For data URLs, they're always valid
      if (url.startsWith('data:')) return true;
      
      // For external URLs, check if they exist
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      return true; // If we get here, the request didn't fail (CORS might block but image might still exist)
    } catch (error) {
      console.error(`Image check failed for ${url}:`, error);
      return false;
    }
  };

  useEffect(() => {
    const verifyImages = async () => {
      const newStatus: { [key: string]: string } = {};
      
      for (const image of images) {
        try {
          // Quick check - if it's a relative path, it might need the base URL in production
          if (image.startsWith('/') && !image.startsWith('//') && process.env.NODE_ENV === 'production') {
            newStatus[image] = '⚠️ Relative path in production';
          } else {
            const exists = await checkImageExists(image);
            newStatus[image] = exists ? '✅ Loaded' : '❌ Failed';
          }
        } catch (error) {
          newStatus[image] = '❌ Error checking';
        }
      }
      
      setStatus(newStatus);
    };

    verifyImages();
  }, [images]);

  // Don't show debugger in production
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm z-50 border border-gray-600">
      <div className="font-bold mb-2 text-teal-300">Image Debugger:</div>
      {Object.entries(status).map(([image, status]) => (
        <div key={image} className="mb-1 border-b border-gray-700 pb-1 last:border-b-0">
          <span className={status.includes('✅') ? 'text-green-400' : status.includes('❌') ? 'text-red-400' : 'text-yellow-400'}>
            {status}
          </span>
          <div className="truncate text-gray-300 mt-1">{image}</div>
        </div>
      ))}
      <div className="mt-2 text-gray-400 text-xs">
        Total: {images.length} images
      </div>
    </div>
  );
};

// YouTube Video Component
interface YouTubeVideoProps {
  videoId: string;
  title: string;
  thumbnail?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load YouTube video: ${videoId}`);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg mb-2">Failed to load video</div>
          <div className="text-sm">YouTube video unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading video...</div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  );
};

// Lazy YouTube Video Component
const LazyYouTubeVideo: React.FC<YouTubeVideoProps> = (props) => {
  return (
    <LazyLoad rootMargin="200px">
      <YouTubeVideo {...props} />
    </LazyLoad>
  );
};

// Helper function to extract month and year from date string
const getMonthAndYearFromDate = (dateString: string): { month: string; year: number } => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Try to parse the date string
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return {
      month: months[date.getMonth()],
      year: date.getFullYear()
    };
  }
  
  // Fallback: try to extract year from string
  const yearMatch = dateString.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
  
  // Fallback: try to extract month name from string
  const monthMatch = dateString.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
  const month = monthMatch ? monthMatch[0] : "Unknown Month";
  
  return { month, year };
};

// Helper function to get month order for sorting
const getMonthOrder = (month: string): number => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(month);
};

// Sort events by date (most recent first)
const sortEventsByDate = (events: Event[]): Event[] => {
  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Descending order (most recent first)
  });
};

// Group events by month across all years
const groupEventsByMonth = (eventsByYear: { [year: string]: Event[] }) => {
  const allEvents: Event[] = [];
  
  // Flatten all events from all years
  Object.values(eventsByYear).forEach(events => {
    allEvents.push(...events);
  });
  
  // Sort all events by date (most recent first)
  const sortedEvents = sortEventsByDate(allEvents);
  
  // Group by month
  const grouped: { [month: string]: Event[] } = {};
  
  sortedEvents.forEach(event => {
    const { month } = getMonthAndYearFromDate(event.date);
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(event);
  });
  
  // Sort months in chronological order (January to December)
  return Object.entries(grouped)
    .sort(([monthA], [monthB]) => getMonthOrder(monthA) - getMonthOrder(monthB))
    .reduce((acc, [month, events]) => {
      acc[month] = events;
      return acc;
    }, {} as { [month: string]: Event[] });
};

// Component for displaying events with view more functionality
interface EventMonthSectionProps {
  month: string;
  events: Event[];
}

const EventMonthSection: React.FC<EventMonthSectionProps> = ({ month, events }) => {
  const [showAll, setShowAll] = useState(false);
  const eventsToShow = showAll ? events : events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  return (
    <div key={month} className="mb-12">
      {/* Month Header */}
      <div className="mb-6">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-600 border-l-4 border-teal-500 pl-4">
          {month} <span className="text-sm text-gray-500 font-normal">({events.length} events)</span>
        </h4>
      </div>

      {/* Events Grid for this Month */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsToShow.map((event, idx) => {
          return (
            <LazyLoad key={idx} rootMargin="100px">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
                {/* Debugger for images */}
                <ImageDebugger images={getEventImages(event)} />
                
                {/* Lazy Image Carousel for Events */}
                <LazyImageCarousel 
                  images={getEventImages(event)}
                  alt={`${event.city} Business Event`}
                  delay={3500}
                />
                <div className="p-6">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                    {event.city} Business Event
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base mb-3">{event.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {event.city}
                    </div>
                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded">
                      {event.date}
                    </span>
                  </div>
                </div>
              </div>
            </LazyLoad>
          );
        })}
      </div>

      {/* View More Button */}
      {hasMoreEvents && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {showAll ? `View Less` : `View All ${events.length} Events`}
          </button>
        </div>
      )}
    </div>
  );
};

const EventSection: React.FC = () => {
  // Group events by month across all years
  const eventsByMonth = groupEventsByMonth(eventsByYear);

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-20">

        {/* ===== Success Contest Section ===== */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Success International Contests
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
              Celebrating our top achievers and innovators at <span className="font-semibold text-teal-600">Infinity Arthvishva</span>.
            </p>
          </div>

          {/* Centered grid for 2 cards - Made larger */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl">
              {successContests.map((contest, idx) => (
                <LazyLoad key={idx} rootMargin="150px">
                  <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-300 hover:scale-105">
                    {/* Debugger for contest images */}
                    <ImageDebugger images={contest.images || [contest.img]} />
                    
                    {/* Lazy Image Carousel with actual multiple images */}
                    <LazyImageCarousel 
                      images={contest.images || [contest.img]}
                      alt={contest.title}
                      delay={4000}
                    />
                    {/* Larger text container */}
                    <div className="p-8 md:p-10">
                      <h4 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                        {contest.title}
                      </h4>
                      <p className="text-gray-600 text-lg md:text-1xl leading-relaxed">{contest.desc}</p>
                    </div>
                  </div>
                </LazyLoad>
              ))}
            </div>
          </div>
        </div>

        {/* ===== YouTube Video Section ===== */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
              Watch inspiring stories of transformation and success from our <span className="font-semibold text-teal-600">Infinity Arthvishva</span> community members.
            </p>
          </div>

          {/* YouTube Videos Grid - Centered based on number of videos */}
          <div className={`flex justify-center ${
            featuredVideos.length === 1 
              ? 'max-w-2xl mx-auto' 
              : featuredVideos.length === 2 
                ? 'max-w-4xl mx-auto' 
                : 'w-full'
          }`}>
            <div className={`grid gap-8 ${
              featuredVideos.length === 1 
                ? 'grid-cols-1 max-w-lg' 
                : featuredVideos.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1 lg:grid-cols-3'
            } w-full`}>
              {featuredVideos.map((video, index) => (
                <div key={index} className="group">
                  <LazyYouTubeVideo 
                    videoId={video.videoId}
                    title={video.title}
                  />
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 text-lg mb-2 group-hover:text-teal-600 transition-colors duration-300">
                      {video.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Events Section ===== */}
        <div>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Business Events
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-1xl">
              Join <span className="font-semibold text-teal-600">Infinity Arthvishva</span> across India for networking, workshops, and business growth opportunities.
            </p>
          </div>

          {/* Events by Month (combined across all years) */}
          {Object.keys(eventsByMonth).map((month) => (
            <EventMonthSection
              key={month}
              month={month}
              events={eventsByMonth[month]}
            />
          ))}
        </div>

        {/* Statistics Section */}
        <LazyLoad rootMargin="50px">
          <div className="mt-20 bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-700">
                Our Event Reach
              </h3>
              <p className="text-gray-600 mt-2">Across multiple cities in India</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600">
                  {Object.values(eventsByYear).flat().length}+
                </div>
                <div className="text-gray-600">Total Events</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600">
                  {new Set(Object.values(eventsByYear).flat().map(event => event.city)).size}+
                </div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600">
                  {Object.keys(eventsByYear).length}
                </div>
                <div className="text-gray-600">Years</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600">10000+</div>
                <div className="text-gray-600">Participants</div>
              </div>
            </div>
          </div>
        </LazyLoad>
      </div>
    </section>
  );
};

export default EventSection;