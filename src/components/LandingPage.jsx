import Header from "./Header";
import NewFooter from "./NewFooter";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/> 
      <NewFooter/>
    </div>
  );
};

export default LandingPage;
