import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { profile } from "../data/profile";
import { useRecruiterMode } from "../context/RecruiterModeContext";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { isRecruiterMode, toggle } = useRecruiterMode();

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        const isSectionLink = !!section && section.startsWith("#");

        if (!isSectionLink || window.innerWidth <= 1024) return;

        e.preventDefault();
        const navOffset =
          (document.querySelector(".header") as HTMLElement | null)
            ?.offsetHeight ?? 80;
        const position =
          section === "#whatido-intro" ? `top top+=${navOffset + 20}` : "top top";
        smoother.scrollTo(section, true, position);
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {profile.name.short}
        </a>

        {/* Center — email (hidden on small screens) */}
        <a
          href={`mailto:${profile.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {profile.contact.email}
        </a>

        <div className="navbar-right">
          {/* Recruiter Mode Toggle */}
          <button
            className={`recruiter-toggle ${isRecruiterMode ? "recruiter-toggle-active" : ""}`}
            onClick={toggle}
            data-cursor="disable"
            aria-label="Toggle recruiter view"
            title={isRecruiterMode ? "Developer View" : "Recruiter View"}
          >
            <span className="recruiter-toggle-dot" aria-hidden="true" />
            {isRecruiterMode ? "Dev View" : "Recruiter View"}
          </button>

          <ul>
            <li>
              <a data-href="#about" href="#about">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#whatido-intro" href="#whatido-intro">
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
            <li>
              <a
                href={profile.contact.resume}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                <HoverLinks text="RESUME" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
      <div className="nav-fade" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;
