
// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // import { useState, useRef } from "react";
// // import { motion } from "framer-motion";
// // import presaleImage from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
// // // import "./styles/PresaleSection.scss";

// // interface PresaleSectionProps {
// //   openOverlay: (type: string) => void;
// // }

// // const PresaleSection: React.FC<PresaleSectionProps> = ({ openOverlay }) => {
// //   const [formData, setFormData] = useState({ name: "", email: "" });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [responseMessage, setResponseMessage] = useState<string>("");
// //   const [error, setError] = useState<string | null>(null);
// //   const sectionRef = useRef<HTMLDivElement>(null);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (!formData.name || !formData.email) {
// //       setError("Please fill in all required fields.");
// //       setResponseMessage("");
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     setError(null);
// //     setResponseMessage("");

// //     try {
// //       const payload = {
// //         firstname: formData.name,
// //         email: formData.email,
// //       };

// //       const response = await fetch(
// //         `${import.meta.env.VITE_API_BASE_URL}/subscribe-newsletter`,

       
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       const result = await response.json();
// //       if (!response.ok) {
// //         throw new Error(result.message || "Failed to subscribe to the newsletter.");
// //       }

// //       setResponseMessage(result.message || "Thank you for subscribing to our newsletter!");
// //       setFormData({ name: "", email: "" }); // Reset form
// //       const form = document.getElementById("newsletterForm") as HTMLFormElement;
// //       if (form) form.reset();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "An error occurred during submission.");
// //       setResponseMessage(err instanceof Error ? err.message : "An error occurred during submission.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Animation variants for text elements
// //   const textVariants = {
// //     hidden: { opacity: 0, y: 30 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// //   };

// //   // Animation variants for buttons
// //   const buttonVariants = {
// //     hover: { scale: 1.1, transition: { duration: 0.3 } },
// //     tap: { scale: 0.95 },
// //   };

// //   // Animation variants for image
// //   const imageVariants = {
// //     hidden: { opacity: 0, scale: 0.8 },
// //     visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
// //   };

// //   // Animation variants for input fields
// //   const inputVariants = {
// //     hidden: { opacity: 0, x: -50 },
// //     visible: (i: number) => ({
// //       opacity: 1,
// //       x: 0,
// //       transition: { duration: 0.5, delay: i * 0.2 },
// //     }),
// //   };

// //   // Animation variants for list items
// //   const listItemVariants = {
// //     hidden: { opacity: 0, x: -20 },
// //     visible: (i: number) => ({
// //       opacity: 1,
// //       x: 0,
// //       transition: { duration: 0.5, delay: i * 0.3 },
// //     }),
// //   };

// //   return (
// //     <div className="body" id="events">
// //       <div className="containerss" >
// //         {/* Presale Section */}
// //         <motion.div
// //           className="presale-section"
          
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: false, amount: 0.2 }}
// //           transition={{ staggerChildren: 0.2 }}
// //         >
// //           <motion.div className="presale-badge" variants={textVariants}>
// //             🔥 Limited Time Offer
// //           </motion.div>
// //           <motion.h2 className="presale-title" variants={textVariants}>
// //             90-Day Presale
// //           </motion.h2>
// //           <motion.p className="presale-subtitle" variants={textVariants}>
// //             Get exclusive early access with{" "}
// //             <span className="spans">free delivery nationwide</span> (Nigeria)
// //           </motion.p>
// //           <motion.div className="price-container" variants={imageVariants}>
// //             <motion.img
// //               src={presaleImage}
// //               alt="Presale Book"
// //               className="main-image"
// //               variants={imageVariants}
// //             />
// //           </motion.div>
// //           <motion.p className="presale-subtitle" variants={textVariants}>
// //             30% Discount
// //           </motion.p>
// //           <motion.button
// //             className="cta-button"
// //             variants={buttonVariants}
// //             whileHover="hover"
// //             whileTap="tap"
// //             onClick={() => openOverlay("presale")}
// //           >
// //             Order Presale Now
// //           </motion.button>
// //         </motion.div>

