
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import DonationOverlay from "./components/Overlays/DonationOverlay";
import AboutAuthor from "./components/AboutAuthor";
import TestimonialSection from "./components/TestimonialSection";
import PodcastSection from "./components/PodcastSection";
import PresaleSection from "./components/PresaleSection";
// import NewsletterSection from "./components/NewsletterSection";
import MorePopup from "./components/Overlays/MorePopup";
import FreeSessionOverlay from "./components/Overlays/FreeSessionOverlay";
// import InviteSpeakOverlay from "./components/Overlays/InviteSpeakOverlay";
import SessionOverlay from "./components/Overlays/SessionOverlay";
import PresaleOverlay from "./components/Overlays/PresaleOverlay";
import Footer from "./components/Footer";
// import "./assets/styles/index.scss";
import InviteSpeakOverlay from "./components/Overlays/InviteSpeakerOverlay";

function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isPresaleOpen, setIsPresaleOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isFreeSessionOpen, setIsFreeSessionOpen] = useState(false);
  const [isInviteSpeakOpen, setIsInviteSpeakOpen] = useState(false);
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const openOverlay = (type: string) => {
    console.log("Opening overlay:", type);
    setIsDonationOpen(type === "donation");
    setIsPresaleOpen(type === "presale");
    setIsSessionOpen(type === "session");
    setIsFreeSessionOpen(type === "freeSession");
    setIsInviteSpeakOpen(type === "inviteSpeak");
    setIsMorePopupOpen(type === "more");
    const header = document.querySelector(".header");
    if (header) {
      header.dispatchEvent(new CustomEvent("closeMenus"));
    }
  };

  const closeOverlays = () => {
    console.log("Closing all overlays");
    setIsDonationOpen(false);
    setIsPresaleOpen(false);
    setIsSessionOpen(false);
    setIsFreeSessionOpen(false);
    setIsInviteSpeakOpen(false);
    setIsMorePopupOpen(false);
    const header = document.querySelector(".header");
    if (header) {
      header.dispatchEvent(new CustomEvent("closeMenus"));
    }
  };

  const showMorePopup = () => {
    console.log("Showing MorePopup");
    setIsMorePopupOpen(true);
    const header = document.querySelector(".header");
    if (header) {
      header.dispatchEvent(new CustomEvent("closeMenus"));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    // const handleClickOutside = (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   if (
    //     (target.closest(".overlay") && !target.closest(".overlay-content")) ||
    //     (target.closest(".more-popup") && !target.closest(".popup-content")) ||
    //     (target.closest(".session-dropdown") && !target.closest(".dropdown-container"))
    //   ) {
    //     console.log("Click outside detected, closing overlays and dropdowns");
    //     closeOverlays();
    //   }
    // };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Escape key pressed, closing overlays and dropdowns");
        closeOverlays();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <div className="app">
        <Header openOverlay={openOverlay} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection
                    openOverlay={openOverlay}
                    showMorePopup={showMorePopup} closeMorePopup={function (): void {
                      throw new Error("Function not implemented.");
                    } }                  />
                  <AboutAuthor openOverlay={openOverlay} />
                  <TestimonialSection />
                  <PodcastSection />
                  <PresaleSection openOverlay={openOverlay} />
                  {/* <NewsletterSection /> */}
                </>
              }
            />
            <Route path="/blog" element={<div>Blog Page (To be implemented)</div>} />
          </Routes>
        </main>
        <AnimatePresence>
          <DonationOverlay isOpen={isDonationOpen} closeOverlays={closeOverlays} />
          <PresaleOverlay isOpen={isPresaleOpen} closeOverlays={closeOverlays} />
          <SessionOverlay isOpen={isSessionOpen} closeOverlays={closeOverlays} />
          <FreeSessionOverlay
            isOpen={isFreeSessionOpen}
            closeOverlays={closeOverlays}
          />
          <InviteSpeakOverlay
            isOpen={isInviteSpeakOpen}
            closeOverlays={closeOverlays}
          />
          <MorePopup isOpen={isMorePopupOpen} closePopup={closeOverlays} />
        </AnimatePresence>
        <motion.a
          href="#"
          id="back-to-top"
          className={showBackToTop ? "show" : ""}
          title="Back to Top"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.a>
        <Footer />
      </div>
    </Router>
  );
}

export default App;