/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
// import { addToMailchimp } from "../../hooks/useMailchimp";
// import emailjs from "@emailjs/browser";
import "./styles/FreeSessionOverlay.scss";

interface FreeSessionOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  // Add more countries as needed
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleFreeSessionSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await addToMailchimp({
//         FNAME: formData.sessionName,
//         EMAIL: formData.sessionEmail,
//         MMERGE3: formData.sessionCountry,
//         MMERGE4: "Free Session Registration",
//       });

//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_USER_FREE_SESSION_CONFIRMATION_TEMPLATE_ID",
//         {
//           user_name: formData.sessionName,
//           user_email: formData.sessionEmail,
//           country: formData.sessionCountry,
//         }
//       );

//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_OWNER_FREE_SESSION_TEMPLATE_ID",
//         {
//           user_name: formData.sessionName,
//           user_email: formData.sessionEmail,
//           country: formData.sessionCountry,
//         }
//       );

//       alert("Thank you for registering for the free weekly sessions!");
//       setFormData({ sessionName: "", sessionEmail: "", sessionCountry: "" });
//       closeOverlays();
//     } catch (error) {
//       console.error("Error in free session submission:", error);
//       alert("An error occurred while registering. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <div
      className={`overlay ${isOpen ? "active" : ""}`}
      id="freeSessionOverlay"
    >
      <div className="overlay-content">
        <div className="overlay-header">
          <button className="back-btn" onClick={closeOverlays}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <span className="close-btn" onClick={closeOverlays}>
            ×
          </span>
        </div>
        <h2 className="overlay-title">Join Free Weekly Sessions</h2>
        <form
          className="newsletter-form"
          id="freeSessionForm"
        //   onSubmit={handleFreeSessionSubmit}
        >
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <button type="submit" className="confirm-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FreeSessionOverlay;
