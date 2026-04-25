"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface SpotlightItem {
  id: string;
  titleFirstPart: string;
  titleSecondPart: string;
  description: string;
  image: string;
  type?: string;
  href?: string;
}

interface SpotlightSectionProps {
  HeadingFirstPart?: string;
  HeadingSecondPart?: string;
  items: SpotlightItem[];
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function SpotlightSection({
  HeadingFirstPart = "Today's",
  HeadingSecondPart = "Spotlight",
  items,
}: SpotlightSectionProps) {
  return (
    <motion.section
      className="w-full bg-[#F9FAFB] px-6 py-24 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto">
        <motion.h2 variants={cardVariants} className="mb-16 text-4xl font-black tracking-tight md:text-5xl">
          <span className="text-[#0EBAB0]">{HeadingFirstPart} </span>
          <span className="text-[#214F65]">{HeadingSecondPart}</span>
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.4, ease: "easeOut" } }}
              className="group relative w-full overflow-hidden rounded-[1.5rem] border border-transparent bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-[#0EBAB0]/20 hover:shadow-[0_20px_50px_rgba(14,186,176,0.15)]"
            >
              {item.href ? (
                <Link href={item.href} className="block h-full">
                  <CardInner item={item} />
                </Link>
              ) : (
                <CardInner item={item} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function CardInner({ item }: { item: SpotlightItem }) {
  return (
    <>
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={`${item.titleFirstPart} ${item.titleSecondPart}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#073A53]/0 transition-colors duration-500 group-hover:bg-[#073A53]/5" />
      </div>
      <div className="p-6 md:p-8">
        {item.type && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{item.type}</p>
        )}
        <h3 className="mb-4 text-xl font-bold leading-[1.3] transition-colors group-hover:text-[#214F65] md:text-[18px]">
          <span className="text-[#0EBAB0]">{item.titleFirstPart}</span>
          <span className="text-[#214F65]"> {item.titleSecondPart}</span>
        </h3>
        <p className="line-clamp-4 text-sm leading-relaxed group-hover:text-gray-600 md:text-[13px]">{item.description}</p>
        <div className="mt-6 h-[2px] w-0 rounded-full bg-[#0EBAB0] transition-all duration-500 group-hover:w-full" />
      </div>
    </>
  );
}
