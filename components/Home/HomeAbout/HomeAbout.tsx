import Brands from "@/components/Home/Brands/Brands";
import LargeTextBanner from "@/components/utils/LargeTextBanner/LargeTextBanner";

const HomeAbout = () => {
  return (
    <section className="home-about-section">
      <LargeTextBanner texts="Nigeria's first dedicated face modelling agency" />

      <Brands />
    </section>
  );
};

export default HomeAbout;
