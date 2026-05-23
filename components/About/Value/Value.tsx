import Image from "next/image";
import StyledLink from "@/components/utils/StyledLink/StyledLink";

import "./value.css";
import { brandTokens } from "@/lib/designTokens";

const Value = () => {
  return (
    <section className="value-container">
      <h2 className="value-heading">Our Values</h2>

      <div className="value-image-container">
        <Image src="/brands-img.webp" alt="" fill className="value-image" />
      </div>

      <div className="value-text-container">
        <p>
          <span>Accessibility. </span> We believe great modelling should not be
          gatekept by height charts or body measurements. If your face is your
          gift, {brandTokens.agencyShortName} gives you a platform.
        </p>

        <p>
          <span>Professionalism. </span> Every model on our roster is vetted.
          Every booking is handled with care.
        </p>

        <p>
          <span>Opportunity. </span> {brandTokens.agencyShortName} began as a
          way to create income for students who had something to offer. That
          spirit has never left us. We actively scout from campuses,
          communities, and everyday life — because extraordinary faces are
          everywhere.
        </p>

        <p>
          <span>Integrity. </span> {brandTokens.agencyShortName} does not charge
          models registration fees. We are commission-based. We succeed when our
          models succeed, and that alignment is the foundation of everything we
          do.
        </p>

        <StyledLink path="/apply" label="Become a model" />
      </div>
    </section>
  );
};

export default Value;
