import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { profile } from "../data/profile";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-inner">

        {/* CTA Heading */}
        <div className="contact-hero">
          <p className="contact-label">Let's Work Together</p>
          <h2 className="contact-heading">
            Ready to build
            <br />
            <span className="gradient-text">something great?</span>
          </h2>
          <p className="contact-sub">
            I'm open to senior AI engineering roles starting immediately.
            <br />
            Drop me a line or schedule a call.
          </p>
          <a
            href={`mailto:${profile.contact.email}`}
            className="contact-primary-cta"
            data-cursor="disable"
          >
            Say hello <MdArrowOutward />
          </a>
        </div>

        {/* Contact details grid */}
        <div className="contact-details">
          <div className="contact-col">
            <p className="contact-col-label">Contact</p>
            <div className="contact-item">
              <span className="contact-item-key">Email</span>
              <a href={`mailto:${profile.contact.email}`} data-cursor="disable" className="contact-item-val">
                {profile.contact.email}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-item-key">Phone</span>
              <a href={`tel:${profile.contact.phoneHref}`} data-cursor="disable" className="contact-item-val">
                {profile.contact.phone}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-item-key">Location</span>
              <span className="contact-item-val">
                {profile.contact.location}
                <br />
                <span className="contact-item-note">{profile.contact.locationNote}</span>
              </span>
            </div>
          </div>

          <div className="contact-col">
            <p className="contact-col-label">Find Me</p>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              GitHub <MdArrowOutward />
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              LinkedIn <MdArrowOutward />
            </a>
            <a href={profile.contact.resume} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Resume PDF <MdArrowOutward />
            </a>
          </div>

          <div className="contact-col contact-col-credit">
            <p className="contact-credit">
              Designed & Developed by{" "}
              <span>{profile.name.full}</span>
            </p>
            <p className="contact-copyright">
              <MdCopyright /> {new Date().getFullYear()} · Senior AI Engineer
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
