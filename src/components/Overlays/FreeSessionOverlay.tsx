
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FreeSessionOverlay.scss";

interface FreeSessionOverlayProps {
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

const FreeSessionOverlay: React.FC<FreeSessionOverlayProps> = ({
  isOpen,
  closeOverlays,
}) => {
  const [formData, setFormData] = useState({
    sessionName: "",
    sessionEmail: "",
    sessionCountry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(null);
  };

const handleFreeSessionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage(null);

  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/book-free-session`; // Use environment variable
    console.log("API URL:", apiUrl);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.sessionName,
        email: formData.sessionEmail,
        country: formData.sessionCountry,
      }),
    });

    const result = await response.json();

    if (response.status === 201) {
      setMessage({ type: "success", text: result.message });
      setFormData({ sessionName: "", sessionEmail: "", sessionCountry: "" });
      setTimeout(() => {
        closeOverlays();
      }, 2000);
    } else {
      setMessage({
        type: "error",
        text: result.message || "Failed to book the session. Please try again.",
      });
    }
  } catch (error) {
    setMessage({
      type: "error",
      text: "An error occurred. Please try again later.",
    });
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
          aria-labelledby="free-session-overlay-title"
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
            <h2 id="free-session-overlay-title" className="overlay-title">
              Join Free Weekly Sessions
            </h2>
            {message && (
              <motion.div
                className={`message ${message.type}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {message.text}
              </motion.div>
            )}
            <form
              className="newsletter-form"
              id="freeSessionForm"
              onSubmit={handleFreeSessionSubmit}
            >
              <motion.div
                className="form-group"
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="form-label" htmlFor="sessionName">
                  First Name
                </label>
                <input
                  type="text"
                  id="sessionName"
                  name="sessionName"
                  className="form-input"
                  placeholder="Enter your First name"
                  value={formData.sessionName}
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
                <label className="form-label" htmlFor="sessionEmail">
                  Email Address
                </label>
                <input
                  type="email"
                  id="sessionEmail"
                  name="sessionEmail"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={formData.sessionEmail}
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
                <label className="form-label" htmlFor="sessionCountry">
                  Country
                </label>
                <select
                  id="sessionCountry"
                  name="sessionCountry"
                  className="form-input"
                  value={formData.sessionCountry}
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
              <motion.button
                type="submit"
                className="confirm-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join Now"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FreeSessionOverlay;