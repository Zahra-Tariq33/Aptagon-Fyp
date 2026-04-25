"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface UpdateItem {
  title1: string;
  title2: string;
  date: string;
  image: string;
  href?: string;
}

interface RecentUpdatesProps {
  mainTitle: string;
  mainDescription: string;
  mainImage: string;
  updates: UpdateItem[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ mainTitle, mainDescription, mainImage, updates }) => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 items-start gap-12 md:grid-cols-11"
        >
          <motion.div variants={cardVariants} className="overflow-hidden bg-white md:col-span-6">
            <div className="relative w-full bg-[#073A53] py-4 text-center text-white">
              <h3 className="text-xl font-bold uppercase leading-tight md:text-2xl">Software License Management</h3>
              <p className="text-lg italic opacity-90 md:text-xl">managing your license effectively</p>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="relative mx-auto h-64 w-[85%] shadow-lg">
                <Image src={mainImage} alt={mainTitle} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#073A53]/70 via-transparent to-transparent" />
              </div>
            </div>
            <div className="flex">
              <div className="w-[95%] px-10 py-6 text-start">
                <h2 className="text-base font-bold leading-tight text-[#073A53] md:text-2xl">
                  {mainTitle}
                  {": "}
                  <span className="font-medium text-gray-800">{mainDescription}</span>
                </h2>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 md:col-span-5">
            {updates.map((update, idx) => {
              const body = (
                <>
                  <div className="relative h-28 w-40 shrink-0 overflow-hidden shadow-sm">
                    <Image src={update.image} alt={update.title1} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073A53]/50 to-transparent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold leading-snug text-gray-900 md:text-lg">
                      {update.title1} <span className="text-[#0EBAB0]">{update.title2}</span>
                    </h3>
                    <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">{update.date}</p>
                  </div>
                </>
              );
              const row = (
                <motion.div variants={cardVariants} className="group flex items-start gap-4 p-3 transition-colors hover:bg-gray-50">
                  {body}
                </motion.div>
              );
              return update.href ? (
                <Link key={idx} href={update.href} className="block rounded-xl outline-none ring-[#0EBAB0] focus-visible:ring-2">
                  {row}
                </Link>
              ) : (
                <React.Fragment key={idx}>{row}</React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;
