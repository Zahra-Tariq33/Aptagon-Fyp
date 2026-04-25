"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TransparentNavbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import SchedualHero from "./SchedualHero";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
}

const ScheduleCallPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: false },
    { time: "03:30 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true },
  ];

  // Get available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const day = date.getDay();
      // Skip weekends
      if (day !== 0 && day !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setFormData({ ...formData, date: dateStr });
    setSelectedTime("");
    setFormData((prev) => ({ ...prev, time: "" }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData({ ...formData, time: time });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.date && formData.time) {
      // Send email using EmailJS
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2!,
          {
            from_name: formData.name,
            from_email: formData.email,
            booking_date: formData.date,
            booking_time: formData.time,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY2! // replace with your EmailJS public key
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
            setBookingConfirmed(true);
            // Reset after 3 seconds
            setTimeout(() => {
              setBookingConfirmed(false);
              setFormData({ name: "", email: "", date: "", time: "" });
              setSelectedDate("");
              setSelectedTime("");
            }, 3000);
          },
          (error) => {
            console.error("Email sending error:", error.text);
            alert("Failed to send email. Please try again.");
          }
        );
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 dark:from-[#1a1a1a] to-gray-100 dark:to-[#0f0f0f] transition-colors duration-300">
      <TransparentNavbar />

      {/* Success Modal */}
      {bookingConfirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 max-w-md text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We sent a confirmation email to {formData.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              {formatDateDisplay(formData.date)} at {formData.time}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
       {/* <AnimatedHeroSection
        heading="Schedule A Call"
        description="At Aptagon Technologies, our team drives every innovation. We re passionate developers, designers, and strategists collaborating to craft impactful digital solutions. With creativity and expertise, we turn ideas into seamless experiences that help businesses grow."
        contentAlignment="center"
        height="min-h-[60vh]"
      />  */}
      <SchedualHero/>

      {/* Main Container */}
      <div id="booking" className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-[#214F65] dark:text-[#0EBAB0] uppercase tracking-wider mb-2">
            LETs SHAPE YOUR DIGITAL SUCCESS
          </p>
          <h1 className="text-4xl  font-bold text-[#214F65] dark:text-white mb-4">
            Book a Free Consultation and Turn Your Goals into Reality
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl p-8 shadow-lg dark:shadow-2xl">
              {/* Logo Section */}
              <div className="mb-8">
                <img
                  src="/logos/logo-blue.png"
                  alt="Aptagon Technologies"
                  className="h-12 w-auto dark:invert"
                />
              </div>

              {/* Meeting Card */}
              <div className="bg-linear-to-br from-slate-50 dark:from-[#1a1a1a] to-gray-100 dark:to-[#0f0f0f] rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      30 Minutes meeting
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      with Aptagon Team
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600 dark:text-[#0EBAB0]" />
                    <span className="text-gray-700 dark:text-gray-300">
                      30 min
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-teal-600 dark:text-[#0EBAB0] mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Web conferencing details provided upon confirmation
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  What we will cover:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-teal-600 dark:bg-[#0EBAB0] rounded-full"></span>
                    Project requirements & goals
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-teal-600 dark:bg-[#0EBAB0] rounded-full"></span>
                    Technology recommendations
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-teal-600 dark:bg-[#0EBAB0] rounded-full"></span>
                    Timeline & investment overview
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl p-8 shadow-lg dark:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Select a Date & Time
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose a time that works best for you
              </p>

              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4 max-h-48 overflow-y-auto">
                  {availableDates.map((date) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-teal-600 dark:bg-[#0EBAB0] text-white dark:text-[#1a1a1a] shadow-lg"
                            : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a]"
                        }`}
                      >
                        <div className="text-xs">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div>{date.getDate()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() =>
                          slot.available && handleTimeSelect(slot.time)
                        }
                        disabled={!slot.available}
                        className={`p-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? "bg-teal-600 dark:bg-[#0EBAB0] text-white dark:text-[#1a1a1a] shadow-lg"
                            : slot.available
                            ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] cursor-pointer"
                            : "bg-gray-50 dark:bg-[#0f0f0f] text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Form */}
              {selectedTime && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:ring-2 focus:ring-teal-600 dark:focus:ring-[#0EBAB0] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:ring-2 focus:ring-teal-600 dark:focus:ring-[#0EBAB0] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 dark:bg-[#0EBAB0] hover:bg-teal-700 dark:hover:bg-[#0EBAB0]/80 text-white dark:text-[#1a1a1a] font-semibold py-3 rounded-lg transition-colors duration-200"
                  >
                    Confirm Booking
                  </button>
                </motion.form>
              )}

              {/* Summary */}
              {(selectedDate || selectedTime) && (
                <div className="mt-6 p-4 bg-teal-50 dark:bg-[#0EBAB0]/10 rounded-lg border border-teal-200 dark:border-[#0EBAB0]/50">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Selected:{" "}
                    </span>
                    {formatDateDisplay(selectedDate)} {selectedTime}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleCallPage;
