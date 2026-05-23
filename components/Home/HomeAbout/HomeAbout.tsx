import "./homeAbout.css";
import Brands from "@/components/Home/Brands/Brands";

const HomeAbout = () => {
  return (
    <section className="home-about-section">
      <h3 className="home-about-text">
        Nigeria's first dedicated face modelling agency
      </h3>

      <Brands />
    </section>
  );
};

export default HomeAbout;
