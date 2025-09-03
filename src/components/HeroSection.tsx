/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import bgImage from "../assets/bg1.jpg";
import { motion } from "framer-motion";
import { gsap } from "gsap";
interface HeroSectionProps {
  openOverlay: (type: string) => void;
  showMorePopup: () => void;
  closeMorePopup: () => void; // Added to match HTML's closeMorePopup reference
}

const HeroSection: React.FC<HeroSectionProps> = ({
  openOverlay,
  showMorePopup,
  closeMorePopup,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // GSAP Parallax Effect for Background Image
    const heroElement = heroRef.current;
    if (heroElement) {
      gsap.to(heroElement.querySelector(".main-image"), {
        y: "10%",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Timer Logic
    const targetDate = localStorage.getItem("timerTargetDate")
      ? new Date(localStorage.getItem("timerTargetDate")!)
      : new Date("2025-09-27T15:58:00+01:00");

    if (!localStorage.getItem("timerTargetDate")) {
      localStorage.setItem("timerTargetDate", targetDate.toISOString());
    }

    const updateTimer = () => {
      const now = new Date();
      const timeLeft = targetDate.getTime() - now.getTime();
      if (timeLeft <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion Variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }, // cubic-bezier for easeInOut
    },
  };

  const timerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };
  return (
    <main className="main-content  w-full " >
      <div className="hero-image" ref={heroRef}>
        <img src={bgImage} alt="Team collaboration" className="main-image" />
        <motion.div
          className="winner-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div>
            <div className="winner-text">
              90 Days Presale
              <br /> 30% Off
            </div>
          </div>
        </motion.div>
        <motion.div
          className="productivity-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="productivity-subtitle">
            Evoking true stories
            <br />
            and practical insights.
            <br />
            from a concerned doctor.
          </div>
        </motion.div>
      </div>

      <div className="hero-content">
        <motion.div
          className="timer-container"
          variants={timerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="timer">
            <div className="time-unit">
              <span id="days">{time.days}</span>
              <span className="label">Days</span>
            </div>
            <div className="time-unit">
              <span id="hours">{time.hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-unit">
              <span id="minutes">{time.minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="time-unit">
              <span id="seconds">{time.seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          My Family Companion
        </motion.h1>
        <div className="her ">
          <p className="hero-descript font-bold " style={{ paddingBottom: "5px", fontWeight:"bold", textAlign:"center" }}>
            Foreward By Dr. Zainab Kwaru, National President, MWAN
          </p>
          <p className="hero-descript" style={{ paddingBottom: "5px" }}>
                        Some books give you facts. Others touch your heart. The Family Companion – From Singlehood to Parenthood does both — guiding you with the authority of a doctor and the warmth of a trusted friend.

          </p>
          <p className="hero-description" style={{}}>
In these pages, Dr. OVO blends real-life stories with clear, practical advice, making complex medical truths simple and relatable. From choosing a partner with health in mind to navigating pregnancy and caring for your newborn, this book walks beside you at every stage of family life.
It’s more than a guide; it’s a life-saving companion. The stories remind you that these issues are real and close to home, while the advice equips you to act early, wisely, and with confidence
            <a href="#" className="more-link" onClick={showMorePopup}>
              ... more
            </a>
          </p>
        </div>

        <div className="cta-section">
          <motion.button
            // href="#"
            className="more-info-btn"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => openOverlay("donation")}
          >
            Donate Copy
          </motion.button>
          <motion.button
            // href="#"
            className="more-info-btn"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => openOverlay("presale")}
          >
            Presale Order
          </motion.button>
          {/* <a
            href="#"
            className="more-info-btn"
            onClick={() => openOverlay("presale")}
          >
            Presale Order
          </a> */}
        </div>
      </div>

      {/* Popup Container */}
      <div id="morePopup" className="popup-overlay">
        <div className="popup-content">
          <span className="close-popup" onClick={closeMorePopup}>
            &times;
          </span>
          <div className="popup-text" style={{ marginBottom: "5%" }}>
            <p>
              Building a healthy family starts long before the wedding day—and
              continues with every decision you make as a parent.
            </p>
            <p style={{ marginBottom: "5px" }}>
              In <em>My Family Companion</em>, Dr. OVO draws from years of
              medical education and practice, real-life stories, and personal
              experience to guide you through every stage of family life—from
              choosing the right partner (medically) to navigating pregnancy,
              childbirth, newborn care, and parenting young children. Written in
              a simple, warm, and conversational style, this book answers the
              questions many families are too uninformed, shy or overwhelmed to
              ask.
            </p>
            <p>
              Whether you’re single, newly married, expecting a baby, or raising
              little ones, <em>My Family Companion</em> equips you with
              life-saving insights.
            </p>
            <p>
              Every chapter begins with a true and relatable story, followed by
              a series of conversationally tailored practical advice, with
              current medically accurate information.
            </p>
            <p>
              This book empowers you to make informed choices and build a
              strong, healthy home—one decision at a time.
            </p>
            <p>
              It puts a doctor on the shelf of every household because every
              family deserves a trusted companion.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
