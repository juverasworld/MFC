/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { addToMailchimp } from "../../hooks/useMailchimp";
// import emailjs from "@emailjs/browser";
import "./InviteSpeaker.scss"

interface InviteSpeakOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const InviteSpeakOverlay: React.FC<InviteSpeakOverlayProps> = ({
  isOpen,
  closeOverlays,
}) => {
  const [formData, setFormData] = useState({
    inviteName: "",
    inviteEmail: "",
    inviteOrganization: "",
    inviteDetails: "",
  });
  const [isSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


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
          aria-labelledby="invite-speak-overlay-title"
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
            <h2 id="invite-speak-overlay-title" className="overlay-title">
              Invite Dr. OVO to Speak
            </h2>
            <form
              className="newsletter-form"
              id="inviteSpeakForm"
            //   onSubmit={handleInviteSpeakSubmit}
            >
              <motion.div
                className="form-group"
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="form-label" htmlFor="inviteName">
                  First Name
                </label>
                <input
                  type="text"
                  id="inviteName"
                  name="inviteName"
                  className="form-input"
                  placeholder="Enter your First name"
                  value={formData.inviteName}
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
                <label className="form-label" htmlFor="inviteEmail">
                  Email Address
                </label>
                <input
                  type="email"
                  id="inviteEmail"
                  name="inviteEmail"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={formData.inviteEmail}
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
                <label className="form-label" htmlFor="inviteOrganization">
                  Organization/Event Name
                </label>
                <input
                  type="text"
                  id="inviteOrganization"
                  name="inviteOrganization"
                  className="form-input"
                  placeholder="Enter organization or event name"
                  value={formData.inviteOrganization}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div
                className="form-group"
                custom={3}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="form-label" htmlFor="inviteDetails">
                  Event Details
                </label>
                <textarea
                  id="inviteDetails"
                  name="inviteDetails"
                  className="form-input"
                  placeholder="Provide details about the event (date, location, topic, etc.)"
                  rows={4}
                  value={formData.inviteDetails}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="confirm-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteSpeakOverlay;