import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '@fontsource/playfair-display/700.css';
import '@fontsource/inter/400.css';

const features = [
  {
    title: 'AI-Driven Business Insights',
    description:
      'Get instant, data-backed reports on market trends, competition, and growth strategies to make smart business decisions.',
    image: '12.png',
    alt: 'Business Insights Illustration',
  },
  {
    title: 'Smart Compliance Support',
    description:
      'Never miss GST, taxation, or compliance deadlines — our AI keeps track for you and sends timely reminders.',
    image: '13.jpg',
    alt: 'Compliance Assistance Illustration',
  },
  {
    title: 'Blockchain-Verified Networking',
    description:
      'Securely connect with verified entrepreneurs, investors, and mentors through our blockchain-powered trust system.',
    image: '14.jpg',
    alt: 'Networking Illustration',
  },
  {
    title: 'Entrepreneur Impact Stories',
    description:
      'Get inspired by real entrepreneurs who turned ideas into success with Udyam’s AI-powered tools.',
    image: '12.jpg',
    alt: 'Success Stories Illustration',
  },
];

const FeatureCard = ({ feature, index, activeIndex, setActiveIndex }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) setActiveIndex(index);
  }, [inView, index, setActiveIndex]);

  return (
    <motion.div
      ref={ref}
      key={feature.title}
      className={`p-6 rounded-xl snap-start transition-transform duration-300 ${
        index === activeIndex
          ? 'bg-[#EBE5E1] shadow-lg scale-105 border-2 border-[#AC9586]'
          : 'opacity-70'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-2xl font-bold text-[#4B2E19] font-['Playfair_Display']">
        {feature.title}
      </h3>
      <p className="text-[#5C4B38] mt-2 font-['Inter'] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

const FeaturesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-[#F7F4F2] py-24 px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={features[activeIndex].image}
              src={features[activeIndex].image}
              alt={features[activeIndex].alt}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl shadow-2xl object-contain max-h-full max-w-full border-4 border-[#AC9586] bg-[#EBE5E1]"
            />
          </AnimatePresence>
        </div>

        {/* Right Features */}
        <div
          className="w-full lg:w-1/2 max-h-[500px] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-12 pr-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
