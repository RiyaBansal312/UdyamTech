import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin } from 'react-icons/fa';
import founderImage from '../assets/mishty.png'; // Change path if different

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("https://getform.io/f/amdkwqmb", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
    .then((response) => {
      console.log(response);
      document.getElementById('form').reset();
    })
    .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-[#FAF3E7] px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-[#8B5E34]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Let’s Build the Future Together
          </h2>
          <p className="text-[#5C4B38]/80 text-lg leading-relaxed">
            Whether you are a budding entrepreneur, mentor, or investor, Udyam is here 
            to connect you with opportunities, guidance, and innovation.  
            Reach out to collaborate, get support, or explore partnerships.
          </p>

          {/* Contact Info */}
          <div className="space-y-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-[#EADCC4] rounded-xl">
                <FaEnvelope className="text-[#8B5E34] text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-[#5C4B38]">Email</h4>
                <p className="text-[#5C4B38]/70">contact@udyam.in</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-[#EADCC4] rounded-xl">
                <FaPhone className="text-[#8B5E34] text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-[#5C4B38]">Phone</h4>
                <p className="text-[#5C4B38]/70">+91 98173 67668</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-[#EADCC4] rounded-xl">
                <FaMapMarkerAlt className="text-[#8B5E34] text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-[#5C4B38]">Location</h4>
                <p className="text-[#5C4B38]/70">Serving Entrepreneurs Pan India</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-[#EADCC4] rounded-xl">
                <FaLinkedin className="text-[#8B5E34] text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-[#5C4B38]">LinkedIn</h4>
                <p className="text-[#5C4B38]/70">linkedin.com/company/udyam</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFF5E6] rounded-3xl p-8 shadow-xl border border-[#EADCC4]"
        >
          <h3 className="text-3xl font-bold text-[#8B5E34] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Get in Touch
          </h3>
          <p className="text-[#5C4B38]/70 mb-6 text-sm">
            Tell us about your idea, challenge, or vision — we’ll get back to you with the right guidance and resources.
          </p>
          <form onSubmit={formSubmit} id="form" method="POST" acceptCharset="UTF-8" className="space-y-5">
            <div>
              <label className="block text-[#5C4B38] font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white border border-[#EADCC4] focus:ring-2 focus:ring-[#C69C6D] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#5C4B38] font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white border border-[#EADCC4] focus:ring-2 focus:ring-[#C69C6D] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#5C4B38] font-medium mb-1">Your Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white border border-[#EADCC4] focus:ring-2 focus:ring-[#C69C6D] outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-[#C69C6D] hover:bg-[#b5885a] text-white font-bold rounded-xl p-4 text-center transition shadow-lg flex justify-center items-center space-x-2"
            >
              <span>Send Message</span>
              <FaPaperPlane />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
