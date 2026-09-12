
// import { useEffect, useState, useRef, type CSSProperties } from "react";

// type SectionKey =
//   | "story"
//   | "proof"
//   | "outcomes"
//   | "inside"
//   | "author"
//   | "reviews"
//   | "offer"
//   | "final";

// export default function BookSales() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [visibleSections, setVisibleSections] = useState<
//     Partial<Record<SectionKey, boolean>>
//   >({});
//   const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>(
//     {}
//   );

//   useEffect(() => {
//     const linkId = "poppins-font-booksales";
//     if (document.getElementById(linkId)) return;

//     const link = document.createElement("link");
//     link.id = linkId;
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
//     document.head.appendChild(link);

//     return () => {
//       const existing = document.getElementById(linkId);
//       if (existing) existing.remove();
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const key = (entry.target as HTMLElement).dataset
//               .section as SectionKey | undefined;
//             if (!key) return;
//             setVisibleSections((prev) => ({
//               ...prev,
//               [key]: true,
//             }));
//           }
//         });
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
//     );

//     Object.values(sectionRefs.current).forEach((el) => {
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const setRef =
//     (key: SectionKey) =>
//     (el: HTMLElement | null): void => {
//       sectionRefs.current[key] = el;
//     };

//   const anim = (key: SectionKey): string =>
//     visibleSections[key] ? "fade-up visible" : "fade-up";

//   const iframeStyle: CSSProperties = {
//     position: "absolute",
//     inset: 0,
//     width: "100%",
//     height: "100%",
//     border: "none",
//   };

//   return (
//     <div className="book-sales">
//       {/* TOP BAR */}
//       <div className="topbar">
//         🔥 90-Day Presale · <span>30% Off</span> · Free Delivery Nationwide
//         (Nigeria)
//       </div>

//       {/* HERO */}
//       <section className="hero">
//         <div className="hero-badge">From Singlehood to Parenthood</div>
//         <h1>What if every family had a doctor in the house?</h1>
//         <p className="hero-sub">
//           My Family Companion gives you clear, practical health guidance —
//           written by a doctor, in plain language — so you stop guessing when the
//           people you love need answers.
//         </p>

//         <div className="hero-video">
//           {!isPlaying ? (
//             <>
//               <img
//                 src="https://img.youtube.com/vi/nJnNGP-GPpo/hqdefault.jpg"
//                 alt="Dr. OVO talks about My Family Companion"
//                 width={680}
//                 height={383}
//                 fetchPriority="high"
//                 decoding="async"
//               />
//               <div
//                 className="play-btn"
//                 onClick={() => setIsPlaying(true)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
//                 }}
//               >
//                 <span className="play-circle">
//                   <svg viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8 5v14l11-7z" />
//                   </svg>
//                 </span>
//               </div>
//             </>
//           ) : (
//             <iframe
//               src="https://www.youtube.com/embed/nJnNGP-GPpo?autoplay=1&rel=0&modestbranding=1"
//               title="Dr. OVO - My Family Companion"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               loading="lazy"
//               style={iframeStyle}
//             />
//           )}
//         </div>

//         <p className="below-video">
//           Watch Dr. OVO explain why he wrote the book every home deserves.
//         </p>

//         <a href="#order" className="btn btn-pulse">
//           Get the Book – 30% Off Presale
//         </a>
//         <p className="hero-note">
//           Free delivery in Nigeria · Limited presale pricing
//         </p>
//       </section>

//       {/* STORY */}
//       <section
//         className={`story ${anim("story")}`}
//         data-section="story"
//         ref={setRef("story")}
//       >
//         <div className="story-grid">
//           <div className="story-image">
//             <img
//               src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=700&q=80"
//               alt="Family"
//               loading="lazy"
//               decoding="async"
//             />
//           </div>
//           <div className="story-content">
//             <h2>It started with a death that should never have happened.</h2>
//             <p>
//               Dr. OVO was barely 10 years old when he watched his little sister die
//               from something that should never have taken her life.
//             </p>
//             <p>That moment never left him.</p>
//             <p>
//               Years later, as a medical doctor, he kept seeing the same pattern:
//               preventable deaths, dangerous myths, and families making life-changing
//               decisions with incomplete information.
//             </p>
//             <p>
//               So he wrote the book he wished every family already had — a clear,
//               story-driven companion that turns complex medical truth into simple,
//               usable guidance.
//             </p>
//             <a href="#order" className="btn btn-inline">
//               Get My Family Companion
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* PROOF */}
//       <section
//         className={`author-proof ${anim("proof")}`}
//         data-section="proof"
//         ref={setRef("proof")}
//       >
//         <h2>Why families trust Dr. OVO</h2>
//         <p className="sub">
//           Not theory. Not motivation. Practical guidance from a doctor who has
//           seen what happens when families don’t have the right information.
//         </p>

//         <div className="proof-grid">
//           <div className="proof-item">
//             <strong>01</strong>
//             <p>
//               He was 10 years old when he watched his little sister die from
//               something that should never have taken her life. That moment shaped
//               everything that followed.
//             </p>
//           </div>
//           <div className="proof-item">
//             <strong>02</strong>
//             <p>
//               As a medical doctor, he kept seeing the same pattern: preventable
//               deaths, dangerous myths, and families making life-changing decisions
//               with incomplete information.
//             </p>
//           </div>
//           <div className="proof-item">
//             <strong>03</strong>
//             <p>
//               So he wrote the book he wished every family already had — a clear,
//               story-driven companion that turns complex medical truth into simple,
//               usable guidance.
//             </p>
//           </div>
//           <div className="proof-item">
//             <strong>04</strong>
//             <p>
//               Endorsed by leading voices in maternal and child health, including
//               the National President of MWAN and senior doctors across Nigeria.
//             </p>
//           </div>
//         </div>

//         <div className="mid-cta">
//           <a href="#order" className="btn">
//             Yes, I Want This Book
//           </a>
//         </div>
//       </section>

//       {/* OUTCOMES */}
//       <section
//         className={`what-you-get ${anim("outcomes")}`}
//         data-section="outcomes"
//         ref={setRef("outcomes")}
//       >
//         <h2>What My Family Companion actually does</h2>
//         <p className="sub">
//           This is not a medical textbook. It is a practical companion for the most
//           important seasons of family life.
//         </p>

