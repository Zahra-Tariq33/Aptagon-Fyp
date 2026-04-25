"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import ConnectCard from "./ConnectCard";

const ContactSection = () => {
  return (
    <section className="w-full min-h-screen bg-white flex justify-center items-center py-20 px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT SIDE: FORM (SQUARE INPUTS WITH DARK SHADOWS) */}
        <div className="lg:col-span-7">
          <header className="mb-10">
            <p className="text-[#0EBAB0] font-bold text-sm tracking-widest mb-4">
              Reach Us
            </p>
            <h2 className="text-[42px] font-black text-[#073A53] leading-[1.1] tracking-tight">
              Join Us In Creating <br /> Something Great
            </h2>
          </header>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="First Name *" 
                className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700"
              />
              <input 
                type="text" 
                placeholder="Last Name *" 
                className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="email" 
                placeholder="Email *" 
                className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700"
              />
              <input 
                type="tel" 
                placeholder="Phone Number *" 
                className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700"
              />
            </div>

            <input 
              type="text" 
              placeholder="Subject *" 
              className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700"
            />

            <textarea 
              rows={8} 
              placeholder="Message" 
              className="w-full px-5 py-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-none focus:outline-none focus:border-[#0EBAB0] transition-all text-sm text-slate-700 resize-none"
            ></textarea>

            <button 
              className="bg-[#073A53] hover:bg-[#0a4a69] text-white font-bold px-12 py-3 rounded-[6px] text-sm transition-all shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: GRADIENT BOX (TOP ALIGNED) */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-gradient-to-b from-[#0EBAB0] to-[#052d40] p-12 flex flex-col justify-start min-h-[600px] text-white rounded-none">
            
            <div className="space-y-6">
              {/* Contact Us */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#073A53] text-xl shrink-0">
                  <HiOutlinePhone />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Contact Us</h4>
                  <p className="text-lg opacity-90">contact@aptagon.com</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#073A53] text-xl shrink-0">
                  <HiOutlineMail />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-lg opacity-90">contact@aptagon.com</p>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#073A53] text-xl shrink-0">
                  <HiOutlineLocationMarker />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Locations</h4>
                  <p className="text-lg opacity-90">contact@aptagon.com</p>
                </div>
              </div>
            </div>
            <div className="lg:mt-10">
              <ConnectCard/>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;