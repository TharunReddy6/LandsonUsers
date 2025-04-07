'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/app/styles/theme';
import _, { Product } from '@/app/utils/lodashUtils';

// Mock product data
const productData = [
  {
    id: 1,
    name: "Premium Corn Seeds",
    description: "High-yielding hybrid corn seeds perfect for all soil types",
    price: 899,
    discountedPrice: 799,
    image: "/images/products/corn-seeds.jpg",
    rating: 4.8,
    reviewCount: 124,
    category: "Seeds",
    inStock: true,
    isNew: true,
    isFeatured: true,
    tags: ["organic", "non-gmo"]
  },
  {
    id: 2,
    name: "Organic Fertilizer",
    description: "100% natural organic fertilizer for healthier crops and soil",
    price: 1299,
    discountedPrice: null,
    image: "/images/products/organic-fertilizer.jpg",
    rating: 4.5,
    reviewCount: 89,
    category: "Fertilizers",
    inStock: true,
    isNew: false,
    isFeatured: true,
    tags: ["organic", "eco-friendly"]
  },
  {
    id: 3,
    name: "Solar Water Pump",
    description: "Energy-efficient solar-powered irrigation pump for sustainable farming",
    price: 12999,
    discountedPrice: 10999,
    image: "/images/products/solar-pump.jpg",
    rating: 4.7,
    reviewCount: 56,
    category: "Irrigation",
    inStock: true,
    isNew: true,
    isFeatured: true,
    tags: ["solar", "eco-friendly"]
  },
  {
    id: 4,
    name: "Precision Seed Planter",
    description: "Accurate seed placement for optimized growth and yield",
    price: 8999,
    discountedPrice: null,
    image: "/images/products/seed-planter.jpg",
    rating: 4.6,
    reviewCount: 42,
    category: "Machinery",
    inStock: false,
    isNew: false,
    isFeatured: true,
    tags: ["precision", "equipment"]
  },
  {
    id: 5,
    name: "Drip Irrigation Kit",
    description: "Complete kit for efficient water usage in small to medium farms",
    price: 5499,
    discountedPrice: 4999,
    image: "/images/products/drip-kit.jpg",
    rating: 4.9,
    reviewCount: 77,
    category: "Irrigation",
    inStock: true,
    isNew: false,
    isFeatured: true,
    tags: ["water-saving", "eco-friendly"]
  },
  {
    id: 6,
    name: "Bio Pest Control",
    description: "Environmentally friendly pest control solution for organic farming",
    price: 1799,
    discountedPrice: 1499,
    image: "/images/products/bio-pesticide.jpg",
    rating: 4.4,
    reviewCount: 63,
    category: "Pesticides",
    inStock: true,
    isNew: true,
    isFeatured: true,
    tags: ["organic", "eco-friendly"]
  },
  {
    id: 7,
    name: "Premium Soil Tester",
    description: "Professional soil testing kit for pH, moisture, and nutrient analysis",
    price: 3299,
    discountedPrice: null,
    image: "/images/products/soil-tester.jpg",
    rating: 4.3,
    reviewCount: 36,
    category: "Tools",
    inStock: true,
    isNew: false,
    isFeatured: true,
    tags: ["analysis", "precision"]
  },
  {
    id: 8,
    name: "Garden Tool Set",
    description: "Complete set of essential gardening tools for professionals",
    price: 4899,
    discountedPrice: 3999,
    image: "/images/products/garden-tools.jpg",
    rating: 4.6,
    reviewCount: 92,
    category: "Tools",
    inStock: true,
    isNew: false,
    isFeatured: true,
    tags: ["equipment", "essentials"]
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

const FeaturedProductsComponent: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState(productData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Initialize with featured products
  useEffect(() => {
    const initialProducts = _.filter(productData, (product: Product) => product.isFeatured);
    setVisibleProducts(initialProducts);
  }, []);

  // Filter products by category
  useEffect(() => {
    let filtered;
    
    if (activeFilter === 'all') {
      filtered = _.filter(productData, (product: Product) => product.isFeatured);
    } else {
      filtered = _.filter(productData, (product: Product) => 
        product.isFeatured && product.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    setVisibleProducts(filtered);
  }, [activeFilter]);

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

  // Get unique categories for filter tabs
  const categories = ['all', ..._.uniq(_.map(productData, 'category').map((cat: string) => cat.toLowerCase()))];

  return (
    <section className="py-10 md:py-16 bg-white overflow-hidden">
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
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our selection of high-quality agricultural products
          </motion.p>
        </div>

        {/* Filter Tabs - Category Selector */}
        <div className="flex justify-center mb-8 overflow-x-auto hide-scrollbar">
          <div className="inline-flex p-1 rounded-full bg-gray-100">
            {_.map(categories, (category: string, index: number) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`${
                  activeFilter === category
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base capitalize whitespace-nowrap`}
              >
                {category === 'all' ? 'All Products' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="relative">
          {/* Scroll Shadow Indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
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
            <AnimatePresence>
              {visibleProducts.length > 0 ? (
                _.map(visibleProducts, (product: Product, index: number) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="flex-shrink-0 w-64 sm:w-72"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Link href={`/products/${product.id}`} className="block h-full">
                      <div 
                        className={`
                          relative rounded-xl overflow-hidden shadow-sm hover:shadow-md
                          transition-all duration-300 h-full bg-white border border-gray-100
                          ${hoveredProduct === product.id ? 'transform -translate-y-1' : ''}
                        `}
                      >
                        {/* Product Image */}
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                          {/* This would be replaced with an actual image in production */}
                          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <div className="text-gray-400 text-xs">Product Image</div>
                          </div>
                          
                          {/* Sale badge */}
                          {product.discountedPrice && (
                            <div className="absolute top-3 left-3 z-10">
                              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                SALE
                              </span>
                            </div>
                          )}
                          
                          {/* New badge */}
                          {product.isNew && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                NEW
                              </span>
                            </div>
                          )}
                          
                          {/* Out of stock overlay */}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Out of Stock
                              </span>
                            </div>
                          )}
                          
                          {/* Quick view button on hover */}
                          <div 
                            className={`
                              absolute inset-0 flex items-center justify-center
                              transition-opacity duration-300
                              ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}
                            `}
                          >
                            <button 
                              className="bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md text-sm font-medium text-gray-900 transform transition-transform duration-300 hover:scale-105 focus:outline-none"
                              onClick={(e) => {
                                e.preventDefault();
                                // Quick view action here
                              }}
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-4">
                          {/* Category */}
                          <p className="text-xs text-gray-500 mb-1">
                            {product.category}
                          </p>
                          
                          {/* Product Name */}
                          <h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          {/* Product Description */}
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          
                          {/* Ratings */}
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">
                              ({product.reviewCount ?? 0})
                            </span>
                          </div>
                          
                          {/* Price */}
                          <div className="flex items-baseline mt-1">
                            {product.discountedPrice ? (
                              <>
                                <span className="text-lg font-semibold text-gray-900">
                                  {formatPrice(product.discountedPrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {formatPrice(product.price)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-semibold text-gray-900">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.tags && product.tags.map((tag: string) => (
                              <span key={tag} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="w-full py-16 text-center">
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Browse All Products Button */}
        <div className="text-center mt-8">
          <Link href="/products" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-200"
            >
              Browse All Products
              <svg className="ml-2 -mr-0.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbars */}
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

export default FeaturedProductsComponent; 