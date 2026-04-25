"use client";

import Footer from "@/app/components/Footer";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import SqaHero from "./SqaHero";

const cardsData = [
  {
    image: "/logos/mobile-app-development.png",
    title: "Mobile App Development",
    description:
      "Crafting high-performance, intuitive mobile applications that deliver seamless experiences and drive user engagement across all devices.",
  },
  {
    image: "/logos/ui-ux-designing.png",
    title: "UI/UX Designing",
    description:
      "Designing visually striking and user-friendly interfaces that enhance usability, boost engagement, and provide consistent digital experiences.",
  },
  {
    image: "/logos/software-quality-assurance.png",
    title: "Software Quality Assurance",
    description:
      "Delivering reliable, secure, and bug-free software through rigorous QA testing and continuous quality improvements.",
  },
];

const infiniteCards = [
  {
    image: "/services-images/sqa-infinite/image-1.png",
    title: "Requirement Analysis",
    description: "Understand software objectives, target users, and testing scope.",
  },
  {
    image: "/services-images/sqa-infinite/image-2.png",
    title: "Test Planning",
    description: "Define strategies, tools, and test cases.",
  },
  {
    image: "/services-images/ai-infinite/image-3.png",
    title: "Testing Setup",
    description: "Prepare test data and simulation environments.",
  },
  {
    image: "/services-images/ai-infinite/image-4.png",
    title: "Execution & Reporting",
    description: "Conduct manual and automated tests, documenting results.",
  },
  {
    image: "/services-images/sqa-infinite/image-5.png",
    title: "Bug Fixing & Re-Testing",
    description: "Collaborate with developers to ensure zero defects.",
  },
  {
    image: "/services-images/sqa-infinite/image-6.png",
    title: "Final Delivery & Optimization",
    description: "Validate stability and deliver a polished final product.",
  },
];

export default function Page() {
  return (
    <>
      <TransparentNavbar />
      <SqaHero />

      <TwoSectionCTA
        tagline="Software Quality Assurance"
        heading="Build Trust, Minimize Risk, and Deliver Flawless Customer Experiences"
        description="At Aptagon Technologies, we transform how businesses deliver software using advanced QA methodologies and continuous delivery pipelines. Our quality solutions integrate seamlessly for instant, accurate, and reliable feedback across the entire SDLC."
        imageSrc="/services-images/sqa.png"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Comprehensive Quality Assurance & Delivery Services"
        description="From functionality to performance, we ensure your software meets the highest quality standards and delivers exceptional user experiences."
        cards={cardsData}
      />

      <CoreTechnologies />

      <section className="py-10 bg-white">
        <InfiniteMovingCards
          cards={infiniteCards}
          speed={60}
          heading="Our QA Delivery Process"
          subheading="A structured, quality-first approach that ensures transparency, stability, and measurable outcomes."
        />
      </section>

      <Footer />
    </>
  );
}