// //         {/* Newsletter Section */}
// //         <motion.div
// //           className="newsletter-section"
// //           id="join-community"
// //           ref={sectionRef}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: false, amount: 0.2 }}
// //           transition={{ staggerChildren: 0.2 }}
// //         >
// //           <motion.h2 className="newsletter-titless" variants={textVariants}>
// //             Join Community
// //           </motion.h2>
// //           <motion.ul
// //             className="benefits-list"
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: false, amount: 0.2 }}
// //           >
// //             {[
// //               {
// //                 icon: "fab fa-whatsapp",
// //                 link: "https://whatsapp.com/channel/0029VbB0G3AEKyZDnb8juE46",
// //                 text: "Join Our WhatsApp Channel",
// //               },
// //               {
// //                 icon: "fab fa-telegram-plane",
// //                 link: "https://t.me/myfamilycompanion",
// //                 text: "Join Our Telegram Group",
// //               },
// //             ].map((item, index) => (
// //               <motion.li key={index} custom={index} variants={listItemVariants}>
// //                 <motion.p
// //                   className={`payment-btn${index === 0 ? "s" : "ss"}`}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <i className={item.icon}></i>
// //                   <a href={item.link} className="a">
// //                     {item.text}
// //                   </a>
// //                 </motion.p>
// //               </motion.li>
// //             ))}
// //           </motion.ul>
// //           <motion.h2 className="newsletter-titless" variants={textVariants}>
// //             Join the #1 Family Newsletter
// //           </motion.h2>
// //           <motion.p className="newsletter-subtitle" variants={textVariants}>
// //             Every week, we share honest stories, doctor-backed insights, and
// //             practical guides to help you build a healthy, happy home—now or
// //             later
// //           </motion.p>
// //           <motion.form
// //             className="newsletter-form"
// //             id="newsletterForm"
// //             onSubmit={handleNewsletterSubmit}
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: false, amount: 0.2 }}
// //             transition={{ staggerChildren: 0.2 }}
// //           >
// //             <motion.div
// //               className="form-group"
// //               custom={0}
// //               variants={inputVariants}
// //             >
// //               <label
// //                 style={{ color: "white" }}
// //                 className="form-label"
// //                 htmlFor="name"
// //               >
// //                 First name
// //               </label>
// //               <input
// //                 type="text"
// //                 id="name"
// //                 name="name"
// //                 className="form-input"
// //                 placeholder="Enter your First name"
// //                 value={formData.name}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </motion.div>
// //             <motion.div
// //               className="form-group"
// //               custom={1}
// //               variants={inputVariants}
// //             >
// //               <label
// //                 style={{ color: "white" }}
// //                 className="form-label"
// //                 htmlFor="email"
// //               >
// //                 Email Address
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 name="email"
// //                 className="form-input"
// //                 placeholder="Enter your email address"
// //                 value={formData.email}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </motion.div>
// //             <motion.button
// //               type="submit"
// //               className="newsletter-button"
// //               variants={buttonVariants}
// //               whileHover="hover"
// //               whileTap="tap"
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? "Subscribing..." : "Subscribe Now"}
// //             </motion.button>
// //           </motion.form>
// //           {responseMessage && (
// //             <motion.p
// //               className={`response-message ${error ? "error" : ""}`}
// //               variants={textVariants}
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               {responseMessage}
// //             </motion.p>
// //           )}
// //           <motion.p className="privacy-note" variants={textVariants}>
// //             🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
// //           </motion.p>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PresaleSection;
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import presaleImage from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
// // import "./styles/PresaleSection.scss";

// interface PresaleSectionProps {
//   openOverlay: (type: string) => void;
// }

