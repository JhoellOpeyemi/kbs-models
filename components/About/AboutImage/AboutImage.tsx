import Image from "next/image";

import "./aboutImage.css";
import LargeTextBanner from "@/components/utils/LargeTextBanner/LargeTextBanner";

const AboutImage = () => {
  return (
    <div className="about-image-container">
      <div className="about-image">
        <Image src="/brands-img.webp" alt="" fill />
      </div>

      <LargeTextBanner texts="Modelling agency that shapes talent into global icons" />
    </div>
  );
};

export default AboutImage;
