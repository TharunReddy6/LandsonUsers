'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../styles/theme';
import _, { Product } from '@/app/utils/lodashUtils';

const products = [
  {
    id: 1,
    name: 'Organic Fertilizer',
    price: 49.99,
    category: 'Fertilizers',
    image: '/images/products/fertilizer.jpg',
  },
  {
    id: 2,
    name: 'Seeds Pack',
    price: 29.99,
    category: 'Seeds',
    image: '/images/products/seeds.jpg',
  },
  {
    id: 3,
    name: 'Garden Tools Set',
    price: 79.99,
    category: 'Tools',
    image: '/images/products/tools.jpg',
  },
  {
    id: 4,
    name: 'Plant Protection',
    price: 39.99,
    category: 'Protection',
    image: '/images/products/protection.jpg',
  },
  {
    id: 5,
    name: 'Irrigation System',
    price: 199.99,
    category: 'Equipment',
    image: '/images/products/irrigation.jpg',
  },
  {
    id: 6,
    name: 'Soil Testing Kit',
    price: 59.99,
    category: 'Tools',
    image: '/images/products/soil-test.jpg',
  },
];

const categories = ['All', 'Fertilizers', 'Seeds', 'Tools', 'Protection', 'Equipment'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const productChunks = _.chunk(filteredProducts, 3);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: colors.primary.main }}>
          Our Products
        </h1>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          {productChunks.map((chunk: Product[], chunkIndex: number) => (
            <motion.div
              key={chunkIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: chunkIndex * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {chunk.map((product: Product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <p className="text-2xl font-bold mb-4" style={{ color: colors.primary.main }}>
                      ${product.price}
                    </p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 