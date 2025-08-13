import React from 'react';
import { motion } from 'framer-motion';

const PointNotification = ({ points }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
    >
      <span className="text-xl">🌟</span>
      <span className="font-bold">+{points} points!</span>
    </motion.div>
  );
};

export default PointNotification;