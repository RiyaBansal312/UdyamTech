// backend/scripts/generateMentorEmbeddings.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import Mentor from '../models/mentor.js'; // ✅ must include .js in ESM imports

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from backend/.env
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

async function getEmbedding(text) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT.endsWith('/')
    ? process.env.AZURE_OPENAI_ENDPOINT
    : process.env.AZURE_OPENAI_ENDPOINT + '/';

  const url = `${endpoint}openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}/embeddings?api-version=2023-05-15`;

  const response = await axios.post(
    url,
    { input: text },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY
      }
    }
  );

  return response.data.data[0].embedding;
}

async function generateAndSaveEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const mentors = await Mentor.find({
      $or: [
        { embedding: null },
        { embedding: { $exists: false } }
      ]
    });

    for (const mentor of mentors) {
      const text = `${mentor.name} ${mentor.expertise} ${mentor.bio}`;
      try {
        const embedding = await getEmbedding(text);
        mentor.embedding = embedding;
        await mentor.save();
        console.log(`✅ Saved embedding for mentor: ${mentor.name}`);
      } catch (err) {
        console.error(`❌ Error for ${mentor.name}:`, err.message);
      }
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

generateAndSaveEmbeddings();
