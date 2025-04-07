'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { colors } from '@/app/styles/theme';
import _, { Category } from '@/app/utils/lodashUtils';

// Mock category data with enhanced imagery and descriptions
const categoryData = [
  {
    id: 1,
    name: "Seeds",
    description: "Premium quality seeds for organic crops",
    image: "/images/categories/seeds.jpg",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    link: "/products?category=seeds",
    featured: true
  },
  {
    id: 2,
    name: "Fertilizers",
    description: "Organic and chemical fertilizer solutions",
    image: "/images/categories/fertilizers.jpg",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    link: "/products?category=fertilizers",
    featured: true
  },
  {
    id: 3,
    name: "Machinery",
    description: "Modern agricultural equipment and machinery",
    image: "/images/categories/machinery.jpg",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: "/products?category=machinery",
    featured: true
  },
  {
    id: 4,
    name: "Tools",
    description: "Professional farming tools and equipment",
    image: "/images/categories/tools.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    link: "/products?category=tools",
    featured: false
  },
  {
    id: 5,
    name: "Pesticides",
    description: "Effective and eco-friendly pest solutions",
    image: "/images/categories/pesticides.jpg",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    link: "/products?category=pesticides",
    featured: false
  },
  {
    id: 6,
    name: "Irrigation",
    description: "Advanced irrigation and water management systems",
    image: "/images/categories/irrigation.jpg",
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    link: "/products?category=irrigation",
    featured: false
  },
  {
    id: 7,
    name: "Organic Products",
    description: "Certified organic agricultural products",
    image: "/images/categories/organic.jpg",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    link: "/products?category=organic",
    featured: false
  },
  {
    id: 8,
    name: "Livestock Supplies",
    description: "Quality supplies for livestock management",
    image: "/images/categories/livestock.jpg",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    link: "/products?category=livestock",
    featured: false
  }
];

const CategoriesComponent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCategories, setVisibleCategories] = useState(categoryData);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const controls = useAnimation();

  // Initialize with all categories
  useEffect(() => {
    // Use lodash to transform the data
    const sortedCategories = _.orderBy(
      categoryData,
      ['featured', 'name'],
      ['desc', 'asc']
    );
    setVisibleCategories(sortedCategories);
  }, []);

  // Filter categories when activeFilter changes
  useEffect(() => {
    let filtered;
    
    if (!activeFilter || activeFilter === 'all') {
      filtered = categoryData;
    } else {
      // Use lodash to filter the array
      filtered = _.filter(categoryData, (category: Category) => {
        if (activeFilter === 'featured') {
          return category.featured;
        }
        return true;
      });
    }
    
    // Animate and update the state
    controls.start('visible');
    setVisibleCategories(filtered);
  }, [activeFilter, controls]);

  // Horizontal scroll handling with mouse events
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

  // Filter buttons array with descriptions
  const filters = [
    { id: 'all', name: 'All Categories', description: 'View all our product categories' },
    { id: 'featured', name: 'Featured', description: 'Our most popular categories' }
  ];

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
            Explore by Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our wide range of agricultural products and solutions
          </motion.p>
        </div>

        {/* Filter Tabs - Airbnb style */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-gray-100">
            {_.map(filters, (filter: {id: string, name: string, description: string}, index: number) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`${
                  activeFilter === filter.id || (filter.id === 'all' && !activeFilter)
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scrollable Cards - Airbnb style */}
        <div className="relative">
          {/* Scroll Shadow Indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex space-x-4 pb-8 pt-2 overflow-x-auto hide-scrollbar"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleMouseDown}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence>
              {_.map(visibleCategories, (category: Category, index: number) => (
                <motion.div
                  layout
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={controls}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-60 sm:w-72"
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={category.link} className="block h-full">
                    <div 
                      className={`
                        relative rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                        transition-all duration-300 h-full
                        ${hoveredCard === category.id ? 'transform -translate-y-1' : ''}
                      `}
                    >
                      {/* Card Image */}
                      <div className="h-40 bg-gray-200 relative overflow-hidden">
                        {/* This would be replaced with an actual image in production */}
                        <div className={`absolute inset-0 flex items-center justify-center ${category.bgColor} bg-opacity-70`}>
                          <div className={`p-4 rounded-full bg-white bg-opacity-90 ${category.textColor}`}>
                            {category.icon}
                          </div>
                        </div>
                        
                        {/* Featured badge */}
                        {category.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-4">
                        <h3 className={`text-lg font-semibold ${category.textColor}`}>
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
                          {category.description}
                        </p>
                        
                        {/* Animated arrow icon on hover */}
                        <div className={`
                          flex items-center text-green-600 font-medium text-sm
                          transition-all duration-300
                          ${hoveredCard === category.id ? 'opacity-100' : 'opacity-70'}
                        `}>
                          Explore
                          <svg 
                            className={`
                              w-4 h-4 ml-1 transition-all duration-300
                              ${hoveredCard === category.id ? 'transform translate-x-1' : ''}
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
            </AnimatePresence>
          </div>
        </div>
        
        {/* Browse All Categories Button */}
        <div className="text-center mt-8">
          <Link href="/products" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-200"
            >
              Browse All Categories
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

export default CategoriesComponent; 