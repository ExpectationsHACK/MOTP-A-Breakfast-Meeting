import Nav from "@/components/marketing/Nav";
import Hero from "@/components/marketing/Hero";
import EventDetails from "@/components/marketing/EventDetails";
import RegistrationCard from "@/components/marketing/RegistrationCard";
import WhyItMatters from "@/components/marketing/WhyItMatters";
import TheProblem from "@/components/marketing/TheProblem";
import ThePromise from "@/components/marketing/ThePromise";
import WhoShouldAttend from "@/components/marketing/WhoShouldAttend";
import Experience from "@/components/marketing/Experience";
import CoreSolution from "@/components/marketing/CoreSolution";
import WhatWePrayAbout from "@/components/marketing/WhatWePrayAbout";
import AboutMotp from "@/components/marketing/AboutMotp";
import RegistrationSection from "@/components/marketing/RegistrationSection";
import FAQ from "@/components/marketing/FAQ";
import ClosingCta from "@/components/marketing/ClosingCta";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EventDetails />
        <RegistrationCard />
        <WhyItMatters />
        <TheProblem />
        <ThePromise />
        <WhoShouldAttend />
        <Experience />
        <CoreSolution />
        <RegistrationSection />
        <WhatWePrayAbout />
        <AboutMotp />
        <FAQ />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
