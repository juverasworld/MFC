import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import authorPhoto from "../assets/author2.jpg";
import bookPhoto from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
import maureenPhoto from "../assets/Maureen.jpg";
import gracePhoto from "../assets/grace.jpg";
import lazPhoto from "../assets/WhatsApp Image 2025-07-25 at 23.15.17_633bbef5.jpg";
import zainabPhoto from "../assets/zinab copy 2.jpg";
import valPhoto from "../assets/val.png";
import peterPhoto from "../assets/1.png";
import paulPhoto from "../assets/prof Paul.jpg";
import "./LandingPage.css";

const journey = ["Before pregnancy", "Pregnancy", "Birth & early weeks", "Baby & child", "Postpartum", "Partner support"];
const testimonials = [
  { quote: "Indeed, the book is a life-course companion.", name: "Dr. Laz Ude Eze", role: "TalkHealth9ja", photo: lazPhoto },
  { quote: "My Family Companion – From Singlehood to Parenthood is more than a book — it’s a trusted guide for life’s most important journey — Family.", name: "Dr. Zainab Kwaru", role: "National President, MWAN", photo: zainabPhoto },
  { quote: "One of the best family health materials ever written for everyday people.", name: "Dr. Ifeyinwa Maureen Okeke", role: "MWAN", photo: maureenPhoto },
  { quote: "My Family Companion is simply one of the best, most relatable ‘medically non-medical’ books I’ve ever read. Wow!", name: "Dr. Val Oje", role: "NASCP, FMOH", photo: valPhoto },
  { quote: "…the reader is carried away by a well-tailored narrative…", name: "Prof. Emeritus Peter O. Ebigbo", role: "NACP", photo: peterPhoto },
  { quote: "I love the use of relatable stories that humanize medical topics and keep the reader engaged.", name: "Grace Ihejiamizu-Paul", role: "Opportunity Desk", photo: gracePhoto },
  { quote: "The author demystifies parenting and maternal health with the warmth of lived experience and the clarity of medical expertise.", name: "Prof. Paul C. Odinka", role: "UNN", photo: paulPhoto },
];

function LandingTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const group = track?.querySelector<HTMLElement>(".testimonial-marquee-group");
    if (!track || !group || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const distance = group.getBoundingClientRect().width + gap;
      tweenRef.current = gsap.to(track, { x: -distance, duration: distance / 32, ease: "none", repeat: -1 });
      if (pausedRef.current) tweenRef.current.pause();
    };

    start();
    const observer = new ResizeObserver(start);
    observer.observe(group);
    return () => {
      observer.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) tweenRef.current?.pause();
    else tweenRef.current?.play();
  }, [paused]);

  const pauseForInteraction = () => tweenRef.current?.pause();
  const resumeAfterInteraction = () => { if (!paused) tweenRef.current?.play(); };

  return (
    <section className="landing-testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <div><span>IN THEIR WORDS</span><h2 id="testimonials-title">A guide that speaks like a person.</h2><p>Readers and health professionals share what stood out to them.</p></div>
        <button className="testimonial-motion-toggle" type="button" onClick={() => setPaused((current) => !current)} aria-controls="testimonial-marquee" aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button>
      </div>
      <div className="testimonial-marquee-window" role="region" aria-label="Reader and expert testimonials. Scroll horizontally to browse." tabIndex={0} onPointerEnter={pauseForInteraction} onPointerLeave={resumeAfterInteraction} onFocus={pauseForInteraction} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resumeAfterInteraction(); }}>
        <div className="testimonial-marquee-track" id="testimonial-marquee" ref={trackRef}>
          {[0, 1].map((copy) => (
            <div className="testimonial-marquee-group" key={copy} aria-hidden={copy === 1}>
              {testimonials.map((testimonial) => (
                <figure className="landing-testimonial" key={testimonial.name}>
                  <span className="testimonial-quote-mark" aria-hidden="true">“</span>
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption><img src={testimonial.photo} alt="" /><span><b>{testimonial.name}</b><small>{testimonial.role}</small></span></figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [searchParams] = useSearchParams();
  const referralId = searchParams.get("ref")?.trim() || "";
  const bookPrice = referralId ? "₦25,000" : "₦30,000";
  const bookCheckout = referralId ? `/checkout?product=book&ref=${encodeURIComponent(referralId)}` : "/checkout?product=book";

  return (
    <div className="mfc-landing">
      <header className="landing-header">
        <a className="landing-brand" href="#top" aria-label="My Family Companion home">
          <span className="landing-mark">MFC</span>
          <span><b>My Family Companion</b><small>FAMILY HEALTH, MADE HUMAN</small></span>
        </a>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#inside">Inside the book</a>
          <Link className="landing-nav-cta" to={bookCheckout}>Get the book <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <main id="top">
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="landing-kicker"><span /> A practical companion for the family journey</div>
            <h1>Good health guidance should reach families <em>before the hard moment.</em></h1>
            <p className="hero-lede">My Family Companion brings clear, compassionate health education to the conversations families have before pregnancy, through birth, and while raising a child.</p>
            <div className="hero-actions">
              <Link className="button-primary" to={bookCheckout}>Buy the book <span aria-hidden="true">→</span></Link>
              <Link className="button-text" to="/checkout?product=promoter">Become an MFC advocate <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="hero-note">Book {bookPrice}{referralId ? " through this advocate link" : " direct from MFC"} <i>·</i> Advocate registration ₦5,000 <i>·</i> Separate purchases</p>
          </div>
          <div className="hero-visual" aria-label="Dr. OVO and the My Family Companion book">
            <div className="hero-image-wash" />
            <img className="hero-author" src={authorPhoto} alt="Dr. OVO, creator of My Family Companion" />
            <div className="hero-book-card"><img src={bookPhoto} alt="My Family Companion book editions" /><span><small>THE PRACTICAL GUIDE</small><b>For the questions<br />families carry home</b></span></div>
            <div className="hero-caption"><span className="caption-rule" /><span><b>DR. OVO</b><small>Doctor · Author · Advocate</small></span></div>
          </div>
        </section>

        <section className="choice-section" aria-label="Choose how to take part">
          <div className="choice-intro"><span>START HERE</span><h2>What brings you to MFC?</h2></div>
          <article className="choice-card choice-book">
            <div><span className="choice-number">01 / FOR YOUR FAMILY</span><h3>Bring the guide home.</h3><p>One book for the questions that come before, during and after pregnancy—made to support better conversations with your care team.</p></div>
            <div className="choice-bottom"><b>{bookPrice} <small>{referralId ? "advocate referral price" : "direct MFC price"}</small></b><Link to={bookCheckout}>Buy the book <span aria-hidden="true">→</span></Link></div>
          </article>
          <article className="choice-card choice-advocate">
            <div><span className="choice-number">02 / FOR YOUR COMMUNITY</span><h3>Help another family find it.</h3><p>Join the MFC Health Advocate community for program access, product training and approved resources to share the book.</p></div>
            <div className="choice-bottom"><b>₦5,000 <small>one-time registration</small></b><Link to="/checkout?product=promoter">Become an advocate <span aria-hidden="true">→</span></Link></div>
            <small className="choice-footnote">Registration is separate from buying the book. Program terms are shown before payment.</small>
          </article>
        </section>

        <section className="story-section" id="story">
          <div className="story-label"><span>WHY THIS WORK EXISTS</span><i /></div>
          <div className="story-content"><blockquote>“I survived.<br />My sister didn’t.”</blockquote><div><p className="story-lead">That loss shaped Dr. OVO’s resolve to make useful health knowledge easier for families to reach.</p><p>My Family Companion turns that purpose into a practical guide: clear information, real family questions and support for knowing when to speak with a qualified health professional.</p><div className="story-signoff"><b>DR. OVO</b><span>Founder, My Family Companion</span></div></div></div>
        </section>

        <LandingTestimonials />

        <section className="inside-section" id="inside">
          <div className="inside-heading"><span>ONE FAMILY JOURNEY</span><h2>From the first question to the early years.</h2><p>The book follows the moments families move through, with practical guidance for each stage.</p></div>
          <div className="journey-strip">{journey.map((step, index) => <div className="journey-step" key={step}><span>0{index + 1}</span><b>{step}</b></div>)}</div>
          <p className="care-note">MFC shares educational information and does not replace diagnosis, treatment or advice from your clinician.</p>
        </section>

        <section className="closing-cta">
          <div><span>MAKE THE NEXT STEP YOURS</span><h2>Start with the guide. Share it when you’re ready.</h2></div>
          <div className="closing-actions"><Link className="button-light" to={bookCheckout}>Buy the book · {bookPrice} <span aria-hidden="true">→</span></Link><Link className="closing-secondary" to="/checkout?product=promoter">Join as an advocate · ₦5,000</Link></div>
        </section>
      </main>
      <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-mark">MFC</span><span><b>My Family Companion</b><small>FAMILY HEALTH, MADE HUMAN</small></span></a><span>Education for the family journey.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
