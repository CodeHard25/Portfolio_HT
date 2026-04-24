import "./styles/Career.css";
import { profile } from "../data/profile";

const Career = () => {
  return (
    <div className="career-section" id="career">
      <div className="career-inner section-container">
        <p className="career-label">Experience</p>
        <h2 className="career-title">
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-list">
          <div className="career-timeline">
            <div className="career-dot" />
          </div>

          {profile.experience.map((item) => (
            <div
              className={`career-entry ${item.isCurrent ? "career-entry-current" : ""}`}
              key={`${item.company}-${item.period}`}
            >
              <div className="career-entry-head">
                <div className="career-role-block">
                  <div className="career-role-row">
                    <h4 className="career-role">{item.role}</h4>
                    {item.isCurrent && (
                      <span className="career-current-badge">Current</span>
                    )}
                  </div>
                  <p className="career-company">{item.company}</p>
                </div>
                <p className="career-period">{item.period}</p>
              </div>

              <p className="career-desc">{item.description}</p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="career-highlights">
                  {item.highlights.map((h) => (
                    <li key={h} className="career-highlight">
                      <span className="career-highlight-arrow" aria-hidden="true">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="career-tags">
                {item.tags.map((tag) => (
                  <span className="career-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
