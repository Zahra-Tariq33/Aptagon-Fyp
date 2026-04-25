"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ================= SERVICE CARD COMPONENT ================= */

const ServiceCard = ({ index, icon, title, description, link }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover="hover"
      className="relative mt-4 w-full cursor-pointer group"
    >
      {/* --- DIAMOND COMPONENT --- */}
      <motion.div
        initial={{ y: 0, x: "-50%", scale: 1 }}
        variants={{
          hover: {
            y: 65,
            x: "-50%",
            scale: 0.85,
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
          }
        }}
        className="absolute -top-10 left-1/2 z-40 pointer-events-none"
      >
        <motion.div
          variants={{
            hover: {
              background: "#ffffff",
              boxShadow: "0px 20px 40px rgba(14, 186, 176, 0.4)",
              transition: { duration: 0.4 }
            }
          }}
          className="relative w-20 h-20 flex items-center justify-center rotate-45 shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-[18px] overflow-hidden bg-gradient-to-br from-[#0EBAB0] to-[#06544F]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-50 group-hover:opacity-0 transition-opacity" />

          <motion.div
            variants={{
              hover: { filter: "brightness(1) invert(0)", scale: 1.1 }
            }}
            style={{ filter: "brightness(0) invert(1)" }}
            className="-rotate-45 flex items-center justify-center z-10 transition-all duration-300"
          >
            {icon}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- FRONT SIDE --- */}
      <div className="p-[1.5px] rounded-[60px_0px_0px_0px] bg-gradient-to-br from-[#0EBAB0] to-[#06544F] shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
        <div
          className="relative z-10 flex flex-col items-center bg-white px-4 pt-16 pb-8 transition-all duration-500"
          style={{ borderRadius: "58px 0px 0px 0px", minHeight: "380px" }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#0EBAB0]/5 rounded-full blur-3xl" />

          <div className="text-center flex flex-col items-center group-hover:opacity-0 transition-all duration-500 h-full transform group-hover:scale-95">
            <h3 className="text-[17px] font-extrabold text-[#214F65] mb-3 pt-6 leading-tight tracking-tight h-12 flex items-center">
              {title}
            </h3>

            <div className="h-[5px] w-[40%] bg-gradient-to-b from-[#0EBAB0] to-[#06544F] mb-4 rounded-full" />

            <p className="text-[14px] font-medium leading-relaxed px-2 text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* --- HOVER BACK SIDE --- */}
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        variants={{
          hover: { clipPath: "inset(0% 0% 0% 0%)" }
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 z-20 flex flex-col p-[1.5px] bg-gradient-to-br from-[#0EBAB0] to-[#06544F] overflow-hidden"
        style={{ borderRadius: "60px 0px 0px 0px" }}
      >
        <div
          className="w-full h-full bg-white relative flex flex-col overflow-hidden"
          style={{ borderRadius: "58px 0px 0px 0px" }}
        >
          <div className="relative h-44 bg-gradient-to-b from-[#0EBAB0] to-[#06544F] flex flex-col items-center justify-center shrink-0">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div
              className="absolute -bottom-1 left-0 w-full h-14 bg-white"
              style={{
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                transform: "scaleX(1.4)"
              }}
            />
          </div>

          <div className="flex flex-col items-center text-center flex-grow justify-start pt-4">
            <h3 className="text-[16px] font-bold mb-2 leading-tight z-10 drop-shadow-md px-4 text-[#214F65]">
              {title}
            </h3>

            <div className="h-[5px] w-[40%] bg-gradient-to-b from-[#0EBAB0] to-[#06544F] mb-4 rounded-full" />

            <a href={link}>
              <button className="bg-[#0EBAB0] mt-6 text-white px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#214F65] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(14,186,176,0.3)]">
                VIEW DETAILS
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ================= MAIN SERVICES SECTION ================= */

export default function ServicesSection() {

  const iconStyle = "h-10 w-10 object-contain";

  const servicesData = [
    {
      icon: <Image className={iconStyle} src="/logos/web-development.png" alt="Web" width={44} height={44} />,
      title: "Web Development",
      link: "services/web-development",
      description: "We build responsive, high-performance websites that blend creativity and technology — enhancing user experience and driving consistent business growth."
    },
    {
      icon: <Image className={iconStyle} src="/logos/mobile-app-development.png" alt="App" width={44} height={44} />,
      title: "Mobile App Development",
      link: "services/mobile-apps",
      description: "We develop powerful, user-friendly mobile applications that combine innovation and performance — delivering seamless experiences and helping businesses connect, engage, and grow on every device."
    },
    {
      icon: <Image className={iconStyle} src="/logos/ui-ux-designing.png" alt="UI" width={44} height={44} />,
      title: "UI/UX Designing",
      link: "services/ui-ux",
      description: "We design intuitive, visually engaging interfaces that combine creativity and strategy — enhancing user satisfaction and ensuring seamless interaction across every digital touchpoint."
    },
    {
      icon: <Image className={iconStyle} src="/logos/business-process-automation.png" alt="Process" width={44} height={44} />,
      title: "Business Process Automation",
      link: "services/business-process-automation",
      description: "Streamline operations with intelligent automation solutions. We simplify workflows, cut manual tasks, and boost overall business efficiency and speed."
    },
    {
      icon: <Image className={iconStyle} src="/logos/software-quality-assurance.png" alt="QA" width={44} height={44} />,
      title: "Software Quality Assurance",
      link: "services/sqa",
      description: "Ensure reliability through advanced QA testing services. We deliver secure, high-quality software that performs efficiently and flawlessly."
    },
    {
      icon: <Image className={iconStyle} src="/logos/LLM-development & training.png" alt="LLM" width={44} height={44} />,
      title: "LLM Development & Training",
      link: "services/llm-development",
      description: "Develop tailored Large Language Models that enhance automation, communication, and intelligent business decision-making."
    },
    {
      icon: <Image className={iconStyle} src="/logos/chatbot-development.png" alt="Bot" width={44} height={44} />,
      title: "Chatbot Development",
      link: "services/chatbots",
      description: "Engage customers 24/7 through advanced AI-powered chatbots that manage support, queries, and lead generation with smart precision."
    },
    {
      icon: <Image className={iconStyle} src="/logos/AI & generative-solutions.png" alt="AI" width={44} height={44} />,
      title: "AI & Generative Solutions",
      link: "services/ai-solutions",
      description: "Empower your business with powerful AI-driven innovation. We deliver smart, generative solutions for automation, insights, and sustainable growth."
    }
  ];

  return (
    <section id="services" className="relative w-full bg-[#FDFDFD] px-4 py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#214F65] tracking-tight mb-6 leading-[1.1]">
            End-to-End
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EBAB0] to-[#06544F]">
              {" "}Technology Services
            </span>
          </h2>

          <p className="max-w-4xl mx-auto font-medium px-4 text-lg text-slate-500">
            From conceptualization to deployment, we provide the technical expertise to build and manage your digital ecosystem.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 items-stretch px-4 md:px-12">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}