/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
// import { addToMailchimp } from "../../hooks/useMailchimp";
// import emailjs from "@emailjs/browser";
import "./styles/InviteSpeakOverlay.scss";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleInviteSpeakSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await addToMailchimp({
//         FNAME: formData.inviteName,
//         EMAIL: formData.inviteEmail,
//         MMERGE3: formData.inviteOrganization,
//         MMERGE4: "Invite to Speak",
//         MMERGE5: formData.inviteDetails,
//       });

//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_USER_INVITE_SPEAK_CONFIRMATION_TEMPLATE_ID",
//         {
//           user_name: formData.inviteName,
//           user_email: formData.inviteEmail,
//           organization: formData.inviteOrganization,
//           details: formData.inviteDetails,
//         }
//       );

//       await emailjs.send("YOUR_SERVICE_ID", "YOUR_OWNER_INVITE_TEMPLATE_ID", {
//         user_name: formData.inviteName,
//         user_email: formData.inviteEmail,
//         organization: formData.inviteOrganization,
//         details: formData.inviteDetails,
//       });

//       alert(
//         "Thank you for your invitation request! We will get back to you soon."
//       );
//       setFormData({
//         inviteName: "",
//         inviteEmail: "",
//         inviteOrganization: "",
//         inviteDetails: "",
//       });
//       closeOverlays();
//     } catch (error) {
//       console.error("Error in invite to speak submission:", error);
//       alert(
//         "An error occurred while submitting your request. Please try again later."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <div
      className={`overlay ${isOpen ? "active" : ""}`}
      id="inviteSpeakOverlay"
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
        <h2 className="overlay-title">Invite Dr. OVO to Speak</h2>
        <form
          className="newsletter-form"
          id="inviteSpeakForm"
        //   onSubmit={handleInviteSpeakSubmit}
        >
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <button type="submit" className="confirm-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteSpeakOverlay;
