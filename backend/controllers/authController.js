// // // controllers/authController.js
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');

// // // Generate a JWT token
// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, {
// //     expiresIn: '1h'
// //   });
// // };

// // exports.registerUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     const user = await User.create({ email, password });
// //     res.status(201).json({
// //       _id: user._id,
// //       email: user.email,
// //       token: generateToken(user._id)
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // exports.loginUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (user && (await user.matchPassword(password))) {
// //       res.json({
// //         _id: user._id,
// //         email: user.email,
// //         token: generateToken(user._id)
// //       });
// //     } else {
// //       res.status(401).json({ message: 'Invalid credentials' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Generate a JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '1h'
//   });
// };

// exports.registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({ email, password });
//     res.status(201).json({
//       _id: user._id,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         email: user.email,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // New: Get the leaderboard data
// exports.getLeaderboard = async (req, res) => {
//   try {
//     const leaderboard = await User.find({})
//       .select('email score')
//       .sort({ score: -1 })
//       .limit(10);

//     res.json(leaderboard);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error fetching leaderboard' });
//   }
// };

// // New: Update a user's score
// exports.updateScore = async (req, res) => {
//   const { userId, points } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.score += points;
//     await user.save();

//     res.json({ message: 'Score updated successfully', score: user.score });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error updating score' });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .select("email score")
      .sort({ score: -1 })
      .limit(10);
    res.json(leaderboard);
  } catch {
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
};

export const updateScore = async (req, res) => {
  const { userId, points } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.score += points;
    await user.save();
    res.json({ message: "Score updated successfully", score: user.score });
  } catch {
    res.status(500).json({ message: "Server error updating score" });
  }
};
