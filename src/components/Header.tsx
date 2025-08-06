import React, { useState } from "react";
// import "./Header.css"; // Assuming you have a CSS file for styling
import logo from "../assets/logo.jpg";
interface HeaderProps {
  openOverlay: (type: string) => void;
}
  
const Header: React.FC<HeaderProps> = ({ openOverlay }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

//   const openOverlay = (type: string) => {
//     // Replace with your actual overlay logic
//     console.log(`Opening ${type} overlay`);
//   };

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