//         <div className="outcome-grid">
//           <div className="outcome-card">
//             <img
//               src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80"
//               alt="Couple"
//               loading="lazy"
//               decoding="async"
//             />
//             <h3>1. Stop guessing about the things that matter</h3>
//             <p>
//               From choosing a partner with health in mind, to pregnancy, delivery,
//               and raising a child — you get clear answers instead of confusion.
//             </p>
//           </div>
//           <div className="outcome-card">
//             <img
//               src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80"
//               alt="Pregnancy"
//               loading="lazy"
//               decoding="async"
//             />
//             <h3>2. Understand medical truth in human language</h3>
//             <p>
//               Complex topics are explained simply, with real stories, so you know
//               what matters and what to do next.
//             </p>
//           </div>
//           <div className="outcome-card">
//             <img
//               src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80"
//               alt="Care"
//               loading="lazy"
//               decoding="async"
//             />
//             <h3>3. Act early — before problems become emergencies</h3>
//             <p>
//               The book is built around prevention. You learn what to watch for and
//               when to act, so your family is protected by knowledge, not luck.
//             </p>
//           </div>
//           <div className="outcome-card">
//             <img
//               src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=80"
//               alt="Family"
//               loading="lazy"
//               decoding="async"
//             />
//             <h3>4. Give every home a trusted companion</h3>
//             <p>
//               Whether you are single, newly married, expecting, or already raising
//               children — this book walks with you through each stage.
//             </p>
//           </div>
//         </div>

//         <div className="mid-cta">
//           <a href="#order" className="btn btn-pulse">
//             Get the Book – 30% Off
//           </a>
//         </div>
//       </section>

//       {/* INSIDE */}
//       <section
//         className={`inside ${anim("inside")}`}
//         data-section="inside"
//         ref={setRef("inside")}
//       >
//         <h2>What you’ll find inside</h2>
//         <p className="sub">
//           A complete companion for the most important seasons of family life.
//         </p>

//         <div className="chapters">
//           <div className="chapter">
//             <div className="chapter-num">01</div>
//             <div>
//               <h4>Sex, Love & Choosing Wisely</h4>
//               <p>
//                 How to think about partnership, fertility, and health before
//                 marriage — without shame or confusion.
//               </p>
//             </div>
//           </div>
//           <div className="chapter">
//             <div className="chapter-num">02</div>
//             <div>
//               <h4>Pregnancy & Maternal Health</h4>
//               <p>
//                 What every woman (and her partner) needs to know to protect mother
//                 and child.
//               </p>
//             </div>
//           </div>
//           <div className="chapter">
//             <div className="chapter-num">03</div>
//             <div>
//               <h4>Delivery & the Critical First Days</h4>
//               <p>
//                 Clear guidance for labour, delivery, and the dangerous window many
//                 families overlook.
//               </p>
//             </div>
//           </div>
//           <div className="chapter">
//             <div className="chapter-num">04</div>
//             <div>
//               <h4>Newborn & Child Health</h4>
//               <p>
//                 How to care for your baby with confidence and catch problems before
//                 they become serious.
//               </p>
//             </div>
//           </div>
//           <div className="chapter">
//             <div className="chapter-num">05</div>
//             <div>
//               <h4>Family & Spouse Support</h4>
//               <p>
//                 The role of men, partners, and the wider family in keeping everyone
//                 safe and healthy.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mid-cta">
//           <a href="#order" className="btn btn-light">
//             Order My Copy Now
//           </a>
//         </div>
//       </section>

//       {/* AUTHOR */}
//       <section
//         className={`author ${anim("author")}`}
//         data-section="author"
//         ref={setRef("author")}
//       >
//         <div className="author-inner">
//           <div className="author-image-wrap">
//             <img
//               src="/author.jpg"
//               alt="Dr. OVO"
//               className="author-img"
//               loading="lazy"
//               decoding="async"
//             />
//           </div>
//           <div className="author-content">
//             <h2>About the Author</h2>
//             <p>
//               Dr. OVO (Otubo Victor Ogemdi) is a medical doctor, author, and
//               family health advocate. His work is driven by one conviction: too
//               many families lose people they love to problems that were
//               preventable.
//             </p>
//             <p>
//               He has spent years turning complex health knowledge into simple,
//               life-saving guidance for everyday families — the kind of guidance he
//               wished existed when he was a child.
//             </p>
//             <p>
//               <strong>My Family Companion</strong> is the book he believes every
//               home deserves: a trusted companion that sits with you when the
//               questions come.
//             </p>
//             <div className="stats">
//               <div className="stat">
//                 <strong>15+</strong>
//                 <span>Years Experience</span>
//               </div>
//               <div className="stat">
//                 <strong>1</strong>
//                 <span>Clear Mission</span>
//               </div>
//             </div>
//             <a
//               href="#order"
//               className="btn btn-inline"
//               style={{ marginTop: 24 }}
//             >
//               Get the Book He Wrote for Families
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* REVIEWS */}
//       <section
//         className={`reviews-section ${anim("reviews")}`}
//         data-section="reviews"
//         ref={setRef("reviews")}
//       >
//         <h2>What doctors and readers are saying</h2>
//         <p className="sub">
//           Endorsed by leading voices in maternal and child health — not as a
//           favour, but because the book does the job.
//         </p>

//         <div className="reviews">
//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “Some books give you facts. Others touch your heart. My Family
//               Companion does both — guiding you with the authority of a doctor and
//               the warmth of a trusted friend. It’s more than a guide; it’s a
//               life-saving companion.”
//             </p>
//             <div className="name">Dr. Zainab Kwaru</div>
//             <div className="title">National President, MWAN</div>
//           </div>

//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “One of the best family health materials ever written for everyday
//               people. Dr. OVO teaches with a unique voice that draws you in from the
//               first chapter to the very last.”
//             </p>
//             <div className="name">Dr. Ifeyinwa Maureen Okeke</div>
//             <div className="title">MWAN</div>
//           </div>

//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “As a doctor… as a writer… and just as a person… My Family Companion
//               is simply one of the best, most relatable ‘medically non-medical’
//               books I’ve ever read. Wow!”
//             </p>
//             <div className="name">Dr. Val Oje</div>
//             <div className="title">NASCP, FMOH</div>
//           </div>

//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “The reader is carried away by a well-tailored narrative that turns
//               what could have been boring medical facts into a book that captures
//               interest with valuable information and advice. A must-read.”
//             </p>
//             <div className="name">Prof. Emeritus Peter O. Ebigbo</div>
//             <div className="title">NACP</div>
//           </div>

