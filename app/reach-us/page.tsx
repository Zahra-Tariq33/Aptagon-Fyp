"use client";
import AnimatedHeroSection from "../components/Herosection";
import ReachUs from "../components/ReachUs";
import Footer from "../components/Footer";
import TransparentNavbar from "../components/Navbar";
import ReachHero from "./ReachHero"

export default function ReachUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
      <TransparentNavbar />
      {/* <AnimatedHeroSection
        heading="Reach Us"
        contentAlignment="center"
        description="Lets build something exceptional together as we help you turn your digital vision into reality."
        height="h-[550px]"
      /> */}
      <ReachHero />
      <ReachUs />
      <Footer />
    </div>
  );
}
