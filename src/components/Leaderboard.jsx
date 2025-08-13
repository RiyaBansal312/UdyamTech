import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboardData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Gamified Leaderboard 🏆</h2>
      <ul className="space-y-2">
        {leaderboardData.map((user, index) => (
          <motion.li
            key={user._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <span className="font-bold text-lg">{index + 1}.</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <span className="text-lg font-semibold text-green-600">{user.score} points</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;