//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “I felt like I was sitting with a trusted family doctor. The tone is
//               clear, warm, and educational — perfect for a general audience.”
//             </p>
//             <div className="name">Grace Ihejiamizu-Paul</div>
//             <div className="title">Opportunity Desk</div>
//           </div>

//           <div className="review">
//             <div className="stars">★★★★★</div>
//             <p>
//               “A rich blend of storytelling and science, dismantling dangerous myths
//               and guiding families toward safer, healthier lives.”
//             </p>
//             <div className="name">Prof. Paul C. Odinka</div>
//             <div className="title">University of Nigeria</div>
//           </div>
//         </div>

//         <div className="mid-cta">
//           <a href="#order" className="btn btn-pulse">
//             Join Them – Get Your Copy
//           </a>
//         </div>
//       </section>

//       {/* OFFER */}
//       <section
//         className={`offer ${anim("offer")}`}
//         data-section="offer"
//         id="order"
//         ref={setRef("offer")}
//       >
//         <h2>Get the doctor who lives in your house</h2>
//         <p className="sub">
//           Join the families who are no longer guessing when it comes to the health
//           of the people they love.
//         </p>

//         <div className="offer-box">
//           <div className="badge">90-DAY PRESALE · 30% OFF</div>
//           <h3>My Family Companion</h3>
//           <div className="price">
//             ₦X,XXX <span>₦X,XXX</span>
//           </div>
//           <p className="price-note">Free delivery nationwide in Nigeria</p>

//           <ul className="includes">
//             <li>Full physical book (From Singlehood to Parenthood)</li>
//             <li>Clear guidance on sex, pregnancy, maternal & child health</li>
//             <li>Real stories + practical steps you can use immediately</li>
//             <li>Free nationwide delivery (Nigeria)</li>
//             <li>Early access as a presale reader</li>
//           </ul>

//           <a href="#" className="btn btn-pulse">
//             Order My Copy Now – 30% Off
//           </a>
//           <p className="guarantee">
//             🔒 Secure checkout · Limited presale pricing
//           </p>
//         </div>
//       </section>

//       {/* FINAL */}
//       <section
//         className={`final ${anim("final")}`}
//         data-section="final"
//         ref={setRef("final")}
//       >
//         <h2>Every home deserves a companion like this.</h2>
//         <p>
//           You don’t need another book that sits on the shelf. You need the one that
//           sits with you when the questions come.
//         </p>
//         <a href="#order" className="btn btn-pulse">
//           Yes, I Want My Family Companion
//         </a>
//       </section>

//       <a href="#order" className="sticky-cta">
//         Get the Book – 30% Off
//       </a>

//       <footer>
//         © 2026 My Family Companion · Dr. OVO (Otubo Victor Ogemdi) · All rights
//         reserved
//       </footer>

//       <style>{`
//         .book-sales {
//           --navy: #1a1d33;
//           --navy-dark: #12152a;
//           --purple: #7c3aed;
//           --purple-hover: #6d28d9;
//           --text: #1a1d33;
//           --muted: #6b7280;
//           --bg-light: #f8f7f4;
//           font-family: 'Poppins', system-ui, sans-serif;
//           color: var(--text);
//           background: var(--bg-light);
//           line-height: 1.6;
//           -webkit-font-smoothing: antialiased;
//           min-height: 100vh;
//           overflow-x: hidden;
//         }
//         .book-sales * { margin: 0; padding: 0; box-sizing: border-box; }

//         @keyframes pulseRing {
//           0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
//           70% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
//           100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
//         }
//         @keyframes pulseBtn {
//           0%, 100% { transform: scale(1); box-shadow: 0 8px 24px -6px rgba(124,58,237,0.45); }
//           50% { transform: scale(1.03); box-shadow: 0 12px 32px -4px rgba(124,58,237,0.6); }
//         }
//         @keyframes floatPlay {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.08); }
//         }

//         .fade-up {
//           opacity: 0;
//           transform: translateY(28px);
//           transition: opacity 0.7s ease, transform 0.7s ease;
//         }
//         .fade-up.visible {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .topbar {
//           background: #111;
//           color: #fff;
//           padding: 11px 16px;
//           text-align: center;
//           font-size: 13px;
//           font-weight: 600;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//         }
//         .topbar span { color: #fbbf24; font-weight: 700; }

//         .hero {
//           background: var(--navy);
//           color: #fff;
//           padding: 60px 20px 70px;
//           text-align: center;
//         }
//         .hero-badge {
//           display: inline-block;
//           background: rgba(124, 58, 237, 0.25);
//           border: 1px solid rgba(124, 58, 237, 0.5);
//           color: #c4b5fd;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//           padding: 6px 14px;
//           border-radius: 30px;
//           margin-bottom: 22px;
//         }
//         .hero h1 {
//           font-size: clamp(28px, 5.5vw, 48px);
//           font-weight: 800;
//           line-height: 1.15;
//           max-width: 880px;
//           margin: 0 auto 16px;
//           letter-spacing: -0.5px;
//         }
//         .hero-sub {
//           font-size: clamp(16px, 2.5vw, 20px);
//           max-width: 640px;
//           margin: 0 auto 32px;
//           opacity: 0.92;
//         }
//         .hero-video {
//           max-width: 680px;
//           margin: 0 auto 32px;
//           border-radius: 14px;
//           overflow: hidden;
//           aspect-ratio: 16/9;
//           background: #0a0c18;
//           position: relative;
//           box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
//         }
//         .hero-video img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//         }
//         .play-btn {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(0,0,0,0.35);
//           cursor: pointer;
//         }
//         .play-btn:hover { background: rgba(0,0,0,0.22); }
//         .play-circle {
//           width: 76px;
//           height: 76px;
//           background: rgba(255,255,255,0.96);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           animation: pulseRing 2s infinite, floatPlay 2.4s ease-in-out infinite;
//         }
//         .play-btn:hover .play-circle {
//           transform: scale(1.1);
//           animation: none;
//         }
//         .play-circle svg {
//           width: 30px;
//           height: 30px;
//           margin-left: 3px;
//           fill: #1a1d33;
//         }
//         .below-video {
//           font-size: 16px;
//           max-width: 560px;
//           margin: 0 auto 28px;
//           opacity: 0.9;
//         }

