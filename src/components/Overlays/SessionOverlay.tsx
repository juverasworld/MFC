/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaystack } from "../../hooks/usePaystack";
import type { Config, Session } from "../../types";
import "./SessionOverlay.scss";

interface SessionOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const config: Config = {
  pricePerCopyNGN: 20000,
  pricePerCopyUSD: 15,
  sessionPriceNGN: 75000,
  sessionPriceUSD: 50,
  amazonLink: import.meta.env.VITE_AMAZON_LINK || "https://www.amazon.com/your-book-link",
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
};
const CALENDLY_URL = "https://calendly.com/your-calendly-link";

const SessionOverlay: React.FC<SessionOverlayProps> = ({ isOpen, closeOverlays }) => {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [formData, setFormData] = useState<Session>({
    name: "",
    email: "",
    location: "",
    amountNGN: config.sessionPriceNGN,
    amountUSD: config.sessionPriceUSD,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const { initiatePaystackPayment } = usePaystack(config);

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

   useEffect(() => {
    if (step === "confirmation" && !error) {
      const redirectTimer = setTimeout(() => {
        window.location.href = CALENDLY_URL;
      }, 5000); // Redirect after 5 seconds
      return () => clearTimeout(redirectTimer); // Cleanup timer on unmount
    }
  }, [step, error]);


  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      location: "",
      amountNGN: config.sessionPriceNGN,
      amountUSD: config.sessionPriceUSD,
    });
    const form = document.getElementById("sessionForm") as HTMLFormElement;
    if (form) form.reset();
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.location) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Initiate Paystack payment
      const transaction = await initiatePaystackPayment(
        {
          copies: 0,
          totalNGN: formData.amountNGN,
          totalUSD: formData.amountUSD,
          name: formData.name,
          email: formData.email,
          phone: "",
          organization: "",
          location: formData.location,
        },
        formData.location === "Nigeria" ? "NGN" : "USD"
      );

      const payload = {
        name: formData.name,
        email: formData.email,
        country: formData.location,
        reference: (transaction as any).reference,
      };

      // Make API call
      const response = await fetch("/api/book-paid-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to book session.");
      }

      setConfirmationMessage(result.message || "Successfully booked your session!");
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
                <h2 id="session-overlay-title" className="overlay-title">
                  Book a Paid Private Session
                </h2>
                {error && <div className="error-message">{error}</div>}
                <form
                  id="sessionForm"
                  className="session-form"
                  onSubmit={(e) => e.preventDefault()}
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
                  {/* <motion.div
                    className="form-group"
                    custom={2}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="form-label" htmlFor="location">
                      Country
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-input"
                      placeholder="Enter your country"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div> */}
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
                       <select
                  id="location"
                      name="location"
                  className="form-input"
                     value={formData.location}
                      onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
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
                    className="confirm-btnsa"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
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
                <h2 id="session-overlay-title" className="overlay-title">
                  {error ? "Booking Error" : "Thank You!"}
                </h2>
                <p className={`confirmation-message ${error ? "error" : ""}`}>
                  {confirmationMessage}
                </p>
                   {!error && (
                  <p className="redirect-message">
                    Redirecting you to Calendly now to book a session...{" "}
                    <a href={CALENDLY_URL} className="calendly-link">
                      Click here
                    </a>{" "}
                    if you are not redirected.
                  </p>
                )}
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

export default SessionOverlay;