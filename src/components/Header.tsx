import React, { useState } from "react";
// import "./Header.css"; // Assuming you have a CSS file for styling
import logo from "../assets/logo.jpg";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openOverlay = (type: string) => {
    // Replace with your actual overlay logic
    console.log(`Opening ${type} overlay`);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <a href="/">
          <img
            src={logo}
            style={{ borderRadius: "30%" }}
            alt="My Family Companion Logo"
            className="logo-icon"
          />
        </a>

        <nav className="nav-menu">
          <a href="./blog.html">Blog</a>
          <a href="#join-community">Join Community</a>
          <a href="#events">Events</a>
          <a href="#Podcast">Podcast</a>
          <a href="mailto:contact@myfamilycompanion.com">
            contact@myfamilycompanion.com
          </a>
        </nav>

        {/* Hamburger Menu for Small Screens */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="./blog.html">Blog</a>
          <a href="#join-community">Join Community</a>
          <a href="#events">Events</a>
          <a href="#Podcast">Podcast</a>
          <a href="mailto:contact@myfamilycompanion.com">
            contact@myfamilycompanion.com
          </a>
        </div>

        <a
          href="#"
          className="contact-btn"
          onClick={() => openOverlay("presale")}
        >
          Presale Order
        </a>
      </div>
    </header>
  );
};

export default Header;
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import logo from "../assets/logo.jpg";

// interface HeaderProps {
//   openOverlay: (type: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({ openOverlay }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const menuVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   const mobileMenuVariants = {
//     hidden: { opacity: 0, x: "100%" },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
//   };

//   return (
//     <header className="header">
//       <div className="nav-container">
//         <Link to="/" className="logo">
//           <img
//             src={logo}
//             style={{ borderRadius: "30%" }}
//             alt="My Family Companion Logo"
//             className="logo-icon"
//           />
//         </Link>
//         <nav className="nav-menu">
//           {[
//             "Blog",
//             "Join Community",
//             "Events",
//             "Podcast",
//             "contact@myfamilycompanion.com",
//           ].map((item, index) => (
//             <motion.a
//               key={item}
//               href={
//                 item === "Blog"
//                   ? "/blog"
//                   : item === "contact@myfamilycompanion.com"
//                   ? `mailto:${item}`
//                   : `#${item.toLowerCase().replace(" ", "-")}`
//               }
//               variants={menuVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: index * 0.1 }}
//             >
//               {item}
//             </motion.a>
//           ))}
//         </nav>
//         <div
//           className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
//           onClick={toggleMobileMenu}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               className="mobile-menu"
//               variants={mobileMenuVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {[
//                 "Blog",
//                 "Join Community",
//                 "Events",
//                 "Podcast",
//                 "contact@myfamilycompanion.com",
//               ].map((item, index) => (
//                 <motion.a
//                   key={item}
//                   href={
//                     item === "Blog"
//                       ? "/blog"
//                       : item === "contact@myfamilycompanion.com"
//                       ? `mailto:${item}`
//                       : `#${item.toLowerCase().replace(" ", "-")}`
//                   }
//                   variants={menuVariants}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ delay: index * 0.1 }}
//                   onClick={closeMobileMenu}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.a
//           href="#"
//           className="contact-btn"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => openOverlay("presale")}
//         >
//           Presale Order
//         </motion.a>
//       </div>
//     </header>
//   );
// };

// export default Header;