//         .btn {
//           display: inline-block;
//           background: var(--purple);
//           color: #fff;
//           font-size: 16px;
//           font-weight: 700;
//           padding: 16px 40px;
//           border-radius: 10px;
//           text-decoration: none;
//           transition: all 0.25s;
//           border: none;
//           cursor: pointer;
//         }
//         .btn:hover {
//           background: var(--purple-hover);
//           transform: translateY(-2px);
//         }
//         .btn-pulse {
//           animation: pulseBtn 2.2s ease-in-out infinite;
//         }
//         .btn-pulse:hover { animation: none; }
//         .btn-inline { margin-top: 8px; }
//         .btn-light {
//           background: #fff;
//           color: var(--navy);
//         }
//         .btn-light:hover {
//           background: #f3f4f6;
//           color: var(--navy);
//         }

//         .mid-cta {
//           text-align: center;
//           margin-top: 48px;
//         }

//         .hero-note {
//           font-size: 14px;
//           opacity: 0.75;
//           margin-top: 12px;
//         }

//         .story {
//           padding: 80px 20px;
//           background: #fff;
//         }
//         .story-grid {
//           max-width: 1000px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: 1fr 1.2fr;
//           gap: 48px;
//           align-items: center;
//         }
//         .story-image img {
//           width: 100%;
//           border-radius: 16px;
//           object-fit: cover;
//           aspect-ratio: 4/5;
//           display: block;
//         }
//         .story-content h2 {
//           font-size: clamp(24px, 3.5vw, 32px);
//           font-weight: 800;
//           margin-bottom: 20px;
//           line-height: 1.25;
//         }
//         .story-content p {
//           font-size: 16px;
//           color: #374151;
//           margin-bottom: 16px;
//         }

//         .author-proof {
//           padding: 80px 20px;
//           background: var(--bg-light);
//           text-align: center;
//         }
//         .author-proof h2 {
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           margin-bottom: 12px;
//         }
//         .author-proof .sub {
//           font-size: 17px;
//           color: var(--muted);
//           max-width: 620px;
//           margin: 0 auto 48px;
//         }
//         .proof-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 24px;
//           max-width: 1000px;
//           margin: 0 auto;
//           text-align: left;
//         }
//         .proof-item {
//           background: #fff;
//           border-radius: 14px;
//           padding: 28px 22px;
//           transition: transform 0.3s, box-shadow 0.3s;
//         }
//         .proof-item:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 12px 28px rgba(0,0,0,0.08);
//         }
//         .proof-item strong {
//           display: block;
//           font-size: 22px;
//           font-weight: 800;
//           color: var(--purple);
//           margin-bottom: 12px;
//         }
//         .proof-item p {
//           font-size: 15px;
//           color: #374151;
//           line-height: 1.55;
//         }

//         .what-you-get {
//           padding: 80px 20px;
//           background: #fff;
//           text-align: center;
//         }
//         .what-you-get h2 {
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           margin-bottom: 12px;
//         }
//         .what-you-get .sub {
//           font-size: 17px;
//           color: var(--muted);
//           max-width: 600px;
//           margin: 0 auto 48px;
//         }
//         .outcome-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//           gap: 28px;
//           max-width: 1100px;
//           margin: 0 auto;
//           text-align: left;
//         }
//         .outcome-card {
//           background: var(--bg-light);
//           border-radius: 16px;
//           overflow: hidden;
//           transition: transform 0.3s, box-shadow 0.3s;
//         }
//         .outcome-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 14px 30px rgba(0,0,0,0.1);
//         }
//         .outcome-card img {
//           width: 100%;
//           height: 180px;
//           object-fit: cover;
//           display: block;
//         }
//         .outcome-card h3 {
//           font-size: 17px;
//           font-weight: 700;
//           margin: 18px 18px 10px;
//         }
//         .outcome-card p {
//           font-size: 14.5px;
//           color: #4b5563;
//           line-height: 1.55;
//           margin: 0 18px 22px;
//         }

//         .inside {
//           padding: 80px 20px;
//           background: var(--navy);
//           color: #fff;
//         }
//         .inside h2 {
//           text-align: center;
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           margin-bottom: 12px;
//         }
//         .inside .sub {
//           text-align: center;
//           font-size: 17px;
//           opacity: 0.85;
//           max-width: 560px;
//           margin: 0 auto 48px;
//         }
//         .chapters { max-width: 700px; margin: 0 auto; }
//         .chapter {
//           display: flex;
//           gap: 18px;
//           padding: 18px 0;
//           border-bottom: 1px solid rgba(255,255,255,0.1);
//         }
//         .chapter:last-child { border-bottom: none; }
//         .chapter-num {
//           font-size: 14px;
//           font-weight: 700;
//           color: #c4b5fd;
//           min-width: 28px;
//         }
//         .chapter h4 {
//           font-size: 16px;
//           font-weight: 600;
//           margin-bottom: 4px;
//         }
//         .chapter p { font-size: 14px; opacity: 0.75; }

//         .author {
//           padding: 80px 20px;
//           background: var(--bg-light);
//         }
//         .author-inner {
//           max-width: 960px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: 1fr 1.3fr;
//           gap: 48px;
//           align-items: center;
//         }
//         .author-img {
//           width: 100%;
//           border-radius: 16px;
//           aspect-ratio: 1;
//           object-fit: cover;
//           background: #e5e7eb;
//         }
//         .author-content h2 {
//           font-size: 28px;
//           font-weight: 800;
//           margin-bottom: 18px;
//         }
//         .author-content p {
//           font-size: 16px;
//           color: #374151;
//           margin-bottom: 16px;
//         }
//         .stats {
//           display: flex;
//           gap: 32px;
//           margin-top: 24px;
//           margin-bottom: 8px;
//         }
//         .stat strong {
//           display: block;
//           font-size: 24px;
//           font-weight: 800;
//           color: var(--purple);
//         }
//         .stat span {
//           font-size: 13px;
//           color: var(--muted);
//         }

//         .reviews-section {
//           padding: 80px 20px;
//           background: #fff;
//         }
//         .reviews-section h2 {
//           text-align: center;
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           margin-bottom: 12px;
//         }
//         .reviews-section .sub {
//           text-align: center;
//           color: var(--muted);
//           margin-bottom: 48px;
//           font-size: 16px;
//           max-width: 560px;
//           margin-left: auto;
//           margin-right: auto;
//         }
//         .reviews {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 24px;
//           max-width: 1100px;
//           margin: 0 auto;
//         }
//         .review {
//           background: var(--bg-light);
//           border-radius: 14px;
//           padding: 28px;
//           border: 1px solid #ececec;
//           transition: transform 0.3s;
//         }
//         .review:hover { transform: translateY(-3px); }
//         .review .stars {
//           color: #fbbf24;
//           font-size: 15px;
//           margin-bottom: 12px;
//           letter-spacing: 1px;
//         }
//         .review p {
//           font-size: 15px;
//           color: #374151;
//           margin-bottom: 18px;
//           line-height: 1.6;
//         }
//         .review .name { font-weight: 700; font-size: 14px; }
//         .review .title { font-size: 13px; color: var(--muted); }

