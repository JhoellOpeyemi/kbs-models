// next imports
import Image from "next/image";
import Link from "next/link";
// hooks import
import { linkArray } from "@/utils";
import { brandTokens } from "@/lib/designTokens";
// components imports
import StyledLink from "@/components/utils/StyledLink/StyledLink";
// styles import
import "./desktopFooter.css";

const DesktopFooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content-container container">
        <div className="footer-inner-content-container">
          <div className="footer-info-container">
            <div className="location">
              <h5 className="info-heading">Location:</h5>
              <p>10, Iluseyi Street, Surulere, Lagos, Nigeria</p>
            </div>

            <div className="contact">
              <h5 className="info-heading">For Enquiries:</h5>
              <Link href={`mailto:${brandTokens.agencyEmail}`} target="_blank">
                {brandTokens.agencyEmail}
              </Link>
              <p>+234 813 7427 904</p>
            </div>
          </div>

          <nav className="footer-links-container">
            <ul className="footer-links">
              {linkArray.map(
                ({ path, label }: { path: string; label: string }) => (
                  <li key={path} className="footer-link-list">
                    <StyledLink path={path} label={label} />
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="footer-image-container">
            <Image
              src="/brands-img.webp"
              alt=""
              className="footer-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        </div>

        <div className="socials-brand-container">
          <div className="social-links-credit-container">
            <div className="social-links-container">
              <StyledLink path="/" label="WhatsApp" />
              <StyledLink path="/" label="Twitter" />
              <StyledLink path="/" label="Instagram" />
              <StyledLink path="/" label="Facebook" />
            </div>

            <p className="desktop-credit">Website by Joel</p>
          </div>

          <div className="footer-brand-container">
            <div className="footer-brand-marquee">
              <h5 className="footer-brand">
                <span className="brand-short">
                  {brandTokens.agencyShortName}
                </span>
                <span className="brand-models">Models</span>
              </h5>
              <h5 className="footer-brand" aria-hidden="true">
                <span className="brand-short">
                  {brandTokens.agencyShortName}
                </span>
                <span className="brand-models">Models</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
