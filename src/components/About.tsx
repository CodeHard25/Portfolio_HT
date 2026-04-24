import "./styles/About.css";
import { profile } from "../data/profile";
import { MdArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <p className="about-label">About Me</p>

        <p className="about-bio">{profile.summary}</p>

        <p className="about-cta-copy">
          Currently open to senior AI engineering roles where I can architect
          LLM systems at scale.
        </p>

        {/* Trait cards */}
        <div className="about-traits">
          {profile.traits.map((trait) => (
            <div className="about-trait-card" key={trait.title}>
              <span className="about-trait-icon" aria-hidden="true">
                {trait.icon}
              </span>
              <div>
                <p className="about-trait-title">{trait.title}</p>
                <p className="about-trait-desc">{trait.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resume CTA */}
        <a
          href={profile.contact.resume}
          target="_blank"
          rel="noreferrer"
          className="about-resume-cta"
          data-cursor="disable"
          aria-label="Download resume PDF"
        >
          Download Resume
          <MdArrowOutward />
        </a>
      </div>
    </div>
  );
};

export default About;