// const PresaleSection: React.FC<PresaleSectionProps> = ({ openOverlay }) => {
//   const [formData, setFormData] = useState({ name: "", email: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [responseMessage, setResponseMessage] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [showEventsOverlay, setShowEventsOverlay] = useState(false);
//   const [activeEventTab, setActiveEventTab] = useState<'ongoing' | 'coming' | 'past'>('ongoing');
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) {
//       setError("Please fill in all required fields.");
//       setResponseMessage("");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     setResponseMessage("");

//     try {
//       const payload = {
//         firstname: formData.name,
//         email: formData.email,
//       };

//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/subscribe-newsletter`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || "Failed to subscribe to the newsletter.");
//       }

//       setResponseMessage(result.message || "Thank you for subscribing to our newsletter!");
//       setFormData({ name: "", email: "" }); // Reset form
//       const form = document.getElementById("newsletterForm") as HTMLFormElement;
//       if (form) form.reset();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred during submission.");
//       setResponseMessage(err instanceof Error ? err.message : "An error occurred during submission.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openEventsOverlay = () => {
//     setShowEventsOverlay(true);
//   };

//   const closeEventsOverlay = () => {
//     setShowEventsOverlay(false);
//   };

//   // Sample events data - you can replace this with your actual data
//   // const eventsData = {
//   //   ongoing: [
//   //     // {
//   //     //   id: 1,
//   //     //   title: "Family Wellness Workshop",
//   //     //   date: "September 10-15, 2025",
//   //     //   description: "A comprehensive workshop on building healthy family habits and communication skills.",
//   //     //   location: "Online & Lagos Center"
//   //     // },
//   //     // {
//   //     //   id: 2,
//   //     //   title: "Parent Support Circle",
//   //     //   date: "Every Tuesday, 7 PM",
//   //     //   description: "Weekly support group for parents to share experiences and get guidance.",
//   //     //   location: "Community Hall, Abuja"
//   //     // }
//   //   ],
//   //   coming: [
//   //     // {
//   //     //   id: 3,
//   //     //   title: "Children's Mental Health Summit",
//   //     //   date: "October 20-22, 2025",
//   //     //   description: "Expert-led sessions on understanding and supporting children's emotional well-being.",
//   //     //   location: "International Conference Center, Lagos"
//   //     // },
//   //     // {
//   //     //   id: 4,
//   //     //   title: "Healthy Family Cooking Class",
//   //     //   date: "November 5, 2025",
//   //     //   description: "Learn to prepare nutritious meals that the whole family will love.",
//   //     //   location: "Culinary Institute, Port Harcourt"
//   //     // }
//   //   ],
//   //   past: [
//   //     {
//   //       id: 5,
//   //       title: "Pregnancy",
//   //       date: "August 15-17, 2025",
//   //       description: "A three-day intensive on strengthening marital bonds and communication.",
//   //       location: "Grand Hotel, Abuja"
//   //     },
//   //     {
//   //       id: 6,
//   //       title: "Teen Parenting Workshop",
//   //       date: "July 28, 2025",
//   //       description: "Strategies for navigating the challenges of parenting teenagers.",
//   //       location: "Youth Center, Kaduna"
//   //     }
//   //   ]
//   // };
//   const eventsData = {
//     ongoing: [
//       // {
//       //   id: 1,
//       //   title: "Family Wellness Workshop",
//       //   date: "September 10-15, 2025",
//       //   description: "A comprehensive workshop on building healthy family habits and communication skills.",
//       //   location: "Online & Lagos Center"
//       // },
//       // {
//       //   id: 2,
//       //   title: "Parent Support Circle",
//       //   date: "Every Tuesday, 7 PM",
//       //   description: "Weekly support group for parents to share experiences and get guidance.",
//       //   location: "Community Hall, Abuja"
//       // }
//     ],
//     coming: [
//       // {
//       //   id: 3,
//       //   title: "Children's Mental Health Summit",
//       //   date: "October 20-22, 2025",
//       //   description: "Expert-led sessions on understanding and supporting children's emotional well-being.",
//       //   location: "International Conference Center, Lagos"
//       // },
//       // {
//       //   id: 4,
//       //   title: "Healthy Family Cooking Class",
//       //   date: "November 5, 2025",
//       //   description: "Learn to prepare nutritious meals that the whole family will love.",
//       //   location: "Culinary Institute, Port Harcourt"
//       // }
//     ],
//     past: [
//       {
//         id: 1,
//         title:
//           "EPI 2: Your Body Before Pregnancy: Fertility, Safe Periods & Early Signs Explained",
//         date: "N/A", // Placeholder since no date is provided
//         description:
//           "Comprehensive guide to understanding your body before pregnancy, covering fertility basics and early pregnancy signs.",
//         location: "YouTube",
//         videoId: "SEC4PxHkFX0",
//       },
//       {
//         id: 2,
//         title: "20 Dangers Before Pregnancy",
//         date: "N/A",
//         description:
//           "Essential health risks to address before conception to ensure a healthy pregnancy journey.",
//         location: "YouTube",
//         videoId: "yAyMttnE08s",
//       },
//       {
//         id: 3,
//         title: "Rhesus Factor Questions Answered",
//         date: "N/A",
//         description:
//           "Everything you need to know about Rhesus factor and its impact on pregnancy and fertility.",
//         location: "YouTube",
//         videoId: "hpg-iC_h8JE",
//       },
//       {
//         id: 4,
//         title: "This is Why Some Women Have Repeated Unexplained Miscarriages",
//         date: "N/A",
//         description:
//           "Exploring the underlying factors that contribute to recurrent pregnancy loss.",
//         location: "YouTube",
//         videoId: "fIGA25qpTiQ",
//       },
//       {
//         id: 5,
//         title: "Jennifer Tells Her Story",
//         date: "N/A",
//         description:
//           "A powerful personal story highlighting the importance of blood compatibility in marriage.",
//         location: "YouTube",
//         videoId: "SyHJJIfjGeA",
//       },
//       {
//         id: 6,
//         title:
//           "7 Critical Steps Every Woman Must Take After a Miscarriage or Abortion",
//         date: "N/A",
//         description:
//           "Essential steps for physical and emotional recovery after pregnancy loss.",
//         location: "YouTube",
//         videoId: "02PYMv89uBw",
//       },
//       {
//         id: 7,
//         title: "EPI 5: Body Changes During Pregnancy — A to Z",
//         date: "N/A",
//         description:
//           "Comprehensive overview of all the changes your body goes through during pregnancy.",
//         location: "YouTube",
//         videoId: "dMlFTY58eDA",
//       },
//     ],
//   };

//   // Animation variants
//   const textVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.1, transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
//   };

//   const inputVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, delay: i * 0.2 },
//     }),
//   };

//   const listItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, delay: i * 0.3 },
//     }),
//   };

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, transition: { duration: 0.3 } }
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } }
//   };

