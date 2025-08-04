/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import authorImage from "../assets/author2.jpg";
// import "./styles/AboutAuthor.scss";

interface AboutAuthorProps {
  openOverlay: (type: string) => void;
}

const AboutAuthor: React.FC<AboutAuthorProps> = ({ openOverlay }) => {
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleSessionDropdown = () => {
    setIsSessionDropdownOpen(!isSessionDropdownOpen);
  };
  useEffect(() => {
    const profileElement = profileRef.current;
    if (profileElement) {
      gsap.fromTo(
        profileElement,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: profileElement,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };
  return (
    <div className="body">
      <div className="portfolio-card">
        <div className="content-section">
          <motion.div
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            About The Author
          </motion.div>
          <motion.h1
            className="main-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            It's everything, you'll ever need.
          </motion.h1>
          <div className="topics-container">
             <ul className="topics-list">
                          {[
                            "Sex",
                            "Pregnancy",
                            "Maternal & Child Health",
                            "Family & Spouse Support",
                          ].map((topic, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
          </div>
            <motion.p
                     className="description"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5, delay: 0.4 }}
                   >
                     Dr. OVO (Otubo Victor Ogemdi) was barely 10 years old when he
                     watched his little sister die from something that should never have
                     taken her life. Today, his work is preventing one maternal and child
                     death every 30 seconds in communities across Africa...
                   </motion.p>
              <div className="stats-container">
                      {[
                        {
                          number: 14,
                          suffix: "+",
                          label: "Certificate<br />Achievement",
                          color: "blue",
                        },
                        {
                          number: 15,
                          label: "Years<br />Combined Experience",
                          color: "orange",
                        },
                      ].map((stat, index) => (
                        <motion.div
                          className="stat-item"
                          key={index}
                          custom={index}
                          variants={statVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <span className={`stat-number ${stat.color}`}>
                            {stat.number}
                          </span>
                          {stat.suffix && (
                            <span className={`stat-suffix ${stat.color}`}>
                              {stat.suffix}
                            </span>
                          )}
                          <span
                            className="stat-label"
                            dangerouslySetInnerHTML={{ __html: stat.label }}
                          />
                        </motion.div>
                      ))}
                    </div>
             <div className="sam">
                      <motion.button
                        className="cta-button"
                        variants={buttonVariants}
                        whileHover="hover"
                        onClick={toggleSessionDropdown}
                      >
                        Book a session
                      </motion.button>
                      <div
                        className={`session-dropdown ${
                          isSessionDropdownOpen ? "active" : ""
                        }`}
                        id="sessionDropdown"
                      >
                        <motion.a
                          href="#"
                          className="session-option"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => openOverlay("freeSession")}
                        >
                          Join Free Weekly Sessions
                        </motion.a>
                        <motion.a
                          href="#"
                          className="session-option"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          onClick={() => openOverlay("session")}
                        >
                          Book a Paid Private Session
                        </motion.a>
                      </div>
                      <motion.button
                        className="cta-button"
                        variants={buttonVariants}
                        whileHover="hover"
                        onClick={() => openOverlay("inviteSpeak")}
                      >
                        Invite to Speak
                      </motion.button>
                    </div>
        </div>
         <div className="profile-section" ref={profileRef}>
                  <div className="profile-image">
                    <img src={authorImage} alt="Dr OVO Profile picture" />
                  </div>
                  <div className="chat-bubble">
                    <div className="chat-header">Dr OVO</div>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
