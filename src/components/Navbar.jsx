// import React, { useState, useEffect } from 'react';
// import {
//   FaBars,
//   FaTimes,
//   FaUser,
//   FaSignOutAlt,
// } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate, useLocation, Link } from 'react-router-dom';

// function Navbar({ user, onSignOut }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleNavigation = (path) => {
//     if (path.startsWith('/#')) {
//       const sectionId = path.slice(2);
//       const element = document.getElementById(sectionId);
//       if (element) element.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       navigate(path);
//     }
//     setIsOpen(false);
//   };

//   const leftNavItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Leaderboard', path: '/leaderboard' },
//     { name: 'Find Mentor', path: '/MentorMatch' },
//     { name: 'NAV3', path: '/request' },
//   ];

//   const rightNavItems = [
//     { name: 'Testimonials', path: '/#testimonials' },
//     { name: 'Contact', path: '/#contact' },
//     ...(user
//       ? [
//           { name: user.name, icon: <FaUser />, path: '/profile' },
//           { name: 'Sign Out', icon: <FaSignOutAlt />, onClick: onSignOut },
//         ]
//       : [{ name: 'Sign In', icon: <FaUser />, path: '/signin' }]),
//   ];

//   const isActive = (path) => {
//     if (!path) return false;
//     if (path.startsWith('/#')) {
//       const hash = `#${path.slice(2)}`;
//       return location.pathname === '/' && window.location.hash === hash;
//     }
//     return location.pathname === path;
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? 'bg-[#3B2412]/95 backdrop-blur-md shadow-md border-b border-[#FFD37D]'
//           : 'bg-[#3B2412]/80'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20 relative">
          
//           {/* Left Nav (Desktop) */}
//           <div className="hidden md:flex space-x-8 items-center absolute left-0">
//             {leftNavItems.map((item) => (
//               <motion.button
//                 key={item.name}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={item.onClick || (() => handleNavigation(item.path))}
//                 className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
//                   isActive(item.path)
//                     ? 'text-[#FFD37D] underline underline-offset-4'
//                     : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
//                 }`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </motion.button>
//             ))}
//           </div>

//           {/* Center Logo */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center space-x-3 cursor-pointer mx-auto"
//             onClick={() => handleNavigation('/')}
//           >
//             <img
//               src="/IMAGE12.png"
//               alt="Udyam Logo"
//               className="w-14 h-14 object-contain"
//             />
//           </motion.div>

//           {/* Right Nav (Desktop) */}
//           <div className="hidden md:flex space-x-8 items-center absolute right-0">
//             {rightNavItems.map((item) => (
//               <motion.button
//                 key={item.name}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={item.onClick || (() => handleNavigation(item.path))}
//                 className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
//                   isActive(item.path)
//                     ? 'text-[#FFD37D] underline underline-offset-4'
//                     : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
//                 }`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </motion.button>
//             ))}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-[#FFD37D] ml-3 absolute right-0"
//           >
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </motion.button>
//         </div>

//         {/* Mobile Dropdown */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden bg-[#3B2412]/98 backdrop-blur-sm border-t border-[#FFD37D] px-4 pb-4 pt-2 rounded-b-lg"
//             >
//               {[...leftNavItems, ...rightNavItems].map((item, index) => (
//                 <motion.button
//                   key={item.name}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   onClick={item.onClick || (() => handleNavigation(item.path))}
//                   className={`w-full flex items-center space-x-3 py-2 text-base font-semibold tracking-wide ${
//                     isActive(item.path)
//                       ? 'text-[#FFD37D] underline underline-offset-4'
//                       : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.name}</span>
//                 </motion.button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// }

// export default Navbar;

// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.slice(2);
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const leftNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Find Mentor', path: '/MentorMatch' },
    { name: 'NAV3', path: '/Monitor' },
  ];

  const rightNavItems = [
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Contact', path: '/#contact' },
    ...(user
      ? [
          { name: user.name, icon: <FaUser />, path: '/profile' },
          { name: 'Sign Out', icon: <FaSignOutAlt />, onClick: onSignOut },
        ]
      : [{ name: 'Sign In', icon: <FaUser />, path: '/signin' }]),
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path.startsWith('/#')) {
      const hash = `#${path.slice(2)}`;
      return location.pathname === '/' && window.location.hash === hash;
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#3B2412]/95 backdrop-blur-md shadow-md border-b border-[#FFD37D]'
          : 'bg-[#3B2412]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Left Nav (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center absolute left-0">
            {leftNavItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.onClick || (() => handleNavigation(item.path))}
                className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-[#FFD37D] underline underline-offset-4'
                    : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Center Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer mx-auto"
            onClick={() => handleNavigation('/')}
          >
            <img
              src="/IMAGE12.png"
              alt="Udyam Logo"
              className="w-14 h-14 object-contain"
            />
          </motion.div>

          {/* Right Nav (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center absolute right-0">
            {rightNavItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.onClick || (() => handleNavigation(item.path))}
                className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-[#FFD37D] underline underline-offset-4'
                    : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#FFD37D] ml-3 absolute right-0"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#3B2412]/98 backdrop-blur-sm border-t border-[#FFD37D] px-4 pb-4 pt-2 rounded-b-lg"
            >
              {[...leftNavItems, ...rightNavItems].map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={item.onClick || (() => handleNavigation(item.path))}
                  className={`w-full flex items-center space-x-3 py-2 text-base font-semibold tracking-wide ${
                    isActive(item.path)
                      ? 'text-[#FFD37D] underline underline-offset-4'
                      : 'text-[#EADCC4]/80 hover:text-[#FFD37D]'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
