"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { brandTokens } from "@/lib/designTokens";

// components imports
import StyledLink from "@/components/utils/StyledLink/StyledLink";

// utils imports
import { linkArray } from "@/utils";
// styles import
import "./mobileNav.css";

const MobileNav = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    const updateCurrentTime = (): void => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setCurrentTime(time);
    };

    // Update immediately
    updateCurrentTime();

    // Check every second if the minute has changed
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="mobile-header flex-between">
        <Link
          href="/"
          className={`${navOpen ? "logo nav-open" : "logo"}`}
          onClick={closeNav}
        >
          {brandTokens.agencyShortName}
        </Link>

        {navOpen && (
          <nav className="mobile-nav">
            <ul className="mobile-nav-container flex-column">
              {linkArray.map(
                ({ path, label }: { path: string; label: string }) => (
                  <li key={path} className="mobile-nav-list">
                    <StyledLink path={path} label={label} closeNav={closeNav} />
                  </li>
                ),
              )}
            </ul>

            <div className="nav-footer-container flex-column">
              <div className="nav-footer-links">
                <a href="/" target="_blank">
                  Facebook
                </a>
                <a href="/" target="_blank">
                  Twitter
                </a>
                <a href="/" target="_blank">
                  Instagram
                </a>
              </div>

              <div className="nav-footer-image-container">
                <Image
                  src="/hero-img.webp"
                  alt="nav footer image"
                  style={{ objectFit: "cover" }}
                  className="nav-footer-image"
                  fill
                />
                <div className="overlay"></div>
              </div>
            </div>
          </nav>
        )}

        <div className="time-container">
          <p className={`${navOpen ? "time nav-open" : "time"}`}>
            {currentTime}
          </p>
        </div>

        <div className="mobile-menu">
          <button
            className={`${navOpen ? "mobile-menu-btn nav-open" : "mobile-menu-btn"}`}
            onClick={handleNav}
            aria-label="Toggle navigation menu"
          >
            <div className="mobile-menu-line mobile-menu-line-1"></div>
            <div className="mobile-menu-line mobile-menu-line-2"></div>
          </button>
        </div>
      </header>
    </>
  );
};

export default MobileNav;
