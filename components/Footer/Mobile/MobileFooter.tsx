// next imports
import Image from "next/image";
import Link from "next/link";
// hooks import
import { linkArray } from "@/utils";
import { brandTokens } from "@/lib/designTokens";
// components imports
import StyledLink from "@/components/utils/StyledLink/StyledLink";
// styles import
import "./mobileFooter.css";

const MobileFooter = () => {
  return (
    <footer className="mobile-footer-container">
      <div className="mobile-footer-content-container container">
        <div className="mobile-footer-info-container">
          <div className="mobile-location">
            <h5 className="mobile-info-heading">Location:</h5>
            <p>10, Iluseyi Street, Surulere, Lagos, Nigeria</p>
          </div>

          <div className="mobile-contact">
            <h5 className="mobile-info-heading">For Enquiries:</h5>
            <Link href={`mailto:${brandTokens.agencyEmail}`} target="_blank">
              {brandTokens.agencyEmail}
            </Link>
            <p>+234 813 7427 904</p>
          </div>
        </div>

        <div className="mobile-all-links-container">
          <div className="mobile-social-links-container flex-column">
            <StyledLink path="/" label="WhatsApp" />
            <StyledLink path="/" label="Twitter" />
            <StyledLink path="/" label="Instagram" />
            <StyledLink path="/" label="Facebook" />
          </div>

          <div className="mobile-footer-image-container">
            <Image
              src="/brands-img.webp"
              alt=""
              className="mobile-footer-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>

          <nav className="mobile-footer-links-container">
            <ul className="mobile-footer-links flex-column">
              {linkArray.map(
                ({ path, label }: { path: string; label: string }) => (
                  <li key={path} className="mobile-footer-link-list">
                    <StyledLink path={path} label={label} />
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className="mobile-creator-brand-container">
          <div className="mobile-footer-brand-container">
            <div className="mobile-footer-brand-marquee">
              <h5 className="mobile-footer-brand">
                <span className="mobile-brand-short">
                  {brandTokens.agencyShortName}
                </span>
                <span className="mobile-brand-models">Models</span>
              </h5>
              <h5 className="mobile-footer-brand" aria-hidden="true">
                <span className="mobile-brand-short">
                  {brandTokens.agencyShortName}
                </span>
                <span className="mobile-brand-models">Models</span>
              </h5>
            </div>
          </div>
          <p className="mobile-creator">Website by Joel</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
