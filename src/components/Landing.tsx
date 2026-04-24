import { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./styles/Landing.css";
import { profile } from "../data/profile";

const RotatingTag = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const tags = profile.hero.rotatingTags;

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % tags.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(cycle, 2800);
    return () => clearInterval(id);
  }, [tags.length]);

  return (
    <span className={`rotating-tag ${visible ? "tag-visible" : "tag-hidden"}`}>
      {tags[index]}
    </span>
  );
};

type LandingProps = PropsWithChildren<{
  onPrimaryCtaClick?: () => void;
}>;

const Landing = ({ children, onPrimaryCtaClick }: LandingProps) => {
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pills = pillsRef.current?.querySelectorAll(".hero-pill");
    pills?.forEach((pill, i) => {
      (pill as HTMLElement).style.animationDelay = `${0.8 + i * 0.1}s`;
    });
  }, []);

  const handlePrimaryCtaClick = () => {
    onPrimaryCtaClick?.();
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">

        {/* Left column — decorative watermark name (desktop bg texture) */}
        <div className="landing-intro">
          {/* On mobile this is the main heading; on desktop it becomes a background watermark */}
          <h1 className="hero-name" aria-hidden="true">
            {profile.name.first.toUpperCase()}
            <br />
            <span>{profile.name.last.toUpperCase()}</span>
          </h1>
        </div>

        {/* Right column — role + tags + CTAs */}
        <div className="landing-info">
          <p className="hero-greeting">{profile.hero.eyebrow}</p>

          <div className="hero-role-wrap">
            <h2 className="hero-role gradient-text">
              {profile.hero.rolePrimary}
              <br />
              {profile.hero.roleSecondary}
            </h2>
            <span className="hero-cursor" aria-hidden="true">|</span>
          </div>

          <p className="hero-tagline">{profile.hero.tagline}</p>

          {/* Rotating tag + static pills */}
          <div className="hero-pills" ref={pillsRef}>
            <div className="hero-pill hero-pill-rotating">
              <RotatingTag />
            </div>
            <div className="hero-pill hero-pill">FastAPI</div>
            <div className="hero-pill hero-pill">Claude API</div>
            <div className="hero-pill hero-pill">PyTorch</div>
          </div>

          {/* CTAs */}
          <div className="hero-cta-row">
            <a
              href={profile.hero.cta.primary.href}
              className="hero-cta-primary"
              data-cursor="disable"
              onClick={handlePrimaryCtaClick}
            >
              {profile.hero.cta.primary.label}
              <span className="hero-cta-arrow">↗</span>
            </a>
            <button
              className="hero-cta-secondary"
              onClick={() => {
                document.getElementById("chat-widget")?.classList.toggle("chat-open");
              }}
              data-cursor="disable"
              aria-label="Open AI chat assistant"
            >
              <span className="hero-cta-bot">🤖</span>
              {profile.hero.cta.secondary.label}
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="scroll-line" />
            <span className="scroll-label">scroll to explore</span>
          </div>
        </div>

      </div>

      {/* 3D character injected here from parent on mobile */}
      {children}
    </div>
  );
};

export default Landing;
