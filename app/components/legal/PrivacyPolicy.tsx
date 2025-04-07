'use client';

import React from 'react';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy Policy"
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
            Landson Agri ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our practices regarding your personal data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">2. Information We Collect</h3>
          <p className="mb-2">
            <strong>Personal Data:</strong> We may collect personally identifiable information, such as your name, email address, postal address, phone number, and payment information when you register for an account, place an order, or contact us.
          </p>
          <p>
            <strong>Usage Data:</strong> We may collect information about how you access and use our website including your IP address, browser type, operating system, referring web pages, pages visited, and the dates/times when you access the website.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">3. How We Use Your Information</h3>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and send related information</li>
            <li>To send you technical notices, updates, security alerts, and support messages</li>
            <li>To respond to your comments, questions, and customer service requests</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">4. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">5. Disclosure of Your Information</h3>
          <p>We may disclose your personal information in the following situations:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred.</li>
            <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">6. Data Security</h3>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">7. Your Data Protection Rights</h3>
          <p>
            Depending on your location, you may have the right to access, correct, update, or request deletion of your personal information. You can object to the processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">8. Children's Privacy</h3>
          <p>
            Our service is not intended for use by children under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">9. Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">10. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@landsonagri.com.
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

export default PrivacyPolicy; 