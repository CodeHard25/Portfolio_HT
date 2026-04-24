import { useState } from "react";
import "./styles/Work.css";
import { profile } from "../data/profile";
import { MdArrowOutward } from "react-icons/md";

const CategoryFilter = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) => (
  <div className="work-filter">
    {profile.projectCategories.map((cat) => (
      <button
        key={cat}
        className={`work-filter-btn ${active === cat ? "work-filter-active" : ""}`}
        onClick={() => onChange(cat)}
        data-cursor="disable"
      >
        {cat}
      </button>
    ))}
  </div>
);

const FeaturedCard = ({ project }: { project: (typeof profile.work)[number] }) => (
  <div className="work-featured-card">
    <div className="work-featured-meta">
      <span className="work-featured-num">0{project.order}</span>
      <span className="work-featured-category">{project.category}</span>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="work-featured-live"
          data-cursor="disable"
        >
          LIVE <MdArrowOutward />
        </a>
      )}
    </div>

    <div className="work-featured-body">
      <div className="work-featured-text">
        <h3 className="work-featured-title">{project.title}</h3>
        <p className="work-featured-stack">{project.tools}</p>

        <div className="work-case-blocks">
          <div className="work-case-block">
            <p className="work-case-label">The Problem</p>
            <p className="work-case-text">{project.problem}</p>
          </div>
          <div className="work-case-block">
            <p className="work-case-label">What I Built</p>
            <p className="work-case-text">{project.solution}</p>
          </div>
          <div className="work-case-block work-case-impact">
            <p className="work-case-label">Impact</p>
            <p className="work-case-text">{project.impact}</p>
          </div>
        </div>

        <div className="work-tag-row">
          {project.tags.map((tag) => (
            <span className="work-tag" key={tag}>{tag}</span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="work-cta-link"
            data-cursor="disable"
          >
            View Live Project <MdArrowOutward />
          </a>
        )}
      </div>

      <div className="work-featured-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="work-image-overlay"
            data-cursor="disable"
            aria-label={`View ${project.title} live`}
          >
            <MdArrowOutward />
          </a>
        )}
      </div>
    </div>
  </div>
);

const CompactCard = ({ project, index }: { project: (typeof profile.work)[number]; index: number }) => (
  <div className="work-compact-card">
    <div className="work-compact-top">
      <span className="work-compact-num">0{index + 1}</span>
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="work-compact-live"
          data-cursor="disable"
          aria-label={`View ${project.title} live`}
        >
          <MdArrowOutward />
        </a>
      ) : (
        <span className="work-compact-private">Private</span>
      )}
    </div>
    <h4 className="work-compact-title">{project.title}</h4>
    <p className="work-compact-category">{project.category}</p>
    <p className="work-compact-summary">{project.summary}</p>
    <p className="work-compact-stack">{project.tools}</p>
    <div className="work-tag-row">
      {project.tags.map((tag) => (
        <span className="work-tag work-tag-sm" key={tag}>{tag}</span>
      ))}
    </div>
  </div>
);

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = profile.work.filter((p) => p.featured);
  const compact = profile.work.filter((p) => !p.featured);

  const filterProject = (p: (typeof profile.work)[number]) =>
    activeFilter === "All" || p.tags.some((t) => t === activeFilter);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-heading-row">
          <div>
            <p className="work-label">Selected Work</p>
            <h2 className="work-title">
              My <span className="gradient-text">Work</span>
            </h2>
          </div>
          <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Featured — top 3 case studies */}
        <div className="work-featured-list">
          {featured
            .filter(filterProject)
            .map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
        </div>

        {/* Compact — bottom 3 */}
        {compact.filter(filterProject).length > 0 && (
          <>
            <p className="work-compact-section-label">More Projects</p>
            <div className="work-compact-grid">
              {compact
                .filter(filterProject)
                .map((project, i) => (
                  <CompactCard key={project.id} project={project} index={i} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Work;
