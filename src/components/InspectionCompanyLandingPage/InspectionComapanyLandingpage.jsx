import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import PaymentModel from "./sections/PaymentModel";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import WhyQualtyAI from "./sections/WhyQualtyAI";
import GlobalMarketplace from "./sections/GlobalMarketplace";
import CTA from "./sections/CTA";
import QuickInspection from "./sections/QuickInspection";
import { Footer } from "../NewHomePage/app/components/Footer";

export default function InspectionComapanyLandingpage() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <section id="quick-service">

      <QuickInspection />
      </section>
      <section id="what-you-get">
        <PaymentModel />
      </section>
      <Features />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="why-qualtyAi">
        <WhyQualtyAI />
      </section>
      <GlobalMarketplace />
      <CTA />
      <Footer/>
    </div>
  );
}
