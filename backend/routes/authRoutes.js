// const express = require('express');
// const { 
//   registerUser, 
//   loginUser, 
//   getLeaderboard, 
//   updateScore
// } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/leaderboard', getLeaderboard);
// router.post('/update-score', updateScore);

// module.exports = router;


import express from "express";
import { 
  registerUser, 
  loginUser, 
  getLeaderboard, 
  updateScore 
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/leaderboard", getLeaderboard);
router.post("/update-score", updateScore);

export default router;
