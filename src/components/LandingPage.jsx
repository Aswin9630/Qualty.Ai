import Header from "./Header";
import NewFooter from "./NewFooter";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import FaqSection from "./FAQSection";
import Services from "./QuickServices/services";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
<div id="hero" className="md:py-22"><HeroSection /></div>
<div id="why-us"><AboutSection /></div>
<div id="services"><Services/></div>
<FaqSection />
<NewFooter/>
    </div> 
  );
};

export default LandingPage;
