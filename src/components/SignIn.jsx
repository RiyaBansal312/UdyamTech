import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaTimes } from 'react-icons/fa';

function SignIn({ onSignIn }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Validation for signup
        if (!formData.name || !formData.email || !formData.password) {
          setError('All fields are required');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Send registration data to the backend
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name, // The backend code I provided doesn't use name, so you may need to update your backend model
            email: formData.email,
            password: formData.password
          }),
        });
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // On successful registration, sign in the new user
        // The onSignIn function should handle the token and user data
        onSignIn(data); 

      } else {
        // Validation for sign-in
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          return;
        }

        // Send login data to the backend
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // On successful login, the onSignIn function should handle the token and user data
        onSignIn(data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Auth error:', err);
    }
  };

  return (
    <section className="min-h-screen py-20 pt-15 bg-[#fdf7f0] relative overflow-hidden text-[#8B5E3C]">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#8b5e3c0f] via-transparent to-[#fdf7f044]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-[#e8d8c8]"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-[#8B5E3C]/70">
                {isSignUp ? 'Join the Community' : 'Sign in to continue'}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 flex items-center justify-between"
              >
                <span>{error}</span>
                <button onClick={() => setError('')}>
                  <FaTimes />
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#8B5E3C]/30 rounded-xl text-[#8B5E3C] placeholder-[#8B5E3C]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/40"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#8B5E3C]/30 rounded-xl text-[#8B5E3C] placeholder-[#8B5E3C]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/40"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]/40" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#8B5E3C]/30 rounded-xl text-[#8B5E3C] placeholder-[#8B5E3C]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/40"
                  required
                />
              </div>

              {isSignUp && (
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]/40" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#8B5E3C]/30 rounded-xl text-[#8B5E3C] placeholder-[#8B5E3C]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/40"
                    required
                  />
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#8B5E3C] text-white py-3 rounded-xl font-medium hover:bg-[#71492f] transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <FaArrowRight />
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition duration-300"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;