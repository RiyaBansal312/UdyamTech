import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaLightbulb } from 'react-icons/fa';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Udyam help entrepreneurs grow?",
      answer:
        "Udyam offers AI-powered business insights, compliance tracking, and verified networking to help entrepreneurs make informed decisions, connect with the right people, and scale their ventures efficiently."
    },
    {
      question: "Which Sustainable Development Goals does Udyam support?",
      answer:
        "Udyam aligns with SDG 8 (Decent Work & Economic Growth), SDG 9 (Industry, Innovation & Infrastructure), and SDG 17 (Partnerships for the Goals) by empowering small businesses and fostering collaborations."
    },
    {
      question: "Is Udyam suitable for first-time entrepreneurs?",
      answer:
        "Absolutely. Udyam is designed to guide early-stage entrepreneurs with AI tools, mentorship connections, and compliance support — even if you’re starting from scratch."
    },
    {
      question: "Does Udyam verify its network members?",
      answer:
        "Yes, our blockchain-powered verification system ensures that every entrepreneur, mentor, and investor on Udyam is authenticated, making networking safe and trustworthy."
    },
    {
      question: "Is Udyam free to use?",
      answer:
        "Our core tools, including basic AI insights, compliance tracking, and limited networking, are free. Advanced features are available through premium plans."
    }
  ];

  return (
    <section className="py-20 bg-[#FAF3E7] text-[#5C4B38]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-[#8B5E34] mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#5C4B38]/80 text-lg max-w-3xl mx-auto"
          >
            Helping entrepreneurs succeed through AI, innovation, and a trusted network.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border border-[#EADCC4] rounded-2xl shadow hover:shadow-md transition-all bg-[#FFF5E6]"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between w-full px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#C69C6D] text-white shadow-md">
                    <FaLightbulb size={20} />
                  </div>
                  <span className="text-lg font-semibold">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-[#5C4B38]" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-[#5C4B38]/80 leading-relaxed text-[16px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
