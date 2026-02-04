"use client";
import React, { useEffect, useState, RefObject } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  // CHANGE: Add "| null" here to match how useRef works in React
  containerRef: RefObject<HTMLDivElement | null>;
}

const ScrollToTop = ({ containerRef }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const toggleVisibility = () => {
      // Show button when user scrolls down 400px
      if (container.scrollTop > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener("scroll", toggleVisibility);
    return () => container.removeEventListener("scroll", toggleVisibility);
  }, [containerRef]);

  const scrollToTop = () => {
    // The ?. (optional chaining) safely handles the case if containerRef.current is null
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-18 right-6 z-50 p-2 bg-[#2076C7] text-white rounded-full shadow-2xl transition-all duration-300 hover:bg-blue-600 active:scale-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;