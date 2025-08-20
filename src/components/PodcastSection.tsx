// // // /* eslint-disable @typescript-eslint/no-unused-vars */
// // // import { useEffect, useRef } from "react";
// // // import { motion } from "framer-motion";
// // // import { gsap } from "gsap";
// // // // import "./styles/PodcastSection.scss";

// // // interface Podcast {
// // //   title: string;
// // //   subtitle: string;
// // //   icon: string;
// // // }

// // // const podcasts: Podcast[] = [
// // //   {
// // //     title: "Jennifer Story-If Only I Had Known",
// // //     subtitle: "Blood Compatability For Marriage",
// // //     icon: "fab fa-youtube",
// // //   },
// // //   {
// // //     title: "Gina's Story- I Thought It Was Just My Period",
// // //     subtitle: "The Tricky Things About Conception",
// // //     icon: "fab fa-youtube",
// // //   },
// // // ];

// // // const PodcastSection: React.FC = () => {
// // //     const cardsRef = useRef<HTMLDivElement>(null);

// // //     useEffect(() => {
// // //       const cards = cardsRef.current?.querySelectorAll(".card");
// // //       if (cards) {
// // //         cards.forEach((card) => {
// // //           gsap
// // //             .to(card, {
// // //               scale: 1.05,
// // //               duration: 0.3,
// // //               paused: true,
// // //               ease: "power1.out",
// // //               onStart: () => card.classList.add("hovered"),
// // //               onReverseComplete: () => card.classList.remove("hovered"),
// // //             })
// // //             .pause();

// // //           card.addEventListener("mouseenter", () =>
// // //             gsap.to(card, { scale: 1.05, duration: 0.3 })
// // //           );
// // //           card.addEventListener("mouseleave", () =>
// // //             gsap.to(card, { scale: 1, duration: 0.3 })
// // //           );
// // //         });

// // //         return () => {
// // //           cards.forEach((card) => {
// // //             card.removeEventListener("mouseenter", () => {});
// // //             card.removeEventListener("mouseleave", () => {});
// // //           });
// // //         };
// // //       }
// // //     }, []);

// // //     const cardVariants = {
// // //       hidden: { opacity: 0, y: 50 },
// // //       visible: (i: number) => ({
// // //         opacity: 1,
// // //         y: 0,
// // //         transition: { duration: 0.5, delay: i * 0.2 },
// // //       }),
// // //     };
// // //   return (
// // //     <div className="bodys" id="Podcast">
// // //       <div className="section">
// // //         <div className="section-title">
// // //           <span>Dr OVO Podcast</span>
// // //           <motion.button
// // //             className="view-more"
// // //             whileHover={{ scale: 1.1 }}
// // //             whileTap={{ scale: 0.95 }}
// // //           >
// // //             View more <span>&rarr;</span>
// // //           </motion.button>
// // //         </div>
// // //         <div className="cards-container" ref={cardsRef}>
// // //           {podcasts.map((podcast, index) => (
// // //             <motion.div
// // //               className="card"
// // //               key={index}
// // //               custom={index}
// // //               variants={cardVariants}
// // //               initial="hidden"
// // //               animate="visible"
// // //             >
// // //               <div className="card-icon green">
// // //                 <i className={podcast.icon}></i>
// // //               </div>
// // //               <div className="card-content">
// // //                 <div className="card-title">{podcast.title}</div>
// // //                 <div className="card-subtitle">{podcast.subtitle}</div>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PodcastSection;
// // import { useEffect, useRef, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, Play, Calendar, Clock, CheckCircle } from "lucide-react";

// // interface Podcast {
// //   id: string;
// //   title: string;
// //   subtitle: string;
// //   icon: string;
// //   date: string;
// //   status: 'ongoing' | 'upcoming' | 'past';
// //   duration?: string;
// //   description?: string;
// // }

