/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "./components/Header";
// import HeroSection from "./components/HeroSection";
// import DonationOverlay from "./components/Overlays/DonationOverlay";
// import AboutAuthor from "./components/AboutAuthor";
// import TestimonialSection from "./components/TestimonialSection";
// import PodcastSection from "./components/PodcastSection";
// import PresaleSection from "./components/PresaleSection";
// // import NewsletterSection from "./components/NewsletterSection";
// import MorePopup from "./components/Overlays/MorePopup";
// import FreeSessionOverlay from "./components/Overlays/FreeSessionOverlay";
// // import InviteSpeakOverlay from "./components/Overlays/InviteSpeakOverlay";
// import SessionOverlay from "./components/Overlays/SessionOverlay";
// import PresaleOverlay from "./components/Overlays/PresaleOverlay";
// import Footer from "./components/Footer";
// // import "./assets/styles/index.scss";
// import InviteSpeakOverlay from "./components/Overlays/InviteSpeakerOverlay";

// function App() {
//   const [isDonationOpen, setIsDonationOpen] = useState(false);
//   const [isPresaleOpen, setIsPresaleOpen] = useState(false);
//   const [isSessionOpen, setIsSessionOpen] = useState(false);
//   const [isFreeSessionOpen, setIsFreeSessionOpen] = useState(false);
//   const [isInviteSpeakOpen, setIsInviteSpeakOpen] = useState(false);
//   const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   const openOverlay = (type: string) => {
//     console.log("Opening overlay:", type);
//     setIsDonationOpen(type === "donation");
//     setIsPresaleOpen(type === "presale");
//     setIsSessionOpen(type === "session");
//     setIsFreeSessionOpen(type === "freeSession");
//     setIsInviteSpeakOpen(type === "inviteSpeak");
//     setIsMorePopupOpen(type === "more");
//     const header = document.querySelector(".header");
//     if (header) {
//       header.dispatchEvent(new CustomEvent("closeMenus"));
//     }
//   };

//   const closeOverlays = () => {
//     console.log("Closing all overlays");
//     setIsDonationOpen(false);
//     setIsPresaleOpen(false);
//     setIsSessionOpen(false);
//     setIsFreeSessionOpen(false);
//     setIsInviteSpeakOpen(false);
//     setIsMorePopupOpen(false);
//     const header = document.querySelector(".header");
//     if (header) {
//       header.dispatchEvent(new CustomEvent("closeMenus"));
//     }
//   };

//   const showMorePopup = () => {
//     console.log("Showing MorePopup");
//     setIsMorePopupOpen(true);
//     const header = document.querySelector(".header");
//     if (header) {
//       header.dispatchEvent(new CustomEvent("closeMenus"));
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowBackToTop(window.scrollY > 300);
//     };

//     // const handleClickOutside = (e: MouseEvent) => {
//     //   const target = e.target as HTMLElement;
//     //   if (
//     //     (target.closest(".overlay") && !target.closest(".overlay-content")) ||
//     //     (target.closest(".more-popup") && !target.closest(".popup-content")) ||
//     //     (target.closest(".session-dropdown") && !target.closest(".dropdown-container"))
//     //   ) {
//     //     console.log("Click outside detected, closing overlays and dropdowns");
//     //     closeOverlays();
//     //   }
//     // };

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         console.log("Escape key pressed, closing overlays and dropdowns");
//         closeOverlays();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     // document.addEventListener("click", handleClickOutside);
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       // document.removeEventListener("click", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Header openOverlay={openOverlay} />
//         <main>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <HeroSection
//                     openOverlay={openOverlay}
//                     showMorePopup={showMorePopup} closeMorePopup={function (): void {
//                       throw new Error("Function not implemented.");
//                     } }                  />
//                   <AboutAuthor openOverlay={openOverlay} />
//                   <TestimonialSection />
//                   <PodcastSection />
//                   <PresaleSection openOverlay={openOverlay} />
//                   {/* <NewsletterSection /> */}
//                 </>
//               }
//             />
//             <Route path="/blog" element={<div>Blog Page (To be implemented)</div>} />
//           </Routes>
//         </main>
//         <AnimatePresence>
//           <DonationOverlay isOpen={isDonationOpen} closeOverlays={closeOverlays} />
//           <PresaleOverlay isOpen={isPresaleOpen} closeOverlays={closeOverlays} />
//           <SessionOverlay isOpen={isSessionOpen} closeOverlays={closeOverlays} />
//           <FreeSessionOverlay
//             isOpen={isFreeSessionOpen}
//             closeOverlays={closeOverlays}
//           />
//           <InviteSpeakOverlay
//             isOpen={isInviteSpeakOpen}
//             closeOverlays={closeOverlays}
//           />
//           <MorePopup isOpen={isMorePopupOpen} closePopup={closeOverlays} />
//         </AnimatePresence>
//         <motion.a
//           href="#"
//           id="back-to-top"
//           className={showBackToTop ? "show" : ""}
//           title="Back to Top"
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
//           transition={{ duration: 0.3 }}
//           onClick={(e) => {
//             e.preventDefault();
//             scrollToTop();
//           }}
//         >
//           <i className="fas fa-arrow-up"></i>
//         </motion.a>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Load Citnzel font (replace with actual font import if using a custom font)
import "./index.css"; // Add font import here if needed

// Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-citnzel";
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-accent",
  };
  const sizeStyles = {
    default: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg",
  };

  // Button animation variants
  const buttonVariants: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Card Component
const Card = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  // Card animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      className={`rounded-lg border border-border bg-card shadow-sm ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Newsletter Popup Component
const NewsletterPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subscribe-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setTimeout(onClose, 2000); // Close after 2 seconds
      } else {
        const errorData = await response.json();
        setStatus("error");
        setErrorMessage(errorData.message || "Failed to subscribe. Try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // Form animation variants
  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="bg-primary/50 rounded-lg p-8 max-w-md w-full mx-4 shadow-lg font-citnzel h-[300px]"
            style={{ padding: "14px" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          >
            {status === "success" ? (
              <motion.div
                className="text-center"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  className="text-2xl font-bold text-foreground mb-4"
                  variants={childVariants}
                >
                  Thank You!
                </motion.h2>
                <motion.p
                  className="text-muted-foreground mb-6"
                  variants={childVariants}
                >
                  You’ve successfully subscribed. We’ll notify you about the
                  launch!
                </motion.p>
                <motion.div variants={childVariants}>
                  <Button onClick={onClose}>Close</Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  className="text-2xl font-bold text-foreground mb-4 text-center"
                  variants={childVariants}
                >
                  Get Notified for the Launch
                </motion.h2>
                <motion.p
                  className="text-muted-foreground mb-6 text-center"
                  variants={childVariants}
                >
                  Enter your details to stay updated on the My Family Companion
                  launch.
                </motion.p>
                <motion.div variants={childVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full p-2 border border-border rounded-md focus:ring-primary focus:border-primary h-10 bg-transparent"
                    placeholder="Your Name"
                  />
                </motion.div>
                <motion.div variants={childVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full p-2 border h-10 border-border rounded-md focus:ring-primary focus:border-primary"
                    placeholder="your@email.com"
                  />
                </motion.div>
                {status === "error" && (
                  <motion.p
                    className="text-red-500 text-sm"
                    variants={childVariants}
                  >
                    {errorMessage}
                  </motion.p>
                )}
                <motion.div
                  className="flex justify-center gap-4"
                  variants={childVariants}
                >
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-10 w-48 my-5"
                    style={{ marginTop: "20px" }}
                  >
                    {status === "loading" ? "Submitting..." : "Subscribe"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onClose}
                    className="w-full h-10 w-48 my-5"
                    style={{ marginTop: "20px" }}
                  >
                    Cancel
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// CountdownTimer Component
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 8);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Countdown animation variants
  const timerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const timerChildVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center"
      variants={timerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex flex-col items-center"
        variants={timerChildVariants}
      >
        <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Days
        </div>
      </motion.div>
      <motion.div
        className="text-2xl sm:text-4xl md:text-6xl text-primary"
        variants={timerChildVariants}
      >
        :
      </motion.div>
      <motion.div
        className="flex flex-col items-center"
        variants={timerChildVariants}
      >
        <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Hours
        </div>
      </motion.div>
      <motion.div
        className="text-2xl sm:text-4xl md:text-6xl text-primary"
        variants={timerChildVariants}
      >
        :
      </motion.div>
      <motion.div
        className="flex flex-col items-center"
        variants={timerChildVariants}
      >
        <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Minutes
        </div>
      </motion.div>
      <motion.div
        className="text-2xl sm:text-4xl md:text-6xl text-primary"
        variants={timerChildVariants}
      >
        :
      </motion.div>
      <motion.div
        className="flex flex-col items-center"
        variants={timerChildVariants}
      >
        <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Seconds
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main BookLaunchPage Component
export default function BookLaunchPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Section animation variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto bg-background p-4 sm:p-6 lg:p-8 flex items-center justify-center w-full font-citnzel">
      <div className="min-h-screen max-w-[1440px] py-4">
        {/* Newsletter Popup */}
        <NewsletterPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />

        {/* Navigation */}
        <motion.nav
          className="border-b border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <motion.img
                  src="/logo.jpg"
                  alt=""
                  className="w-[50px]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
                <motion.span
                  className="text-xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  My Family Companion
                </motion.span>
              </div>
              <motion.div
                className="hidden md:flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                  About
                </a>
                <a
                  href="#event"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                  Event Details
                </a>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          className="relative py-20 lg:py-32 my-6 flex items-center justify-center px-4"
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                style={{ marginBottom: "20px", marginTop: "20px" }}
                variants={childVariants}
              >
                <span
                  style={{ padding: "8px" }}
                  className="inline-block px-8 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20 mb-6"
                >
                  Book Launch Event
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6"
                style={{ marginBottom: "20px", marginTop: "20px" }}
                variants={childVariants}
              >
                <span className="text-foreground">Launching</span>
                <br />
                <span className="text-primary">My Family Companion</span>
              </motion.h1>
              <motion.div
                className="flex justify-center items-center"
                style={{ marginBottom: "20px", marginTop: "20px" }}
                variants={childVariants}
              >
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto border-2 border-primary/20 p-4 rounded-lg bg-primary/10">
                  A transformative guide to strengthening family family health
                  that combats maternal, infant, and child mortalities.
                </p>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                style={{ marginBottom: "20px", marginTop: "20px" }}
                variants={childVariants}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
                  Launch Countdown
                </h2>
                <CountdownTimer />
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={childVariants}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 lg:w-48 w-full h-12"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Get Notified
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 bg-transparent w-full lg:w-48 h-12"
                >
                  <a href="#about">Learn More</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Father of the Day Section */}
        <motion.section
          id="about"
          className="py-20 bg-card/50"
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div className="relative" variants={childVariants}>
                <div className="aspect-[3/4] flex items-center justify-center">
                  <motion.img
                    src="/bg1.webp"
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
              <motion.div variants={childVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 lg:text-left text-center">
                  Father of the Day -
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 lg:text-left text-center">
                  Anyim Pius Anyim
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 lg:text-left text-center">
                  Distinguished Guest & Father of the Day
                </p>

                <Button
                  size="lg"
                  className="text-lg px-8 py-4 lg:w-48 w-full h-12"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Get Notified
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          id="abouts"
          className="py-20 bg-card/50"
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content block */}
              <motion.div
                variants={childVariants}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 lg:text-left text-center">
                  Mother of the Day
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 lg:text-left text-center">
                  Dr. Zainab Kwaru
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 lg:text-left text-center">
                  Distinguished Guest & Mother of the Day
                </p>

                <Button
                  size="lg"
                  className="text-lg px-8 py-4 lg:w-48 w-full h-12"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Get Notified
                </Button>
              </motion.div>

              {/* Image block */}
              <motion.div
                className="relative order-1 lg:order-2"
                variants={childVariants}
              >
                <div className="aspect-[3/4] flex items-center justify-center">
                  <motion.img
                    src="/Zinab.JPG"
                    className="rounded-tl-[44px] rounded-br-[44px]"
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Event Details */}
        <motion.section
          id="event"
          className="py-20"
          style={{
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "10px",
          }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={childVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Event Details
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={sectionVariants}
            >
              <Card className="p-6 text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Date & Time
                </h3>
                <p className="text-muted-foreground">
                  30 Sept 2025
                  <br />7 PM - 8:00 PM WAT(Lagos)
                </p>
              </Card>

              <Card className="p-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Location
                </h3>
                <p className="text-muted-foreground">Youtube</p>
              </Card>

              <Card className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Special Features
                </h3>
                <p className="text-muted-foreground">
                  Book Donations
                  <br />
                  Q&A Sessions
                  <br />
                  Goodwill Messages
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* About My Family Companion Section */}
        <motion.section
          id="about"
          className="py-20 bg-card/50"
          style={{ paddingLeft: "8px", paddingRight: "8px", paddingTop: "8px" }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={childVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 lg:text-left text-center">
                  About My Family Companion
                </h2>
                <p
                  className="text-lg text-muted-foreground leading-relaxed mb-6 p-4"
                  style={{ paddingTop: "8px" }}
                >
                  My Family Companion – From Singlehood to Parenthood is more
                  than a book — it’s a trusted guide for life’s most important
                  journey — Family. But it’s more than a guide; it’s also a
                  life-saving companion. And every home deserves a companion
                  like this.
                </p>

                <Button
                  size="lg"
                  className="text-lg px-8 py-4 lg:w-48 w-full h-12"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Get Notified
                </Button>
              </motion.div>
              <motion.div className="relative" variants={childVariants}>
                <div className="aspect-[3/4] flex items-center justify-center">
                  <motion.img
                    src="/bg.jpg"
                    alt=""
                    className="rounded-tl-[44px] rounded-br-[44px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="border-t border-border py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                className="flex items-center space-x-2 justify-center"
                variants={childVariants}
              >
                <img src="/logo.jpg" alt="" className="w-[50px]" />
                <span className="text-xl font-bold text-foreground">
                  My Family Companion
                </span>
              </motion.div>
              <motion.p
                className="text-muted-foreground mb-4"
                variants={childVariants}
              >
                Building stronger families, one story at a time.
              </motion.p>
              <motion.p
                className="text-sm text-muted-foreground"
                variants={childVariants}
              >
                © 2025 My Family Companion. All rights reserved.
              </motion.p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}