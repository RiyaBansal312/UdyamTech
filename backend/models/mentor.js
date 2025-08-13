// const mongoose = require('mongoose');

// const MentorSchema = new mongoose.Schema({
//   name: String,
//   industry: String,
//   skills: [String],
//   experience: String,
//   bio: String,
//   embedding: {
//     type: [Number], // array of numbers for embedding vector
//     default: []
//   }
// });

// module.exports = mongoose.model('Mentor', MentorSchema);



import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: String,
  industry: String,
  skills: [String],
  experience: String,
  bio: String,
  embedding: {
    type: [Number], // array of numbers for embedding vector
    default: []
  }
});

export default mongoose.model("Mentor", MentorSchema);

