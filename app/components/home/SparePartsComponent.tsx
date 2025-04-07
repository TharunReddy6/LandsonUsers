'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';
import _, { SparePart } from '@/app/utils/lodashUtils';

// Mock spare parts data
const sparePartsData = [
  {
    id: 1,
    name: "Water Pump Assembly",
    category: "Irrigation",
    compatibility: ["Solar Water Pump", "Drip Irrigation Kit"],
    price: 1299,
    discountedPrice: 1099,
    rating: 4.6,
    reviewCount: 32,
    inStock: true,
    image: "/images/spareparts/pump-assembly.jpg"
  },
  {
    id: 2,
    name: "Tractor Starter Motor",
    category: "Machinery",
    compatibility: ["Compact Tractor", "Farm Tractor"],
    price: 3499,
    discountedPrice: null,
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    image: "/images/spareparts/starter-motor.jpg"
  },
  {
    id: 3,
    name: "Sprayer Nozzle Set",
    category: "Sprayers",
    compatibility: ["Manual Sprayer", "Power Sprayer"],
    price: 599,
    discountedPrice: 499,
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    image: "/images/spareparts/nozzle-set.jpg"
  },
  {
    id: 4,
    name: "Harvester Blade Kit",
    category: "Machinery",
    compatibility: ["Mini Harvester", "Combine Harvester"],
    price: 2199,
    discountedPrice: 1899,
    rating: 4.7,
    reviewCount: 36,
    inStock: false,
    image: "/images/spareparts/blade-kit.jpg"
  },
  {
    id: 5,
    name: "Drip Emitters (100 pcs)",
    category: "Irrigation",
    compatibility: ["Drip Irrigation Kit", "Micro Irrigation System"],
    price: 499,
    discountedPrice: 399,
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    image: "/images/spareparts/drip-emitters.jpg"
  },
  {
    id: 6,
    name: "Seeder Drive Chain",
    category: "Machinery",
    compatibility: ["Precision Seed Planter", "Row Crop Planter"],
    price: 899,
    discountedPrice: null,
    rating: 4.4,
    reviewCount: 21,
    inStock: true,
    image: "/images/spareparts/drive-chain.jpg"
  }
];

// Format price in Indian Rupee format
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const SparePartsComponent: React.FC = () => {
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Horizontal scroll handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsScrolling(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrolling || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopScrolling = () => {
    setIsScrolling(false);
  };

  return (
    <section className="py-10 md:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
            style={{ color: colors.primary.main }}
          >
            Genuine Spare Parts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Original replacement parts for all your agricultural equipment
          </motion.p>
        </div>

        {/* Spare Parts Carousel */}
        <div className="relative">
          {/* Scroll Shadow Indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex space-x-5 pb-8 pt-2 overflow-x-auto hide-scrollbar"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleMouseDown}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onMouseMove={handleMouseMove}
          >
            {_.map(sparePartsData, (part: SparePart, index: number) => (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-60 sm:w-72"
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                <Link href={`/spare-parts/${part.id}`} className="block h-full">
                  <div 
                    className={`
                      relative rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                      transition-all duration-300 h-full bg-white border border-gray-100
                      ${hoveredPart === part.id ? 'transform -translate-y-1' : ''}
                    `}
                  >
                    {/* Part Image */}
                    <div className="h-44 bg-gray-100 relative overflow-hidden">
                      {/* This would be replaced with an actual image in production */}
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-400 text-xs">Part Image</div>
                      </div>
                      
                      {/* Out of stock overlay */}
                      {!part.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          {part.category}
                        </span>
                      </div>
                      
                      {/* Discounted badge */}
                      {part.discountedPrice && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            SALE
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Part Info */}
                    <div className="p-4">
                      {/* Part Name */}
                      <h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-1">
                        {part.name}
                      </h3>
                      
                      {/* Compatibility */}
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
                        <div className="flex flex-wrap gap-1">
                          {_.map(part.compatibility, (item: string, i: number) => (
                            <span 
                              key={i} 
                              className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Ratings */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(part.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({part.reviewCount})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline mt-2">
                        {part.discountedPrice ? (
                          <>
                            <span className="text-lg font-semibold text-gray-900">
                              {formatPrice(part.discountedPrice)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(part.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(part.price)}
                          </span>
                        )}
                      </div>
                      
                      {/* View Details - animated on hover */}
                      <div 
                        className={`
                          flex items-center text-green-600 font-medium text-sm mt-2
                          transition-all duration-300
                          ${hoveredPart === part.id ? 'opacity-100' : 'opacity-70'}
                        `}
                      >
                        View Details
                        <svg 
                          className={`
                            w-4 h-4 ml-1 transition-all duration-300
                            ${hoveredPart === part.id ? 'transform translate-x-1' : ''}
                          `} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Browse All Spare Parts Button */}
        <div className="text-center mt-8">
          <Link href="/spare-parts" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-200"
            >
              Browse All Spare Parts
              <svg className="ml-2 -mr-0.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
      
      {/* Custom CSS to hide scrollbars but maintain functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default SparePartsComponent; 