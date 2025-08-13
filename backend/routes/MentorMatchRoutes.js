
// import express from "express";

// import axios from 'axios';
// import Mentor from "../models/mentor.js"; // Ensure this path is correct





// const router = express.Router();

// async function getEmbedding(text) {
//   const endpoint = process.env.AZURE_OPENAI_ENDPOINT.endsWith('/')
//     ? process.env.AZURE_OPENAI_ENDPOINT
//     : process.env.AZURE_OPENAI_ENDPOINT + '/';

//   const url = `${endpoint}openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}/embeddings?api-version=2023-05-15`;

//   const response = await axios.post(
//     url,
//     { input: text },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'api-key': process.env.AZURE_OPENAI_API_KEY,
//       },
//     }
//   );

//   return response.data.data[0].embedding;
// }

// function cosineSimilarity(vecA, vecB) {
//   if (vecA.length !== vecB.length) return 0;
//   let dotProduct = 0,
//     normA = 0,
//     normB = 0;
//   for (let i = 0; i < vecA.length; i++) {
//     dotProduct += vecA[i] * vecB[i];
//     normA += vecA[i] ** 2;
//     normB += vecB[i] ** 2;
//   }
//   return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// }

// router.post('/', async (req, res) => {
//   try {
//     const { entrepreneur_profile, max_results } = req.body;
//     if (!entrepreneur_profile) {
//       return res.status(400).json({ error: 'Entrepreneur profile is required' });
//     }

//     const skillsText = Array.isArray(entrepreneur_profile.skills)
//       ? entrepreneur_profile.skills.join(' ')
//       : '';
//     const queryText = `${entrepreneur_profile.name || ''} ${entrepreneur_profile.industry || ''} ${skillsText}`.trim();

//     console.log(`🔍 Search query text: "${queryText}"`);

//     const queryEmbedding = await getEmbedding(queryText);
//     console.log(`📏 Query embedding length: ${queryEmbedding.length}`);

//     let mentors = await Mentor.find();
//     console.log(`📦 Total mentors in DB: ${mentors.length}`);

//     // Auto-generate missing embeddings
//     for (const mentor of mentors) {
//       if (!Array.isArray(mentor.embedding) || mentor.embedding.length === 0) {
//         try {
//           const text = `${mentor.name} ${mentor.industry} ${mentor.skills.join(' ')}`;
//           mentor.embedding = await getEmbedding(text);
//           await mentor.save();
//           console.log(`🛠 Generated missing embedding for ${mentor.name}`);
//         } catch (err) {
//           console.error(`❌ Failed to generate embedding for ${mentor.name}:`, err.message);
//         }
//       }
//     }

//     // Refresh list after embedding generation
//     mentors = await Mentor.find();
//     const mentorsWithEmbeddings = mentors.filter((m) => Array.isArray(m.embedding) && m.embedding.length > 0);
//     console.log(`✅ Mentors with embeddings: ${mentorsWithEmbeddings.length}`);

//     const matches = mentorsWithEmbeddings
//       .map((m) => ({
//         mentor: m,
//         score: cosineSimilarity(queryEmbedding, m.embedding),
//       }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, max_results || 3);

//     console.log('🏆 Top match scores:', matches.map(m => ({ name: m.mentor.name, score: m.score })));

//     const formatted = matches.map(({ mentor, score }) => ({
//       _id: mentor._id,
//       name: mentor.name,
//       industry: mentor.industry,
//       skills: mentor.skills,
//       experience_years: mentor.experience ? Number(mentor.experience.match(/\d+/)) || 0 : 0,
//       bio: mentor.bio,
//       match_score: score,
//     }));

//     res.json({
//       matches: formatted,
//       reasoning: 'Matching based on cosine similarity of profile embeddings.',
//     });
//   } catch (err) {
//     console.error('❌ Error matching mentors:', err.response?.data || err.message || err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;



import express from "express";
import axios from "axios";
import Mentor from "../models/mentor.js";

const router = express.Router();

async function getEmbedding(text) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT.endsWith("/")
    ? process.env.AZURE_OPENAI_ENDPOINT
    : process.env.AZURE_OPENAI_ENDPOINT + "/";

  const url = `${endpoint}openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}/embeddings?api-version=2023-05-15`;

  const response = await axios.post(
    url,
    { input: text },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY,
      },
    }
  );

  return response.data.data[0].embedding;
}

function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

router.post("/", async (req, res) => {
  try {
    const { entrepreneur_profile, max_results } = req.body;
    if (!entrepreneur_profile) {
      return res.status(400).json({ error: "Entrepreneur profile is required" });
    }

    const skillsText = Array.isArray(entrepreneur_profile.skills)
      ? entrepreneur_profile.skills.join(" ")
      : "";
    const queryText = `${entrepreneur_profile.name || ""} ${entrepreneur_profile.industry || ""} ${skillsText}`.trim();

    console.log(`🔍 Search query text: "${queryText}"`);

    const queryEmbedding = await getEmbedding(queryText);
    console.log(`📏 Query embedding length: ${queryEmbedding.length}`);

    let mentors = await Mentor.find();
    console.log(`📦 Total mentors in DB: ${mentors.length}`);

    // Auto-generate missing embeddings
    for (const mentor of mentors) {
      if (!Array.isArray(mentor.embedding) || mentor.embedding.length === 0) {
        try {
          const text = `${mentor.name} ${mentor.industry} ${mentor.skills.join(" ")}`;
          mentor.embedding = await getEmbedding(text);
          await mentor.save();
          console.log(`🛠 Generated missing embedding for ${mentor.name}`);
        } catch (err) {
          console.error(`❌ Failed to generate embedding for ${mentor.name}:`, err.message);
        }
      }
    }

    // Refresh list after embedding generation
    mentors = await Mentor.find();
    const mentorsWithEmbeddings = mentors.filter((m) => Array.isArray(m.embedding) && m.embedding.length > 0);
    console.log(`✅ Mentors with embeddings: ${mentorsWithEmbeddings.length}`);

    const matches = mentorsWithEmbeddings
      .map((m) => ({
        mentor: m,
        score: cosineSimilarity(queryEmbedding, m.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, max_results || 3);

    console.log("🏆 Top match scores:", matches.map((m) => ({ name: m.mentor.name, score: m.score })));

    const formatted = matches.map(({ mentor, score }) => ({
      _id: mentor._id,
      name: mentor.name,
      industry: mentor.industry,
      skills: mentor.skills,
      experience_years: mentor.experience ? Number(mentor.experience.match(/\d+/)) || 0 : 0,
      bio: mentor.bio,
      match_score: score,
    }));

    res.json({
      matches: formatted,
      reasoning: "Matching based on cosine similarity of profile embeddings.",
    });
  } catch (err) {
    console.error("❌ Error matching mentors:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
