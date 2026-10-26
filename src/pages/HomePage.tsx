import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutAuthor from "../components/AboutAuthor";
import TestimonialSection from "../components/TestimonialSection";
import PodcastSection from "../components/PodcastSection";
import PresaleSection from "../components/PresaleSection";
import Footer from "../components/Footer";
import DonationOverlay from "../components/Overlays/DonationOverlay";
import PresaleOverlay from "../components/Overlays/PresaleOverlay";
import SessionOverlay from "../components/Overlays/SessionOverlay";
import FreeSessionOverlay from "../components/Overlays/FreeSessionOverlay";
import InviteSpeakerOverlay from "../components/Overlays/InviteSpeakerOverlay";
import MorePopup from "../components/Overlays/MorePopup";

type OverlayName = "donation" | "presale" | "session" | "freeSession" | "inviteSpeak" | "more";
const overlayNames: readonly OverlayName[] = ["donation", "presale", "session", "freeSession", "inviteSpeak", "more"];

function isOverlayName(value: string): value is OverlayName {
  return overlayNames.includes(value as OverlayName);
}

export default function HomePage() {
  const [activeOverlay, setActiveOverlay] = useState<OverlayName | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const closeOverlays = useCallback(() => {
    setActiveOverlay(null);
    document.querySelector(".header")?.dispatchEvent(new CustomEvent("closeMenus"));
  }, []);

  const openOverlay = useCallback((overlay: string) => {
    if (!isOverlayName(overlay)) return;
    setActiveOverlay(overlay);
    document.querySelector(".header")?.dispatchEvent(new CustomEvent("closeMenus"));
  }, []);

  const showMorePopup = useCallback(() => openOverlay("more"), [openOverlay]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlays();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlays]);

  return (
    <div className="app">
      <Header openOverlay={openOverlay} />
      <main>
        <HeroSection openOverlay={openOverlay} showMorePopup={showMorePopup} closeMorePopup={closeOverlays} />
        <AboutAuthor openOverlay={openOverlay} />
        <TestimonialSection />
        <PodcastSection />
        <PresaleSection openOverlay={openOverlay} />
      </main>

      <AnimatePresence>
        <DonationOverlay isOpen={activeOverlay === "donation"} closeOverlays={closeOverlays} />
        <PresaleOverlay isOpen={activeOverlay === "presale"} closeOverlays={closeOverlays} />
        <SessionOverlay isOpen={activeOverlay === "session"} closeOverlays={closeOverlays} />
        <FreeSessionOverlay isOpen={activeOverlay === "freeSession"} closeOverlays={closeOverlays} />
        <InviteSpeakerOverlay isOpen={activeOverlay === "inviteSpeak"} closeOverlays={closeOverlays} />
        <MorePopup isOpen={activeOverlay === "more"} closePopup={closeOverlays} />
      </AnimatePresence>

      <motion.button
        type="button"
        id="back-to-top"
        className={showBackToTop ? "show" : ""}
        aria-label="Back to top"
        title="Back to top"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span aria-hidden="true">↑</span>
      </motion.button>

      <Footer />
    </div>
  );
}
