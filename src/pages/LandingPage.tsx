import { Link } from "react-router-dom";
import authorPhoto from "../assets/author2.jpg";
import bookPhoto from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
import "./LandingPage.css";

const journey = ["Before pregnancy", "Pregnancy", "Birth & early weeks", "Baby & child", "Postpartum", "Partner support"];

export default function LandingPage() {
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
          <Link className="landing-nav-cta" to="/checkout?product=book">Get the book <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <main id="top">
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="landing-kicker"><span /> A practical companion for the family journey</div>
            <h1>Good health guidance should reach families <em>before the hard moment.</em></h1>
            <p className="hero-lede">My Family Companion brings clear, compassionate health education to the conversations families have before pregnancy, through birth, and while raising a child.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/checkout?product=book">Buy the book <span aria-hidden="true">→</span></Link>
              <Link className="button-text" to="/checkout?product=promoter">Become an MFC advocate <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="hero-note">Book ₦30,000 <i>·</i> Advocate registration ₦5,000 <i>·</i> Separate purchases</p>
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
            <div className="choice-bottom"><b>₦30,000 <small>one-time</small></b><Link to="/checkout?product=book">Buy the book <span aria-hidden="true">→</span></Link></div>
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

        <section className="inside-section" id="inside">
          <div className="inside-heading"><span>ONE FAMILY JOURNEY</span><h2>From the first question to the early years.</h2><p>The book follows the moments families move through, with practical guidance for each stage.</p></div>
          <div className="journey-strip">{journey.map((step, index) => <div className="journey-step" key={step}><span>0{index + 1}</span><b>{step}</b></div>)}</div>
          <p className="care-note">MFC shares educational information and does not replace diagnosis, treatment or advice from your clinician.</p>
        </section>

        <section className="closing-cta">
          <div><span>MAKE THE NEXT STEP YOURS</span><h2>Start with the guide. Share it when you’re ready.</h2></div>
          <div className="closing-actions"><Link className="button-light" to="/checkout?product=book">Buy the book · ₦30,000 <span aria-hidden="true">→</span></Link><Link className="closing-secondary" to="/checkout?product=promoter">Join as an advocate · ₦5,000</Link></div>
        </section>
      </main>
      <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-mark">MFC</span><span><b>My Family Companion</b><small>FAMILY HEALTH, MADE HUMAN</small></span></a><span>Education for the family journey.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