//         .offer {
//           padding: 80px 20px;
//           background: var(--navy);
//           color: #fff;
//           text-align: center;
//         }
//         .offer h2 {
//           font-size: clamp(28px, 4.5vw, 38px);
//           font-weight: 800;
//           margin-bottom: 12px;
//         }
//         .offer .sub {
//           font-size: 18px;
//           opacity: 0.9;
//           max-width: 560px;
//           margin: 0 auto 40px;
//         }
//         .offer-box {
//           background: #fff;
//           color: var(--text);
//           max-width: 480px;
//           margin: 0 auto;
//           border-radius: 20px;
//           padding: 40px 32px;
//           text-align: left;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.25);
//         }
//         .offer-box .badge {
//           display: inline-block;
//           background: #fef3c7;
//           color: #92400e;
//           font-size: 12px;
//           font-weight: 700;
//           padding: 5px 12px;
//           border-radius: 20px;
//           margin-bottom: 16px;
//         }
//         .offer-box h3 {
//           font-size: 24px;
//           font-weight: 800;
//           margin-bottom: 8px;
//         }
//         .price {
//           font-size: 36px;
//           font-weight: 800;
//           color: var(--purple);
//           margin-bottom: 4px;
//         }
//         .price span {
//           font-size: 18px;
//           color: var(--muted);
//           text-decoration: line-through;
//           margin-left: 8px;
//           font-weight: 500;
//         }
//         .price-note {
//           font-size: 14px;
//           color: var(--muted);
//           margin-bottom: 24px;
//         }
//         .includes { list-style: none; margin-bottom: 28px; }
//         .includes li {
//           padding: 8px 0;
//           font-size: 15px;
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//         }
//         .includes li::before {
//           content: "✓";
//           color: #16a34a;
//           font-weight: 700;
//         }
//         .offer-box .btn { width: 100%; text-align: center; }
//         .guarantee {
//           font-size: 13px;
//           color: var(--muted);
//           text-align: center;
//           margin-top: 16px;
//         }

//         .final {
//           padding: 80px 20px;
//           text-align: center;
//           background: #fff;
//         }
//         .final h2 {
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           margin-bottom: 16px;
//           max-width: 700px;
//           margin-left: auto;
//           margin-right: auto;
//         }
//         .final p {
//           font-size: 17px;
//           color: var(--muted);
//           max-width: 560px;
//           margin: 0 auto 32px;
//         }

//         footer {
//           background: #111;
//           color: #9ca3af;
//           text-align: center;
//           padding: 30px 20px 90px;
//           font-size: 13px;
//         }

//         .sticky-cta {
//           display: none;
//           position: fixed;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           background: var(--purple);
//           color: #fff;
//           text-align: center;
//           padding: 16px;
//           font-weight: 700;
//           font-size: 15px;
//           text-decoration: none;
//           z-index: 90;
//           box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
//         }

//         @media (max-width: 768px) {
//           .hero { padding: 48px 16px 56px; }
//           .story-grid {
//             grid-template-columns: 1fr;
//             gap: 28px;
//           }
//           .author-inner {
//             grid-template-columns: 1fr;
//             gap: 28px;
//           }
//           .author-img {
//             max-width: 280px;
//             margin: 0 auto;
//             display: block;
//           }
//           .sticky-cta {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import { useEffect, useState, useRef, type CSSProperties } from "react";

type SectionKey =
  | "story"
  | "proof"
  | "outcomes"
  | "inside"
  | "author"
  | "reviews"
  | "offer"
  | "final";

