import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PointNotification from './PointNotification'; 

const Challenges = ({ currentUser }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const handleCompleteChallenge = async () => {
    if (isCompleted) return;

    const pointsToAdd = 50;
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id, points: pointsToAdd }),
      });

      if (response.ok) {
        setIsCompleted(true);
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
    <div className="p-8 bg-[#f5f0e6] min-h-screen">
      <div className="bg-[#d9b382] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-[#4e342e]">Complete the Founder's Journey</h3>
        <p className="mb-4 text-[#5d4037]">Finish all the steps to earn a large point bonus!</p>
        <button 
          onClick={handleCompleteChallenge}
          disabled={isCompleted}
          className={`mt-4 px-6 py-2 font-bold rounded-lg transition-colors duration-300 ${
            isCompleted 
              ? 'bg-[#a1887f] text-white cursor-not-allowed' 
              : 'bg-[#6d4c41] text-white hover:bg-[#5d4037]'
          }`}
        >
          {isCompleted ? 'Challenge Completed!' : 'Complete Challenge'}
        </button>
      </div>
      <AnimatePresence>
        {showNotification && <PointNotification points={earnedPoints} />}
      </AnimatePresence>
    </div>
  );
};

export default Challenges;
