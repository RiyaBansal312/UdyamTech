# 🌟 Udyam – Empowering Change Through Technology

## 📌 Overview
**Udyam** is a platform designed to bridge the gap between citizens, communities, and local authorities.  
It enables people to report, track, and resolve civic issues effectively — ensuring cleaner, safer, and more livable cities.

AI MODELS-
1.Founders Recognition at Udyam meetups-https://drive.google.com/drive/folders/1-DXL_BFZYKReZHaCHBIxVVYGuaVF1TBf
2.Ai buisness reports-https://github.com/Piyushwahi/Ai_Business
---

## 🚨 Problem Statement
Urban and rural communities across India face **persistent civic challenges**:
- 🚧 Poor road maintenance (potholes, broken sidewalks)
- 🗑 Overflowing garbage and irregular waste collection
- 💡 Streetlights not working, causing safety concerns
- 💧 Water supply leakage or shortage
- 🚱 Poor sanitation and drainage issues

These problems often **go unreported** or **get stuck in bureaucratic delays**, leaving citizens frustrated and authorities uninformed.
- https://www.canva.com/design/DAGmH5U_ujw/wD7WdXFPVCAS6SLFxNI_Ig/edit?utm_content=DAGmH5U_ujw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
---

## 💡 Our Solution
**Udyam** provides a **centralized, easy-to-use reporting platform**:
1. 📍 **Location-based Issue Reporting** – Tag problems within a 3–5 km radius.
2. 📷 **Image Upload** – Attach photos for better visibility.
3. 🕵 **Anonymous or Verified Reporting** – Protect privacy when needed.
4. 📊 **Live Status Tracking** – See if your issue is pending, in-progress, or resolved.
5. 🗺 **Map View** – Visualize issues in your neighborhood.
6. 🛡 **Spam & Duplicate Detection** – Ensure genuine reports.
7. 📈 **Data Analytics** – Identify recurring issues and high-priority zones.

---

## 🌍 Our Impact
- 📌 **Community Engagement:** Citizens become active participants in city improvement.
- 📌 **Faster Response Times:** Authorities get structured, actionable reports.
- 📌 **Transparency:** Clear timelines for resolution.
- 📌 **Data-Driven Policy Making:** Use aggregated reports to improve long-term infrastructure planning.
- 📌 **Scalable Nationwide:** Works for small towns or big metros.
- https://drive.google.com/drive/folders/1mLy2gc6AR2P4GfLAdGQQhOIH4sKSbegO 
---

## 🏆 What Udyam Does
- Acts as a **digital bridge** between citizens and government bodies.
- Uses **AI-powered classification** to prioritize urgent issues.
- Provides **real-time updates** to both the reporter and the concerned department.
- Encourages **collective action** through neighborhood watch features.
- Maintains a **history log** for every complaint to ensure accountability.

---

## ⚙️ Tech Stack
**Frontend:**
- React.js (UI Framework)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router (Routing)

**Backend:**
- Node.js + Express.js (API Layer)
- MongoDB (Database)
- Cloudinary (Image Storage)
- JWT (Authentication)

**AI & Integrations:**
- TensorFlow.js / OpenAI API for spam detection
- Mapbox API for geolocation and mapping

**Deployment:**
- Vercel / Netlify (Frontend)
- Render / Railway / Heroku (Backend)
- MongoDB Atlas (Database)

---

## 🛠 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/udyam.git
cd udyam
```

### 2️⃣ Install Dependencies
#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd backend
npm install
node server.js
node seed/seedMentors.js
node scripts/GenerateMentorEmbeddings.js
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the **server** folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPBOX_API_KEY=your_mapbox_token
```

---

## ▶️ Run the Project

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd client
npm start
```

Your app will be live at:  
Frontend → `http://localhost:3000`  
Backend → `http://localhost:5000`

---

## 📊 API Endpoints (Backend)
| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | /api/issues           | Report a new issue               |
| GET    | /api/issues           | Fetch all issues                 |
| GET    | /api/issues/:id       | Get issue by ID                  |
| PUT    | /api/issues/:id       | Update issue status              |
| DELETE | /api/issues/:id       | Delete an issue                  |

---
Team-Shivam Thakur,Riya Bansal,Piyush Wahi,Yashaswi

---

## 📜 License
This project is licensed under the **MIT License** – you’re free to use, modify, and distribute it with attribution.

---

## 💬 Contact
📧 Email: yourname@example.com  
🔗 GitHub: [yourusername](https://github.com/yourusername)  
🌐 Website: [Udyam Official Site](https://yourwebsite.com)

---
> Together, let’s make our cities better, one report at a time.
