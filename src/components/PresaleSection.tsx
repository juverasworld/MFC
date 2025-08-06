
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import presaleImage from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
// import "./styles/PresaleSection.scss";

interface PresaleSectionProps {
  openOverlay: (type: string) => void;
}

const PresaleSection: React.FC<PresaleSectionProps> = ({ openOverlay }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  // Animation variants for image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  // Animation variants for input fields
  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.3 },
    }),
  };

  return (
    <div className="body">
      <div className="containerss">
        {/* Presale Section */}
        <motion.div
          className="presale-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="presale-badge"
            variants={textVariants}
          >
            🔥 Limited Time Offer
          </motion.div>
          <motion.h2
            className="presale-title"
            variants={textVariants}
          >
            90-Day Presale
          </motion.h2>
          <motion.p
            className="presale-subtitle"
            variants={textVariants}
          >
            Get exclusive early access with{" "}
            <span className="spans">free delivery nationwide</span> (Nigeria)
          </motion.p>
          <motion.div
            className="price-container"
            variants={imageVariants}
          >
            <motion.img
              src={presaleImage}
              alt="Presale Book"
              className="main-image"
              variants={imageVariants}
            />
          </motion.div>
          <motion.p
            className="presale-subtitle"
            variants={textVariants}
          >
            30% Discount
          </motion.p>
          <motion.button
            className="cta-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => openOverlay("presale")}
          >
            Order Presale Now
          </motion.button>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="newsletter-section"
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2
            className="newsletter-titless"
            variants={textVariants}
          >
            Join Community
          </motion.h2>
          <motion.ul
            className="benefits-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              {
                icon: "fab fa-whatsapp",
                link: "https://whatsapp.com/channel/0029VbB0G3AEKyZDnb8juE46",
                text: "Join Our WhatsApp Channel",
              },
              {
                icon: "fab fa-telegram-plane",
                link: "https://t.me/myfamilycompanion",
                text: "Join Our Telegram Group",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={listItemVariants}
              >
                <motion.p
                  className={`payment-btn${index === 0 ? "s" : "ss"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={item.icon}></i>
                  <a href={item.link} className="a">
                    {item.text}
                  </a>
                </motion.p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.h2
            className="newsletter-titless"
            variants={textVariants}
          >
            Join the #1 Family Newsletter
          </motion.h2>
          <motion.p
            className="newsletter-subtitle"
            variants={textVariants}
          >
            Every week, we share honest stories, doctor-backed insights, and
            practical guides to help you build a healthy, happy home—now or
            later
          </motion.p>
          <motion.form
            className="newsletter-form"
            id="newsletterForm"
            // onSubmit={handleNewsletterSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="form-group"
              custom={0}
              variants={inputVariants}
            >
              <label className="form-label" htmlFor="name">
                First name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your First name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </motion.div>
            <motion.div
              className="form-group"
              custom={1}
              variants={inputVariants}
            >
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </motion.div>
            <motion.button
              type="submit"
              className="newsletter-button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </motion.button>
          </motion.form>
          <motion.p
            className="privacy-note"
            variants={textVariants}
          >
            🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PresaleSection;