//   return (
//     <div className="body" id="events">
//       <div className="containerss">
//         {/* Presale Section */}
//         <motion.div
//           className="presale-section"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ staggerChildren: 0.2 }}
//         >
//           <motion.button
//             className="cta-button"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={openEventsOverlay}
//           >
//             View Events
//           </motion.button>
//           <motion.h2 className="presale-title" variants={textVariants}>
//             90-Day Presale
//           </motion.h2>
//           <motion.p className="presale-subtitle" variants={textVariants}>
//             Get exclusive early access with{" "}
//             <span className="spans">free delivery nationwide</span> (Nigeria)
//           </motion.p>
//           <motion.div className="price-container" variants={imageVariants}>
//             <motion.img
//               src={presaleImage}
//               alt="Presale Book"
//               className="main-image"
//               variants={imageVariants}
//             />
//           </motion.div>
//           <motion.p className="presale-subtitle" variants={textVariants}>
//             30% Discount
//           </motion.p>
//           <motion.button
//             className="cta-button"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() => openOverlay("presale")}
//           >
//             Order Presale Now
//           </motion.button>
//         </motion.div>
//         {/* Newsletter Section */}
//         <motion.div
//           className="newsletter-section"
//           id="join-community"
//           ref={sectionRef}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ staggerChildren: 0.2 }}
//         >
//           <motion.h2 className="newsletter-titless" variants={textVariants}>
//             Join Community
//           </motion.h2>
//           <motion.ul
//             className="benefits-list"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.2 }}
//           >
//             {[
//               {
//                 icon: "fab fa-whatsapp",
//                 link: "https://chat.whatsapp.com/FKNQzKn9ND5JHSgBd3fyOu?mode=ac_t",
//                 text: "Join Our WhatsApp Group",
//               },
//               {
//                 icon: "fab fa-whatsapp",
//                 link: "https://whatsapp.com/channel/0029VbB0G3AEKyZDnb8juE46",
//                 text: "Join Our WhatsApp Channel",
//               },
//             ].map((item, index) => (
//               <motion.li key={index} custom={index} variants={listItemVariants}>
//                 <motion.p
//                   className={`payment-btn${index === 0 ? "s" : "ss"}`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <i className={item.icon}></i>
//                   <a href={item.link} className="a">
//                     {item.text}
//                   </a>
//                 </motion.p>
//               </motion.li>
//             ))}
//           </motion.ul>
//           <motion.h2 className="newsletter-titless" variants={textVariants}>
//             Join the #1 Family Newsletter
//           </motion.h2>
//           <motion.p className="newsletter-subtitle" variants={textVariants}>
//             Every week, we share honest stories, doctor-backed insights, and
//             practical guides to help you build a healthy, happy home—now or
//             later
//           </motion.p>
//           <motion.form
//             className="newsletter-form"
//             id="newsletterForm"
//             onSubmit={handleNewsletterSubmit}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.2 }}
//             transition={{ staggerChildren: 0.2 }}
//           >
//             <motion.div
//               className="form-group"
//               custom={0}
//               variants={inputVariants}
//             >
//               <label
//                 style={{ color: "white" }}
//                 className="form-label"
//                 htmlFor="name"
//               >
//                 First name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="form-input"
//                 placeholder="Enter your First name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </motion.div>
//             <motion.div
//               className="form-group"
//               custom={1}
//               variants={inputVariants}
//             >
//               <label
//                 style={{ color: "white" }}
//                 className="form-label"
//                 htmlFor="email"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="form-input"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </motion.div>
//             <motion.button
//               type="submit"
//               className="newsletter-button"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Subscribing..." : "Subscribe Now"}
//             </motion.button>
//           </motion.form>
//           {responseMessage && (
//             <motion.p
//               className={`response-message ${error ? "error" : ""}`}
//               variants={textVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {responseMessage}
//             </motion.p>
//           )}
//           <motion.p className="privacy-note" variants={textVariants}>
//             🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
//           </motion.p>
//         </motion.div>
//       </div>

