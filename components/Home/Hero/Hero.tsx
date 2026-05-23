import Image from "next/image";

import "./hero.css";

import SplitText from "@/components/utils/SplitText";
import StyledLink from "@/components/utils/StyledLink/StyledLink";

const Hero = () => {
  return (
    <>
      <section className="hero-container">
        <div className="hero-heading-subtitle-container flex-column">
          <h1 className="hero-heading">
            <div>
              <SplitText
                text="The right face for every shoot"
                splitType="words"
              />
            </div>
          </h1>

          <p className="hero-subtitle">
            Connecting talented faces with top makeup artists, photographers,
            and beauty brands across the globe.
          </p>

          <div className="cta-container flex-column">
            <StyledLink path="/apply" label="Become a model" />
            <StyledLink path="/models" label="Book a model" />
          </div>
        </div>

        <div className="hero-image-container">
          <Image
            src="/brands-img.webp"
            alt=""
            className="hero-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />
          <div className="overlay"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;
