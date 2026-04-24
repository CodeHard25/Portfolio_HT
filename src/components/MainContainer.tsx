import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Education from "./Education";
import HiringToast from "./HiringToast";
import Landing from "./Landing";
import Navbar from "./Navbar";
import ScrollProgressBar from "./ScrollProgressBar";
import SocialIcons from "./SocialIcons";
import StatsStrip from "./StatsStrip";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));
const ChatWidget = lazy(() => import("./ChatWidget"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isCharacterVisible, setIsCharacterVisible] = useState(true);
  const [isWorkFocusMode, setIsWorkFocusMode] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  const handleViewWorkClick = () => {
    setIsCharacterVisible(false);
    setIsWorkFocusMode(true);
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
  };

  return (
    <div className="container-main">
      {/* Global UI overlays */}
      <ScrollProgressBar />
      <Cursor />
      <Navbar />
      <SocialIcons />

      {/* Desktop-only: 3D character sits outside scroll wrapper (fixed) */}
      {isDesktopView && isCharacterVisible && !isWorkFocusMode && children}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">

            {!isWorkFocusMode && (
              <>
                {/* 1. Hero */}
                {/* Mobile: 3D character injected inside Landing */}
                <Landing onPrimaryCtaClick={handleViewWorkClick}>
                  {!isDesktopView && isCharacterVisible && !isWorkFocusMode && children}
                </Landing>
              </>
            )}

            {isWorkFocusMode ? (
              <>
                {/* Work focus mode: only projects + experience */}
                <Work />
                <Career />
              </>
            ) : (
              <>
                {/* 2. Impact stats strip */}
                <StatsStrip />

                {/* 3. About */}
                <About />

                {/* 4. What I Build (4 AI-first cards) */}
                <WhatIDo />

                {/* 5. Projects (case studies + compact grid) */}
                <Work />

                {/* 6. Career timeline */}
                <Career />

                {/* 7. Tech stack physics */}
                <Suspense fallback={<div style={{ height: "60vh" }} />}>
                  <TechStack />
                </Suspense>

                {/* 8. Education + Certifications */}
                <Education />

                {/* 9. Contact */}
                <Contact />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Persistent floating UI */}
      <HiringToast />

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default MainContainer;
