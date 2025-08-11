/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaystack } from "../../hooks/usePaystack";
import type { Donation, Config } from "../../types";
import "./DonationOverlay.scss";

interface DonationOverlayProps {
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

const DonationOverlay: React.FC<DonationOverlayProps> = ({ isOpen, closeOverlays }) => {
  const [step, setStep] = useState<"copySelection" | "detailsPayment" | "confirmation">("copySelection");
  const [donation, setDonation] = useState<Donation>({
    copies: 1,
    totalNGN: 1 * config.pricePerCopyNGN,
    totalUSD: 1 * config.pricePerCopyUSD,
    name: "",
    email: "",
    phone: "",
    organization: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const { initiatePaystackPayment } = usePaystack(config);

  const updateDonationSummary = (copies: number) => {
    const clampedCopies = Math.max(1, Math.min(10000000, copies));
    setDonation({
      ...donation,
      copies: clampedCopies,
      totalNGN: clampedCopies * config.pricePerCopyNGN,
      totalUSD: clampedCopies * config.pricePerCopyUSD,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "donationCopyCount") {
      updateDonationSummary(parseInt(value) || 1);
    } else {
      setDonation({ ...donation, [name]: value });
    }
  };

  const handleContinue = () => {
    if (donation.copies < 1) {
      alert("Please select at least 1 copies to donate.");
      return;
    }
    setStep("detailsPayment");
  };

  const handleBack = () => {
    setStep("copySelection");
  };

  const handlePayment = async (currency: "NGN" | "USD") => {
    if (!donation.name || !donation.email) {
      setError("Please fill in all required fields (Name and Email).");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Initiate Paystack payment
      const transaction = await initiatePaystackPayment(donation, currency);
      const reference = (transaction as any).reference;

      // Prepare API payload
      const payload = {
        no_of_copies: donation.copies,
        firstname: donation.name,
        email: donation.email,
        phone: donation.phone,
        country: donation.location,
        reference,
        org_name: donation.organization,
      };

      // Make API call to /orders/donate
      const response = await fetch("/api/orders/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit donation to the server.");
      }

      // Set confirmation message and switch to confirmation step
      setConfirmationMessage(result.message || "Successfully placed an Order to donate MFC Books");
      setStep("confirmation");

      // Auto-close after 5 seconds
      setTimeout(() => {
        closeOverlays();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during payment.");
      setConfirmationMessage(err instanceof Error ? err.message : "An error occurred during payment.");
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

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("copySelection");
      setDonation({
        copies: 1,
        totalNGN: 1 * config.pricePerCopyNGN,
        totalUSD: 1 * config.pricePerCopyUSD,
        name: "",
        email: "",
        phone: "",
        organization: "",
        location: "",
      });
      setError(null);
      setConfirmationMessage("");
    }
  }, [isOpen]);

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
          aria-labelledby="donation-overlay-title"
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
              {step === "detailsPayment" && (
                <motion.button
                  className="back-btn"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleBack}
                >
                  <i className="fas fa-arrow-left"></i>
                </motion.button>
              )}
              {step !== "confirmation" && (
                <span className="close-btn" onClick={closeOverlays}>
                  ×
                </span>
              )}
            </div>
            <AnimatePresence mode="wait">
              {step === "copySelection" ? (
                <motion.div
                  key="copySelection"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 id="donation-overlay-title" className="overlay-title">
                    Select Donation Copies
                  </h2>
                  <motion.div
                    className="copy-option"
                    custom={0}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="copy-option-title">A. 5-20 Copies</div>
                    <div className="copy-option-reward">
                      Receive Certificate of Appreciation
                    </div>
                  </motion.div>
                  <motion.div
                    className="copy-option"
                    custom={1}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="copy-option-title">B. 20-100 Copies</div>
                    <div className="copy-option-reward">
                      A + Website Appreciation Mention
                    </div>
                  </motion.div>
                  <motion.div
                    className="copy-option"
                    custom={2}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="copy-option-title">C. 100+ Copies</div>
                    <div className="copy-option-reward">
                      A + B + Your Brand/Name Printed on the Book Cover
                    </div>
                  </motion.div>
                  <motion.div
                    className="form-group"
                    custom={3}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="form-label" htmlFor="donationCopyCount">
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      id="donationCopyCount"
                      name="donationCopyCount"
                      className="form-input"
                      placeholder="Enter number of copies (5-10000)"
                      min="1"
                      max="100000000"
                      step="1"
                      value={donation.copies || 1}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="price-container"
                    custom={4}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="current-price">
                      ₦{donation.totalNGN.toLocaleString("en-NG")} / $
                      {donation.totalUSD.toLocaleString("en-US")}
                    </div>
                  </motion.div>
                  <motion.button
                    className="confirm-btn"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleContinue}
                    custom={5}
                    initial="hidden"
                    animate="visible"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              ) : step === "detailsPayment" ? (
                <motion.div
                  key="detailsPayment"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 id="donation-overlay-title" className="overlay-title">
                    Donation Details
                    <div className="topics-containers">
                      <ul className="topics-lists">
                        <li>
                          <b>One Book</b>
                        </li>
                        <li>
                          <b>One Gift</b>
                        </li>
                        <li>
                          <b>One Family Saved</b>
                        </li>
                      </ul>
                    </div>
                  </h2>
                  <p className="donate-p" style={{ marginBottom: "20px" }}>
                    Your gift is helping us prevent one maternal and child death every
                    30 seconds in communities across Africa
                  </p>
                  {error && <div className="error-message" style={{ color: "red", marginBottom: "20px" }}>{error}</div>}
                  <form
                    className="donation-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <motion.div
                      className="form-group"
                      custom={0}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="donationCopyCount">
                        Number of Copies
                      </label>
                      <input
                        type="number"
                        id="donationCopyCount"
                        name="donationCopyCount"
                        className="form-input"
                        placeholder="Enter number of copies (5-10000)"
                        min="1"
                        max="10000000"
                        step="1"
                        value={donation.copies || 1}
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
                      <label className="form-label" htmlFor="donationName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="donationName"
                        name="name"
                        className="form-input"
                        placeholder="Enter your first name"
                        maxLength={100}
                        value={donation.name}
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
                      <label className="form-label" htmlFor="donationEmail">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="donationEmail"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email address"
                        value={donation.email}
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
                      <label className="form-label" htmlFor="donationPhoneNumber">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="donationPhoneNumber"
                        name="phone"
                        className="form-input"
                        placeholder="Enter your phone number"
                        maxLength={20}
                        value={donation.phone}
                        onChange={handleInputChange}
                      />
                    </motion.div>
                    <motion.div
                      className="form-group"
                      custom={4}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="donationOrganization">
                        Organization Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="donationOrganization"
                        name="organization"
                        className="form-input"
                        placeholder="Enter organization name"
                        maxLength={200}
                        value={donation.organization}
                        onChange={handleInputChange}
                      />
                    </motion.div>
                    <motion.div
                      className="form-group"
                      custom={5}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="donationLocation">
                        Location (Optional)
                      </label>
                      <select
                        id="donationLocation"
                        name="location"
                        className="form-input"
                        value={donation.location}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        {[
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
                        ].map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                    <motion.div
                      className="price-container"
                      custom={6}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="current-prices">
                        Summary: {donation.copies} Copies, ₦
                        {donation.totalNGN.toLocaleString("en-NG")} / $
                        {donation.totalUSD.toLocaleString("en-US")}
                      </div>
                    </motion.div>
                    <motion.div
                      className="payment-optionsa flex flex-col"
                      custom={7}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        type="button"
                        className="payment-btna"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handlePayment("NGN")}
                        disabled={isSubmitting}
                      >
                        ₦{donation.totalNGN.toLocaleString("en-NG")}
                        <br />
                        Local Payment (NGN)
                      </motion.button>
                      <motion.button
                        type="button"
                        className="payment-btna"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handlePayment("USD")}
                        disabled={isSubmitting}
                      >
                        ${donation.totalUSD.toLocaleString("en-US")}
                        <br />
                        Int'l Payment (USD)
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 id="donation-overlay-title" className="overlay-title">
                    {error ? "Donation Error" : "Thank You!"}
                  </h2>
                  <p className="confirmation-message">
                    {confirmationMessage}
                  </p>
                  <motion.button
                    className="confirm-btn"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={closeOverlays}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationOverlay;