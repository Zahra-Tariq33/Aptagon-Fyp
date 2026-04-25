"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";

const faqs = [
  {
    question: "What services does Aptagon Technologies provide?",
    answer: "Aptagon Technologies offers web development, mobile app development, custom software, UI/UX design, digital marketing, and IT consulting solutions.",
  },
  {
    question: "Do you develop custom software?",
    answer: "Yes, we specialize in developing custom software solutions tailored to your business needs.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Project timelines vary depending on complexity, requirements, and scope. We provide clear timelines after requirement analysis.",
  },
  {
    question: "How is project pricing decided?",
    answer: "Pricing is based on project scope, complexity, technologies used, and timeline.",
  },
  {
    question: "Can you upgrade or improve an existing website or app?",
    answer: "Yes, we can enhance performance, UI/UX, features, and security of existing websites or applications.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#F8FAFC] dark:bg-[#121212] py-24 transition-colors duration-300 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#214F65] dark:text-white tracking-tight">
            Frequently <span className="text-[#0EBAB0]">Asked Questions</span>
          </h2>
          <p className=" dark:text-white mt-4 text-lg">Find answers to the most common questions about our services and development process.</p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                // MOVE FROM LEFT TO RIGHT ANIMATION
                initial={{ opacity: 0, x: -100 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1, 
                  ease: "easeOut" 
                }}
                viewport={{ once: false, amount: 0.2 }}
                
                className={`relative rounded-[24px] transition-all duration-500 overflow-hidden border-[3px]
                  ${isOpen 
                    ? "border-[#0EBAB0] bg-white dark:bg-[#1E1E1E] shadow-[0_30px_60px_-15px_rgba(14,186,176,0.25)] scale-[1.02] z-10" 
                    : "border-white dark:border-[#2D2D2D] bg-white dark:bg-[#1E1E1E] shadow-[0_10px_25px_rgba(0,0,0,0.05)] scale-100"
                  }`}
              >
                {/* Question Area */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors duration-300 
                    ${isOpen ? "text-[#0EBAB0]" : "text-[#214F65] dark:text-gray-200"}`}>
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ 
                      rotate: isOpen ? 45 : 0,
                      backgroundColor: isOpen ? "#0EBAB0" : "#F1F5F9",
                      color: isOpen ? "#ffffff" : "#214F65"
                    }}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all shadow-sm"
                  >
                    <IoAdd className="text-2xl" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { duration: 0.3, ease: "easeInOut" }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2">
                        <div className="flex gap-4">
                          <div className="w-1.5 rounded-full bg-[#0EBAB0] h-auto" />
                          <p className="text-lg leading-relaxed dark:text-white-400 ">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}