"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageCarousel } from "../../component/ImageCarousel";
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
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <div className="text-gray-500 font-medium">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Lazy Image Carousel component - Only for images
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
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="w-full">
      {isVisible ? (
        <ImageCarousel images={images} alt={alt} delay={delay} />
      ) : (
        <div className="h-64 md:h-80 bg-gray-200 rounded-t-2xl animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <div className="text-gray-500 font-medium">Loading images...</div>
          </div>
        </div>
      )}
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

  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <div className="text-gray-500 font-medium">Loading video...</div>
          </div>
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

// Event Card Component with immediate card loading
interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105 w-full">
      {/* Lazy Image Carousel for Events - Only images load lazily */}
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
  );
};

// Contest Card Component with immediate card loading
interface ContestCardProps {
  contest: typeof successContests[0];
  index: number;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, index }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-300 hover:scale-105 w-full">
      {/* Lazy Image Carousel with actual multiple images - Only images load lazily */}
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
  );
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
        {eventsToShow.map((event, idx) => (
          <EventCard key={idx} event={event} index={idx} />
        ))}
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full max-w-7xl">
              {successContests.map((contest, idx) => (
                <ContestCard key={idx} contest={contest} index={idx} />
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
                55+
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
      </div>
    </section>
  );
};

export default EventSection;