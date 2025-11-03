import Header from "./Header";
import NewFooter from "./NewFooter";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import FaqSection from "./FAQSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
<div id="hero"><HeroSection /></div>
<div id="why-us"><AboutSection /></div>
<div id="services"><ServicesSection /></div>
<FaqSection />
<NewFooter/>
    </div> 
  );
};

export default LandingPage;
