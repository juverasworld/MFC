/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
// import "./styles/PodcastSection.scss";

interface Podcast {
  title: string;
  subtitle: string;
  icon: string;
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

const PodcastSection: React.FC = () => {
    const cardsRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className="bodys" id="Podcast">
      <div className="section">
        <div className="section-title">
          <span>Dr OVO Podcast</span>
          <motion.button
            className="view-more"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
  );
};

export default PodcastSection;
