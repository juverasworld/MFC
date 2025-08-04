/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DonationOverlay from './components/Overlays/DonationOverlay';
import AboutAuthor from './components/AboutAuthor';
import TestimonialSection from './components/TestimonialSection';
import PodcastSection from './components/PodcastSection';
import PresaleSection from './components/PresaleSection';
import NewsletterSection from './components/NewsletterSection';
import { motion } from "framer-motion";

import Footer from './components/Footer';
function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isPresaleOpen, setIsPresaleOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isFreeSessionOpen, setIsFreeSessionOpen] = useState(false);
  const [isInviteSpeakOpen, setIsInviteSpeakOpen] = useState(false);
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);

  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openOverlay = (type: string) => {
    setIsDonationOpen(type === "donation");
    setIsPresaleOpen(type === "presale");
    setIsSessionOpen(type === "session");
    setIsFreeSessionOpen(type === "freeSession");
    setIsInviteSpeakOpen(type === "inviteSpeak");
  };

  const closeOverlays = () => {
    setIsDonationOpen(false);
    setIsPresaleOpen(false);
    setIsSessionOpen(false);
    setIsFreeSessionOpen(false);
    setIsInviteSpeakOpen(false);
    setIsMorePopupOpen(false);
  };

  const showMorePopup = () => setIsMorePopupOpen(true);

  // useEffect(() => {
  //   // Initialize EmailJS
  //   import("@emailjs/browser").then((emailjs) => {
  //     emailjs.init({ publicKey: "wYOLVvExDoBUBzO12" });
  //   });
  // }, []);

  return (
    <>
      <Router>
        <div className="app">
          <Header />
          {/* <Header openOverlay={openOverlay} /> */}
          <main className="">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection
                      openOverlay={openOverlay}
                      showMorePopup={showMorePopup}
                    />
                    <AboutAuthor openOverlay={openOverlay} />
                    <TestimonialSection />
                    <PodcastSection />
                    <PresaleSection openOverlay={openOverlay} />
                    {/* <NewsletterSection /> */}
                  </>
                }
              />
              <Route
                path="/blog"
                element={<div>Blog Page (To be implemented)</div>}
              />
            </Routes>
          </main>
          <Footer />
          <DonationOverlay
            isOpen={isDonationOpen}
            closeOverlays={closeOverlays}
          />
          {/* <PresaleOverlay
            isOpen={isPresaleOpen}
            closeOverlays={closeOverlays}
          />
          <SessionOverlay
            isOpen={isSessionOpen}
            closeOverlays={closeOverlays}
          />
          <FreeSessionOverlay
            isOpen={isFreeSessionOpen}
            closeOverlays={closeOverlays}
          />
          <InviteSpeakOverlay
            isOpen={isInviteSpeakOpen}
            closeOverlays={closeOverlays}
          />
          {/* Back to Top Button */}
          <motion.a
            href="#"
            id="back-to-top"
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              zIndex: 1000,
              scale: showBackToTop ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.a>
            
        </div>
      </Router>
    </>
  );
}

export default App
