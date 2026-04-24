import "./styles/Education.css";
import { profile } from "../data/profile";

const Education = () => {
  return (
    <div className="edu-section" id="education">
      <div className="edu-inner section-container">
        <div className="edu-col">
          {/* Education */}
          <div className="edu-block">
            <p className="edu-label">Education</p>
            {profile.education.map((item) => (
              <div className="edu-entry" key={item.institution}>
                <div className="edu-entry-head">
                  <div>
                    <p className="edu-degree">{item.degree}</p>
                    <p className="edu-field">{item.field}</p>
                    <p className="edu-institution">{item.institution}</p>
                  </div>
                  <p className="edu-year">{item.year}</p>
                </div>
                {item.note && <p className="edu-note">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="edu-col">
          {/* Certifications */}
          <div className="edu-block">
            <p className="edu-label">Certifications</p>
            <div className="edu-certs">
              {profile.certifications.map((cert) => (
                <div className="edu-cert" key={cert.title}>
                  <div className="edu-cert-icon" aria-hidden="true">✦</div>
                  <div>
                    <p className="edu-cert-title">{cert.title}</p>
                    <p className="edu-cert-issuer">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
