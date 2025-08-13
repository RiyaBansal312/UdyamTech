import React from 'react';
import {
  FaHome,
  FaInfoCircle,
  FaBlog,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <footer
      className="bg-[#3B2F2F] text-[#EADCC4] py-12"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Brand Info */}
          <motion.div variants={itemVariants}>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#F5E6C8' }}
            >
              Udyam
            </h2>
            <p className="text-[#EADCC4]/90">
              Empowering entrepreneurs with resources, mentorship, and a thriving
              community to turn ideas into reality.
            </p>
            <div className="flex space-x-4 mt-6">
              {[FaLinkedin, FaTwitter, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="h-10 w-10 rounded-full bg-[#5A4646] hover:bg-[#7A5F5F] transition-all duration-300 flex items-center justify-center"
                >
                  <Icon className="text-[#EADCC4] text-xl" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-xl font-semibold mb-4 border-b border-[#EADCC4]/40 pb-1"
              style={{ color: '#F5E6C8' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', icon: FaHome, route: '/' },
                { label: 'About', icon: FaInfoCircle, route: '/#about' },
                { label: 'Contact', icon: FaEnvelope, route: '/#contact' },
                { label: 'Blogs', icon: FaBlog, route: '/#blogs' },
              ].map(({ label, icon: Icon, route }) => (
                <li key={label}>
                  <Link to={route} className="flex items-center space-x-3 group">
                    <span className="h-8 w-8 rounded bg-[#5A4646] group-hover:bg-[#7A5F5F] transition-all flex items-center justify-center">
                      <Icon className="text-[#EADCC4]" />
                    </span>
                    <span className="group-hover:text-[#F5E6C8] transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Udyam Offerings */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-xl font-semibold mb-4 border-b border-[#EADCC4]/40 pb-1"
              style={{ color: '#F5E6C8' }}
            >
              Udyam Offerings
            </h3>
            <ul className="space-y-3">
              {[
                'Entrepreneur Mentorship Programs',
                'Business Networking Events',
                'Funding & Investor Connect',
                'Skill Development Workshops',
                'Startup Collaboration Platform',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EADCC4]"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-xl font-semibold mb-4 border-b border-[#EADCC4]/40 pb-1"
              style={{ color: '#F5E6C8' }}
            >
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#EADCC4] text-xl" />
                <span>contact@udyam.in</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-[#EADCC4] text-xl" />
                <span>+91 98173 67668</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#EADCC4] text-xl" />
                <span>Serving Entrepreneurs Pan India</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#EADCC4]/30 flex flex-col md:flex-row justify-between items-center text-[#EADCC4]/80 text-sm">
          <p>&copy; {currentYear} Udyam. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#F5E6C8]">Terms</a>
            <a href="#" className="hover:text-[#F5E6C8]">Privacy</a>
            <a href="#" className="hover:text-[#F5E6C8]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