// // const podcastsData: Podcast[] = [
// //   {
// //     id: "1",
// //     title: "Jennifer Story-If Only I Had Known",
// //     subtitle: "Blood Compatability For Marriage",
// //     icon: "fab fa-youtube",
// //     date: "2025-08-20",
// //     status: "ongoing",
// //     duration: "45 min",
// //     description: "Live discussion about blood compatibility and its importance in marriage planning."
// //   },
// //   {
// //     id: "2",
// //     title: "Gina's Story- I Thought It Was Just My Period",
// //     subtitle: "The Tricky Things About Conception",
// //     icon: "fab fa-youtube",
// //     date: "2025-08-25",
// //     status: "upcoming",
// //     duration: "30 min",
// //     description: "Understanding the complexities of conception and reproductive health."
// //   },
// //   {
// //     id: "3",
// //     title: "Understanding Fertility Myths",
// //     subtitle: "Separating Fact from Fiction",
// //     icon: "fab fa-youtube",
// //     date: "2025-08-15",
// //     status: "past",
// //     duration: "52 min",
// //     description: "Debunking common misconceptions about fertility and reproductive health."
// //   },
// //   {
// //     id: "4",
// //     title: "Hormonal Health Workshop",
// //     subtitle: "Balancing Your Body Naturally",
// //     icon: "fab fa-youtube",
// //     date: "2025-08-30",
// //     status: "upcoming",
// //     duration: "60 min",
// //     description: "Learn natural approaches to hormonal balance and wellness."
// //   },
// //   {
// //     id: "5",
// //     title: "Pregnancy Planning Essentials",
// //     subtitle: "Your Complete Guide",
// //     icon: "fab fa-youtube",
// //     date: "2025-08-10",
// //     status: "past",
// //     duration: "38 min",
// //     description: "Essential information for planning a healthy pregnancy journey."
// //   }
// // ];

// // const PodcastSection: React.FC = () => {
// //   const [isOverlayOpen, setIsOverlayOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'past'>('ongoing');
// //   const cardsRef = useRef<HTMLDivElement>(null);

// //   const filteredPodcasts = podcastsData.filter(podcast => podcast.status === activeTab);
// //   const displayPodcasts = podcastsData.slice(0, 2); // Show only first 2 on main page

// //   const getStatusIcon = (status: string) => {
// //     switch (status) {
// //       case 'ongoing':
// //         return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />;
// //       case 'upcoming':
// //         return <Clock className="w-4 h-4 text-blue-500" />;
// //       case 'past':
// //         return <CheckCircle className="w-4 h-4 text-green-500" />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const getStatusBadge = (status: string) => {
// //     const baseClasses = "px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide";
// //     switch (status) {
// //       case 'ongoing':
// //         return `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
// //       case 'upcoming':
// //         return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`;
// //       case 'past':
// //         return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
// //       default:
// //         return baseClasses;
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };

// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 50 },
// //     visible: (i: number) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5, delay: i * 0.2 },
// //     }),
// //   };

// //   const overlayVariants = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1 },
// //     exit: { opacity: 0 }
// //   };

// //   const modalVariants = {
// //     hidden: { opacity: 0, scale: 0.8, y: 50 },
// //     visible: { 
// //       opacity: 1, 
// //       scale: 1, 
// //       y: 0,
// //       transition: { type: "spring", damping: 25, stiffness: 300 }
// //     },
// //     exit: { 
// //       opacity: 0, 
// //       scale: 0.8, 
// //       y: 50,
// //       transition: { duration: 0.2 }
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16" id="Podcast">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="flex items-center justify-between"
// //             >
// //               <div>
// //                 <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
// //                   Dr OVO Podcast
// //                 </h2>
// //                 <p className="text-gray-600 text-lg">Expert insights on reproductive health and wellness</p>
// //               </div>
              
// //               <motion.button
// //                 className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
// //                 whileHover={{ scale: 1.05, y: -2 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setIsOverlayOpen(true)}
// //               >
// //                 View All Events
// //                 <motion.span
// //                   className="group-hover:translate-x-1 transition-transform duration-200"
// //                 >
// //                   →
// //                 </motion.span>
// //               </motion.button>
// //             </motion.div>
// //           </div>

// //           <div className="grid md:grid-cols-2 gap-6" ref={cardsRef}>
// //             {displayPodcasts.map((podcast, index) => (
// //               <motion.div
// //                 className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
// //                 key={podcast.id}
// //                 custom={index}
// //                 variants={cardVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 whileHover={{ y: -5 }}
// //               >
// //                 <div className="flex items-start gap-4">
// //                   <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
// //                     <Play className="w-6 h-6" />
// //                   </div>
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2 mb-2">
// //                       {getStatusIcon(podcast.status)}
// //                       <span className={getStatusBadge(podcast.status)}>
// //                         {podcast.status}
// //                       </span>
// //                     </div>
// //                     <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
// //                       {podcast.title}
// //                     </h3>
// //                     <p className="text-gray-600 mb-2">{podcast.subtitle}</p>
// //                     <div className="flex items-center gap-4 text-sm text-gray-500">
// //                       <span className="flex items-center gap-1">
// //                         <Calendar className="w-4 h-4" />
// //                         {formatDate(podcast.date)}
// //                       </span>
// //                       {podcast.duration && (
// //                         <span className="flex items-center gap-1">
// //                           <Clock className="w-4 h-4" />
// //                           {podcast.duration}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Overlay */}
// //       <AnimatePresence>
// //         {isOverlayOpen && (
// //           <motion.div
// //             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //             variants={overlayVariants}
// //             initial="hidden"
// //             animate="visible"
// //             exit="exit"
// //             onClick={() => setIsOverlayOpen(false)}
// //           >
// //             <motion.div
// //               className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
// //               variants={modalVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               {/* Header */}
// //               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
// //                 <div className="flex items-center justify-between">
// //                   <h2 className="text-2xl font-bold text-gray-900">Podcast Events</h2>
// //                   <button
// //                     onClick={() => setIsOverlayOpen(false)}
// //                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //                   >
// //                     <X className="w-6 h-6 text-gray-500" />
// //                   </button>
// //                 </div>
                
