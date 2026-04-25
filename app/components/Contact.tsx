"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineEmail, MdPhoneInTalk } from "react-icons/md";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import ConnectCard from "./ConnectCard";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projectTypes = [
    "Web Development", "Mobile App", "AI Solutions",
    "UI/UX Design", "Automation", "Other",
  ];

  // Compact Input Styles
  const inputStyles = "w-full bg-white dark:bg-[#1f1f1f] px-6 py-3 rounded-2xl border border-gray-100 dark:border-transparent shadow-[0_5px_15px_rgba(0,0,0,0.05)] text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0EBAB0]/20 transition-all placeholder-gray-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Demo logic
  };

  return (
    <div className="bg-[#f0f7ff] dark:bg-[#0f0f0f] py-12 md:py-16 px-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mx-auto bg-white dark:bg-[#141414] rounded-[35px] shadow-xl p-6 md:p-10 lg:p-12 relative overflow-hidden"
      >
        {/* Header - More Compact */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1F4B5A] dark:text-white tracking-tight">
           Let’s Build <span className="text-[#0EBAB0]">Something Exceptional</span>
          </h2>
          <div className="w-12 h-1 bg-[#0EBAB0] mx-auto mt-2 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
          
          {/* Left Side - Info Column */}
          <div className="lg:w-[35%] flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 pb-8 lg:pb-0 lg:pr-8">
            <InfoItem icon={<MdPhoneInTalk />} title="Call Us" value="+44 7882 610679" />
            <InfoItem icon={<MdOutlineEmail />} title="Email" value="contact@aptagon.com" />
            <InfoItem icon={<IoLocationOutline />} title="Visit Us" value="Dallas, USA | Poole, UK" />
            
            <div className="mt-auto pt-6">
              <ConnectCard />
            </div>
          </div>

          {/* Right Side - Form Column */}
          <form onSubmit={handleSubmit} className="lg:w-[65%] flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" placeholder="Name *" required className={inputStyles} />
              <input type="email" name="email" placeholder="Email *" required className={inputStyles} />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${inputStyles} text-left flex justify-between items-center`}
              >
                <span className={formData.subject ? "text-gray-700 dark:text-gray-200" : "text-gray-400"}>
                  {formData.subject || "Select Project Type"}
                </span>
                <IoChevronDown className={`text-[#0EBAB0] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 bg-white dark:bg-[#222] rounded-xl shadow-2xl border border-gray-50 dark:border-gray-800 mt-2 z-50 max-h-48 overflow-y-auto"
                  >
                    {projectTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => { setFormData({ ...formData, subject: type }); setIsDropdownOpen(false); }}
                        className="px-6 py-2.5 hover:bg-[#0EBAB0]/10 hover:text-[#0EBAB0] cursor-pointer text-sm text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        {type}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              name="message" placeholder="Briefly describe your project..." rows={4} required
              className={`${inputStyles} rounded-2xl resize-none`}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full sm:w-max bg-[#214F65] hover:bg-[#0EBAB0] text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg transition-all"
            >
              {loading ? "Sending Message..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

/* Info Item - Scaled Down */
const InfoItem = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0 w-11 h-11 bg-[#214F65]/5 dark:bg-[#0EBAB0]/10 text-[#214F65] dark:text-[#0EBAB0] rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <p className="font-bold text-sm text-[#214F65] dark:text-white tracking-tight">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;