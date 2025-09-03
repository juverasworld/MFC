
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonial1 from "../assets/WhatsApp Image 2025-07-25 at 23.15.17_633bbef5.jpg";
import testimonial2 from "../assets/Maureen.jpg";
import testimonial3 from "../assets/val.png";
import testimonial4 from "../assets/1.png";
import testimonial5 from "../assets/grace.jpg";
import testimonial7 from "../assets/Zinab.jpg";
import testimonial6 from "../assets/prof Paul.jpg";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Indeed, the book is a life-course companion. Couples of reproductive age, medical students, researchers, & foreigners who seek basic knowledge of reproductive, maternal & child health in Africa would find 'My Family Companion' incredibly resourceful.",
    author: "Dr. Laz Ude Eze",
    title: "TalkHealth9ja",
    image: testimonial1,
  },
  {
    text: "My Family Companion – From Singlehood to Parenthood is more than a book — it’s a trusted guide for life’s most important journey — Family. But it’s more than a guide; it’s also a life-saving companion. And every home deserves a companion like this.",
    author: "Dr. Zainab Kwaru",
    title: "National President, MWAN",
    image: testimonial7,
    // image: "NA",
  },
  {
    text: "One of the best family health materials ever written for everyday people. Dr. OVO teaches with a unique voice that draws you in from the first chapter to the very last - only to send you right back to the beginning. It feels like learning from your favorite teacher.",
    author: "Dr. Ifeyinwa Maureen Okeke",
    title: "MWAN",
    image: testimonial2,
  },
  {
    text: "As a doctor… As a writer… And just as a person… My Family Companion is simply one of the best, most relatable 'medically non-medical' books I've ever read. Wow!",
    author: "Dr. Val Oje",
    title: "NASCP, FMOH",
    image: testimonial3,
  },
  {
    text: "...the reader is carried away by a well-tailored narrative that makes what could have been heaps of boring medical facts into a book that captures one's interest with titbits of valuable information and advice. A must-read for all segments of society.",
    author: "Prof Emeritus Peter O. Ebigbo",
    title: "NACP",
    image: testimonial4,
  },
  {
    text: "I love the use of relatable stories that humanize medical topics and keep the reader engaged. From the first chapter, I felt like I was sitting with a trusted family doctor. The tone is clear, warm, and educational, which is perfect for a general audience. ",
    author: "Grace Ihejiamizu-Paul",
    title: "Opportunity Desk",
    image: testimonial5,
  },
  {
    text: "The author demystifies parenting and maternal health with the warmth of lived experience and the clarity of medical expertise. A rich blend of storytelling and science, dismantling dangerous myths and guiding families toward safer, healthier lives.",
    author: "Prof. Paul C. Odinka",
    title: "UNN",
    image: testimonial6,
  },
];

// Function to generate initials from the author's name
const getInitials = (name: string) => {
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

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
        x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
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
                    {testimonial.image && testimonial.image !== "NA" ? (
                      <img
                        className="imgs"
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                    ) : (
                      <div className="initials-placeholder">
                        {getInitials(testimonial.author)}
                      </div>
                    )}
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