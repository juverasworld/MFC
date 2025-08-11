/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { gsap } from "gsap";
// import authorImage from "../assets/author2.jpg";
// import "./About.scss";

// interface AboutAuthorProps {
//   openOverlay: (type: string) => void;
// }

// const AboutAuthor: React.FC<AboutAuthorProps> = ({ openOverlay }) => {
//   const profileRef = useRef<HTMLDivElement>(null);
//   const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);

//   useEffect(() => {
//     const profileElement = profileRef.current;
//     if (profileElement) {
//       gsap.fromTo(
//         profileElement,
//         { opacity: 0, x: 100 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1,
//           scrollTrigger: {
//             trigger: profileElement,
//             start: "top 80%",
//             end: "top 20%",
//             scrub: false,
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }
//   }, []);

//   const toggleSessionDropdown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsSessionDropdownOpen((prev) => {
//       console.log("Toggling session dropdown:", !prev);
//       return !prev;
//     });
//   };

//   const handleSessionSelect = (type: string) => {
//     console.log(`Opening ${type} overlay`);
//     openOverlay(type);
//     setIsSessionDropdownOpen(false);
//   };

//   const statVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: i * 0.2 },
//     }),
//   };

//   const buttonVariants = {
//     hover: { scale: 1.1, transition: { duration: 0.3 } },
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10, display: "none" },
//     visible: { opacity: 1, y: 0, display: "block", transition: { duration: 0.2 } },
//   };

//   return (
//     <div className="body">
//       <div className="portfolio-card">
//         <div className="content-section">
//           <motion.div
//             className="tagline"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             About The Author
//           </motion.div>
//           <motion.h1
//             className="main-heading"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             It's everything, you'll ever need.
//           </motion.h1>
//           <div className="topics-container">
//             <ul className="topics-list">
//               {[
//                 "Sex",
//                 "Pregnancy",
//                 "Maternal & Child Health",
//                 "Family & Spouse Support",
//               ].map((topic, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   {topic}
//                 </motion.li>
//               ))}
//             </ul>
//           </div>
//           <motion.p
//             className="description"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             Dr. OVO (Otubo Victor Ogemdi) was barely 10 years old when he
//             watched his little sister die from something that should never have
//             taken her life. Today, his work is preventing one maternal and child
//             death every 30 seconds in communities across Africa...
//           </motion.p>
//           <div className="stats-container">
//             {[
//               {
//                 number: 14,
//                 suffix: "+",
//                 label: "Certificate<br />Achievement",
//                 color: "blue",
//               },
//               {
//                 number: 15,
//                 label: "Years<br />Combined Experience",
//                 color: "orange",
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 className="stat-item"
//                 key={index}
//                 custom={index}
//                 variants={statVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <span className={`stat-number ${stat.color}`}>
//                   {stat.number}
//                 </span>
//                 {stat.suffix && (
//                   <span className={`stat-suffix ${stat.color}`}>
//                     {stat.suffix}
//                   </span>
//                 )}
//                 <span
//                   className="stat-label"
//                   dangerouslySetInnerHTML={{ __html: stat.label }}
//                 />
//               </motion.div>
//             ))}
//           </div>
//           <div className="sam">
//             <div className="dropdown-container">
//               <motion.button
//                 className="cta-button"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 onClick={toggleSessionDropdown}
//               >
//                 Book a session
//               </motion.button>
//               <motion.div
//                 className="session-dropdown"
//                 variants={dropdownVariants}
//                 initial="hidden"
//                 animate={isSessionDropdownOpen ? "visible" : "hidden"}
//               >
//                 <div
//                   className="session-option"
//                   onClick={() => handleSessionSelect("session")}
//                 >
//                   Paid Session
//                 </div>
//                 <div
//                   className="session-option"
//                   onClick={() => handleSessionSelect("freeSession")}
//                 >
//                   Free Session
//                 </div>
//               </motion.div>
//             </div>
//             <motion.button
//               className="cta-button"
//               variants={buttonVariants}
//               whileHover="hover"
//               onClick={(e) => {
//                 e.preventDefault();
//                 console.log("Opening inviteSpeak overlay");
//                 openOverlay("inviteSpeak");
//               }}
//             >
//               Invite to Speak
//             </motion.button>
//           </div>
//         </div>
//         <div className="profile-section" ref={profileRef}>
//           <div className="profile-image">
//             <img src={authorImage} alt="Dr OVO Profile picture" />
//           </div>
//           <div className="chat-bubble">
//             <div className="chat-header">Dr OVO</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutAuthor;

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import authorImage from "../assets/author2.jpg";
import "./About.scss";

