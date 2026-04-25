import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import AiHero from "./AiHero";

const cardsData = [
  {
    image: "/logos/software-quality-assurance.png",
    title: "Predictive Analytics & Insights",
    description:
      "Leverage data-driven intelligence to forecast trends. We deliver secure, high-quality AI systems that perform efficiently and provide actionable business foresight.",
  },
  {
    image: "/logos/LLM-development & training.png",
    title: "LLM Development & Training",
    description:
      "Develop tailored Large Language Models that enhance automation, communication, and intelligent business decision-making through advanced linguistic processing.",
  },
  {
    image: "/logos/chatbot-development.png",
    title: "Intelligent Agent Solutions",
    description:
      "Engage customers 24/7 through advanced AI-powered agents that manage support, queries, and lead generation with smart precision and natural interactions.",
  },
];

const Infintecards = [
  {
    image: "/services-images/ai-infinite/image-1.png",
    title: "Strategy & AI Roadmap",
    description: "Identify high-impact AI use cases and define clear technical objectives.",
  },
  {
    image: "/services-images/ai-infinite/image-2.png",
    title: "Data Engineering",
    description:
      "Acquire and refine high-quality datasets to ensure model accuracy and ethics.",
  },
  {
    image: "/services-images/ai-infinite/image-3.png",
    title: "Model Architecture",
    description: "Design bespoke neural networks and algorithms tailored to your industry.",
  },
  {
    image: "/services-images/ai-infinite/image-4.png",
    title: "Fine-Tuning & Validation",
    description: "Optimize AI model performance through rigorous training and feedback loops.",
  },
  {
    image: "/services-images/ai-infinite/image-5.png",
    title: "Seamless Integration",
    description:
      "Deploy intelligent systems into existing cloud stacks and enterprise workflows.",
  },
  {
    image: "/services-images/ai-infinite/image-6.png",
    title: "Optimization & Scaling",
    description: "Continuously monitor and refine AI outputs to adapt to evolving markets.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />
      {/* AiHero handles the custom event to open the navbar dropdown */}
      <AiHero/>
     <TwoSectionCTA
  tagline="Next-Gen AI & Generative Systems"
  heading="Accelerate Innovation with Enterprise-Grade AI"
  description={[
  "At Aptagon Technologies, we bridge the gap between complex data and actionable intelligence by transforming raw information into high-performance business assets. Our AI Engineering framework is built on the dual pillars of Neural Integration and Scalable Architectures, ensuring that every solution we deploy is not only intelligent but also capable of growing alongside your enterprise. We move beyond the industry standard of basic automation, focusing instead on creating self-optimizing ecosystems that drive sustainable innovation. By leveraging advanced generative models and deep learning protocols, we empower decision-makers with foresight that was previously unattainable."
]}
  imageSrc="/services-images/ai.png"
  buttonText="Get Started"
  buttonLink="/schedule-call"
/>
      <FeatureSection
        heading="Smart AI Solutions for the Modern Enterprise"
        description="From autonomous agents to generative content, our AI-driven solutions redefine how businesses innovate, operate, and scale in the digital age."
        cards={cardsData}
      />
      <CoreTechnologies />
      <section className="py-10 bg-white">
        <InfiniteMovingCards
          cards={Infintecards}
          speed={60} 
          heading="Our AI Development Lifecycle"
          subheading="We follow a strategic, data-centric approach to design, train, and deploy generative models that deliver tangible business value and innovation."
        />
      </section>
      <Footer />
    </>
  );
}

export default page;