import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import LlmHero from "./LlmHero";

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

const Infintecards = [
  {
    image: "/services-images/llm-infinite/image-1.png",
    title: "Custom Model Development",
    description:
      "Build LLMs tailored to your specific business data and needs.",
  },
  {
    image: "/services-images/llm-infinite/image-2.png",
    title: "Model Fine-Tuning",
    description:
      "Optimize existing models like GPT, LLaMA, or Falcon for industry-specific use cases",
  },
  {
    image: "/services-images/llm-infinite/image-3.png",
    title: "Prompt Engineering",
    description:
      "Design effective prompt structures for accurate, contextual responses.",
  },
  {
    image: "/services-images/llm-infinite/image-4.png",
    title: "Data Preparation & Training",
    description:
      "Curate and preprocess high-quality datasets for efficient model training.",
  },
  {
    image: "/services-images/llm-infinite/image-5.png",
    title: "API Integration",
    description:
      "Seamlessly connect your LLMs with internal tools and customer-facing systems.",
  },
  {
    image: "/services-images/llm-infinite/image-6.png",
    title: "Model Evaluation & Monitoring",
    description:
      "Continuously assess performance and optimize for accuracy, speed, and safety.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />
      {/* <AnimatedHeroSection
        heading="LLM Development & Training"
        description="Empowering businesses with intelligent, domain-specific LLMs designed to understand context, generate insights, and automate complex tasks with precision."
        contentAlignment="center"
        height="h-[550px]"
      /> */}
      <LlmHero/>
      <TwoSectionCTA
        tagline="LLM Development & Training"
        heading="Empower Your Business with Intelligent AI Solutions"
        description="At Aptagon Technologies, we build and fine-tune Large Language Models (LLMs) tailored to your business goals. Our AI experts use machine learning, NLP, and deep learning to create intelligent systems that understand and respond to human language with accuracy. From custom chatbots to AI automation, content generation, and data analysis, we design scalable solutions that boost efficiency and innovation. With responsible AI practices and domain-focused training, we partner with you to bring generative AI into your workflow and lead the next wave of intelligent transformation."
        imageSrc="/services-images/llm.png"
        buttonLink="/reach-us"
      />
      <FeatureSection
        heading="End-to-End LLM Development and Fine-Tuning Services"
        description="From model selection to fine-tuning and deployment, we help you leverage advanced language models for real business impact."
        cards={cardsData}
      />
      <CoreTechnologies />
      <section className="py-10 bg-white">
        <InfiniteMovingCards
          cards={Infintecards}
          speed={60} // optional, defaults to 60
          heading="Our AI Development Process"
          subheading="We follow a strategic, data-driven approach to design, train, and deploy AI models that deliver real business value."
        />
      </section>
      <Footer />
    </>
  );
}

export default page;
