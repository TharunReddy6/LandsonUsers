'use client';

import { motion } from 'framer-motion';
import { colors } from '../styles/theme';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/images/team/john.jpg',
    description: 'With over 20 years of experience in the agricultural industry.',
  },
  {
    name: 'Jane Smith',
    role: 'Head of Operations',
    image: '/images/team/jane.jpg',
    description: 'Expert in agricultural supply chain management.',
  },
  {
    name: 'Mike Johnson',
    role: 'Technical Director',
    image: '/images/team/mike.jpg',
    description: 'Specialized in agricultural technology and innovation.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-green-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center opacity-10" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{ color: colors.primary.main }}
          >
            About Landson Agri
          </motion.h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary.main }}>
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                At Landson Agri, we are committed to revolutionizing the agricultural industry by
                providing innovative solutions and high-quality products to farmers worldwide.
              </p>
              <p className="text-gray-600">
                Our mission is to empower farmers with the tools and knowledge they need to achieve
                sustainable and profitable farming practices while preserving the environment for
                future generations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-lg h-64"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary.main }}>
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sustainability',
                description: 'We are committed to sustainable farming practices that protect our environment.',
              },
              {
                title: 'Innovation',
                description: 'We continuously innovate to provide cutting-edge solutions for modern farming.',
              },
              {
                title: 'Quality',
                description: 'We maintain the highest standards of quality in all our products and services.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary.main }}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  {/* Image placeholder */}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 