import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { profile } from "../data/profile";

const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".whatido-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("whatido-card-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="whatido-section whatIDO" id="whatido" ref={sectionRef}>
      <div className="whatido-inner section-container">
        <div className="whatido-intro" id="whatido-intro">
          <div className="whatido-intro-copy">
            <h2 className="whatido-intro-title">
              <span>What</span>
              <span>I</span>
              <span className="whatido-title-accent">Do</span>
            </h2>
            <p className="whatido-intro-hint">Scroll down to know</p>
          </div>
        </div>

        <div className="whatido-main">
          <div className="whatido-header">
            <h2 className="whatido-main-title">What I Build</h2>
          </div>

          <div className="whatido-grid">
            {profile.specialties.map((spec, i) => (
              <div
                className="whatido-card"
                key={spec.title}
                style={{ "--card-index": i } as React.CSSProperties}
              >
                <div className="whatido-card-top">
                  <span className="whatido-card-icon" aria-hidden="true">
                    {spec.icon}
                  </span>
                  <span className="whatido-card-num">0{i + 1}</span>
                </div>

                <h3 className="whatido-card-title">{spec.title}</h3>
                <p className="whatido-card-kicker">{spec.kicker}</p>
                <p className="whatido-card-desc">{spec.description}</p>

                <div className="whatido-card-divider" />

                <p className="whatido-card-usecase-label">Recent use case</p>
                <p className="whatido-card-usecase">{spec.useCase}</p>

                <div className="whatido-tags">
                  {spec.tags.map((tag) => (
                    <span className="whatido-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