//       {/* Events Overlay */}
//       {showEventsOverlay && (
//         <motion.div
//           className="events-overlay"
//           variants={overlayVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           onClick={closeEventsOverlay}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.8)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             padding: "20px",
//           }}
//         >
//           <motion.div
//             className="events-modal"
//             variants={modalVariants}
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               backgroundColor: "white",
//               borderRadius: "15px",
//               padding: "30px",
//               maxWidth: "800px",
//               width: "100%",
//               maxHeight: "80vh",
//               overflowY: "auto",
//               position: "relative",
//             }}
//           >
//             <button
//               onClick={closeEventsOverlay}
//               style={{
//                 position: "absolute",
//                 top: "15px",
//                 right: "20px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "24px",
//                 cursor: "pointer",
//                 color: "#666",
//               }}
//             >
//               ×
//             </button>

//             <h2
//               style={{
//                 marginBottom: "30px",
//                 textAlign: "center",
//                 color: "#333",
//               }}
//             >
//               Family Events & Workshops
//             </h2>

//             {/* Event Tabs */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: "30px",
//                 gap: "10px",
//               }}
//             >
//               {(["ongoing", "coming", "past"] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveEventTab(tab)}
//                   style={{
//                     padding: "10px 20px",
//                     border: "2px solid #007bff",
//                     borderRadius: "25px",
//                     background:
//                       activeEventTab === tab ? "#007bff" : "transparent",
//                     color: activeEventTab === tab ? "white" : "#007bff",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     fontWeight: "600",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {tab} Events
//                 </button>
//               ))}
//             </div>

