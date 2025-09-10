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
//     title: "Antenatal Care Explained ",
//     subtitle: "Everything You Need to Know",
//     icon: "fab fa-youtube",
//   },
//   {
//     title: "One Abortion, 22 Miscarriages",
//     subtitle: "Rh Negative Pregnancy Warning For Women (A-, B-, AB-, O-)",
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
//   const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
//   const [selectedPodcast, setSelectedPodcast] = useState<EventPodcast | Podcast | null>(null);
//   const [showSubscribeButton, setShowSubscribeButton] = useState(false);
//   const cardsRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLIFrameElement>(null);

//   const filteredPodcasts = eventPodcasts.filter(podcast => podcast.status === activeTab);

//   // Sample YouTube video IDs for demo purposes
//   const getYouTubeVideoId = (title: string) => {
//     // In a real app, you'd store these IDs with your podcast data
//     const videoIds: { [key: string]: string } = {
//       "Antenatal Care Explained": "fX3wMnTJ0ho", // Sample video ID
//       "One Abortion, 22 Miscarriages": "5JTTPma-3q8", // Sample video ID
//       "Understanding Fertility Myths": "ScMzIvxBSi4", // Sample video ID
//       "Hormonal Health Workshop": "y6120QOlsfU", // Sample video ID
//       "Pregnancy Planning Essentials": "kJQP7kiw5Fk", // Sample video ID
//     };
//     // return videoIds[title] || "5JTTPma-3q8"; // Default video ID
//   };

//   const handlePodcastClick = (podcast: EventPodcast | Podcast) => {
//     setSelectedPodcast(podcast);
//     setIsVideoPlayerOpen(true);
//     setShowSubscribeButton(false);
    
//     // Show subscribe button after 1 minute (60 seconds)
//     setTimeout(() => {
//       setShowSubscribeButton(true);
//     }, 60000);
//   };

//   const handleSubscribe = () => {
//     alert('Thanks for subscribing to Dr OVO Podcast!');
//     // In a real app, you'd handle the subscription logic here
//   };

//   const closeVideoPlayer = () => {
//     setIsVideoPlayerOpen(false);
//     setSelectedPodcast(null);
//     setShowSubscribeButton(false);
//   };

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
//       backgroundColor: '#4c63d2',
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
//       // background: 'linear-gradient(to right, #a855f7, #3b82f6)',
//       background: 'linear-gradient(to right, #4c63d2, #3b82f6)',
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
//     },
//     videoPlayerOverlay: {
//       position: 'fixed' as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.9)',
//       zIndex: 1100,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '20px'
//     },
//     videoPlayerContainer: {
//       position: 'relative' as const,
//       backgroundColor: 'black',
//       borderRadius: '12px',
//       overflow: 'hidden',
//       maxWidth: '90vw',
//       maxHeight: '90vh',
//       width: '900px',
//       height: '506px', // 16:9 aspect ratio
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
//     },
//     videoCloseButton: {
//       position: 'absolute' as const,
//       top: '10px',
//       right: '10px',
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '50%',
//       width: '40px',
//       height: '40px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       zIndex: 10,
//       transition: 'background-color 0.2s'
//     },
//     videoIframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none'
//     },
//     subscribeButton: {
//       position: 'absolute' as const,
//       bottom: '20px',
//       right: '20px',
//       backgroundColor: '#ff0000',
//       color: 'white',
//       border: 'none',
//       borderRadius: '25px',
//       padding: '12px 24px',
//       fontSize: '16px',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       transition: 'all 0.3s',
//       zIndex: 10
//     },
//     videoTitle: {
//       position: 'absolute' as const,
//       bottom: '20px',
//       left: '20px',
//       color: 'white',
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       padding: '12px 16px',
//       borderRadius: '8px',
//       maxWidth: '60%',
//       fontSize: '14px',
//       fontWeight: '600'
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
//                 onClick={() => handlePodcastClick(podcast)}
//                 style={{ cursor: 'pointer' }}
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
//                             onClick={() => handlePodcastClick(podcast)}
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

//             <style>{`
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

//       {/* Video Player Overlay */}
//       <AnimatePresence>
//         {isVideoPlayerOpen && selectedPodcast && (
//           <motion.div
//             style={overlayStyles.videoPlayerOverlay}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeVideoPlayer}
//           >
//             <motion.div
//               style={overlayStyles.videoPlayerContainer}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               onClick={e => e.stopPropagation()}
//             >
//               <button
//                 style={overlayStyles.videoCloseButton}
//                 onClick={closeVideoPlayer}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
//               >
//                 <X style={{ width: '20px', height: '20px' }} />
//               </button>
              
//               <iframe
//                 ref={videoRef}
//                 style={overlayStyles.videoIframe}
//                 src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedPodcast.title)}?autoplay=1&rel=0&modestbranding=1`}
//                 title={selectedPodcast.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
              
//               <div style={overlayStyles.videoTitle}>
//                 {selectedPodcast.title}
//               </div>
              
//               <AnimatePresence>
//                 {showSubscribeButton && (
//                   <motion.button
//                     style={overlayStyles.subscribeButton}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 20 }}
//                     whileHover={{ 
//                       scale: 1.05,
//                       backgroundColor: '#cc0000'
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleSubscribe}
//                   >
//                     <Play style={{ width: '16px', height: '16px' }} />
//                     Subscribe
//                   </motion.button>
//                 )}
//               </AnimatePresence>
//             </motion.div>
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

