import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import React from "react";
import UiUxHero from "./UiHero";

const cardsData = [
  {
    image: "/logos/software-quality-assurance.png",
    title: "Software Quality Assurance",
    description:
      "Ensure reliability through advanced QA testing services. We deliver secure, high-quality software that performs efficiently and flawlessly.",
  },
  {
    image: "/logos/LLM-development & training.png",
    title: "LLM Development & Training",
    description:
      "Develop tailored Large Language Models that enhance automation, communication, and intelligent business decision-making.",
  },
  {
    image: "/logos/chatbot-development.png",
    title: "Chatbot Development",
    description:
      "Engage customers 24/7 through advanced AI-powered chatbots that manage support, queries, and lead generation with smart precision.",
  },
];
const Infintecards = [
  {
    image: "/services-images/uiux-infinite/image-1.png",
    title: "Research & Discovery",
    description: "Understanding users, business goals, and competitors.",
  },
  {
    image: "/services-images/uiux-infinite/image-2.png",
    title: "Information Architecture",
    description: "Structuring content and user flows for clarity.",
  },
  {
    image: "/services-images/uiux-infinite/image-3.png",
    title: "Wireframing",
    description: "Low-fidelity layouts to define structure and usability.",
  },
  {
    image: "/services-images/uiux-infinite/image-4.png",
    title: "Visual Design",
    description: "High-fidelity UI design aligned with brand identity.",
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

      {/* <AnimatedHeroSection
        heading="UI/UX Design"
        description="Designing intuitive, engaging, and user-centered digital experiences."
        contentAlignment="center"
        height="h-[550px]"
      /> */}
<UiUxHero/>
      <TwoSectionCTA
        tagline="UI/UX Design"
        heading="Crafting Digital Experiences That Inspire Engagement"
        description="Our UI/UX design services are centered on a deep understanding of user behavior, business objectives, and evolving market needs. We meticulously analyze user interactions and preferences to craft intuitive interfaces that resonate with your target audience. By combining thoughtful design principles with innovative strategies, we create seamless digital experiences that not only enhance usability but also drive engagement and boost customer satisfaction."
        imageSrc="/services-images/ui-ux.png"
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
        heading="Our UI/UX Process"
        subheading="We follow a structured, agile process to ensure quality, transparency, and on-time delivery."
      />

      <Footer />
    </>
  );
}

export default page;
