import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Quicksand, Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./providers/ThemeProvider";
import ProgressBar from "./components/ProgressBar";
import FloatingActions from "./components/FloatingActions";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aptagon Technologies",
  description:
    "Innovative software solutions and digital transformation services",
  icons: { icon: "/logos/sitelogo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${poppins.variable} font-poppins antialiased bg-[#e9f5ff] dark:bg-[#1a1a1a] text-black dark:text-white transition-colors duration-300`}
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        <ProgressBar />
        <ThemeProvider>
          <SmoothScroll>
            <FloatingActions />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