interface Podcast {
  title: string;
  subtitle: string;
  icon: string;
  videoId: string;
  description?: string;
}

const podcasts: Podcast[] = [
  {
    title: "Antenatal Care Explained ",
    subtitle: "Everything You Need to Know",
    icon: "fab fa-youtube",
    videoId: "fX3wMnTJ0ho",
  },
  {
    title: "One Abortion, 22 Miscarriages",
    subtitle: "Rh Negative Pregnancy Warning For Women (A-, B-, AB-, O-)",
    icon: "fab fa-youtube",
    videoId: "5JTTPma-3q8",
  },
];

const allPodcasts: Podcast[] = [
  {
    title: "EPI 2: Your Body Before Pregnancy: Fertility, Safe Periods & Early Signs Explained",
    subtitle: "Live Q&A Session",
    icon: "fab fa-youtube",
    videoId: "SEC4PxHkFX0",
    description: "Comprehensive guide to understanding your body before pregnancy, covering fertility basics and early pregnancy signs."
  },
  {
    title: "20 Dangers Before Pregnancy",
    subtitle: "Correct Them Now",
    icon: "fab fa-youtube",
    videoId: "yAyMttnE08s",
    description: "Essential health risks to address before conception to ensure a healthy pregnancy journey."
  },
  {
    title: "Rhesus Factor Questions Answered",
    subtitle: "Compatibility, Miscarriage & Sensitization",
    icon: "fab fa-youtube",
    videoId: "hpg-iC_h8JE",
    description: "Everything you need to know about Rhesus factor and its impact on pregnancy and fertility."
  },
  {
    title: "This is Why Some Women Have Repeated Unexplained Miscarriages",
    subtitle: "Understanding the Hidden Causes",
    icon: "fab fa-youtube",
    videoId: "fIGA25qpTiQ",
    description: "Exploring the underlying factors that contribute to recurrent pregnancy loss."
  },
  {
    title: "Jennifer Tells Her Story",
    subtitle: "11 Years of Marriage, 22 Miscarriages, No Child Due to Rhesus Blood",
    icon: "fab fa-youtube",
    videoId: "SyHJJIfjGeA",
    description: "A powerful personal story highlighting the importance of blood compatibility in marriage."
  },
  {
    title: "7 Critical Steps Every Woman Must Take After a Miscarriage or Abortion",
    subtitle: "Recovery and Future Planning",
    icon: "fab fa-youtube",
    videoId: "02PYMv89uBw",
    description: "Essential steps for physical and emotional recovery after pregnancy loss."
  },
  {
    title: "EPI 5: Body Changes During Pregnancy — A to Z",
    subtitle: "Complete Guide to Pregnancy Changes",
    icon: "fab fa-youtube",
    videoId: "dMlFTY58eDA",
    description: "Comprehensive overview of all the changes your body goes through during pregnancy."
  }
];

const PodcastSection: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handlePodcastClick = (podcast: Podcast) => {
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
      justifyContent: 'space-between'
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
    content: {
      padding: '24px',
      overflowY: 'auto' as const,
      maxHeight: '70vh'
    },
    videoCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    videoContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px'
    },
    videoIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(to right, #4c63d2, #3b82f6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      flexShrink: 0
    },
    videoDetails: {
      flex: 1
    },
    videoTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
      fontSize: '16px',
      lineHeight: '1.4'
    },
    videoSubtitle: {
      color: '#6b7280',
      marginBottom: '8px',
      fontSize: '14px'
    },
    videoDescription: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.4'
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
      height: '506px',
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
    videoTitleOverlay: {
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
                style={{ cursor: "pointer" }}
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

      {/* All Videos Overlay */}
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
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={overlayStyles.header}>
                <div style={overlayStyles.headerTop}>
                  <h2 style={overlayStyles.title}>All Podcast Videos</h2>
                  <button
                    style={overlayStyles.closeButton}
                    onClick={() => setIsOverlayOpen(false)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <X
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#6b7280",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div style={overlayStyles.content}>
                <div>
                  {allPodcasts.map((podcast, index) => (
                    <motion.div
                      key={index}
                      style={overlayStyles.videoCard}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePodcastClick(podcast)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 25px -8px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={overlayStyles.videoContent}>
                        <div style={overlayStyles.videoIcon}>
                          <Play style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div style={overlayStyles.videoDetails}>
                          <h3 style={overlayStyles.videoTitle}>
                            {podcast.title}
                          </h3>
                          <p style={overlayStyles.videoSubtitle}>
                            {podcast.subtitle}
                          </p>
                          {podcast.description && (
                            <p style={overlayStyles.videoDescription}>
                              {podcast.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
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
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={overlayStyles.videoCloseButton}
                onClick={closeVideoPlayer}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)")
                }
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>

              <iframe
                ref={videoRef}
                style={overlayStyles.videoIframe}
                src={`https://www.youtube.com/embed/${selectedPodcast.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedPodcast.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div style={overlayStyles.videoTitleOverlay}>
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
                      backgroundColor: "#cc0000",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubscribe}
                  >
                    <Play style={{ width: "16px", height: "16px" }} />
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