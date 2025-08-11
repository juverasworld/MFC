
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaystack } from "../../hooks/usePaystack";
import type { Config, LocalPayload, InternationalPayload } from "../../types";
import "./Overlay.scss";

interface PresaleOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const config: Config = {
  pricePerCopyNGN: 20000,
  pricePerCopyUSD: 15,
  sessionPriceNGN: 75000,
  sessionPriceUSD: 50,
  amazonLink: import.meta.env.VITE_AMAZON_LINK || "https://www.amazon.com/your-book-link",
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
};

const PresaleOverlay: React.FC<PresaleOverlayProps> = ({ isOpen, closeOverlays }) => {
  const [step, setStep] = useState<"currency" | "form" | "confirmation">("currency");
  const [presaleType, setPresaleType] = useState<"local" | "international" | "">("");
  const [formData, setFormData] = useState({
    copies: 0,
    totalNGN: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const { initiatePaystackPayment } = usePaystack(config);

  useEffect(() => {
    if (isOpen) {
      setStep("currency");
      setPresaleType("");
      resetForm();
    } else {
      setStep("currency");
      setPresaleType("");
      resetForm();
      setError(null);
      setConfirmationMessage("");
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      copies: 0,
      totalNGN: 0,
      name: "",
      email: "",
      phone: "",
      location: "",
    });
    const form = document.getElementById("presaleForm") as HTMLFormElement;
    if (form) form.reset();
  };

  const calculateTotal = (copies: number) => {
    if (presaleType === "local") {
      setFormData((prev) => ({ ...prev, totalNGN: copies * config.pricePerCopyNGN }));
    }
  };

  const showPresaleForm = (type: "local" | "international") => {
    setPresaleType(type);
    setStep("form");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "presaleQuantity") {
      const newCopies = parseInt(value) || 0;
      setFormData((prev) => ({ ...prev, copies: newCopies }));
      calculateTotal(newCopies);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (presaleType === "local" && formData.copies < 1) || !formData.location) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let payload: LocalPayload | InternationalPayload;

      if (presaleType === "local") {
        // Initiate Paystack payment
        const transaction = await initiatePaystackPayment(
          {
            copies: formData.copies,
            totalNGN: formData.totalNGN,
            totalUSD: formData.copies * config.pricePerCopyUSD,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: "",
            location: formData.location,
          },
          "NGN"
        );

        payload = {
          firstname: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.location,
          no_of_copies: formData.copies,
          reference: transaction.reference, // Type-safe access
        };
      } else {
        payload = {
          firstname: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.location,
        };
      }

      // Make API call
      const response = await fetch(
        presaleType === "local" ? "/api/orders/local" : "/api/orders/global",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit presale order.");
      }

      // Set confirmation message
      let message = result.message || "Successfully placed your presale order!";
      if (presaleType === "international") {
        message = result.message || "Thank you for your purchase, kindly complete your order @amazon.com";
      }
      setConfirmationMessage(message);
      setStep("confirmation");

      // Auto-close after 5 seconds
      setTimeout(() => {
        if (presaleType === "international") {
          window.open(config.amazonLink, "_blank");
        }
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
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
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

  const cities = [
    "Aba", "Abakaliki", "Abeokuta", "Abuja", "Ado-Ekiti", "Akure", "Asaba", "Awka", "Bauchi",
    "Benin City", "Birnin Kebbi", "Calabar", "Damaturu", "Dutse", "Enugu", "Gombe", "Gusau",
    "Ibadan", "Ikeja", "Ilorin", "Jalingo", "Jos", "Kaduna", "Kano", "Katsina", "Lafia",
    "Lagos", "Lekki", "Maiduguri", "Makurdi", "Minna", "Nnewi", "Ogbomosho", "Onitsha",
    "Osogbo", "Owerri", "Port Harcourt", "Sokoto", "Umuahia", "Uyo", "Warri", "Wuse", "Yenagoa",
    "Yola", "Zaria", "FCT",
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe",
  ];

  const renderAmazonLink = (message: string) => {
    const parts = message.split("@amazon.com");
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <a href={config.amazonLink} target="_blank" rel="noopener noreferrer" className="amazon-link">
            @amazon.com
          </a>
          {parts[1]}
        </>
      );
    }
    return message;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeOverlays}
          role="dialog"
          aria-labelledby="presale-overlay-title"
        >
          <motion.div
            className="overlay-content"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
          >
            {step === "currency" ? (
              <>
                <span className="close-btn" onClick={closeOverlays}>
                  ×
                </span>
                <h2 id="presale-overlay-title" className="overlay-title">
                  Presale Order
                </h2>
                <div className="form-group">
                  <label className="form-label">Select Currency</label>
                  <motion.button
                    className="payment-btn"
                    onClick={() => showPresaleForm("local")}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isSubmitting}
                  >
                    Local (₦20,000/copy)
                  </motion.button>
                  <motion.button
                    className="payment-btn"
                    onClick={() => showPresaleForm("international")}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isSubmitting}
                  >
                    International (Amazon)
                  </motion.button>
                </div>
              </>
            ) : step === "form" ? (
              <>
                <div className="overlay-header">
                  <motion.button
                    className="back-btn"
                    onClick={() => setStep("currency")}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </motion.button>
                  <span className="close-btn" onClick={closeOverlays}>
                    ×
                  </span>
                </div>
                <h2 id="presale-overlay-title" className="overlay-title">
                  {presaleType === "local"
                    ? "Local Presale (₦)"
                    : "International Presale (Amazon)"}
                </h2>
                {error && <div className="error-message">{error}</div>}
                <form
                  id="presaleForm"
                  className="newsletter-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {presaleType === "local" && (
                    <motion.div
                      className="form-group"
                      custom={0}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="presaleQuantity">
                        Number of Copies
                      </label>
                      <input
                        type="number"
                        id="presaleQuantity"
                        name="presaleQuantity"
                        className="form-input"
                        placeholder="Enter number of copies"
                        min="1"
                        value={formData.copies || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </motion.div>
                  )}
                  <motion.div
                    className="form-group"
                    custom={presaleType === "local" ? 1 : 0}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="form-label" htmlFor="presaleName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="presaleName"
                      name="name"
                      className="form-input"
                      placeholder="Enter your first name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    custom={presaleType === "local" ? 2 : 1}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="form-label" htmlFor="presaleEmail">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="presaleEmail"
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
                    custom={presaleType === "local" ? 3 : 2}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="form-label" htmlFor="presalePhone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="presalePhone"
                      name="phone"
                      className="form-input"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  {presaleType === "local" ? (
                    <motion.div
                      className="form-group"
                      custom={4}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        className="form-label"
                        htmlFor="presaleLocationLocal"
                      >
                        Nearest City
                      </label>
                      <select
                        id="presaleLocationLocal"
                        name="location"
                        className="form-input"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          Select city nearest to you
                        </option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="form-group"
                      custom={3}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        className="form-label"
                        htmlFor="presaleLocationInternational"
                      >
                        Country
                      </label>
                      <select
                        id="presaleLocationInternational"
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
                  )}
                  {presaleType === "local" && (
                    <div className="price-container">
                      <div className="current-prices">
                        Summary: {formData.copies} Copies, ₦
                        {formData.totalNGN.toLocaleString()}
                      </div>
                    </div>
                  )}
                  <div className="">
                    <motion.button
                      style={{ width: "100%" }}
                      type="submit"
                      className="confirm-btnsa w-full"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : presaleType === "local"
                        ? "Proceed to Paystack"
                        : "Proceed to Amazon"}
                    </motion.button>
                  </div>
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
                <h2 id="presale-overlay-title" className="overlay-title">
                  {error ? "Order Error" : "Thank You!"}
                </h2>
                <p className={`confirmation-message ${error ? "error" : ""}`}>
                  {renderAmazonLink(confirmationMessage)}
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

export default PresaleOverlay;