// //                 {/* Tabs */}
// //                 <div className="flex gap-2 mt-4">
// //                   {(['ongoing', 'upcoming', 'past'] as const).map((tab) => (
// //                     <button
// //                       key={tab}
// //                       onClick={() => setActiveTab(tab)}
// //                       className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
// //                         activeTab === tab
// //                           ? 'bg-purple-600 text-white shadow-md'
// //                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// //                       }`}
// //                     >
// //                       {tab} Events
// //                       <span className="ml-2 text-xs opacity-75">
// //                         ({podcastsData.filter(p => p.status === tab).length})
// //                       </span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Content */}
// //               <div className="p-6 overflow-y-auto max-h-[60vh]">
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={activeTab}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -20 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     {filteredPodcasts.length > 0 ? (
// //                       <div className="space-y-4">
// //                         {filteredPodcasts.map((podcast) => (
// //                           <motion.div
// //                             key={podcast.id}
// //                             className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
// //                             whileHover={{ scale: 1.02 }}
// //                             whileTap={{ scale: 0.98 }}
// //                           >
// //                             <div className="flex items-start gap-4">
// //                               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
// //                                 <Play className="w-5 h-5" />
// //                               </div>
// //                               <div className="flex-1">
// //                                 <div className="flex items-center gap-2 mb-1">
// //                                   {getStatusIcon(podcast.status)}
// //                                   <span className={getStatusBadge(podcast.status)}>
// //                                     {podcast.status}
// //                                   </span>
// //                                 </div>
// //                                 <h3 className="font-semibold text-gray-900 mb-1">
// //                                   {podcast.title}
// //                                 </h3>
// //                                 <p className="text-gray-600 mb-2">{podcast.subtitle}</p>
// //                                 {podcast.description && (
// //                                   <p className="text-sm text-gray-500 mb-3">{podcast.description}</p>
// //                                 )}
// //                                 <div className="flex items-center gap-4 text-sm text-gray-500">
// //                                   <span className="flex items-center gap-1">
// //                                     <Calendar className="w-4 h-4" />
// //                                     {formatDate(podcast.date)}
// //                                   </span>
// //                                   {podcast.duration && (
// //                                     <span className="flex items-center gap-1">
// //                                       <Clock className="w-4 h-4" />
// //                                       {podcast.duration}
// //                                     </span>
// //                                   )}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     ) : (
// //                       <div className="text-center py-12">
// //                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                           <Calendar className="w-8 h-8 text-gray-400" />
// //                         </div>
// //                         <h3 className="text-lg font-medium text-gray-900 mb-2">
// //                           No {activeTab} events
// //                         </h3>
// //                         <p className="text-gray-500">
// //                           There are currently no {activeTab} podcast events to display.
// //                         </p>
// //                       </div>
// //                     )}
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default PodcastSection;
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { gsap } from "gsap";
// import { X, Play, Calendar, Clock, CheckCircle } from "lucide-react";
// // import "./styles/PodcastSection.scss";

// interface Podcast {
//   title: string;
//   subtitle: string;
//   icon: string;
// }

// interface EventPodcast extends Podcast {
//   id: string;
//   date: string;
//   status: 'ongoing' | 'upcoming' | 'past';
//   duration?: string;
//   description?: string;
// }

// const podcasts: Podcast[] = [
//   {
//     title: "Jennifer Story-If Only I Had Known",
//     subtitle: "Blood Compatability For Marriage",
//     icon: "fab fa-youtube",
//   },
//   {
//     title: "Gina's Story- I Thought It Was Just My Period",
//     subtitle: "The Tricky Things About Conception",
//     icon: "fab fa-youtube",
//   },
// ];

// const eventPodcasts: EventPodcast[] = [
//   {
//     id: "1",
//     title: "Jennifer Story-If Only I Had Known",
//     subtitle: "Blood Compatability For Marriage",
//     icon: "fab fa-youtube",
//     date: "2025-08-20",
//     status: "ongoing",
//     duration: "45 min",
//     description: "Live discussion about blood compatibility and its importance in marriage planning."
//   },
//   {
//     id: "2",
//     title: "Gina's Story- I Thought It Was Just My Period",
//     subtitle: "The Tricky Things About Conception",
//     icon: "fab fa-youtube",
//     date: "2025-08-25",
//     status: "upcoming",
//     duration: "30 min",
//     description: "Understanding the complexities of conception and reproductive health."
//   },
//   {
//     id: "3",
//     title: "Understanding Fertility Myths",
//     subtitle: "Separating Fact from Fiction",
//     icon: "fab fa-youtube",
//     date: "2025-08-15",
//     status: "past",
//     duration: "52 min",
//     description: "Debunking common misconceptions about fertility and reproductive health."
//   },
//   {
//     id: "4",
//     title: "Hormonal Health Workshop",
//     subtitle: "Balancing Your Body Naturally",
//     icon: "fab fa-youtube",
//     date: "2025-08-30",
//     status: "upcoming",
//     duration: "60 min",
//     description: "Learn natural approaches to hormonal balance and wellness."
//   },
//   {
//     id: "5",
//     title: "Pregnancy Planning Essentials",
//     subtitle: "Your Complete Guide",
//     icon: "fab fa-youtube",
//     date: "2025-08-10",
//     status: "past",
//     duration: "38 min",
//     description: "Essential information for planning a healthy pregnancy journey."
//   }
// ];

// const PodcastSection: React.FC = () => {
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'past'>('ongoing');
//   const cardsRef = useRef<HTMLDivElement>(null);

//   const filteredPodcasts = eventPodcasts.filter(podcast => podcast.status === activeTab);

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'ongoing':
//         return <div style={{
//           width: '12px',
//           height: '12px',
//           backgroundColor: '#ef4444',
//           borderRadius: '50%',
//           animation: 'pulse 2s infinite'
//         }} />;
//       case 'upcoming':
//         return <Clock style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
//       case 'past':
//         return <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const baseStyle = {
//       padding: '4px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '500',
//       textTransform: 'uppercase' as const,
//       letterSpacing: '0.05em',
//       border: '1px solid'
//     };

//     switch (status) {
//       case 'ongoing':
//         return { 
//           ...baseStyle, 
//           backgroundColor: '#fef2f2', 
//           color: '#b91c1c',
//           borderColor: '#fecaca'
//         };
//       case 'upcoming':
//         return { 
//           ...baseStyle, 
//           backgroundColor: '#eff6ff', 
//           color: '#1d4ed8',
//           borderColor: '#dbeafe'
//         };
//       case 'past':
//         return { 
//           ...baseStyle, 
//           backgroundColor: '#f9fafb', 
//           color: '#374151',
//           borderColor: '#e5e7eb'
//         };
//       default:
//         return baseStyle;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   useEffect(() => {
//     const cards = cardsRef.current?.querySelectorAll(".card");
//     if (cards) {
//       cards.forEach((card) => {
//         gsap
//           .to(card, {
//             scale: 1.05,
//             duration: 0.3,
//             paused: true,
//             ease: "power1.out",
//             onStart: () => card.classList.add("hovered"),
//             onReverseComplete: () => card.classList.remove("hovered"),
//           })
//           .pause();

//         card.addEventListener("mouseenter", () =>
//           gsap.to(card, { scale: 1.05, duration: 0.3 })
//         );
//         card.addEventListener("mouseleave", () =>
//           gsap.to(card, { scale: 1, duration: 0.3 })
//         );
//       });

//       return () => {
//         cards.forEach((card) => {
//           card.removeEventListener("mouseenter", () => {});
//           card.removeEventListener("mouseleave", () => {});
//         });
//       };
//     }
//   }, []);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: i * 0.2 },
//     }),
//   };

//   const overlayStyles = {
//     overlay: {
//       position: 'fixed' as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.6)',
//       backdropFilter: 'blur(4px)',
//       zIndex: 1000,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '20px'
//     },
//     modal: {
//       backgroundColor: 'white',
//       borderRadius: '20px',
//       maxWidth: '900px',
//       width: '100%',
//       maxHeight: '90vh',
//       overflow: 'hidden',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//     },
//     header: {
//       padding: '24px',
//       borderBottom: '1px solid #e5e7eb',
//       background: 'linear-gradient(to right, #f3f4f6, #f8fafc)'
//     },
//     headerTop: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: '16px'
//     },
//     title: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       color: '#1f2937',
//       margin: 0
//     },
//     closeButton: {
//       padding: '8px',
//       backgroundColor: 'transparent',
//       border: 'none',
//       borderRadius: '50%',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s'
//     },
//     tabsContainer: {
//       display: 'flex',
//       gap: '8px'
//     },
//     tab: {
//       padding: '8px 16px',
//       borderRadius: '20px',
//       border: 'none',
//       fontWeight: '500',
//       textTransform: 'capitalize' as const,
//       cursor: 'pointer',
//       transition: 'all 0.2s',
//       fontSize: '14px'
//     },
//     activeTab: {
//       backgroundColor: '#7c3aed',
//       color: 'white',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//     },
//     inactiveTab: {
//       backgroundColor: '#f3f4f6',
//       color: '#6b7280'
//     },
//     content: {
//       padding: '24px',
//       overflowY: 'auto' as const,
//       maxHeight: '60vh'
//     },
//     eventCard: {
//       backgroundColor: '#f9fafb',
//       borderRadius: '12px',
//       padding: '16px',
//       marginBottom: '16px',
//       border: '1px solid #e5e7eb',
//       cursor: 'pointer',
//       transition: 'all 0.2s'
//     },
//     eventCardHover: {
//       backgroundColor: '#f3f4f6',
//       transform: 'translateY(-1px)'
//     },
//     eventContent: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '16px'
//     },
//     eventIcon: {
//       width: '48px',
//       height: '48px',
//       background: 'linear-gradient(to right, #a855f7, #3b82f6)',
//       borderRadius: '8px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       flexShrink: 0
//     },
//     eventDetails: {
//       flex: 1
//     },
//     statusContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginBottom: '8px'
//     },
//     eventTitle: {
//       fontWeight: '600',
//       color: '#1f2937',
//       marginBottom: '4px',
//       fontSize: '16px'
//     },
//     eventSubtitle: {
//       color: '#6b7280',
//       marginBottom: '8px'
//     },
//     eventDescription: {
//       fontSize: '14px',
//       color: '#6b7280',
//       marginBottom: '12px',
//       lineHeight: '1.4'
//     },
//     eventMeta: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       fontSize: '14px',
//       color: '#6b7280'
//     },
//     metaItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px'
//     },
//     emptyState: {
//       textAlign: 'center' as const,
//       padding: '48px 0'
//     },
//     emptyIcon: {
//       width: '64px',
//       height: '64px',
//       backgroundColor: '#f3f4f6',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 16px'
//     },
//     emptyTitle: {
//       fontSize: '18px',
//       fontWeight: '500',
//       color: '#1f2937',
//       marginBottom: '8px'
//     },
//     emptyDescription: {
//       color: '#6b7280'
//     }
//   };

//   return (
//     <>
//       <div className="bodys" id="Podcast">
//         <div className="section">
//           <div className="section-title">
//             <span>Dr OVO Podcast</span>
//             <motion.button
//               className="view-more"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsOverlayOpen(true)}
//             >
//               View more <span>&rarr;</span>
//             </motion.button>
//           </div>
//           <div className="cards-container" ref={cardsRef}>
//             {podcasts.map((podcast, index) => (
//               <motion.div
//                 className="card"
//                 key={index}
//                 custom={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <div className="card-icon green">
//                   <i className={podcast.icon}></i>
//                 </div>
//                 <div className="card-content">
//                   <div className="card-title">{podcast.title}</div>
//                   <div className="card-subtitle">{podcast.subtitle}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay */}
//       <AnimatePresence>
//         {isOverlayOpen && (
//           <motion.div
//             style={overlayStyles.overlay}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOverlayOpen(false)}
//           >
//             <motion.div
//               style={overlayStyles.modal}
//               initial={{ opacity: 0, scale: 0.8, y: 50 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.8, y: 50 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               onClick={e => e.stopPropagation()}
//             >
//               {/* Header */}
//               <div style={overlayStyles.header}>
//                 <div style={overlayStyles.headerTop}>
//                   <h2 style={overlayStyles.title}>Podcast Events</h2>
//                   <button
//                     style={overlayStyles.closeButton}
//                     onClick={() => setIsOverlayOpen(false)}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//                   >
//                     <X style={{ width: '24px', height: '24px', color: '#6b7280' }} />
//                   </button>
//                 </div>
                
//                 {/* Tabs */}
//                 <div style={overlayStyles.tabsContainer}>
//                   {(['ongoing', 'upcoming', 'past'] as const).map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       style={{
//                         ...overlayStyles.tab,
//                         ...(activeTab === tab ? overlayStyles.activeTab : overlayStyles.inactiveTab)
//                       }}
//                       onMouseEnter={(e) => {
//                         if (activeTab !== tab) {
//                           e.currentTarget.style.backgroundColor = '#e5e7eb';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (activeTab !== tab) {
//                           e.currentTarget.style.backgroundColor = '#f3f4f6';
//                         }
//                       }}
//                     >
//                       {tab} Events
//                       <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.75 }}>
//                         ({eventPodcasts.filter(p => p.status === tab).length})
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Content */}
//               <div style={overlayStyles.content}>
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeTab}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {filteredPodcasts.length > 0 ? (
//                       <div>
//                         {filteredPodcasts.map((podcast) => (
//                           <motion.div
//                             key={podcast.id}
//                             style={overlayStyles.eventCard}
//                             whileHover={{ y: -2 }}
//                             whileTap={{ scale: 0.98 }}
//                             onMouseEnter={(e) => {
//                               Object.assign(e.currentTarget.style, overlayStyles.eventCardHover);
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = '#f9fafb';
//                               e.currentTarget.style.transform = 'translateY(0)';
//                             }}
//                           >
//                             <div style={overlayStyles.eventContent}>
//                               <div style={overlayStyles.eventIcon}>
//                                 <Play style={{ width: '20px', height: '20px' }} />
//                               </div>
//                               <div style={overlayStyles.eventDetails}>
//                                 <div style={overlayStyles.statusContainer}>
//                                   {getStatusIcon(podcast.status)}
//                                   <span style={getStatusBadge(podcast.status)}>
//                                     {podcast.status}
//                                   </span>
//                                 </div>
//                                 <h3 style={overlayStyles.eventTitle}>
//                                   {podcast.title}
//                                 </h3>
//                                 <p style={overlayStyles.eventSubtitle}>{podcast.subtitle}</p>
//                                 {podcast.description && (
//                                   <p style={overlayStyles.eventDescription}>{podcast.description}</p>
//                                 )}
//                                 <div style={overlayStyles.eventMeta}>
//                                   <span style={overlayStyles.metaItem}>
//                                     <Calendar style={{ width: '16px', height: '16px' }} />
//                                     {formatDate(podcast.date)}
//                                   </span>
//                                   {podcast.duration && (
//                                     <span style={overlayStyles.metaItem}>
//                                       <Clock style={{ width: '16px', height: '16px' }} />
//                                       {podcast.duration}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div style={overlayStyles.emptyState}>
//                         <div style={overlayStyles.emptyIcon}>
//                           <Calendar style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
//                         </div>
//                         <h3 style={overlayStyles.emptyTitle}>
//                           No {activeTab} events
//                         </h3>
//                         <p style={overlayStyles.emptyDescription}>
//                           There are currently no {activeTab} podcast events to display.
//                         </p>
//                       </div>
//                     )}
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </motion.div>

//             <style jsx>{`
//               @keyframes pulse {
//                 0%, 100% {
//                   opacity: 1;
//                 }
//                 50% {
//                   opacity: 0.5;
//                 }
//               }
//             `}</style>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default PodcastSection;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { X, Play, Calendar, Clock, CheckCircle } from "lucide-react";
// import "./styles/PodcastSection.scss";

interface Podcast {
  title: string;
  subtitle: string;
  icon: string;
}

interface EventPodcast extends Podcast {
  id: string;
  date: string;
  status: 'ongoing' | 'upcoming' | 'past';
  duration?: string;
  description?: string;
}

const podcasts: Podcast[] = [
  {
    title: "Jennifer Story-If Only I Had Known",
    subtitle: "Blood Compatability For Marriage",
    icon: "fab fa-youtube",
  },
  {
    title: "Gina's Story- I Thought It Was Just My Period",
    subtitle: "The Tricky Things About Conception",
    icon: "fab fa-youtube",
  },
];

const eventPodcasts: EventPodcast[] = [
  {
    id: "1",
    title: "Jennifer Story-If Only I Had Known",
    subtitle: "Blood Compatability For Marriage",
    icon: "fab fa-youtube",
    date: "2025-08-20",
    status: "ongoing",
    duration: "45 min",
    description: "Live discussion about blood compatibility and its importance in marriage planning."
  },
  {
    id: "2",
    title: "Gina's Story- I Thought It Was Just My Period",
    subtitle: "The Tricky Things About Conception",
    icon: "fab fa-youtube",
    date: "2025-08-25",
    status: "upcoming",
    duration: "30 min",
    description: "Understanding the complexities of conception and reproductive health."
  },
  {
    id: "3",
    title: "Understanding Fertility Myths",
    subtitle: "Separating Fact from Fiction",
    icon: "fab fa-youtube",
    date: "2025-08-15",
    status: "past",
    duration: "52 min",
    description: "Debunking common misconceptions about fertility and reproductive health."
  },
  {
    id: "4",
    title: "Hormonal Health Workshop",
    subtitle: "Balancing Your Body Naturally",
    icon: "fab fa-youtube",
    date: "2025-08-30",
    status: "upcoming",
    duration: "60 min",
    description: "Learn natural approaches to hormonal balance and wellness."
  },
  {
    id: "5",
    title: "Pregnancy Planning Essentials",
    subtitle: "Your Complete Guide",
    icon: "fab fa-youtube",
    date: "2025-08-10",
    status: "past",
    duration: "38 min",
    description: "Essential information for planning a healthy pregnancy journey."
  }
];

const PodcastSection: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'past'>('ongoing');
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<EventPodcast | Podcast | null>(null);
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const filteredPodcasts = eventPodcasts.filter(podcast => podcast.status === activeTab);

  // Sample YouTube video IDs for demo purposes
  const getYouTubeVideoId = (title: string) => {
    // In a real app, you'd store these IDs with your podcast data
    const videoIds: { [key: string]: string } = {
      "Jennifer Story-If Only I Had Known": "dQw4w9WgXcQ", // Sample video ID
      "Gina's Story- I Thought It Was Just My Period": "jNQXAC9IVRw", // Sample video ID
      "Understanding Fertility Myths": "ScMzIvxBSi4", // Sample video ID
      "Hormonal Health Workshop": "y6120QOlsfU", // Sample video ID
      "Pregnancy Planning Essentials": "kJQP7kiw5Fk" // Sample video ID
    };
    return videoIds[title] || "dQw4w9WgXcQ"; // Default video ID
  };

  const handlePodcastClick = (podcast: EventPodcast | Podcast) => {
    setSelectedPodcast(podcast);
    setIsVideoPlayerOpen(true);
    setShowSubscribeButton(false);
    
    // Show subscribe button after 1 minute (60 seconds)
    setTimeout(() => {
      setShowSubscribeButton(true);
    }, 60000);
  };

  const handleSubscribe = () => {
    alert('Thanks for subscribing to Dr OVO Podcast!');
    // In a real app, you'd handle the subscription logic here
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
    setSelectedPodcast(null);
    setShowSubscribeButton(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <div style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }} />;
      case 'upcoming':
        return <Clock style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
      case 'past':
        return <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      border: '1px solid'
    };

    switch (status) {
      case 'ongoing':
        return { 
          ...baseStyle, 
          backgroundColor: '#fef2f2', 
          color: '#b91c1c',
          borderColor: '#fecaca'
        };
      case 'upcoming':
        return { 
          ...baseStyle, 
          backgroundColor: '#eff6ff', 
          color: '#1d4ed8',
          borderColor: '#dbeafe'
        };
      case 'past':
        return { 
          ...baseStyle, 
          backgroundColor: '#f9fafb', 
          color: '#374151',
          borderColor: '#e5e7eb'
        };
      default:
        return baseStyle;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".card");
    if (cards) {
      cards.forEach((card) => {
        gsap
          .to(card, {
            scale: 1.05,
            duration: 0.3,
            paused: true,
            ease: "power1.out",
            onStart: () => card.classList.add("hovered"),
            onReverseComplete: () => card.classList.remove("hovered"),
          })
          .pause();

        card.addEventListener("mouseenter", () =>
          gsap.to(card, { scale: 1.05, duration: 0.3 })
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { scale: 1, duration: 0.3 })
        );
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        });
      };
    }
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  const overlayStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '20px',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    header: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
      background: 'linear-gradient(to right, #f3f4f6, #f8fafc)'
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    closeButton: {
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    tabsContainer: {
      display: 'flex',
      gap: '8px'
    },
    tab: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      fontWeight: '500',
      textTransform: 'capitalize' as const,
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px'
    },
    activeTab: {
      backgroundColor: '#4c63d2',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    inactiveTab: {
      backgroundColor: '#f3f4f6',
      color: '#6b7280'
    },
    content: {
      padding: '24px',
      overflowY: 'auto' as const,
      maxHeight: '60vh'
    },
    eventCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    eventCardHover: {
      backgroundColor: '#f3f4f6',
      transform: 'translateY(-1px)'
    },
    eventContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px'
    },
    eventIcon: {
      width: '48px',
      height: '48px',
      // background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      background: 'linear-gradient(to right, #4c63d2, #3b82f6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      flexShrink: 0
    },
    eventDetails: {
      flex: 1
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    },
    eventTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
      fontSize: '16px'
    },
    eventSubtitle: {
      color: '#6b7280',
      marginBottom: '8px'
    },
    eventDescription: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '12px',
      lineHeight: '1.4'
    },
    eventMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '48px 0'
    },
    emptyIcon: {
      width: '64px',
      height: '64px',
      backgroundColor: '#f3f4f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    emptyTitle: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#1f2937',
      marginBottom: '8px'
    },
    emptyDescription: {
      color: '#6b7280'
    },
    videoPlayerOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    videoPlayerContainer: {
      position: 'relative' as const,
      backgroundColor: 'black',
      borderRadius: '12px',
      overflow: 'hidden',
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '900px',
      height: '506px', // 16:9 aspect ratio
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    videoCloseButton: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'background-color 0.2s'
    },
    videoIframe: {
      width: '100%',
      height: '100%',
      border: 'none'
    },
    subscribeButton: {
      position: 'absolute' as const,
      bottom: '20px',
      right: '20px',
      backgroundColor: '#ff0000',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      zIndex: 10
    },
    videoTitle: {
      position: 'absolute' as const,
      bottom: '20px',
      left: '20px',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '12px 16px',
      borderRadius: '8px',
      maxWidth: '60%',
      fontSize: '14px',
      fontWeight: '600'
    }
  };

  return (
    <>
      <div className="bodys" id="Podcast">
        <div className="section">
          <div className="section-title">
            <span>Dr OVO Podcast</span>
            <motion.button
              className="view-more"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOverlayOpen(true)}
            >
              View more <span>&rarr;</span>
            </motion.button>
          </div>
          <div className="cards-container" ref={cardsRef}>
            {podcasts.map((podcast, index) => (
              <motion.div
                className="card"
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => handlePodcastClick(podcast)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-icon green">
                  <i className={podcast.icon}></i>
                </div>
                <div className="card-content">
                  <div className="card-title">{podcast.title}</div>
                  <div className="card-subtitle">{podcast.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            style={overlayStyles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOverlayOpen(false)}
          >
            <motion.div
              style={overlayStyles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={overlayStyles.header}>
                <div style={overlayStyles.headerTop}>
                  <h2 style={overlayStyles.title}>Podcast Events</h2>
                  <button
                    style={overlayStyles.closeButton}
                    onClick={() => setIsOverlayOpen(false)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <X style={{ width: '24px', height: '24px', color: '#6b7280' }} />
                  </button>
                </div>
                
                {/* Tabs */}
                <div style={overlayStyles.tabsContainer}>
                  {(['ongoing', 'upcoming', 'past'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        ...overlayStyles.tab,
                        ...(activeTab === tab ? overlayStyles.activeTab : overlayStyles.inactiveTab)
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab) {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab) {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }
                      }}
                    >
                      {tab} Events
                      <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.75 }}>
                        ({eventPodcasts.filter(p => p.status === tab).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={overlayStyles.content}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredPodcasts.length > 0 ? (
                      <div>
                        {filteredPodcasts.map((podcast) => (
                          <motion.div
                            key={podcast.id}
                            style={overlayStyles.eventCard}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePodcastClick(podcast)}
                            onMouseEnter={(e) => {
                              Object.assign(e.currentTarget.style, overlayStyles.eventCardHover);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <div style={overlayStyles.eventContent}>
                              <div style={overlayStyles.eventIcon}>
                                <Play style={{ width: '20px', height: '20px' }} />
                              </div>
                              <div style={overlayStyles.eventDetails}>
                                <div style={overlayStyles.statusContainer}>
                                  {getStatusIcon(podcast.status)}
                                  <span style={getStatusBadge(podcast.status)}>
                                    {podcast.status}
                                  </span>
                                </div>
                                <h3 style={overlayStyles.eventTitle}>
                                  {podcast.title}
                                </h3>
                                <p style={overlayStyles.eventSubtitle}>{podcast.subtitle}</p>
                                {podcast.description && (
                                  <p style={overlayStyles.eventDescription}>{podcast.description}</p>
                                )}
                                <div style={overlayStyles.eventMeta}>
                                  <span style={overlayStyles.metaItem}>
                                    <Calendar style={{ width: '16px', height: '16px' }} />
                                    {formatDate(podcast.date)}
                                  </span>
                                  {podcast.duration && (
                                    <span style={overlayStyles.metaItem}>
                                      <Clock style={{ width: '16px', height: '16px' }} />
                                      {podcast.duration}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div style={overlayStyles.emptyState}>
                        <div style={overlayStyles.emptyIcon}>
                          <Calendar style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
                        </div>
                        <h3 style={overlayStyles.emptyTitle}>
                          No {activeTab} events
                        </h3>
                        <p style={overlayStyles.emptyDescription}>
                          There are currently no {activeTab} podcast events to display.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <style>{`
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.5;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {isVideoPlayerOpen && selectedPodcast && (
          <motion.div
            style={overlayStyles.videoPlayerOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoPlayer}
          >
            <motion.div
              style={overlayStyles.videoPlayerContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                style={overlayStyles.videoCloseButton}
                onClick={closeVideoPlayer}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
              
              <iframe
                ref={videoRef}
                style={overlayStyles.videoIframe}
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedPodcast.title)}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedPodcast.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              <div style={overlayStyles.videoTitle}>
                {selectedPodcast.title}
              </div>
              
              <AnimatePresence>
                {showSubscribeButton && (
                  <motion.button
                    style={overlayStyles.subscribeButton}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: '#cc0000'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubscribe}
                  >
                    <Play style={{ width: '16px', height: '16px' }} />
                    Subscribe
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PodcastSection;