//             {/* Events List */}
//             <div>
//               {eventsData[activeEventTab].map((event) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   style={{
//                     border: "1px solid #e0e0e0",
//                     borderRadius: "10px",
//                     padding: "20px",
//                     marginBottom: "20px",
//                     backgroundColor: "#f9f9f9",
//                   }}
//                 >
//                   <h3 style={{ color: "#333", marginBottom: "10px" }}>
//                     {event.title}
//                   </h3>
//                   {event.subtitle && (
//                     <h4 style={{ color: "#555", marginBottom: "10px" }}>
//                       {event.subtitle}
//                     </h4>
//                   )}
//                   <p
//                     style={{
//                       color: "#007bff",
//                       fontWeight: "600",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     📅 {event.date}
//                   </p>
//                   <p
//                     style={{
//                       color: "#666",
//                       marginBottom: "10px",
//                       lineHeight: "1.5",
//                     }}
//                   >
//                     {event.description}
//                   </p>
//                   <p style={{ color: "#999", fontSize: "14px" }}>
//                     📍 {event.location}
//                   </p>
//                   {event.videoId && (
//                     <div style={{ marginTop: "10px" }}>
//                       <a
//                         href={`https://www.youtube.com/watch?v=${event.videoId}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ color: "#ff0000", textDecoration: "none" }}
//                       >
//                         Watch on YouTube <i className="fab fa-youtube" />
//                       </a>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}

//               {eventsData[activeEventTab].length === 0 && (
//                 <p
//                   style={{
//                     textAlign: "center",
//                     color: "#999",
//                     padding: "40px",
//                   }}
//                 >
//                   No {activeEventTab} events at the moment. Check back soon!
//                 </p>
//               )}
//             </div>
//             {/* <div>
//               {eventsData[activeEventTab].map((event) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   style={{
//                     border: "1px solid #e0e0e0",
//                     borderRadius: "10px",
//                     padding: "20px",
//                     marginBottom: "20px",
//                     backgroundColor: "#f9f9f9",
//                   }}
//                 >
//                   <h3 style={{ color: "#333", marginBottom: "10px" }}>
//                     {event.title}
//                   </h3>
//                   <p
//                     style={{
//                       color: "#007bff",
//                       fontWeight: "600",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     📅 {event.date}
//                   </p>
//                   <p
//                     style={{
//                       color: "#666",
//                       marginBottom: "10px",
//                       lineHeight: "1.5",
//                     }}
//                   >
//                     {event.description}
//                   </p>
//                   <p style={{ color: "#999", fontSize: "14px" }}>
//                     📍 {event.location}
//                   </p>
//                 </motion.div>
//               ))}

//               {eventsData[activeEventTab].length === 0 && (
//                 <p
//                   style={{
//                     textAlign: "center",
//                     color: "#999",
//                     padding: "40px",
//                   }}
//                 >
//                   No {activeEventTab} events at the moment. Check back soon!
//                 </p>
//               )}
//             </div> */}
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default PresaleSection;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import presaleImage from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";

interface PresaleSectionProps {
  openOverlay: (type: string) => void;
}

const PresaleSection: React.FC<PresaleSectionProps> = ({ openOverlay }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showEventsOverlay, setShowEventsOverlay] = useState(false);
  const [activeEventTab, setActiveEventTab] = useState<'ongoing' | 'coming' | 'past'>('ongoing');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Please fill in all required fields.");
      setResponseMessage("");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResponseMessage("");

    try {
      const payload = {
        firstname: formData.name,
        email: formData.email,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subscribe-newsletter`,
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
        throw new Error(result.message || "Failed to subscribe to the newsletter.");
      }

      setResponseMessage(result.message || "Thank you for subscribing to our newsletter!");
      setFormData({ name: "", email: "" }); // Reset form
      const form = document.getElementById("newsletterForm") as HTMLFormElement;
      if (form) form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during submission.");
      setResponseMessage(err instanceof Error ? err.message : "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEventsOverlay = () => {
    setShowEventsOverlay(true);
  };

  const closeEventsOverlay = () => {
    setShowEventsOverlay(false);
    setIsVideoModalOpen(false); // Close video modal if open
    setSelectedVideoId(null);
  };

  const openVideoModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideoId(null);
  };

  const eventsData = {
    ongoing: [],
    coming: [],
    past: [
      {
        id: 1,
        title: "EPI 2: Your Body Before Pregnancy: Fertility, Safe Periods & Early Signs Explained",
        subtitle: "Live Q&A Session",
        date: "N/A",
        description: "Comprehensive guide to understanding your body before pregnancy, covering fertility basics and early pregnancy signs.",
        location: "YouTube",
        videoId: "SEC4PxHkFX0",
      },
      {
        id: 2,
        title: "20 Dangers Before Pregnancy",
        subtitle: "Correct Them Now",
        date: "N/A",
        description: "Essential health risks to address before conception to ensure a healthy pregnancy journey.",
        location: "YouTube",
        videoId: "yAyMttnE08s",
      },
      {
        id: 3,
        title: "Rhesus Factor Questions Answered",
        subtitle: "Compatibility, Miscarriage & Sensitization",
        date: "N/A",
        description: "Everything you need to know about Rhesus factor and its impact on pregnancy and fertility.",
        location: "YouTube",
        videoId: "hpg-iC_h8JE",
      },
      {
        id: 4,
        title: "This is Why Some Women Have Repeated Unexplained Miscarriages",
        subtitle: "Understanding the Hidden Causes",
        date: "N/A",
        description: "Exploring the underlying factors that contribute to recurrent pregnancy loss.",
        location: "YouTube",
        videoId: "fIGA25qpTiQ",
      },
      {
        id: 5,
        title: "Jennifer Tells Her Story",
        subtitle: "11 Years of Marriage, 22 Miscarriages, No Child Due to Rhesus Blood",
        date: "N/A",
        description: "A powerful personal story highlighting the importance of blood compatibility in marriage.",
        location: "YouTube",
        videoId: "SyHJJIfjGeA",
      },
      {
        id: 6,
        title: "7 Critical Steps Every Woman Must Take After a Miscarriage or Abortion",
        subtitle: "Recovery and Future Planning",
        date: "N/A",
        description: "Essential steps for physical and emotional recovery after pregnancy loss.",
        location: "YouTube",
        videoId: "02PYMv89uBw",
      },
      {
        id: 7,
        title: "EPI 5: Body Changes During Pregnancy — A to Z",
        subtitle: "Complete Guide to Pregnancy Changes",
        date: "N/A",
        description: "Comprehensive overview of all the changes your body goes through during pregnancy.",
        location: "YouTube",
        videoId: "dMlFTY58eDA",
      },
    ],
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.3 },
    }),
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="body" id="events">
      <div className="containerss">
        {/* Presale Section */}
        <motion.div
          className="presale-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.button
            className="cta-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={openEventsOverlay}
          >
            View Events
          </motion.button>
          <motion.h2 className="presale-title" variants={textVariants}>
            90-Day Presale
          </motion.h2>
          <motion.p className="presale-subtitle" variants={textVariants}>
            Get exclusive early access with{" "}
            <span className="spans">free delivery nationwide</span> (Nigeria)
          </motion.p>
          <motion.div className="price-container" variants={imageVariants}>
            <motion.img
              src={presaleImage}
              alt="Presale Book"
              className="main-image"
              variants={imageVariants}
            />
          </motion.div>
          <motion.p className="presale-subtitle" variants={textVariants}>
            30% Discount
          </motion.p>
          <motion.button
            className="cta-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => openOverlay("presale")}
          >
            Order Presale Now
          </motion.button>
        </motion.div>
        {/* Newsletter Section */}
        <motion.div
          className="newsletter-section"
          id="join-community"
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 className="newsletter-titless" variants={textVariants}>
            Join Community
          </motion.h2>
          <motion.ul
            className="benefits-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              {
                icon: "fab fa-whatsapp",
                link: "https://chat.whatsapp.com/FKNQzKn9ND5JHSgBd3fyOu?mode=ac_t",
                text: "Join Our WhatsApp Group",
              },
              {
                icon: "fab fa-whatsapp",
                link: "https://whatsapp.com/channel/0029VbB0G3AEKyZDnb8juE46",
                text: "Join Our WhatsApp Channel",
              },
            ].map((item, index) => (
              <motion.li key={index} custom={index} variants={listItemVariants}>
                <motion.p
                  className={`payment-btn${index === 0 ? "s" : "ss"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={item.icon}></i>
                  <a href={item.link} className="a">
                    {item.text}
                  </a>
                </motion.p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.h2 className="newsletter-titless" variants={textVariants}>
            Join the #1 Family Newsletter
          </motion.h2>
          <motion.p className="newsletter-subtitle" variants={textVariants}>
            Every week, we share honest stories, doctor-backed insights, and
            practical guides to help you build a healthy, happy home—now or
            later
          </motion.p>
          <motion.form
            className="newsletter-form"
            id="newsletterForm"
            onSubmit={handleNewsletterSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="form-group"
              custom={0}
              variants={inputVariants}
            >
              <label
                style={{ color: "white" }}
                className="form-label"
                htmlFor="name"
              >
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
            </motion.div>
            <motion.div
              className="form-group"
              custom={1}
              variants={inputVariants}
            >
              <label
                style={{ color: "white" }}
                className="form-label"
                htmlFor="email"
              >
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
            <motion.button
              type="submit"
              className="newsletter-button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </motion.button>
          </motion.form>
          {responseMessage && (
            <motion.p
              className={`response-message ${error ? "error" : ""}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {responseMessage}
            </motion.p>
          )}
          <motion.p className="privacy-note" variants={textVariants}>
            🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
          </motion.p>
        </motion.div>
      </div>

      {/* Events Overlay */}
      {showEventsOverlay && (
        <motion.div
          className="events-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeEventsOverlay}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <motion.div
            className="events-modal"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "30px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={closeEventsOverlay}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>

            <h2
              style={{
                marginBottom: "30px",
                textAlign: "center",
                color: "#333",
              }}
            >
              Family Events & Workshops
            </h2>

            {/* Event Tabs */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
                gap: "10px",
              }}
            >
              {(["ongoing", "coming", "past"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveEventTab(tab)}
                  style={{
                    padding: "10px 20px",
                    border: "2px solid #007bff",
                    borderRadius: "25px",
                    background: activeEventTab === tab ? "#007bff" : "transparent",
                    color: activeEventTab === tab ? "white" : "#007bff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {tab} Events
                </button>
              ))}
            </div>

            {/* Events List */}
            <div>
              {eventsData[activeEventTab].map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h3 style={{ color: "#333", marginBottom: "10px" }}>
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <h4 style={{ color: "#555", marginBottom: "10px" }}>
                      {event.subtitle}
                    </h4>
                  )}
                  <p
                    style={{
                      color: "#007bff",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    📅 {event.date}
                  </p>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "10px",
                      lineHeight: "1.5",
                    }}
                  >
                    {event.description}
                  </p>
                  <p style={{ color: "#999", fontSize: "14px" }}>
                    📍 {event.location}
                  </p>
                  {event.videoId && (
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => openVideoModal(event.videoId)}
                        style={{
                          color: "#ff0000",
                          textDecoration: "none",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Watch on YouTube <i className="fab fa-youtube" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}

              {eventsData[activeEventTab].length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "40px",
                  }}
                >
                  No {activeEventTab} events at the moment. Check back soon!
                </p>
              )}
            </div>

            {/* Video Modal */}
            {isVideoModalOpen && selectedVideoId && (
              <motion.div
                className="video-modal-overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeVideoModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1100, // Higher than events overlay
                  padding: "20px",
                }}
              >
                <motion.div
                  className="video-modal"
                  variants={modalVariants}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    maxWidth: "90%",
                    width: "800px",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={closeVideoModal}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "none",
                      border: "none",
                      fontSize: "24px",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  >
                    ×
                  </button>
                  <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PresaleSection;