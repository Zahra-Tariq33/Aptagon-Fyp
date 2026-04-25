"use client";

import { motion } from "framer-motion";

type BlogHeroProps = {
  tagline?: string;
  heading?: string;
  description?: string;
  height?: string;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
};

export default function BlogHero({
  tagline = "Aptagon Insights",
  heading = "Building Scalable & Impactful Software",
  description = "Explore how technology, design, and strategy shape the digital future with Aptagon’s expert insights.",
  height = "min-h-[85vh]",
  showSearchBar = true,
  searchPlaceholder = "Search for articles, trends, or tech...",
  searchValue = "",
  onSearchChange = () => {},
  onSearchSubmit = () => {},
}: BlogHeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-white ${height}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0EBAB0]/10 via-white to-[#073A53]/5 pointer-events-none" />

      <div className="absolute top-[-25%] left-[-10%] w-[420px] h-[420px] bg-[#0EBAB0]/10 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[-25%] right-[-10%] w-[420px] h-[420px] bg-[#073A53]/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mt-20 mb-4"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="w-8 h-[2px] bg-[#0EBAB0]" />
            <span className="text-[#0EBAB0] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
              {tagline}
            </span>
            <span className="w-8 h-[2px] bg-[#0EBAB0]" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-black text-[#073A53] leading-[1.15] mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {heading}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.06 }}
          >
            {description}
          </motion.p>

          {showSearchBar && (
            <motion.div
              className="w-full max-w-2xl mx-auto relative"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0EBAB0] to-[#073A53] rounded-full blur opacity-20" />

              <div className="relative flex items-center bg-white rounded-full h-14 shadow-2xl border border-slate-100 overflow-hidden">
                <div className="pl-4 pr-2 text-slate-400 flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSearchSubmit(searchValue);
                  }}
                  className="flex-1 h-full px-4 text-lg text-[#073A53] placeholder-slate-400 outline-none rounded-full"
                />

                <button
                  type="button"
                  onClick={() => onSearchSubmit(searchValue)}
                  className="px-6 mx-3 h-10 bg-[#073A53] text-white font-black rounded-full hover:bg-[#0EBAB0] shadow-lg transition-all active:scale-95"
                >
                  Search
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSearchSubmit(searchValue)}
                className="mt-4 w-full h-12 bg-[#073A53] text-white font-black rounded-full shadow-lg sm:hidden"
              >
                Search Articles
              </button>
            </motion.div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Trending:
            </span>
            {["UI/UX", "Cloud Architecture", "Strategy", "SaaS"].map((tag) => (
              <button
                key={tag}
                type="button"
                className="text-xs font-bold text-[#0EBAB0] hover:text-[#073A53] transition-colors"
                onClick={() => {
                  const next = tag;
                  onSearchChange(next);
                  onSearchSubmit(next);
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

