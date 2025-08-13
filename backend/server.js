// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const MentorMatchRoutes = require('./routes/mentorMatchroutes');


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/mentor-match', MentorMatchRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// by riya 



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import mentorMatchRoutes from "./routes/mentorMatchroutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import gstRoutes from "./routes/gstRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import whatsappGstWebhook from "./routes/whatsappGstWebhook.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes from both projects
app.use("/api/auth", authRoutes);
app.use("/api/mentor-match", mentorMatchRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/gst", gstRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/whatsapp-gst", whatsappGstWebhook);

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
