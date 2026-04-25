import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import MobileHero from "./MobileHero";

const cardsData = [
  {
    image: "/logos/chatbot-development.png",
    title: "Chatbot Development",
    description:
      "Engage customers 24/7 through advanced AI-powered chatbots that manage support, queries, and lead generation with smart precision.",
  },
  {
    image: "/logos/AI & generative-solutions.png",
    title: "AI & Generative Solutions",
    description:
      "Empower your business with powerful AI-driven innovation. We deliver smart, generative solutions for automation, insights, and sustainable growth.",
  },
  {
    image: "/logos/business-process-automation.png",
    title: "Business Process Automation",
    description:
      "Streamline operations with intelligent automation solutions. We simplify workflows, cut manual tasks, and boost overall business efficiency and speed.",
  },
];

const InfiniteCards = [
  {
    image: "/services-images/mobile-infinite/image-1.png",
    title: "Requirement Analysis",
    description:
      "Understanding user needs, business goals, and platform requirements.",
  },
  {
    image: "/services-images/mobile-infinite/image-2.png",
    title: "UI/UX Design",
    description:
      "Designing intuitive user flows, wireframes, and interactive prototypes.",
  },
  {
    image: "/services-images/mobile-infinite/image-3.png",
    title: "App Development",
    description:
      "Building scalable Android & iOS apps using modern frameworks.",
  },
  {
    image: "/services-images/mobile-infinite/image-4.png",
    title: "Testing & QA",
    description: "Ensuring performance, security, and device compatibility.",
  },
  {
    image: "/services-images/web-infinite/image-5.png",
    title: "App Store Deployment",
    description: "Publishing apps on Google Play Store & Apple App Store.",
  },
  {
    image: "/services-images/web-infinite/image-6.png",
    title: "Support & Updates",
    description:
      "Ongoing maintenance, performance optimization, and feature updates.",
  },
];

function Page() {
  return (
    <>
      <TransparentNavbar />

      {/* <AnimatedHeroSection
        heading="Mobile App Development"
        description="Transforming ideas into scalable, secure, and high performance mobile applications."
        contentAlignment="center"
        height="h-[550px]"
      /> */}

      <MobileHero/>

      <TwoSectionCTA
        tagline="Mobile App Development"
        heading="Build Powerful, Scalable, and User Focused Mobile Applications"
        description="We design and develop high-performance mobile applications that are strategically tailored to your unique business goals and user needs. From initial concept ideation and intuitive UI/UX design to robust development, rigorous testing, and smooth deployment, we manage the entire mobile app lifecycle with precision and care. Our solutions are engineered to deliver seamless, engaging user experiences, optimized performance, and long-term scalability—ensuring exceptional results."
        imageSrc="/services-images/mobile-app-development.png"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision into powerful, scalable software solutions that drive innovation and deliver real business impact."
        cards={cardsData}
      />

      <CoreTechnologies />

      <section className="py-10 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <InfiniteMovingCards
          cards={InfiniteCards}
          speed={60}
          heading="App Development Process"
          subheading="Our Mobile App Development Process"
        />
      </section>

      <Footer />
    </>
  );
}

export default Page;
