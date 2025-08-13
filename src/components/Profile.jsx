import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
} from 'react-icons/fa';

function Profile({ user }) {
  if (!user) {
    return (
      <section className="min-h-screen py-20 bg-[#FAF3E7] flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-[#8B5E3C] mb-4">Please Sign In</h2>
          <p className="text-[#5C4B3B] mb-6">Sign in to access your Udyam profile.</p>
          <button
            onClick={() => window.location.href = '#login'}
            className="bg-[#C69C6D] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#B5895A] transition"
          >
            Sign In Now
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-[#FAF3E7] px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-[#C69C6D] flex items-center justify-center text-white text-4xl">
              <FaUser />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow"
            >
              <FaEdit className="text-[#C69C6D]" />
            </motion.button>
          </div>
          <h2 className="text-3xl font-bold text-[#8B5E3C]">Welcome, {user.name}!</h2>
          <p className="text-[#5C4B3B]/70 mb-6">Here’s your entrepreneur dashboard on Udyam.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-[#F5E6D3] p-4 rounded-xl">
              <FaUser className="text-[#C69C6D]" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-[#F5E6D3] p-4 rounded-xl">
              <FaEnvelope className="text-[#C69C6D]" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-[#F5E6D3] p-4 rounded-xl">
              <FaMapMarkerAlt className="text-[#C69C6D]" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{user.location || 'Not Provided'}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-[#F5E6D3] p-4 rounded-xl">
              <p className="text-[#C69C6D] font-bold text-lg">Role</p>
              <div>
                <p className="text-sm text-gray-500">Entrepreneur / Mentor / Investor</p>
                <p className="font-semibold">{user.role || 'Not Specified'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-[#F5E6D3] p-4 rounded-xl">
              <p className="text-[#C69C6D] font-bold text-lg">Joined</p>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold">{user.joined || 'Not Available'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#8B5E3C] mb-3">Recent Activity</h3>
          <div className="bg-[#F5E6D3] p-4 rounded-xl text-sm text-[#5C4B3B]/80">
            No recent updates or collaborations.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;