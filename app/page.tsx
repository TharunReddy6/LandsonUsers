'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { colors } from './styles/theme';
import BannerComponent from './components/home/BannerComponent';
import CategoriesComponent from './components/home/CategoriesComponent';
import FeaturedProductsComponent from './components/home/FeaturedProductsComponent';
import SparePartsComponent from './components/home/SparePartsComponent';
import BlogsComponent from './components/home/BlogsComponent';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Banner Slider */}
      <BannerComponent />
      
      {/* Hero Section */}
      {/* <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: colors.primary.main }}
              >
                Welcome to<br />Landson Agri
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-xl text-gray-600 max-w-xl mx-auto lg:mx-0"
              >
                Your trusted partner for high-quality agricultural products, machinery, and farm supplies.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-700 transition duration-300"
                    style={{ backgroundColor: colors.primary.main }}
                  >
                    Explore Products
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            <div className="flex-1">
              <div className="relative h-80 md:h-96 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* Categories */}
      <CategoriesComponent />
      
      {/* Featured Products */}
      <FeaturedProductsComponent />
      
      {/* Spare Parts */}
      <SparePartsComponent />
      
      {/* Features */}
      {/* <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.primary.main }}
            >
              Why Choose Landson Agri
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing top-quality products and exceptional service to farmers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality Products",
                description: "All our products meet the highest industry standards and are sourced from trusted manufacturers.",
                icon: "🏆"
              },
              {
                title: "Expert Support",
                description: "Our team of agricultural experts is always available to provide guidance and support.",
                icon: "👨‍🌾"
              },
              {
                title: "Nationwide Delivery",
                description: "Fast and reliable delivery services to all major agricultural regions across India.",
                icon: "🚚"
              },
              {
                title: "Competitive Pricing",
                description: "We offer the best value for your money with transparent and competitive pricing.",
                icon: "💰"
              }
            ].map((feature: {title: string, description: string, icon: string}, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* Blogs */}
      <BlogsComponent />
    </main>
  );
}
