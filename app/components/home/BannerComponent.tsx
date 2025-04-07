'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/app/styles/theme';
import _ from '@/app/utils/lodashUtils';

// Define the banner data interface
interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bgColor: string;
  textColor: string;
}

// Banner data for the carousel
const bannerData: BannerItem[] = [
  {
    id: 1,
    title: "Seasonal Sale",
    subtitle: "Up to 30% off on organic fertilizers",
    cta: "Shop Now",
    link: "/products?category=fertilizers&sale=true",
    bgColor: "from-green-600 to-green-800",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "New Seeds Collection",
    subtitle: "Premium quality seeds for your farm",
    cta: "Explore Seeds",
    link: "/products?category=seeds",
    bgColor: "from-amber-500 to-amber-700",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Agricultural Machinery",
    subtitle: "Modern equipment for efficient farming",
    cta: "View Equipment",
    link: "/products?category=machinery",
    bgColor: "from-blue-600 to-blue-800",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "Sustainable Farming",
    subtitle: "Eco-friendly products for responsible agriculture",
    cta: "Learn More",
    link: "/sustainability",
    bgColor: "from-teal-500 to-teal-700",
    textColor: "text-white"
  }
];

const BannerComponent: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const autoplayInterval = 5000; // 5 seconds per slide
  const totalBanners = bannerData.length;

  // Auto-advance banners
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!isAutoplayPaused) {
      intervalId = setInterval(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % totalBanners);
      }, autoplayInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoplayPaused, totalBanners]);

  // Pause autoplay when hovering
  const handleMouseEnter = () => setIsAutoplayPaused(true);
  const handleMouseLeave = () => setIsAutoplayPaused(false);

  // Handle manual navigation
  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  const goToNextBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % totalBanners);
  };

  const goToPrevBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner - 1 + totalBanners) % totalBanners);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-50">
      {/* Main Banner Carousel */}
      <div 
        ref={bannerRef}
        className="relative w-full h-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Banner Content */}
              <div className={`flex flex-col md:flex-row items-center justify-between rounded-xl overflow-hidden shadow-lg mx-4 sm:mx-6 lg:mx-8 my-6`}>
                {/* Background with pattern overlay */}
                <div className={`w-full md:w-2/3 bg-gradient-to-r ${bannerData[currentBanner].bgColor} p-6 sm:p-10 relative`}>
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="2" fill="currentColor" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${bannerData[currentBanner].textColor}`}>
                      {bannerData[currentBanner].title}
                    </h2>
                    <p className={`text-lg sm:text-xl mb-6 ${bannerData[currentBanner].textColor} opacity-90`}>
                      {bannerData[currentBanner].subtitle}
                    </p>
                    <a 
                      href={bannerData[currentBanner].link}
                      className={`inline-flex items-center px-5 py-2.5 border-2 border-white text-base font-medium rounded-full 
                        ${bannerData[currentBanner].textColor} hover:bg-white hover:bg-opacity-10 
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                    >
                      {bannerData[currentBanner].cta}
                      <svg className="ml-2 -mr-0.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Image section - would have actual images in production */}
                <div className="w-full md:w-1/3 h-48 md:h-72 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Banner Image {currentBanner + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevBanner}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md text-gray-800 hover:bg-opacity-100 transition-all duration-200 focus:outline-none z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextBanner}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md text-gray-800 hover:bg-opacity-100 transition-all duration-200 focus:outline-none z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Indicator Dots */}
      <div className="flex justify-center space-x-2 pb-4">
        {_.map(bannerData, (_: BannerItem, index: number) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none
              ${currentBanner === index 
                ? 'bg-green-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Promotional Banner */}
      <div className="bg-green-800 text-white py-2.5 px-4 text-center text-sm md:text-base">
        <p className="max-w-6xl mx-auto flex items-center justify-center flex-wrap">
          <span className="font-medium">🚚 Free shipping on orders above ₹2999</span>
          <span className="mx-2 hidden sm:inline">•</span>
          <span>Use code <strong>WELCOME10</strong> for 10% off on your first order</span>
        </p>
      </div>
    </div>
  );
};

export default BannerComponent; 