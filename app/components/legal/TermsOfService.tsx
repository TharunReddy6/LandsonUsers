'use client';

import React from 'react';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terms of Service"
      size="lg"
    >
      <div className="text-gray-700 text-sm space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">1. Introduction</h3>
          <p>
            Welcome to Landson Agri. These Terms of Service govern your use of our website located at [website address] and all associated services provided by us. By accessing our website, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">2. User Accounts</h3>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password you use to access our service and for any activities under your account. We reserve the right to disable any user account if activities occur that violate these Terms of Service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">3. Purchases</h3>
          <p>
            If you wish to purchase any product or service available through our platform, you may be asked to supply certain information relevant to your purchase including, without limitation, your credit card details, billing address, and shipping information.
          </p>
          <p className="mt-2">
            We reserve the right to refuse or cancel your order if fraud or unauthorized or illegal transactions are suspected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">4. Product Information and Availability</h3>
          <p>
            We make every effort to display the colors and images of our products accurately. However, we cannot guarantee that your device's display will accurately reflect the actual products. All products are subject to availability, and we reserve the right to discontinue any product at any time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">5. Shipping and Delivery</h3>
          <p>
            Delivery times are estimates and commence from the date of shipping, not the date of order. Landson Agri is not responsible for delivery delays beyond our control such as severe weather, natural disasters, or carrier issues. Risk of loss and title for all products pass upon delivery to the carrier.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">6. Intellectual Property</h3>
          <p>
            Our website and its original content, features, and functionality are owned by Landson Agri and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">7. Termination</h3>
          <p>
            We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">8. Limitation of Liability</h3>
          <p>
            In no event shall Landson Agri, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">9. Changes</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at support@landsonagri.com.
          </p>
        </motion.div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsOfService; 