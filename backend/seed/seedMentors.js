// backend/seed/seedMentors.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Mentor from '../models/mentor.js'; // Ensure `.js` extension in ESM

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in backend/.env");
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB connected!');

    const mentors = [
      {
        name: 'John Doe',
        expertise: 'AI, Machine Learning',
        bio: '10+ years in AI development.',
        embedding: [0.12, 0.54, 0.98]
      },
      {
        name: 'Jane Smith',
        expertise: 'Full Stack Development',
        bio: 'Specializes in MERN stack applications.',
        embedding: [0.87, 0.22, 0.15]
      }
    ];

    await Mentor.deleteMany({});
    await Mentor.insertMany(mentors);

    console.log('✅ Mentors seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding mentors:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔴 MongoDB connection closed');
  }
}

seed();
