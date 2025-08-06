
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import emailjs from "@emailjs/browser";
import "./Overlay.scss";

interface PresaleOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const PresaleOverlay: React.FC<PresaleOverlayProps> = ({ isOpen, closeOverlays }) => {
  const [step, setStep] = useState<"currency" | "form">("currency");
  const [presaleType, setPresaleType] = useState<"local" | "international" | "">("");
  const [copies, setCopies] = useState<number>(0);
  const [totalNGN, setTotalNGN] = useState<number>(0);
  const [, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const pricePerCopyNGN = 20000; // ₦20,000 per copy
//   const amazonLink = import.meta.env.VITE_AMAZON_LINK || "https://www.amazon.com/your-book-link";

  useEffect(() => {
    console.log(`PresaleOverlay isOpen: ${isOpen}, step: ${step}, presaleType: ${presaleType}`);
    if (isOpen) {
      console.log("PresaleOverlay opened, forcing step to currency");
      setStep("currency");
      setPresaleType("");
      resetForm();
    } else {
      console.log("PresaleOverlay closed, resetting state");
      setStep("currency");
      setPresaleType("");
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    console.log("Resetting presale form");
    setCopies(0);
    setTotalNGN(0);
    setFormData({ name: "", email: "", phone: "", location: "" });
    const form = document.getElementById("presaleForm") as HTMLFormElement;
    if (form) form.reset();
  };

  const calculateTotal = (copies: number) => {
    if (presaleType === "local") {
      setTotalNGN(copies * pricePerCopyNGN);
    }
  };

  const showPresaleForm = (type: "local" | "international") => {
    console.log(`Showing presale form for ${type}`);
    setPresaleType(type);
    setStep("form");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name}=${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "presaleQuantity") {
      const newCopies = parseInt(value) || 0;
      setCopies(newCopies);
      calculateTotal(newCopies);
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
    "Osogbo", "Owerri", "Port Harcourt", "Sokoto", "Umuahia", "Uyo", "Warri", "Yenagoa",
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

  console.log("Rendering PresaleOverlay, step:", step);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked overlay div");
          }}
        >
          <motion.div
            className="overlay-content"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "currency" ? (
              <>
                <span
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Clicked Close button");
                    closeOverlays();
                  }}
                >
                  ×
                </span>
                <h2 className="overlay-title">Presale Order</h2>
                <div className="form-group">
                  <label className="form-label">Select Currency</label>
                  <motion.button
                    className="payment-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked Local button");
                      showPresaleForm("local");
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Local (₦20,000/copy)
                  </motion.button>
                  <motion.button
                    className="payment-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked International button");
                      showPresaleForm("international");
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    International (Amazon)
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <div className="overlay-header">
                  <motion.button
                    className="back-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked Back button");
                      setStep("currency");
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </motion.button>
                  <span
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked Close button");
                      closeOverlays();
                    }}
                  >
                    ×
                  </span>
                </div>
                <h2 className="overlay-title">
                  {presaleType === "local" ? "Local Presale (₦)" : "International Presale (Amazon)"}
                </h2>
                <form id="presaleForm" className="newsletter-form">
                  {presaleType === "local" && (
                    <motion.div
                      className="form-group"
                      id="quantityGroup"
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
                        required
                        onChange={handleInputChange}
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
                      required
                      onChange={handleInputChange}
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
                      required
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  {presaleType === "local" ? (
                    <motion.div
                      className="form-group"
                      id="localLocationGroup"
                      custom={4}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="presaleLocationLocal">
                        Nearest City
                      </label>
                      <select
                        id="presaleLocationLocal"
                        name="location"
                        className="form-input"
                        required
                        onChange={handleInputChange}
                      >
                        <option key="default-city" value="" disabled selected>
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
                      id="internationalLocationGroup"
                      custom={3}
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="form-label" htmlFor="presaleLocationInternational">
                        Country
                      </label>
                      <select
                        id="presaleLocationInternational"
                        name="location"
                        className="form-input"
                        required
                        onChange={handleInputChange}
                      >
                        <option key="default-country" value="" disabled selected>
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
                    <div className="price-container" id="presalePriceContainer">
                      <div className="current-prices" id="presaleTotalPrice">
                        Summary: {copies} Copies, ₦{totalNGN.toLocaleString()}
                      </div>
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    className="confirm-btn"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked Submit button");
                    }}
                  >
                    {presaleType === "local" ? "Proceed to Paystack" : "Proceed to Amazon"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PresaleOverlay;