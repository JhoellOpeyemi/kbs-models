import { brandTokens } from "@/lib/designTokens";

import "./applyText.css";

const ApplyText = () => {
  return (
    <section className="apply-text-container">
      <p className="apply-text">
        At {brandTokens.agencyName}, modelling is an art form.
      </p>
      <p className="apply-text">
        We refine talent, nurture individuality, and prepare our models to lead
        in a world of beauty, fashion, and culture. From the runways to
        editorials, we represent more than faces — we represent a vision of
        excellence.
      </p>
    </section>
  );
};

export default ApplyText;
