"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeaturedPost {
  id: number;
  title: string;
  image: string;
}

const featuredPosts: FeaturedPost[] = [
  { id: 1, title: "Smart UI for Businesses", image: "/blogs/feature-cards/image-1.jpg" },
  { id: 2, title: "Powering Insights with Data", image: "/blogs/feature-cards/image-2.jpg" },
  { id: 3, title: "Future of Business Automation", image: "/blogs/feature-cards/image-3.jpg" },
  { id: 4, title: "Smarter, Data-Driven Decisions", image: "/blogs/feature-cards/image-4.jpg" },
];

export default function FeaturedPosts() {
  const loop = [...featuredPosts, ...featuredPosts];

  return (
    <section className="relative w-full overflow-hidden bg-[#073A53] pb-16 pt-12">
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#0EBAB0]/10 blur-[110px]" />
      <div className="relative z-10 max-w-7xl px-6 lg:px-20">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="mb-12">
          <h2 className="mb-3 text-4xl font-black tracking-tighter text-white">Our Featured Posts</h2>
          <p className="max-w-2xl text-xl font-medium text-white">
            Discover how headless CMS empowers developers to build faster, scalable websites with greater flexibility and control.
          </p>
        </motion.div>
      </div>
      <div className="relative w-full overflow-hidden py-4">
        <motion.div
          className="flex w-max gap-8 px-6"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {loop.map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`}
              whileHover={{ scale: 1.03, y: -10, transition: { duration: 0.3 } }}
              className="group relative h-80 w-80 shrink-0 cursor-pointer overflow-hidden border-2 border-[#073A53] transition-all duration-300 hover:border-[#0EBAB0]"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 z-0 opacity-0 shadow-[0_30px_60px_-15px_rgba(7,58,83,0.3)] transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#073A53] opacity-80" />
                <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_bottom,rgba(14,186,176,0.15)_0%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 z-30 flex transform flex-col items-center p-6 text-center transition-transform duration-500 translate-y-3 group-hover:translate-y-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative" style={{ transform: "translateZ(30px)" }}>
                  <div className="absolute -inset-x-8 -inset-y-3 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(14,186,176,0.3)_0%,transparent_75%)]" />
                  <h3 className="relative z-10 text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#0EBAB0]">
                    {post.title}
                  </h3>
                </div>
                <motion.div className="mt-4 h-[2px] w-0 bg-[#0EBAB0] transition-all duration-500 group-hover:w-16" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#0EBAB0]/25 to-transparent" />
    </section>
  );
}
