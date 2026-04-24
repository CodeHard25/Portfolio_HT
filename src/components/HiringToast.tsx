import { useEffect, useState } from "react";
import "./styles/HiringToast.css";
import { profile } from "../data/profile";
import { MdArrowOutward, MdClose } from "react-icons/md";

const HiringToast = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hiring-toast-dismissed")) return;

    // Show after 60 seconds OR after scrolling past 60% of the page
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 60_000);

    const onScroll = () => {
      const scrollRatio =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollRatio > 0.6 && !dismissed) {
        setVisible(true);
        clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("hiring-toast-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className={`hiring-toast ${visible ? "hiring-toast-show" : ""}`} role="alert">
      <div className="hiring-toast-content">
        <span className="hiring-toast-wave" aria-hidden="true">👋</span>
        <div className="hiring-toast-text">
          <p className="hiring-toast-title">Seen enough? Let's talk.</p>
          <p className="hiring-toast-sub">
            {profile.name.first} is open to Senior AI roles · Available now
          </p>
        </div>
      </div>
      <div className="hiring-toast-actions">
        <a
          href={`mailto:${profile.contact.email}`}
          className="hiring-toast-cta"
          data-cursor="disable"
        >
          Send a Message <MdArrowOutward />
        </a>
        <button
          className="hiring-toast-dismiss"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default HiringToast;
