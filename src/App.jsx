// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import About from './components/About';
// import FAQ from './components/FAQ';
// import Services from './components/Services';
// import Footer from './components/Footer';
// import Testimonials from './components/Testimonials';
// import Profile from './components/Profile';
// import SignIn from './components/SignIn';
// import Contact from './components/Contact';
// import { motion, AnimatePresence } from 'framer-motion';
// import AboutUs from './components/aboutus';
// import TutorialSlides from './components/TutorialSlides';
// import Journey from './components/Journey';
// import Leaderboard from './components/Leaderboard';
// import CreatePost from './components/CreatePost';
// import Comment from './components/Comment';
// import Challenges from './components/Challenges';
// import MentorMatch from './components/MentorMatch';
// function MainContent() {
// 	const [user, setUser] = useState(null);
// 	const [showWelcome, setShowWelcome] = useState(false);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const loggedInUser = localStorage.getItem('user');
// 		if (loggedInUser) {
// 			setUser(JSON.parse(loggedInUser));
// 		}
// 	}, []);

// 	const handleSignIn = (userData) => {
// 		setUser(userData);
// 		localStorage.setItem('user', JSON.stringify(userData));
// 		setShowWelcome(true);
// 		navigate('/');
// 		setTimeout(() => setShowWelcome(false), 5000);
// 	};

// 	const handleSignOut = () => {
// 		setUser(null);
// 		localStorage.removeItem('user');
// 		navigate('/');
// 	};

// 	return (
// 		<>
// 			<Navbar user={user} onSignOut={handleSignOut} />

// 			<AnimatePresence>
// 				{showWelcome && (
// 					<motion.div
// 						initial={{ opacity: 0, y: -50 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						exit={{ opacity: 0, y: -50 }}
// 						className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#251c1a] text-white px-6 py-3 rounded-full shadow-lg"
// 					>
// 						<span className="font-medium">Welcome back, {user?.name}! 👋</span>
// 					</motion.div>
// 				)}
// 			</AnimatePresence>

// 			<Routes>
// 				<Route path="/" element={
// 					<>
// 						<section id="hero"><Hero /></section>
// 						<section id="services"><Services /></section>
// 						<section id="about"><About /></section>
// 						<section id="journey"><Journey /></section>
						
// 						{user && <CreatePost currentUser={user} />}
// 						{user && <Comment postId="123" currentUser={user} />}
// 						{user && <Challenges currentUser={user} />}

// 						<section id="testimonials"><Testimonials /></section>
// 						<section id="faq"><FAQ /></section>
// 						<section id="contact"><Contact /></section>
// 						<Footer />
// 					</>
// 				} />
// 				<Route path="/leaderboard" element={<Leaderboard />} />
// 				<Route path="/MentorMatch" element={<MentorMatch />} />
// 				<Route path="/profile" element={user ? <Profile user={user} /> : <SignIn onSignIn={handleSignIn} />} />
// 				<Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
// 				<Route path="/aboutus" element={<AboutUs />} />
// 				<Route path="/TutorialSlides" element={<TutorialSlides />} />
// 			</Routes>
// 		</>
// 	);
// }

// function App() {
// 	return (
// 		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
// 			<MainContent />
// 		</Router>
// 	);
// }

// export default App;





//by riya


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import About from './components/About';
// import FAQ from './components/FAQ';
// import Services from './components/Services';
// import Footer from './components/Footer';
// import Testimonials from './components/Testimonials';
// import Profile from './components/Profile';
// import SignIn from './components/SignIn';
// import Contact from './components/Contact';
// import { motion, AnimatePresence } from 'framer-motion';
// import AboutUs from './components/aboutus';
// import TutorialSlides from './components/TutorialSlides';
// import Journey from './components/Journey';
// import Leaderboard from './components/Leaderboard';
// import CreatePost from './components/CreatePost';
// import Comment from './components/Comment';
// import Challenges from './components/Challenges';
// import MentorMatch from './components/MentorMatch';
// import Dashboard from './components/Dashboard';

// function MainContent() {
//   const [user, setUser] = useState(null);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

//   const handleSignIn = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setShowWelcome(true);
//     navigate('/');
//     setTimeout(() => setShowWelcome(false), 5000);
//   };

