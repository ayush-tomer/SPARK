import HeroSection from "../components/Home/HeroSection";
import Workflow from "../components/Home/Workflow";
import Testimonials from "../components/Home/Testimonials";
import AboutUs from "../components/AboutUs";

function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Workflow />
      <Testimonials />
    </>
  );
}

export default Home;
