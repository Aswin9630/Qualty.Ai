import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhatIsQualty } from "./components/WhatIsQualty";
import { ProblemSection } from "./components/ProblemSection";
import { WhyUs } from "./components/WhyUs";
import { WhoWeServe } from "./components/WhoWeServe";
import { TrustedBy } from "./components/TrustedBy";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import Journey from "./components/Journey";
 
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Header />
      <main>
        <Hero />
        <WhatIsQualty />
        <ProblemSection />
        <WhyUs />
        <WhoWeServe />
        <TrustedBy />
        <FinalCTA />
        <Journey/>
      </main>
      <Footer />
    </div>
  );
}
