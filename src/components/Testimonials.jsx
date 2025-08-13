import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Udyam Entrepreneur Testimonials
const testimonials = [
  {
    name: 'Livarpit Sandhu',
    role: 'Founder',
    company: 'InTheBox',
    image: 'm11.jpeg',
    quote: 'Paired with eco-friendly packaging entrepreneur',
    rating: 5
  },
  {
    name: 'Abhishek',
    role: 'Owner',
    company: 'TranspoConnect',
    image: 'm12.jpeg',
    quote: 'Mentor helped with B2B contacts',
    rating: 5
  },
  {
    name: 'Harshit Gupta',
    role: 'Co-Founder',
    company: 'SyntaraTech',
    image: 'm13.jpeg',
    quote: 'Mentor guided on permissions, aerial mapping, and pilot training',
    rating: 5
  },
  {
    name: 'Mishty Kharbanda',
    role: 'Founder',
    company: 'Aidwave',
    image: 'm14.jpeg',
    quote: 'Mentor guided on donor drives & digital outreach',
    rating: 5
  },
  {
    name: 'Madhav Dhawan',
    role: 'Founder',
    company: 'KlaKoach',
    image: 'm15.jpeg',
    quote: 'Learned online store setup & pricing strategies',
    rating: 5
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preload = testimonials.map(t => new Promise(res => {
      const img = new Image();
      img.src = t.image;
      img.onload = res;
    }));
    Promise.all(preload).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <section className="bg-[#FAF3E7] py-16 px-4 overflow-hidden">
      <div className="container mx-auto text-center max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#8B5E34] mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our Entrepreneurs Say
          </h2>
          <div className="h-1 w-20 bg-[#C69C6D] mx-auto my-3 rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl mx-auto text-[#5C4B38]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Real stories from business leaders who grew, scaled, and thrived with Udyam’s AI & blockchain tools.
          </motion.p>
        </div>

        {/* Loader */}
        {!imagesLoaded ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C69C6D]"></div>
          </div>
        ) : (
          <div className="relative flex justify-center items-center mt-6 min-h-[280px]">
            {testimonials.map((t, index) => {
              const offset = index - activeIndex;
              const visible = Math.abs(offset) <= 1;
              const scale = offset === 0 ? 1 : 0.85;
              const opacity = visible ? 1 : 0;
              const zIndex = 10 - Math.abs(offset);
              const translateX = `${offset * 260}px`; // FIXED

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`, // FIXED
                    opacity,
                    zIndex,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                >
                  <div className="bg-[#FFF5E6] rounded-xl p-6 w-80 shadow-md border-2 border-[#C69C6D] text-[#5C4B38]">
                    {/* Image */}
                    <div className="flex justify-center mb-4 relative">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#C69C6D]"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#C69C6D] rounded-full p-1 shadow">
                        <FaQuoteLeft className="text-white text-sm" />
                      </div>
                    </div>

                    {/* Quote */}
                    <p
                      className="italic mb-3 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      "{t.quote}"
                    </p>

                    {/* Stars */}
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < t.rating ? 'text-[#C69C6D]' : 'text-[#EADCC4]'} // FIXED
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {t.name}
                    </h3>
                    <p
                      className="text-sm text-[#8B5E34]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dot Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-[#C69C6D]' : 'bg-[#EADCC4]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
