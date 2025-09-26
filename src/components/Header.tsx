// import React, { useState } from "react";
// // import "./Header.css"; // Assuming you have a CSS file for styling
// import logo from "../assets/logo.jpg";
// interface HeaderProps {
//   openOverlay: (type: string) => void;
// }
  
// const Header: React.FC<HeaderProps> = ({ openOverlay }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

// //   const openOverlay = (type: string) => {
// //     // Replace with your actual overlay logic
// //     console.log(`Opening ${type} overlay`);
// //   };

//   return (
//     <header className="header">
//       <div className="nav-container">
//         <a href="/">
//           <img
//             src={logo}
//             style={{ borderRadius: "30%" }}
//             alt="My Family Companion Logo"
//             className="logo-icon"
//           />
//         </a>

//         <nav className="nav-menu">
//           <a href="./blog.html">Blog</a>
//           <a href="#join-community">Join Community</a>
//           <a href="#events">Events</a>
//           <a href="#Podcast">Podcast</a>
//           <a href="mailto:contact@myfamilycompanion.com">
//             contact@myfamilycompanion.com
//           </a>
//         </nav>

//         {/* Hamburger Menu for Small Screens */}
//         <div className="hamburger" onClick={toggleMobileMenu}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
//           <a href="./blog.html">Blog</a>
//           <a href="#join-community">Join Community</a>
//           <a href="#events">Events</a>
//           <a href="#Podcast">Podcast</a>
//           <a href="mailto:contact@myfamilycompanion.com">
//             contact@myfamilycompanion.com
//           </a>
//         </div>

//         <a
//           href="#"
//           className="contact-btn"
//           onClick={() => openOverlay("presale")}
//         >
//           Presale Order
//         </a>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useCallback } from "react";
import logo from "../assets/logo.jpg";
import "../App.css"

interface HeaderProps {
  openOverlay: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ openOverlay }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const navLinks = [
    { href: "./blog.html", label: "Blog" },
    { href: "#join-community", label: "Join Community" },
    { href: "#events", label: "Events" },
    { href: "#Podcast", label: "Podcast" },
    {
      href: "mailto:contact@mycompanion.org",
      label: "contact@mycompanion.org",
    },
  ];

  return (
    <header className="header">
      <div className="nav-container">
        <a href="/" aria-label="Home">
          <img
            src={logo}
            alt="My Family Companion Logo"
            className="logo-icon"
            style={{ borderRadius: "30%" }}
          />
        </a>

        <nav className="nav-menu">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <span className="close-icon">✕</span>
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </button>

        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={toggleMobileMenu}>
              {label}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="contact-btn"
          onClick={(e) => {
            e.preventDefault();
            openOverlay("presale");
          }}
        >
          Presale Order
        </a>
      </div>
    </header>
  );
};

export default Header;