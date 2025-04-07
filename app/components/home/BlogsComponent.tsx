'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';
import _, { Blog } from '@/app/utils/lodashUtils';

// Mock blog data
const blogData = [
  {
    id: 1,
    title: "5 Sustainable Farming Practices for Better Yields",
    excerpt: "Discover eco-friendly farming methods that increase productivity while preserving the environment.",
    date: "May 15, 2023",
    author: "Dr. Rajesh Kumar",
    authorRole: "Agricultural Scientist",
    category: "Sustainable Farming",
    readTime: 5,
    image: "/images/blogs/sustainable-farming.jpg",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Smart Agriculture in India",
    excerpt: "How IoT, AI, and automation are transforming traditional farming practices across rural India.",
    date: "April 28, 2023",
    author: "Ananya Patel",
    authorRole: "Tech Analyst",
    category: "AgriTech",
    readTime: 7,
    image: "/images/blogs/smart-agriculture.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Monsoon Season Preparation Guide for Farmers",
    excerpt: "Essential steps to protect your crops and maximize benefits during the rainy season.",
    date: "June 3, 2023",
    author: "Vikram Singh",
    authorRole: "Senior Farmer",
    category: "Seasonal Guides",
    readTime: 4,
    image: "/images/blogs/monsoon-prep.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Organic Pest Control Solutions That Actually Work",
    excerpt: "Natural and chemical-free methods to keep pests away without harming your crops or the environment.",
    date: "May 10, 2023",
    author: "Dr. Meena Sharma",
    authorRole: "Organic Farming Expert",
    category: "Organic Farming",
    readTime: 6,
    image: "/images/blogs/organic-pest-control.jpg",
    featured: true
  },
  {
    id: 5,
    title: "Water Conservation Techniques for Drought-Prone Areas",
    excerpt: "Smart irrigation and water management strategies to ensure crop survival in water-scarce regions.",
    date: "April 15, 2023",
    author: "Rohan Desai",
    authorRole: "Water Resource Engineer",
    category: "Water Management",
    readTime: 8,
    image: "/images/blogs/water-conservation.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Government Subsidies for Farmers: A Complete Guide",
    excerpt: "Navigate through the latest agricultural subsidies, loans, and support programs available for Indian farmers.",
    date: "June 12, 2023",
    author: "Priya Nair",
    authorRole: "Agri-Policy Analyst",
    category: "Policy",
    readTime: 10,
    image: "/images/blogs/govt-subsidies.jpg",
    featured: false
  }
];

// Format date to readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogsComponent: React.FC = () => {
  const [hoveredBlog, setHoveredBlog] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleBlogs, setVisibleBlogs] = useState(blogData);

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

  // Filter blogs based on selection
  const filterBlogs = (filter: string) => {
    setActiveFilter(filter);
    let filtered;
    
    if (filter === 'all') {
      filtered = blogData;
    } else if (filter === 'featured') {
      filtered = _.filter(blogData, (blog: Blog) => blog.featured);
    } else {
      filtered = _.filter(blogData, (blog: Blog) => blog.category.toLowerCase() === filter.toLowerCase());
    }
    
    setVisibleBlogs(filtered);
  };

  // Get unique categories for filters
  const categories = ['all', 'featured', ..._.uniq(_.map(blogData, 'category').map((cat: string) => cat.toLowerCase()))];

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
            Farm Fresh Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Expert advice, tips, and news for modern agriculture
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto hide-scrollbar">
          <div className="inline-flex p-1 rounded-full bg-gray-100">
            {_.map(categories, (category: string, index: number) => (
              <button
                key={category}
                onClick={() => filterBlogs(category)}
                className={`${
                  activeFilter === category
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base capitalize whitespace-nowrap`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Carousel */}
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
            {visibleBlogs.length > 0 ? (
              _.map(visibleBlogs, (blog: Blog, index: number) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-72 sm:w-80"
                  onMouseEnter={() => setHoveredBlog(blog.id)}
                  onMouseLeave={() => setHoveredBlog(null)}
                >
                  <Link href={`/blog/${blog.id}`} className="block h-full">
                    <div 
                      className={`
                        relative rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                        transition-all duration-300 h-full bg-white border border-gray-100
                        ${hoveredBlog === blog.id ? 'transform -translate-y-1' : ''}
                      `}
                    >
                      {/* Blog Image */}
                      <div className="h-48 bg-gray-100 relative overflow-hidden">
                        {/* This would be replaced with an actual image in production */}
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="text-gray-400 text-xs">Blog Image</div>
                        </div>
                        
                        {/* Featured badge */}
                        {blog.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                        
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Blog Content */}
                      <div className="p-5">
                        {/* Metadata */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                          <span>{formatDate(blog.date)}</span>
                          <span>{blog.readTime} min read</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-gray-900 font-semibold text-xl mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        {/* Author */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                            {blog.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                            <p className="text-xs text-gray-500">{blog.authorRole}</p>
                          </div>
                        </div>
                        
                        {/* Read More - animated on hover */}
                        <div 
                          className={`
                            flex items-center text-green-600 font-medium text-sm mt-4
                            transition-all duration-300
                            ${hoveredBlog === blog.id ? 'opacity-100' : 'opacity-70'}
                          `}
                        >
                          Read More
                          <svg 
                            className={`
                              w-4 h-4 ml-1 transition-all duration-300
                              ${hoveredBlog === blog.id ? 'transform translate-x-1' : ''}
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
              ))
            ) : (
              <div className="w-full py-16 text-center">
                <p className="text-gray-500">No blog posts found in this category.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* View All Blog Posts Button */}
        <div className="text-center mt-8">
          <Link href="/blog" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-200"
            >
              View All Blog Posts
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

export default BlogsComponent; 