import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    title: 'Welcome to Aidwave ❤️',
    description: "Let's see how Aidwave saves lives in emergencies!",
    videoSrc: '/Video 1.mp4',
  },
  {
    title: 'Locate Donors in Seconds 🩸',
    description: "Find nearby blood donors instantly with just a tap.",
    videoSrc: '/Video 2.mp4',
  },
  {
    title: 'Join the Lifesavers Community 🌍',
    description: "Sign up, contribute, and be part of a life-saving network.",
    videoSrc: '/Testimonial Video 1 - AidWave.mp4',
  },
];

export default function TutorialSlides({ onClose }) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 flex items-center justify-center">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 overflow-hidden">

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E94F6A] text-2xl font-bold hover:text-[#d73a58] transition"
          aria-label="Close tutorial"
        >
          <X />
        </button>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl w-full h-56 mb-6 overflow-hidden flex items-center justify-center bg-[#FFE6EA]">
              <video
                src={slides[step].videoSrc}
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain rounded-xl"
                style={{ transform: 'scale(1.3)', borderRadius: '12px' }}
              />
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#E94F6A] to-[#FF7C84] bg-clip-text text-transparent mb-4 text-center">
              {slides[step].title}
            </h2>
            <p className="text-[#3D3D3D] text-lg text-center">{slides[step].description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            disabled={step === 0}
            className="flex items-center gap-2 bg-[#FFE6EA] text-[#E94F6A] px-4 py-2 rounded-full font-medium hover:bg-[#ffd7dd] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={18} /> Back
          </button>

          {step < slides.length - 1 ? (
            <button
              onClick={() => setStep((prev) => Math.min(prev + 1, slides.length - 1))}
              className="flex items-center gap-2 bg-[#E94F6A] text-white px-4 py-2 rounded-full font-medium hover:bg-[#d73a58] transition-all"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#E94F6A] to-[#FF7C84] text-white px-6 py-2 rounded-full font-semibold hover:from-[#d73a58] hover:to-[#ff5e70] transition-all"
            >
              Done
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? 'bg-[#E94F6A] scale-110' : 'bg-[#ffe6ea] hover:bg-[#ffbfc9]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
