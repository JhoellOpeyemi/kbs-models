import { brandTokens } from "@/lib/designTokens";

import "./aboutIntro.css";

const About = () => {
  return (
    <section className="about-container">
      <h1 className="about-heading page-heading">
        About <br /> Our Agency
      </h1>

      <div className="about-text-container">
        <p className="about-text">
          {brandTokens.agencyName} did not start in a boardroom. It started with
          a problem.
        </p>

        <p className="about-text">
          In 2015, Adewara Christiana Semilore — then a student at Lagos State
          University and a freshly crowned beauty queen — began picking up face
          modelling jobs to support herself through school. She was good at it.
          Word spread. Friends and coursemates started asking if she could bring
          them in. She said yes, and then she realised: there was no structure
          in Lagos for this. No agency specifically built for face modelling. No
          platform that connected models with the makeup artists, photographers,
          and beauty brands who needed them — without demanding that the models
          be a certain height, a certain size, or have years of runway
          experience. So, she built one.
        </p>

        <p className="about-text">
          At {brandTokens.agencyShortName}, we do one thing exceptionally well:
          face modelling.
        </p>

        <p className="about-text">
          We represent models and connect them with the clients who need them —
          makeup artists shooting content, photographers building portfolios,
          skincare brands launching campaigns, beauty entrepreneurs shooting
          product tutorials, and editorial teams producing lookbooks.
        </p>

        <p className="about-text">
          For models, we offer a genuine, structured path into paid modelling
          work — without height requirements, without upfront registration fees,
          and without the gatekeeping that has historically made modelling
          inaccessible to many. We work with students, working professionals,
          and experienced models alike.
        </p>

        <p className="about-text">
          For clients, we offer speed, variety, and reliability. When you book
          through {brandTokens.agencyShortName}, you get access to a curated
          roster of vetted face models across multiple cities, a straightforward
          booking process via direct message, and the assurance that comes with
          working with Nigeria's most established face modelling agency.
        </p>
      </div>
    </section>
  );
};

export default About;
