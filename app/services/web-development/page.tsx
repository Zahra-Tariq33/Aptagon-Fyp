import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import WebHero from "./WebHero";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";

const cardsData = [
  {
    image: "/logos/web-development.png",
    title: "Web Development",
    description:
      "We build responsive, high-performance websites that blend creativity and technology — enhancing user experience and driving consistent business growth.",
  },
  {
    image: "/logos/ui-ux-designing.png",
    title: "UI/UX Designing",
    description:
      "We design intuitive, visually engaging interfaces that combine creativity and strategy — enhancing user satisfaction and ensuring seamless interaction across every digital touchpoint.",
  },
  {
    image: "/logos/business-process-automation.png",
    title: "Business Process Automation",
    description:
      "Streamline operations with intelligent automation solutions. We simplify workflows, cut manual tasks, and boost overall business efficiency and speed.",
  },
];

const Infintecards = [
  {
    image: "/services-images/web-infinite/image-1.png",
    title: "Requirement Analysis",
    description: "Understanding business needs and defining project goals.",
  },
  {
    image: "/services-images/web-infinite/image-2.png",
    title: "Planning & Design",
    description:
      "Creating wireframes, UI/UX prototypes, and tech architecture.",
  },
  {
    image: "/services-images/web-infinite/image-3.png",
    title: "Development",
    description:
      "Coding scalable, clean, and efficient solutions using modern frameworks.",
  },
  {
    image: "/services-images/web-infinite/image-4.png",
    title: "Testing & QA",
    description:
      "Ensuring functionality, performance, and security before launch.",
  },
  {
    image: "/services-images/web-infinite/image-5.png",
    title: "Deployment",
    description: "Seamless integration and cloud setup for production.",
  },
  {
    image: "/services-images/web-infinite/image-6.png",
    title: "Support & Maintenance",
    description: "Continuous optimization and post-launch support",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />

      <WebHero />

      <TwoSectionCTA
        tagline="Web Development"
        heading="Build Dynamic, Scalable, and High-Performance Web Applications"
        description="At Aptagon Technologies, we create custom web solutions that go beyond aesthetics — built to perform seamlessly across all devices and platforms. From responsive websites to enterprise-grade applications, our team delivers clean, efficient code, intuitive interfaces, and future-ready architectures. Whether you're building from scratch or upgrading an existing system, we ensure your web solution enhances engagement, streamlines operations, and scales effortlessly with your business growth."
        imageSrc="/services-images/web.jpg"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision into powerful, scalable software solutions that drive innovation and deliver real business impact."
        cards={cardsData}
      />

      <CoreTechnologies />

      <InfiniteMovingCards
        cards={Infintecards}
        speed={60}
        heading="Our Web Development Process"
        subheading="We follow a structured, agile process to ensure quality, transparency, and on-time delivery."
      />

      <Footer />
    </>
  );
}

export default page;