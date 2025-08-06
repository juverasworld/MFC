
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonial1 from "../assets/WhatsApp Image 2025-07-25 at 23.15.17_633bbef5.jpg";
import testimonial2 from "../assets/Maureen.jpg";
import testimonial3 from "../assets/val.png";
import testimonial4 from "../assets/1.png";
import testimonial5 from "../assets/IMG_74181.jpg";
import testimonial6 from "../assets/prof Paul.jpg";
// import "./styles/TestimonialSection.scss";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Inspired by a painful lived experience, Dr. Victor Otubo wrote this lifesaving masterpiece...",
    author: "Dr. Laz Ude Eze",
    title: "TalkHealth9ja",
    image: testimonial1,
  },
  {
    text: "In time, My Family Companion will be recognized as one of the greatest family health handbooks ever written...",
    author: "Dr. Ifeyinwa Maureen Okeke",
    title: "MWAN",
    image: testimonial2,
  },
  {
    text: "As a doctor… As a writer… And just as a person… The Family Companion is simply one of the best...",
    author: "Dr. Val Oje",
    title: "NASCP, FMOH",
    image: testimonial3,
  },
  {
    text: "Through incredible series of case presentations by the author, the reader is carried away...",
    author: "Prof Emeritus Peter O. Ebigbo",
    title: "NACP",
    image: testimonial4,
  },
  {
    text: "I love the use of relatable stories that humanizes medical topics and keeps the reader engaged...",
    author: "Grace Ihejiamizu-Paul",
    title: "Opportunity Desk",
    image: testimonial5,
  },
  {
    text: "The author demystifies parenting and maternal health with the warmth of lived experience...",
    author: "Prof. Paul C. Odinka",
    title: "UNN",
    image: testimonial6,
  },
];

const TestimonialSection: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContent = marqueeRef.current;
    if (!marqueeContent) return;

    const cards = marqueeContent.querySelectorAll(".testimonial-card");
    const totalWidth = Array.from(cards).reduce(
      (sum, card) => sum + card.getBoundingClientRect().width + 16,
      0
    ); // 16px for margin

    // Duplicate cards for seamless looping
    marqueeContent.innerHTML += marqueeContent.innerHTML;

    gsap.to(marqueeContent, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(x) % totalWidth),
      },
    });

    // Pause on hover
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () =>
        gsap.to(marqueeContent, { timeScale: 0 })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(marqueeContent, { timeScale: 1 })
      );
    });

    // Scroll-triggered fade-in
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div className="body">
      <div className="testimonial-section">
        <div className="section-header">
          <div className="section-label">Praise Report & Expert Reviews</div>
        </div>
        <div className="testimonials-marquee">
          <div className="marquee-content" ref={marqueeRef}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="stars">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span className="star" key={i}>
                        ★
                      </span>
                    ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img
                      className="imgss"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-title">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
