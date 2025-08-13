// This code would be inside a button that confirms the session is over
const handleSessionCompletion = async (menteeId) => {
  const pointsToAdd = 20; // Reward for participating in a session

  try {
    // Reward the mentee
    await fetch('http://localhost:5000/api/auth/update-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: menteeId, points: pointsToAdd }),
    });
    // Reward the mentor (assuming currentUser is the mentor)
    await fetch('http://localhost:5000/api/auth/update-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUser._id, points: pointsToAdd }),
    });

    console.log('20 points awarded to both participants!');
  } catch (error) {
    console.error('Failed to update score:', error);
  }
};