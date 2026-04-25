export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "digital-transformation-real-estate-innovation",
    title: "Digital Transformation: Driving Real Estate Innovation",
    date: "October 11, 2022",
    excerpt: "How digital-first systems make real estate operations faster, smarter, and more transparent.",
    image: "/blogs/updates-cards/right-image-1.jpg",
    content: [
      "Real estate platforms are becoming data-driven ecosystems where analytics, automation, and customer portals reduce manual workflows.",
      "By integrating CRM, document automation, and online transaction tools, teams can close deals faster and improve customer experience.",
    ],
  },
  {
    slug: "staffing-excellence-it-augmentation-strategies",
    title: "Staffing Excellence: IT Augmentation Strategies",
    date: "October 11, 2022",
    excerpt: "A practical approach to scaling engineering teams with high-impact augmentation models.",
    image: "/blogs/updates-cards/right-image-2.jpg",
    content: [
      "IT augmentation gives organizations flexible capacity for urgent product goals without compromising quality.",
      "With clear onboarding, performance KPIs, and role alignment, augmented teams can operate as a seamless extension of in-house teams.",
    ],
  },
  {
    slug: "lead-generation-boosting-sales-effectively",
    title: "Lead Generation: Boosting Sales Effectively",
    date: "October 11, 2022",
    excerpt: "Building consistent lead pipelines using automation, personalization, and conversion analytics.",
    image: "/blogs/updates-cards/right-image-3.jpg",
    content: [
      "Strong lead generation blends channel strategy with conversion-oriented landing experiences and fast follow-up loops.",
      "Automation workflows help sales teams nurture prospects at scale while keeping outreach relevant and measurable.",
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getAdjacentBlogs(slug: string) {
  const index = BLOG_POSTS.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  const prev = index > 0 ? BLOG_POSTS[index - 1] : null;
  const next = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null;
  return { prev, next };
}
