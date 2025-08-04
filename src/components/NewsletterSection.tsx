/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
// import { addToMailchimp } from "../hooks/useMailchimp";
// import "./styles/NewsletterSection.scss";
// import emailjs from "@emailjs/browser";

const NewsletterSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleNewsletterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await addToMailchimp({
//         FNAME: formData.name,
//         EMAIL: formData.email,
//       });

//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_USER_NEWSLETTER_CONFIRMATION_TEMPLATE_ID",
//         {
//           user_name: formData.name,
//           user_email: formData.email,
//         }
//       );

//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_OWNER_SUBSCRIBE_TEMPLATE_ID",
//         {
//           user_name: formData.name,
//           user_email: formData.email,
//         }
//       );

//       alert("Thank you for subscribing to My Family Companion newsletter!");
//       setFormData({ name: "", email: "" });
//     } catch (error) {
//       console.error("Error in newsletter submission:", error);
//       alert("An error occurred while subscribing. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <div className="body">
      <div className="containerss" id="join-community">
        
        <div className="newsletter-section">
          <h2 className="newsletter-titless">Join Community</h2>
          <ul className="benefits-list">
            <li>
              <p className="payment-btns">
                <i className="fab fa-whatsapp"></i>
                <a
                  href="https://whatsapp.com/channel/0029VbB0G3AEKyZDnb8juE46"
                  className="a"
                >
                  Join Our WhatsApp Channel
                </a>
              </p>
            </li>
            <li>
              <p className="payment-btnss">
                <i className="fab fa-telegram-plane"></i>
                <a href="https://t.me/myfamilycompanion" className="a">
                  Join Our Telegram Group
                </a>
              </p>
            </li>
          </ul>
          <h2 className="newsletter-titless">Join the #1 Family Newsletter</h2>
          <p className="newsletter-subtitle">
            Every week, we share honest stories, doctor-backed insights, and
            practical guides to help you build a healthy, happy home—now or
            later
          </p>
          <form
            className="newsletter-form"
            id="newsletterForm"
            // onSubmit={handleNewsletterSubmit}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                First name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your First name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
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
            </div>
            <button
              type="submit"
              className="newsletter-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
          <p className="privacy-note">
            🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
