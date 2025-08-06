/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { usePaystack } from "../../hooks/usePaystack";
// import emailjs from "@emailjs/browser";
import type { Config, Session } from "../../types";
import "./SessionOverlay.scss";

interface SessionOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const config: Config = {
  pricePerCopyNGN: 20000,
  pricePerCopyUSD: 15,
  sessionPriceNGN: 75000,
  sessionPriceUSD: 50,
  amazonLink: "https://www.amazon.com/your-book-link",
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
};

const SessionOverlay: React.FC<SessionOverlayProps> = ({
  isOpen,
  closeOverlays,
}) => {
  const [formData, setFormData] = useState<Session>({
    name: "",
    email: "",
    location: "",
    amountNGN: config.sessionPriceNGN,
    amountUSD: config.sessionPriceUSD,
  });
  const [isSubmitting] = useState(false);
//   const { initiatePaystackPayment } = usePaystack(config);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSessionSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.location) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     setIsSubmitting(true);

//     try {
//       await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_USER_SESSION_CONFIRMATION,
//         {
//           user_name: formData.name,
//           user_email: formData.email,
//           location: formData.location,
//           amount: formData.amountNGN,
//         }
//       );

//       await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER_SESSION,
//         {
//           user_name: formData.name,
//           user_email: formData.email,
//           location: formData.location,
//           amount: formData.amountNGN,
//         }
//       );

//       initiatePaystackPayment(
//         formData.amountNGN,
//         formData.email,
//         "Session Booking",
//         "NGN"
//       );

//       setFormData({
//         name: "",
//         email: "",
//         location: "",
//         amountNGN: config.sessionPriceNGN,
//         amountUSD: config.sessionPriceUSD,
//       });
//       closeOverlays();
//     } catch (error) {
//       console.error("Error in session submission:", error);
//       alert("An error occurred while booking your session. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlay"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={closeOverlays}
          role="dialog"
          aria-labelledby="session-overlay-title"
        >
          <motion.div
            className="overlay-content"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
          >
            <div className="overlay-header">
              <motion.button
                className="back-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={closeOverlays}
              >
                <i className="fas fa-arrow-left"></i>
              </motion.button>
              <span className="close-btn" onClick={closeOverlays}>
                ×
              </span>
            </div>
            <h2 id="session-overlay-title" className="overlay-title">
              Book a Paid Private Session
            </h2>
            <form className="session-form" 
            // onSubmit={handleSessionSubmit}
            >
              <motion.div
                className="form-group"
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div
                className="form-group"
                custom={1}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
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
              <motion.div
                className="form-group"
                custom={2}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div
                className="price-container"
                custom={3}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="current-price">
                  ₦{formData.amountNGN.toLocaleString("en-NG")} / $
                  {formData.amountUSD.toLocaleString("en-US")}
                </div>
              </motion.div>
              <motion.button
                type="submit"
                className="confirm-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionOverlay;