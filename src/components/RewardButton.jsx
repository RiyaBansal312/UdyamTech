import React from 'react';

const RewardButton = ({ userId, onScoreUpdated }) => {
  const handleRewardPoints = async () => {
    // You can change the number of points to test different values
    const pointsToAdd = 25; 

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, points: pointsToAdd }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Score updated successfully:', data);
        // Call a function to refresh the leaderboard or provide feedback
        if (onScoreUpdated) {
          onScoreUpdated(data);
        }
        alert(`Congratulations! You earned ${pointsToAdd} points.`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update score');
      }
    } catch (error) {
      console.error('Error awarding points:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!userId) {
    return null; // Don't show the button if no user is logged in
  }

  return (
    <div className="flex justify-center p-8">
      <button
        onClick={handleRewardPoints}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300"
      >
        Reward Me 25 Points!
      </button>
    </div>
  );
};

export default RewardButton;