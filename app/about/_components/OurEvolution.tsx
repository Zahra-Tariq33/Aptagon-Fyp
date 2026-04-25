
"use client";

import React from "react";
import { Play } from "lucide-react";

const OurEvolution: React.FC = () => {
  return (
    <section className="bg-[#F7FAFC] text-[#214F65] pb-20">
      <div className="mx-auto max-w-8xl px-26">

        {/* TOP HEADING */}
        <div className="text-center mb-16">
          <p className="text-[#0EBAB0] font-semibold tracking-wider text-sm mb-3 uppercase">
            Our Story
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#214F65]">
            Our Evolution
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-4 text-lg leading-relaxed text-[#4A6A7A]">

            <p className="text-justify">
             Aptagon Technologies began with a vision to deliver reliable and innovative technology solutions that help businesses navigate the digital era. Over the years, we have grown by continuously expanding our expertise, embracing emerging technologies, and strengthening our commitment to quality and innovation.
<p>
  Today, Aptagon Technologies stands as a trusted technology partner, delivering AI-driven solutions, modern software development, and scalable digital platforms that empower organizations to adapt, grow, and succeed in a rapidly evolving digital landscape.
</p>
            </p>

            {/* CEO SECTION */}
            <div className="pt-6">
              <h4 className="text-2xl font-bold text-[#214F65] mb-3">
                Hear It From Our CEO
              </h4>

              <p className="text-lg text-[#4A6A7A]">
               Listen to our CEO as he shares the story behind Aptagon Technologies, our mission, and our commitment to excellence.

              </p>
            </div>

          </div>

          {/* RIGHT VIDEO */}
          <div className="flex justify-center items-center">

            <div className="relative w-4xl rounded-xl overflow-hidden shadow-2xl group">

              {/* VIDEO */}
              <video
                className="w-4xl h-[400px] object-cover"
                poster="/about-us/about-us-img.png"
                controls
              >
                <source src="/about-us/ceo-video.mp4" type="video/mp4" />
              </video>

              {/* PLAY OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-[#0EBAB0] rounded-full flex items-center justify-center shadow-xl">
                  <Play className="text-white w-8 h-8 ml-1" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default OurEvolution;