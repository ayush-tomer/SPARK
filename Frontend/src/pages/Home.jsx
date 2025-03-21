import HeroSection from "../components/Home/HeroSection";
import Workflow from "../components/Home/Workflow";
import Testimonials from "../components/Home/Testimonials";
import AboutUs from "../components/Home/AboutUs";
import HomeEvent from "../components/Home/HomeEvent";

function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <HomeEvent />
      <Workflow />
      <Testimonials />
    </>
  );
}

export default Home;
