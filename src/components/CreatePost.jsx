import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PointNotification from './PointNotification'; 

const CreatePost = ({ currentUser }) => {
  const [postContent, setPostContent] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const handleShareInsight = async (e) => {
    e.preventDefault();

    console.log('Post submitted:', postContent);

    const pointsToAdd = 5;
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id, points: pointsToAdd }),
      });

      if (response.ok) {
        setEarnedPoints(pointsToAdd);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update score:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="p-8 bg-[#f5f0e6]">
      <form onSubmit={handleShareInsight} className="bg-[#d9b382] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-[#4e342e]">Share an Insight</h3>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full p-2 border border-[#a1887f] rounded-lg bg-[#f5f0e6] text-[#4e342e] placeholder-[#8d6e63]"
          placeholder="What's on your mind?"
        />
        <button 
          type="submit" 
          className="mt-4 px-6 py-2 bg-[#6d4c41] text-white rounded-lg hover:bg-[#5d4037] transition-colors duration-300"
        >
          Share
        </button>
      </form>
      <AnimatePresence>
        {showNotification && <PointNotification points={earnedPoints} />}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
