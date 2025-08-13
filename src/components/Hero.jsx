import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaHandshake, FaChartLine } from "react-icons/fa";
import TutorialSlides from "./TutorialSlides";
import "@fontsource/playfair-display/700.css"; // Headings
import "@fontsource/poppins/500.css"; // Subheadings
import "@fontsource/nunito-sans/400.css"; // Body

const Hero = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <section
      className="relative py-16 px-4 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F7F4F2, #EBE5DE)",
        color: "#4B2E19",
      }}
    >
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(172, 149, 134, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 20%, rgba(209, 193, 178, 0.12) 0%, transparent 45%)
          `,
          zIndex: 0,
        }}
      />

      <div className="relative top-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
        {/* Left Text Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#aa8065ff",
            }}
          >
            Your Startup’s Smartest Ally
          </h1>
          <p
            className="text-lg max-w-lg"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "rgba(75, 46, 25, 0.85)",
            }}
          >
            Udyam empowers entrepreneurs with AI-driven insights, blockchain-verified trust,
            and a thriving business network — making your growth journey smarter, faster, and
            more reliable.
          </p>
          <button
            onClick={() => setShowTutorial(true)}
            style={{
              backgroundColor: "#D1C1B2",
              color: "#4B2E19",
              fontFamily: "'Poppins', sans-serif",
            }}
            className="hover:bg-[#AC9586] transition px-6 py-3 rounded-full font-medium shadow-md w-fit"
          >
            Discover How Udyam Works →
          </button>
        </motion.div>

        {/* Right Video/Image */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-sm mx-auto"
        >
          <div
            className="rounded-[2rem] overflow-hidden p-4 shadow-lg"
            style={{ backgroundColor: "#F7F4F2" }}
          >
            <video
              src="/Motion Graphics Animation Video - Empowered Startups - Creamy Animation (1080p, h264).mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Feature Strip */}
      <div className="relative mt-20 z-10">
        <div
          className="rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-inner"
          style={{ backgroundColor: "#EBE5DE", color: "#4B2E19" }}
        >
          <div className="flex flex-col items-center space-y-3">
            <FaLightbulb size={26} style={{ color: "#AC9586" }} />
            <p
              className="font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI Business Insights
            </p>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Personalized reports and growth opportunities based on your startup’s data.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <FaHandshake size={26} style={{ color: "#AC9586" }} />
            <p
              className="font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Verified Networking
            </p>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Connect with mentors, investors, and co-founders you can trust.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <FaChartLine size={26} style={{ color: "#AC9586" }} />
            <p
              className="font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Growth Gamification
            </p>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Engage, earn rewards, and boost your visibility in the community.
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-black font-bold text-xl"
              onClick={() => setShowTutorial(false)}
            >
              ×
            </button>
            <TutorialSlides onClose={() => setShowTutorial(false)} />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
