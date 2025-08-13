import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Impact data for Udyam
const impactStats = [
  {
    value: 500,
    suffix: "+",
    label: "ENTREPRENEURS",
    subLabel: "MENTORED",
  },
  {
    value: 120,
    suffix: "+",
    label: "STARTUP EVENTS",
    subLabel: "ORGANISED",
  },
  {
    value: 75,
    suffix: "+",
    label: "INVESTOR",
    subLabel: "CONNECTIONS",
  },
  {
    value: 20,
    suffix: "+",
    label: "CORPORATE",
    subLabel: "PARTNERSHIPS",
  },
];

// Hook for animated number counting
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentVal = Math.floor(progress * end);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [end, duration]);

  return count;
};

const WhatWeDo = () => {
  return (
    <section className="bg-[#3B2F2F] py-16 px-4 md:px-10 text-center font-[Inter]">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-[#F5E6C8] mb-12 uppercase tracking-wide font-[Playfair_Display]">
        Our Impact
      </h2>

      {/* Stats Grid */}
      <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
        {impactStats.map((item, idx) => {
          const count = useCountUp(item.value, 1500 + idx * 300);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center px-6 border-r last:border-none border-[#EADCC4]/40"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#EADCC4] mb-2">
                {count.toLocaleString()}
                {item.suffix}
              </div>
              <div className="text-sm md:text-base font-semibold text-[#F5E6C8] uppercase">
                {item.label}
              </div>
              <div className="text-sm md:text-base text-[#D4C4A8] uppercase">
                {item.subLabel}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeDo;
