
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./MorePopup.scss";

interface MorePopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const MorePopup: React.FC<MorePopupProps> = ({ isOpen, closePopup }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePopup]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 }, // Cubic bezier
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="more-popup"
          id="morePopup"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closePopup}
        >
          <motion.div
            className="popup-content"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={closePopup}>
              ×
            </span>
            <h2
              className="font-bold text-align pb-5 hero-descript "
              style={{
                paddingBottom: "5px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Excerpts from Foreword Dr. Zainab Kwaru Mohammad-Idris National President,
              Medical Women’s Association of Nigeria
            </h2>
            <p className="popup-description">
              Some books give you facts. Others touch your heart.
              <i>
                 My Family
              Companion – From Singlehood to Parenthood {" "}
              </i>
               does both — guiding you
              with the authority of a doctor and the warmth of a trusted friend
            </p>
            <p className="popup-description">
              In these pages, Dr. OVO blends real-life stories with clear,
              practical advice, making complex medical truths simple and
              relatable. From choosing a partner with health in mind to
              navigating pregnancy and caring for your newborn, this book walks
              beside you at every stage of family life.
            </p>
            <p className="popup-description">
              It’s more than a guide; it’s a life-saving companion. The stories
              remind you that these issues are real and close to home, while the
              advice equips you to act early, wisely, and with confidence.
            </p>
            <p className="popup-description">
              Whether you’re single, married, expecting, or parenting young
              children, you’ll find in these chapters the knowledge to protect
              your family — and the inspiration to share it with others. Because
              love is most powerful when it is informed, and every home deserves
              a companion like this.
            </p>
          
            <motion.button
              className="popup-close-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={closePopup}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MorePopup;