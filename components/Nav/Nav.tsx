"use client";

// hooks imports
import { useState, useEffect } from "react";
import { useWindowSize } from "@/hooks";
// next imports
import Link from "next/link";
import { usePathname } from "next/navigation";
// component imports
import StyledLink from "@/components/utils/StyledLink/StyledLink";
import MobileNav from "@/components/Nav/Mobile/MobileNav";
import { brandTokens } from "@/lib/designTokens";
// utils imports
import { linkArray } from "@/utils";
// styles import
import "./nav.css";

const Nav = () => {
  const pathname = usePathname();
  const isStudioPage = pathname?.startsWith("/studio");

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 992;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      {isStudioPage ? (
        <div></div>
      ) : isMobile ? (
        <MobileNav />
      ) : (
        <header
          className={`header flex-between container ${isVisible ? "show-header" : "hide-header"}`}
        >
          <Link href="/" className="logo">
            {brandTokens.agencyShortName}
          </Link>

          <nav className="nav">
            <ul className="nav-container flex">
              {linkArray.map(
                ({ path, label }: { path: string; label: string }) => (
                  <li key={path} className="nav-list">
                    <StyledLink path={path} label={label} />
                  </li>
                ),
              )}
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