export default function BookSales() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleSections, setVisibleSections] = useState<
    Partial<Record<SectionKey, boolean>>
  >({});
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>(
    {}
  );

  useEffect(() => {
    const linkId = "poppins-font-booksales";
    if (document.getElementById(linkId)) return;

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);

    return () => {
      const existing = document.getElementById(linkId);
      if (existing) existing.remove();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset
              .section as SectionKey | undefined;
            if (!key) return;
            setVisibleSections((prev) => ({
              ...prev,
              [key]: true,
            }));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef =
    (key: SectionKey) =>
    (el: HTMLElement | null): void => {
      sectionRefs.current[key] = el;
    };

  const anim = (key: SectionKey): string =>
    visibleSections[key] ? "fade-up visible" : "fade-up";

  const iframeStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <div className="book-sales">
      {/* TOP BAR */}
      <div className="topbar">
        📚 Available Now in Hard Copy · <span>Free Delivery Nationwide</span>{" "}
        (Nigeria)
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">From Singlehood to Parenthood</div>
        <h1>What if every family had a doctor in the house?</h1>
        <p className="hero-sub">
          My Family Companion gives you clear, practical health guidance —
          written by a doctor, in plain language — so you stop guessing when the
          people you love need answers.
        </p>

        <div className="hero-video">
          {!isPlaying ? (
            <>
              <img
                src="https://img.youtube.com/vi/nJnNGP-GPpo/hqdefault.jpg"
                alt="Dr. OVO talks about My Family Companion"
                width={680}
                height={383}
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="play-btn"
                onClick={() => setIsPlaying(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
                }}
              >
                <span className="play-circle">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/nJnNGP-GPpo?autoplay=1&rel=0&modestbranding=1"
              title="Dr. OVO - My Family Companion"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={iframeStyle}
            />
          )}
        </div>

        <p className="below-video">
          Watch Dr. OVO explain why he wrote the book every home deserves.
        </p>

        <a href="#order" className="btn btn-pulse">
          Get the Book Now
        </a>
        <p className="hero-note">
          Available in hard copy · Free delivery in Nigeria
        </p>
      </section>

      {/* STORY */}
      <section
        className={`story ${anim("story")}`}
        data-section="story"
        ref={setRef("story")}
      >
        <div className="story-grid">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=700&q=80"
              alt="Family"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story-content">
            <h2>It started with a death that should never have happened.</h2>
            <p>
              Dr. OVO was barely 10 years old when he watched his little sister
              die from something that should never have taken her life.
            </p>
            <p>That moment never left him.</p>
            <p>
              Years later, as a medical doctor, he kept seeing the same pattern:
              preventable deaths, dangerous myths, and families making
              life-changing decisions with incomplete information.
            </p>
            <p>
              So he wrote the book he wished every family already had — a clear,
              story-driven companion that turns complex medical truth into
              simple, usable guidance.
            </p>
            <a href="#order" className="btn btn-inline">
              Get My Family Companion
            </a>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section
        className={`author-proof ${anim("proof")}`}
        data-section="proof"
        ref={setRef("proof")}
      >
        <h2>Why families trust Dr. OVO</h2>
        <p className="sub">
          Not theory. Not motivation. Practical guidance from a doctor who has
          seen what happens when families don’t have the right information.
        </p>

        <div className="proof-grid">
          <div className="proof-item">
            <strong>01</strong>
            <p>
              He was 10 years old when he watched his little sister die from
              something that should never have taken her life. That moment shaped
              everything that followed.
            </p>
          </div>
          <div className="proof-item">
            <strong>02</strong>
            <p>
              As a medical doctor, he kept seeing the same pattern: preventable
              deaths, dangerous myths, and families making life-changing
              decisions with incomplete information.
            </p>
          </div>
          <div className="proof-item">
            <strong>03</strong>
            <p>
              So he wrote the book he wished every family already had — a clear,
              story-driven companion that turns complex medical truth into
              simple, usable guidance.
            </p>
          </div>
          <div className="proof-item">
            <strong>04</strong>
            <p>
              Endorsed by leading voices in maternal and child health, including
              the National President of MWAN and senior doctors across Nigeria.
            </p>
          </div>
        </div>

        <div className="mid-cta">
          <a href="#order" className="btn">
            Yes, I Want This Book
          </a>
        </div>
      </section>

      {/* OUTCOMES */}
      <section
        className={`what-you-get ${anim("outcomes")}`}
        data-section="outcomes"
        ref={setRef("outcomes")}
      >
        <h2>What My Family Companion actually does</h2>
        <p className="sub">
          This is not a medical textbook. It is a practical companion for the
          most important seasons of family life.
        </p>

        <div className="outcome-grid">
          <div className="outcome-card">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80"
              alt="Couple"
              loading="lazy"
              decoding="async"
            />
            <h3>1. Stop guessing about the things that matter</h3>
            <p>
              From choosing a partner with health in mind, to pregnancy,
              delivery, and raising a child — you get clear answers instead of
              confusion.
            </p>
          </div>
          <div className="outcome-card">
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80"
              alt="Pregnancy"
              loading="lazy"
              decoding="async"
            />
            <h3>2. Understand medical truth in human language</h3>
            <p>
              Complex topics are explained simply, with real stories, so you
              know what matters and what to do next.
            </p>
          </div>
          <div className="outcome-card">
            <img
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80"
              alt="Care"
              loading="lazy"
              decoding="async"
            />
            <h3>3. Act early — before problems become emergencies</h3>
            <p>
              The book is built around prevention. You learn what to watch for
              and when to act, so your family is protected by knowledge, not
              luck.
            </p>
          </div>
          <div className="outcome-card">
            <img
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=80"
              alt="Family"
              loading="lazy"
              decoding="async"
            />
            <h3>4. Give every home a trusted companion</h3>
            <p>
              Whether you are single, newly married, expecting, or already
              raising children — this book walks with you through each stage.
            </p>
          </div>
        </div>

        <div className="mid-cta">
          <a href="#order" className="btn btn-pulse">
            Get the Book Now
          </a>
        </div>
      </section>

      {/* INSIDE */}
      <section
        className={`inside ${anim("inside")}`}
        data-section="inside"
        ref={setRef("inside")}
      >
        <h2>What you’ll find inside</h2>
        <p className="sub">
          A complete companion for the most important seasons of family life.
        </p>

        <div className="chapters">
          <div className="chapter">
            <div className="chapter-num">01</div>
            <div>
              <h4>Sex, Love & Choosing Wisely</h4>
              <p>
                How to think about partnership, fertility, and health before
                marriage — without shame or confusion.
              </p>
            </div>
          </div>
          <div className="chapter">
            <div className="chapter-num">02</div>
            <div>
              <h4>Pregnancy & Maternal Health</h4>
              <p>
                What every woman (and her partner) needs to know to protect
                mother and child.
              </p>
            </div>
          </div>
          <div className="chapter">
            <div className="chapter-num">03</div>
            <div>
              <h4>Delivery & the Critical First Days</h4>
              <p>
                Clear guidance for labour, delivery, and the dangerous window
                many families overlook.
              </p>
            </div>
          </div>
          <div className="chapter">
            <div className="chapter-num">04</div>
            <div>
              <h4>Newborn & Child Health</h4>
              <p>
                How to care for your baby with confidence and catch problems
                before they become serious.
              </p>
            </div>
          </div>
          <div className="chapter">
            <div className="chapter-num">05</div>
            <div>
              <h4>Family & Spouse Support</h4>
              <p>
                The role of men, partners, and the wider family in keeping
                everyone safe and healthy.
              </p>
            </div>
          </div>
        </div>

        <div className="mid-cta">
          <a href="#order" className="btn btn-light">
            Order My Copy Now
          </a>
        </div>
      </section>

      {/* AUTHOR */}
      <section
        className={`author ${anim("author")}`}
        data-section="author"
        ref={setRef("author")}
      >
        <div className="author-inner">
          <div className="author-image-wrap">
            <img
              src="/author.jpg"
              alt="Dr. OVO"
              className="author-img"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="author-content">
            <h2>About the Author</h2>
            <p>
              Dr. OVO (Otubo Victor Ogemdi) is a medical doctor, author, and
              family health advocate. His work is driven by one conviction: too
              many families lose people they love to problems that were
              preventable.
            </p>
            <p>
              He has spent years turning complex health knowledge into simple,
              life-saving guidance for everyday families — the kind of guidance
              he wished existed when he was a child.
            </p>
            <p>
              <strong>My Family Companion</strong> is the book he believes every
              home deserves: a trusted companion that sits with you when the
              questions come.
            </p>
            <div className="stats">
              <div className="stat">
                <strong>15+</strong>
                <span>Years Experience</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>Clear Mission</span>
              </div>
            </div>
            <a
              href="#order"
              className="btn btn-inline"
              style={{ marginTop: 24 }}
            >
              Get the Book He Wrote for Families
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        className={`reviews-section ${anim("reviews")}`}
        data-section="reviews"
        ref={setRef("reviews")}
      >
        <h2>What doctors and readers are saying</h2>
        <p className="sub">
          Endorsed by leading voices in maternal and child health — not as a
          favour, but because the book does the job.
        </p>

        <div className="reviews">
          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “Some books give you facts. Others touch your heart. My Family
              Companion does both — guiding you with the authority of a doctor
              and the warmth of a trusted friend. It’s more than a guide; it’s a
              life-saving companion.”
            </p>
            <div className="name">Dr. Zainab Kwaru</div>
            <div className="title">National President, MWAN</div>
          </div>

          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “One of the best family health materials ever written for everyday
              people. Dr. OVO teaches with a unique voice that draws you in from
              the first chapter to the very last.”
            </p>
            <div className="name">Dr. Ifeyinwa Maureen Okeke</div>
            <div className="title">MWAN</div>
          </div>

          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “As a doctor… as a writer… and just as a person… My Family
              Companion is simply one of the best, most relatable ‘medically
              non-medical’ books I’ve ever read. Wow!”
            </p>
            <div className="name">Dr. Val Oje</div>
            <div className="title">NASCP, FMOH</div>
          </div>

          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “The reader is carried away by a well-tailored narrative that
              turns what could have been boring medical facts into a book that
              captures interest with valuable information and advice. A
              must-read.”
            </p>
            <div className="name">Prof. Emeritus Peter O. Ebigbo</div>
            <div className="title">NACP</div>
          </div>

          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “I felt like I was sitting with a trusted family doctor. The tone
              is clear, warm, and educational — perfect for a general audience.”
            </p>
            <div className="name">Grace Ihejiamizu-Paul</div>
            <div className="title">Opportunity Desk</div>
          </div>

          <div className="review">
            <div className="stars">★★★★★</div>
            <p>
              “A rich blend of storytelling and science, dismantling dangerous
              myths and guiding families toward safer, healthier lives.”
            </p>
            <div className="name">Prof. Paul C. Odinka</div>
            <div className="title">University of Nigeria</div>
          </div>
        </div>

        <div className="mid-cta">
          <a href="#order" className="btn btn-pulse">
            Join Them – Get Your Copy
          </a>
        </div>
      </section>

      {/* OFFER */}
      <section
        className={`offer ${anim("offer")}`}
        data-section="offer"
        id="order"
        ref={setRef("offer")}
      >
        <h2>Get the doctor who lives in your house</h2>
        <p className="sub">
          Join the families who are no longer guessing when it comes to the
          health of the people they love.
        </p>

        <div className="offer-box">
          <div className="badge">AVAILABLE NOW · HARD COPY</div>
          <h3>My Family Companion</h3>
          <div className="price">₦X,XXX</div>
          <p className="price-note">Free delivery nationwide in Nigeria</p>

          <ul className="includes">
            <li>Full physical hard-copy book (From Singlehood to Parenthood)</li>
            <li>Clear guidance on sex, pregnancy, maternal & child health</li>
            <li>Real stories + practical steps you can use immediately</li>
            <li>Free nationwide delivery (Nigeria)</li>
            <li>A trusted companion for every stage of family life</li>
          </ul>

          {/* Two CTAs */}
          <div className="cta-buttons">
            <a
              href="https://www.amazon.com/your-book-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pulse"
            >
              Buy on Amazon
            </a>
            <a
              href="https://selar.co/your-book-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-selar"
            >
              Buy on Selar
            </a>
          </div>

          <p className="guarantee">
            🔒 Secure checkout · Available in hard copy
          </p>
        </div>
      </section>

      {/* FINAL */}
      <section
        className={`final ${anim("final")}`}
        data-section="final"
        ref={setRef("final")}
      >
        <h2>Every home deserves a companion like this.</h2>
        <p>
          You don’t need another book that sits on the shelf. You need the one
          that sits with you when the questions come.
        </p>
        <a href="#order" className="btn btn-pulse">
          Yes, I Want My Family Companion
        </a>
      </section>

      <a href="#order" className="sticky-cta">
        Get the Book Now
      </a>

      <footer>
        © 2026 My Family Companion · Dr. OVO (Otubo Victor Ogemdi) · All rights
        reserved
      </footer>

      <style>{`
        .book-sales {
          --navy: #1a1d33;
          --navy-dark: #12152a;
          --purple: #7c3aed;
          --purple-hover: #6d28d9;
          --text: #1a1d33;
          --muted: #6b7280;
          --bg-light: #f8f7f4;
          font-family: 'Poppins', system-ui, sans-serif;
          color: var(--text);
          background: var(--bg-light);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .book-sales * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
          70% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 24px -6px rgba(124,58,237,0.45); }
          50% { transform: scale(1.03); box-shadow: 0 12px 32px -4px rgba(124,58,237,0.6); }
        }
        @keyframes floatPlay {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .topbar {
          background: #111;
          color: #fff;
          padding: 11px 16px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .topbar span { color: #fbbf24; font-weight: 700; }

        .hero {
          background: var(--navy);
          color: #fff;
          padding: 60px 20px 70px;
          text-align: center;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(124, 58, 237, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.5);
          color: #c4b5fd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 30px;
          margin-bottom: 22px;
        }
        .hero h1 {
          font-size: clamp(28px, 5.5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          max-width: 880px;
          margin: 0 auto 16px;
          letter-spacing: -0.5px;
        }
        .hero-sub {
          font-size: clamp(16px, 2.5vw, 20px);
          max-width: 640px;
          margin: 0 auto 32px;
          opacity: 0.92;
        }
        .hero-video {
          max-width: 680px;
          margin: 0 auto 32px;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #0a0c18;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .hero-video img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .play-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
          cursor: pointer;
        }
        .play-btn:hover { background: rgba(0,0,0,0.22); }
        .play-btn:hover .play-circle {
          transform: scale(1.1);
          animation: none;
        }
        .play-circle {
          width: 76px;
          height: 76px;
          background: rgba(255,255,255,0.96);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulseRing 2s infinite, floatPlay 2.4s ease-in-out infinite;
        }
        .play-circle svg {
          width: 30px;
          height: 30px;
          margin-left: 3px;
          fill: #1a1d33;
        }
        .below-video {
          font-size: 16px;
          max-width: 560px;
          margin: 0 auto 28px;
          opacity: 0.9;
        }

        .btn {
          display: inline-block;
          background: var(--purple);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 40px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background: var(--purple-hover);
          transform: translateY(-2px);
        }
        .btn-pulse {
          animation: pulseBtn 2.2s ease-in-out infinite;
        }
        .btn-pulse:hover { animation: none; }
        .btn-inline { margin-top: 8px; }
        .btn-light {
          background: #fff;
          color: var(--navy);
        }
        .btn-light:hover {
          background: #f3f4f6;
          color: var(--navy);
        }
        .btn-selar {
          background: #0f766e;
        }
        .btn-selar:hover {
          background: #0d9488;
        }

        .mid-cta {
          text-align: center;
          margin-top: 48px;
        }

        .hero-note {
          font-size: 14px;
          opacity: 0.75;
          margin-top: 12px;
        }

        .story {
          padding: 80px 20px;
          background: #fff;
        }
        .story-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
        }
        .story-image img {
          width: 100%;
          border-radius: 16px;
          object-fit: cover;
          aspect-ratio: 4/5;
          display: block;
        }
        .story-content h2 {
          font-size: clamp(24px, 3.5vw, 32px);
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.25;
        }
        .story-content p {
          font-size: 16px;
          color: #374151;
          margin-bottom: 16px;
        }

        .author-proof {
          padding: 80px 20px;
          background: var(--bg-light);
          text-align: center;
        }
        .author-proof h2 {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .author-proof .sub {
          font-size: 17px;
          color: var(--muted);
          max-width: 620px;
          margin: 0 auto 48px;
        }
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
          text-align: left;
        }
        .proof-item {
          background: #fff;
          border-radius: 14px;
          padding: 28px 22px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .proof-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }
        .proof-item strong {
          display: block;
          font-size: 22px;
          font-weight: 800;
          color: var(--purple);
          margin-bottom: 12px;
        }
        .proof-item p {
          font-size: 15px;
          color: #374151;
          line-height: 1.55;
        }

        .what-you-get {
          padding: 80px 20px;
          background: #fff;
          text-align: center;
        }
        .what-you-get h2 {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .what-you-get .sub {
          font-size: 17px;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto 48px;
        }
        .outcome-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
          text-align: left;
        }
        .outcome-card {
          background: var(--bg-light);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .outcome-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 30px rgba(0,0,0,0.1);
        }
        .outcome-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        .outcome-card h3 {
          font-size: 17px;
          font-weight: 700;
          margin: 18px 18px 10px;
        }
        .outcome-card p {
          font-size: 14.5px;
          color: #4b5563;
          line-height: 1.55;
          margin: 0 18px 22px;
        }

        .inside {
          padding: 80px 20px;
          background: var(--navy);
          color: #fff;
        }
        .inside h2 {
          text-align: center;
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .inside .sub {
          text-align: center;
          font-size: 17px;
          opacity: 0.85;
          max-width: 560px;
          margin: 0 auto 48px;
        }
        .chapters { max-width: 700px; margin: 0 auto; }
        .chapter {
          display: flex;
          gap: 18px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .chapter:last-child { border-bottom: none; }
        .chapter-num {
          font-size: 14px;
          font-weight: 700;
          color: #c4b5fd;
          min-width: 28px;
        }
        .chapter h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .chapter p { font-size: 14px; opacity: 0.75; }

        .author {
          padding: 80px 20px;
          background: var(--bg-light);
        }
        .author-inner {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 48px;
          align-items: center;
        }
        .author-img {
          width: 100%;
          border-radius: 16px;
          aspect-ratio: 1;
          object-fit: cover;
          background: #e5e7eb;
        }
        .author-content h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 18px;
        }
        .author-content p {
          font-size: 16px;
          color: #374151;
          margin-bottom: 16px;
        }
        .stats {
          display: flex;
          gap: 32px;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .stat strong {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: var(--purple);
        }
        .stat span {
          font-size: 13px;
          color: var(--muted);
        }

        .reviews-section {
          padding: 80px 20px;
          background: #fff;
        }
        .reviews-section h2 {
          text-align: center;
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .reviews-section .sub {
          text-align: center;
          color: var(--muted);
          margin-bottom: 48px;
          font-size: 16px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .reviews {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .review {
          background: var(--bg-light);
          border-radius: 14px;
          padding: 28px;
          border: 1px solid #ececec;
          transition: transform 0.3s;
        }
        .review:hover { transform: translateY(-3px); }
        .review .stars {
          color: #fbbf24;
          font-size: 15px;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .review p {
          font-size: 15px;
          color: #374151;
          margin-bottom: 18px;
          line-height: 1.6;
        }
        .review .name { font-weight: 700; font-size: 14px; }
        .review .title { font-size: 13px; color: var(--muted); }

        .offer {
          padding: 80px 20px;
          background: var(--navy);
          color: #fff;
          text-align: center;
        }
        .offer h2 {
          font-size: clamp(28px, 4.5vw, 38px);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .offer .sub {
          font-size: 18px;
          opacity: 0.9;
          max-width: 560px;
          margin: 0 auto 40px;
        }
        .offer-box {
          background: #fff;
          color: var(--text);
          max-width: 480px;
          margin: 0 auto;
          border-radius: 20px;
          padding: 40px 32px;
          text-align: left;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }
        .offer-box .badge {
          display: inline-block;
          background: #ecfdf5;
          color: #065f46;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .offer-box h3 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .price {
          font-size: 36px;
          font-weight: 800;
          color: var(--purple);
          margin-bottom: 4px;
        }
        .price-note {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 24px;
        }
        .includes { list-style: none; margin-bottom: 28px; }
        .includes li {
          padding: 8px 0;
          font-size: 15px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .includes li::before {
          content: "✓";
          color: #16a34a;
          font-weight: 700;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 8px;
        }
        .cta-buttons .btn {
          width: 100%;
          text-align: center;
        }

        .guarantee {
          font-size: 13px;
          color: var(--muted);
          text-align: center;
          margin-top: 16px;
        }

        .final {
          padding: 80px 20px;
          text-align: center;
          background: #fff;
        }
        .final h2 {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 16px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .final p {
          font-size: 17px;
          color: var(--muted);
          max-width: 560px;
          margin: 0 auto 32px;
        }

        footer {
          background: #111;
          color: #9ca3af;
          text-align: center;
          padding: 30px 20px 90px;
          font-size: 13px;
        }

        .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--purple);
          color: #fff;
          text-align: center;
          padding: 16px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          z-index: 90;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        }

        @media (min-width: 480px) {
          .cta-buttons {
            flex-direction: row;
          }
          .cta-buttons .btn {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .hero { padding: 48px 16px 56px; }
          .story-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .author-inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .author-img {
            max-width: 280px;
            margin: 0 auto;
            display: block;
          }
          .sticky-cta {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}