gsap.registerPlugin(ScrollTrigger);

interface AboutAuthorProps {
  openOverlay: (type: string) => void;
}

const AboutAuthor: React.FC<AboutAuthorProps> = ({ openOverlay }) => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);

  // Animation variants for reusability
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i?: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i ? i * 0.2 : 0 },
    }),
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.2 },
    },
  };

  // GSAP animation for profile section
  useEffect(() => {
    const profileElement = profileRef.current;
    if (profileElement) {
      gsap.fromTo(
        profileElement,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: profileElement,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Memoized event handlers
  const toggleSessionDropdown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsSessionDropdownOpen((prev) => !prev);
  }, []);

  const handleSessionSelect = useCallback(
    (type: string) => {
      openOverlay(type);
      setIsSessionDropdownOpen(false);
    },
    [openOverlay]
  );

  // Data for stats and topics
  const topics = [
    "Sex",
    "Pregnancy",
    "Maternal & Child Health",
    "Family & Spouse Support",
  ];

  const stats = [
    {
      number: 14,
      suffix: "+",
      label: ["Certificate", "Achievement"],
      color: "blue",
    },
    {
      number: 15,
      label: ["Years", "Combined Experience"],
      color: "orange",
    },
  ];

  return (
    <div className="body">
      <div className="portfolio-card">
        <div className="content-section">
          <motion.div
            className="tagline"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            About The Author
          </motion.div>
          <motion.h1
            className="main-heading"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            It's everything, you'll ever need.
          </motion.h1>
          <div className="topics-container">
            <ul className="topics-list">
              {topics.map((topic, index) => (
                <motion.li
                  key={topic}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={index * 0.1}
                >
                  {topic}
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.p
            className="description"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            Dr. OVO (Otubo Victor Ogemdi) was barely 10 years old when he
            watched his little sister die from something that should never have
            taken her life. Today, his work is preventing one maternal and child
            death every 30 seconds in communities across Africa...
          </motion.p>
          <div className="stats-container">
            {stats.map((stat, index) => (
              <motion.div
                className="stat-item"
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={index + 0.6}
              >
                <span className={`stat-number ${stat.color}`}>
                  {stat.number}
                  {stat.suffix && (
                    <span className={`stat-suffix ${stat.color}`}>
                      {stat.suffix}
                    </span>
                  )}
                </span>
                <span className="stat-label">
                  {stat.label.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < stat.label.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="sam">
            <div className="dropdown-container">
              <motion.button
                className="cta-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleSessionDropdown}
                aria-expanded={isSessionDropdownOpen}
                aria-controls="session-dropdown"
              >
                Book a session
              </motion.button>
              <motion.div
                id="session-dropdown"
                className="session-dropdown"
                variants={dropdownVariants}
                initial="hidden"
                animate={isSessionDropdownOpen ? "visible" : "hidden"}
                role="menu"
              >
                {["Paid Session", "Free Session"].map((option, _index) => (
                  <div
                    key={option}
                    className="session-option"
                    onClick={() =>
                      handleSessionSelect(
                        option === "Paid Session" ? "session" : "freeSession"
                      )
                    }
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleSessionSelect(
                        option === "Paid Session" ? "session" : "freeSession"
                      )
                    }
                  >
                    {option}
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.button
              className="cta-button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => openOverlay("inviteSpeak")}
            >
              Invite to Speak
            </motion.button>
          </div>
        </div>
        <div className="profile-section" ref={profileRef}>
          <div className="profile-image">
            <img
              src={authorImage}
              alt="Dr. OVO Profile picture"
              loading="lazy"
            />
          </div>
          <div className="chat-bubble">
            <div className="chat-header">Dr. OVO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;