//   const handleSignOut = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <>
//       <Navbar user={user} onSignOut={handleSignOut} />

//       <AnimatePresence>
//         {showWelcome && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#251c1a] text-white px-6 py-3 rounded-full shadow-lg"
//           >
//             <span className="font-medium">Welcome back, {user?.name}! 👋</span>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Routes>
//         <Route path="/" element={
//           <>
//             <section id="hero"><Hero /></section>
//             <section id="services"><Services /></section>
//             <section id="about"><About /></section>
//             <section id="journey"><Journey /></section>

//             {user && <CreatePost currentUser={user} />}
//             {user && <Comment postId="123" currentUser={user} />}
//             {user && <Challenges currentUser={user} />}

//             {/* Dashboard button */}
//             <div className="text-center my-4">
//               <Link to="/dashboard" className="btn btn-primary">
//                 📊 Go to Dashboard
//               </Link>
//             </div>

//             <section id="testimonials"><Testimonials /></section>
//             <section id="faq"><FAQ /></section>
//             <section id="contact"><Contact /></section>
//             <Footer />
//           </>
//         } />
//         <Route path="/leaderboard" element={<Leaderboard />} />
//         <Route path="/MentorMatch" element={<MentorMatch />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/profile" element={user ? <Profile user={user} /> : <SignIn onSignIn={handleSignIn} />} />
//         <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/TutorialSlides" element={<TutorialSlides />} />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// }


//yashswi 


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Monitor from './components/Monitor';
import About from './components/About';
import FAQ from './components/FAQ';
import Services from './components/Services';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import AboutUs from './components/aboutus';
import TutorialSlides from './components/TutorialSlides';
import Journey from './components/Journey';
import Leaderboard from './components/Leaderboard';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import Challenges from './components/Challenges';
import MentorMatch from './components/MentorMatch';
import Dashboard from './components/Dashboard';
import UploadForm from './components/UploadForm';
import ResultsTable from './components/ResultsTable';
import Dashboardy from './components/Dashboardy';
function MainContent() {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [results, setResults] = useState(null);
  const [leak, setLeak] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowWelcome(true);
    navigate('/');
    setTimeout(() => setShowWelcome(false), 5000);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar user={user} onSignOut={handleSignOut} />

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#251c1a] text-white px-6 py-3 rounded-full shadow-lg"
          >
            <span className="font-medium">Welcome back, {user?.name}! 👋</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={
          <>
            <section id="hero"><Hero /></section>
            <section id="services"><Services /></section>
            <section id="about"><About /></section>
            <section id="journey"><Journey /></section>

            {user && <CreatePost currentUser={user} />}
            {user && <Comment postId="123" currentUser={user} />}
            {user && <Challenges currentUser={user} />}
            {user && <Monitor currentUser={user} />}

            {/* Buttons to navigate to extra tools */}
            <div className="text-center my-4 flex justify-center gap-4">
              <Link to="/dashboard" className="btn btn-primary">
                📊 Go to Dashboard
              </Link>
              <Link to="/itc-leakage" className="btn btn-secondary">
                🧾 ITC Leakage Detector
              </Link>
            </div>

            <section id="testimonials"><Testimonials /></section>
            <section id="faq"><FAQ /></section>
            <section id="contact"><Contact /></section>
            <Footer />
          </>
        } />

        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/MentorMatch" element={<MentorMatch />} />
        <Route path="/dashboard" element={<Dashboard results={results || []} potentialLeak={leak} />} />
        <Route path="/Monitor" element={<Monitor currentUser={user} />} />
        {/* ITC Leakage Detector page */}
        <Route
          path="/itc-leakage"
          element={
            <div className="container py-24">
              <h1 className="text-2xl font-bold mb-6">ITC Leakage Detector</h1>
              <div className="grid gap-8">
                <UploadForm onResults={(r, leakAmt) => { setResults(r); setLeak(leakAmt); }} />
                {results && (
                  <>
                    <Dashboardy results={results} potentialLeak={leak} />
                    <ResultsTable results={results} />
                  </>
                )}
              </div>
            </div>
          }
        />

        <Route path="/profile" element={user ? <Profile user={user} /> : <SignIn onSignIn={handleSignIn} />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/TutorialSlides" element={<TutorialSlides />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
