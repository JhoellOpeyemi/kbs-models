import { brandTokens } from "@/lib/designTokens";

import "./testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-heading">What they say:</h2>

      <ul className="testimonials-container">
        <li className="testimonial-card">
          <p className="textimonial">
            “{brandTokens.agencyShortName} brings you closer to your dreams. The
            training sessions was awesome and fully loaded with a lot of life &
            career transformation classes. Thank you{" "}
            {brandTokens.agencyShortName} for making me my own super star.”
          </p>

          <p className="testimonial-author">— Lystra</p>
        </li>

        <li className="testimonial-card">
          <p className="textimonial">
            “{brandTokens.agencyShortName} has made a very positive impact in my
            life as model and a person in whole, the academy helps develop your
            skills and self confidence which doesn’t only help in the modeling
            industry but in all aspects of life.”
          </p>

          <p className="testimonial-author">— Segun</p>
        </li>

        <li className="testimonial-card">
          <p className="textimonial">
            “{brandTokens.academyName} gave me a platform to discover myself and
            work towards becoming a professional model to be reckoned with. I’m
            sure I wouldn’t forget the experience in a hurry.”
          </p>

          <p className="testimonial-author">— Juliet</p>
        </li>
      </ul>
    </section>
  );
};

export default Testimonials;
