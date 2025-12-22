import Header from "./Header";
import NewFooter from "./NewFooter";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import FaqSection from "./FAQSection";
import Services from "./QuickServices/services";
import SupportChatBot from "./SupportChatBot";
import Discount from "./Discount";
import ContactForm from "./ContactForm";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
<div id="hero" className="md:py-22"><HeroSection /></div>
<Discount/>
<div id="why-us"><AboutSection /></div>
<div id="services"><Services/></div>
<FaqSection />
<ContactForm/>
<NewFooter/>
<SupportChatBot/>
    </div> 
  );
};

export default LandingPage;
