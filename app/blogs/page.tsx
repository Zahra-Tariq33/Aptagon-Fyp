"use client";

import React, { useRef, useState } from "react";
import TransparentNavbar from "../components/Navbar";
import BlogHero from "./BlogHero";
import SpotlightSection from "./_components/SpotlightSection";
import RecentUpdates from "./_components/Recentupdates";
import FeaturedPosts from "./_components/FeaturedPosts";
import PopularArticles from "./_components/PopularArticles";
import NewsletterBanner from "./_components/NewsletterBanner";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../lib/blog-data";

const customPosts = [
  {
    id: 1,
    title1: "Digital Transformation: ",
    title2: "Driving Real Estate Innovation",
    date: "October 11, 2022",
    image: "/blogs/updates-cards/right-image-1.jpg",
    featured: true,
    href: `/blogs/${BLOG_POSTS[0].slug}`,
  },
  {
    id: 2,
    title1: "Staffing Excellence: ",
    title2: "IT Augmentation Strategies",
    date: "October 11, 2022",
    image: "/blogs/updates-cards/right-image-2.jpg",
    href: `/blogs/${BLOG_POSTS[1].slug}`,
  },
  {
    id: 3,
    title1: "Lead Generation: ",
    title2: "Boosting Sales Effectively",
    date: "October 11, 2022",
    image: "/blogs/updates-cards/right-image-3.jpg",
    href: `/blogs/${BLOG_POSTS[2].slug}`,
  },
];

const spotlightItems = [
  {
    id: "1",
    type: "Article",
    titleFirstPart: "UX Redefined: ",
    titleSecondPart: "Micro Interactions Matter",
    description:
      "Small animations create big impact. Discover how micro interactions elevate user satisfaction and engagement across platforms.",
    image: "/blogs/spotlight-cards/image-1.jpg",
    href: `/blogs/${BLOG_POSTS[0].slug}`,
  },
  {
    id: "2",
    type: "Article",
    titleFirstPart: "Cloud Transformation: ",
    titleSecondPart: "Streamlining Modern Workflows",
    description:
      "Learn how cloud-native solutions help teams scale efficiently and deploy faster with automation and containerization strategies.",
    image: "/blogs/spotlight-cards/image-2.jpg",
    href: `/blogs/${BLOG_POSTS[1].slug}`,
  },
  {
    id: "3",
    type: "Article",
    titleFirstPart: "Design Systems: ",
    titleSecondPart: "Consistency Across Teams",
    description:
      "Standardized design frameworks ensure smooth collaboration and maintain visual consistency across all UI/UX projects.",
    image: "/blogs/spotlight-cards/image.jpg",
    href: `/blogs/${BLOG_POSTS[2].slug}`,
  },
  {
    id: "4",
    type: "Article",
    titleFirstPart: "Smart Hiring: ",
    titleSecondPart: "Data-Driven Decisions",
    description:
      "Harness data and analytics to make informed hiring choices, optimize talent acquisition, and improve team efficiency.",
    image: "/blogs/spotlight-cards/image-4.jpg",
    href: `/blogs/${BLOG_POSTS[0].slug}`,
  },
];

const spotlightItems2 = [
  {
    id: "e1",
    type: "Article",
    titleFirstPart: "Editor's Pick: ",
    titleSecondPart: "UX Innovations 2026",
    description:
      "Explore cutting-edge UX trends handpicked by our editors. Learn how innovative interactions shape modern digital experiences.",
    image: "/blogs/spotlight-cards/image-1.jpg",
    href: `/blogs/${BLOG_POSTS[1].slug}`,
  },
  {
    id: "e2",
    type: "Article",
    titleFirstPart: "Cloud Insights: ",
    titleSecondPart: "Future-Proofing Dev Teams",
    description:
      "Dive into the world of cloud-native strategies. See how teams are accelerating deployment, efficiency, and scalability.",
    image: "/blogs/spotlight-cards-2/image-2.jpg",
    href: `/blogs/${BLOG_POSTS[2].slug}`,
  },
  {
    id: "e3",
    type: "Article",
    titleFirstPart: "Design Evolution: ",
    titleSecondPart: "Scaling Creative Systems",
    description:
      "Learn how design systems empower teams to work smarter, not harder, maintaining consistent and impactful user interfaces.",
    image: "/blogs/spotlight-cards-2/image.jpg",
    href: `/blogs/${BLOG_POSTS[0].slug}`,
  },
  {
    id: "e4",
    type: "Article",
    titleFirstPart: "Tech Hiring: ",
    titleSecondPart: "Analytics-Driven Recruitment",
    description:
      "Leverage behavioral insights and metrics for strategic hiring decisions, ensuring high-quality tech talent acquisition.",
    image: "/blogs/spotlight-cards-2/image.jpg",
    href: `/blogs/${BLOG_POSTS[1].slug}`,
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const spotlightRef = useRef<HTMLDivElement>(null);
  const recentUpdatesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const editorsPickRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string) => setSearchQuery(value);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;
    const searchTerm = query.toLowerCase().trim();
    const searchIndex = [
      { section: "Today's Spotlight", ref: spotlightRef, items: spotlightItems.map((item) => ({ title: item.titleFirstPart + item.titleSecondPart, description: item.description, fullContent: `${item.titleFirstPart} ${item.titleSecondPart} ${item.description}`.toLowerCase() })) },
      { section: "Editors' Pick", ref: editorsPickRef, items: spotlightItems2.map((item) => ({ title: item.titleFirstPart + item.titleSecondPart, description: item.description, fullContent: `${item.titleFirstPart} ${item.titleSecondPart} ${item.description}`.toLowerCase() })) },
      { section: "Recent Updates", ref: recentUpdatesRef, items: customPosts.map((item) => ({ title: item.title1 + item.title2, description: item.date, fullContent: `${item.title1} ${item.title2} Software License Management`.toLowerCase() })) },
      { section: "Featured Posts", ref: featuredRef, items: [{ title: "Smart UI for Businesses", description: "", fullContent: "smart ui" }] },
      { section: "Popular Articles", ref: popularRef, items: [{ title: "Building Trust Through Consistent UI", description: "", fullContent: "trust" }] },
    ];

    for (const section of searchIndex) {
      if (section.section.toLowerCase().includes(searchTerm)) {
        section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      for (const item of section.items) {
        if (item.title.toLowerCase().includes(searchTerm) || item.fullContent.includes(searchTerm) || (item.description && item.description.toLowerCase().includes(searchTerm))) {
          section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }
  };

  return (
    <>
      <TransparentNavbar />
      <BlogHero searchValue={searchQuery} onSearchChange={handleSearchChange} onSearchSubmit={handleSearch} />
      <div ref={spotlightRef}>
        <SpotlightSection HeadingFirstPart="Today's " HeadingSecondPart="Spotlight" items={spotlightItems} />
      </div>
      <div ref={recentUpdatesRef}>
        <RecentUpdates mainTitle="Software License Management" mainDescription="A Cornerstone of IT Efficiency and Compliance" mainImage="/blogs/updates-cards/left-image.jpg" updates={customPosts} />
      </div>
      <div ref={featuredRef}>
        <FeaturedPosts />
      </div>
      <div ref={editorsPickRef}>
        <SpotlightSection HeadingFirstPart="Editors " HeadingSecondPart="Pick" items={spotlightItems2} />
      </div>
      <div ref={popularRef}>
        <PopularArticles />
      </div>
      <NewsletterBanner />
      <Footer />
    </>
  );
}
