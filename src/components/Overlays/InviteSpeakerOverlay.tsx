
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./InviteSpeaker.scss";

interface InviteSpeakOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const InviteSpeakOverlay: React.FC<InviteSpeakOverlayProps> = ({ isOpen, closeOverlays }) => {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [formData, setFormData] = useState({
    inviteName: "",
    inviteEmail: "",
    inviteOrganization: "",
    inviteDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      resetForm();
    } else {
      setStep("form");
      resetForm();
      setError(null);
      setConfirmationMessage("");
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      inviteName: "",
      inviteEmail: "",
      inviteOrganization: "",
      inviteDetails: "",
    });
    const form = document.getElementById("inviteSpeakForm") as HTMLFormElement;
    if (form) form.reset();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.inviteName || !formData.inviteEmail || !formData.inviteOrganization || !formData.inviteDetails) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        firstname: formData.inviteName,
        email: formData.inviteEmail,
        event_name: formData.inviteOrganization,
        event_details: formData.inviteDetails,
      };

      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit invitation request.");
      }

      setConfirmationMessage(result.message || "Successfully submitted your invitation request!");
      setStep("confirmation");

      // Auto-close after 5 seconds
      setTimeout(() => {
        closeOverlays();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during submission.");
      setConfirmationMessage(err instanceof Error ? err.message : "An error occurred during submission.");
      setStep("confirmation");
    } finally {
      setIsSubmitting(false);
    }
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
            {step === "form" ? (
              <>
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
                {error && <div className="error-message">{error}</div>}
                <form
                  className="newsletter-form"
                  id="inviteSpeakForm"
                  onSubmit={(e) => e.preventDefault()}
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
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                key="confirmation"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0}
              >
                <h2 id="invite-speak-overlay-title" className="overlay-title">
                  {error ? "Submission Error" : "Thank You!"}
                </h2>
                <p className={`confirmation-message ${error ? "error" : ""}`}>
                  {confirmationMessage}
                </p>
                <motion.button
                  className="confirm-btn"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={closeOverlays}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  Close
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteSpeakOverlay;