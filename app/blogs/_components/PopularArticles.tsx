import Image from "next/image";

type Article = {
  id: number;
  title: string;
  date: string;
  image: string;
};

const articles: Article[] = [
  { id: 1, title: "Building Trust Through Consistent UI", date: "10 July 2025", image: "/blogs/popular/image-1.jpg" },
  { id: 2, title: "AI-Driven Product Design Revolution", date: "10 July 2025", image: "/blogs/popular/image-2.jpg" },
  { id: 3, title: "Smarter Documentation for Agile Teams", date: "8 July 2025", image: "/blogs/popular/image-3.jpg" },
  { id: 4, title: "Mastering Visual Hierarchy in UX", date: "24 June 2025", image: "/blogs/popular/image-4.jpg" },
];

export default function PopularArticles() {
  return (
    <section className="w-full bg-white pb-20 pr-6" style={{ paddingLeft: "39px" }}>
      <h2 className="mb-8 text-xl font-bold text-[#214F65] sm:text-2xl md:text-4xl">Popular</h2>
      <div className="grid max-w-7xl grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
        {articles.map((article) => (
          <article key={article.id} className="flex cursor-pointer items-center gap-4 transition-all hover:opacity-80">
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-sm bg-gray-100">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-1 text-[14px] font-medium text-gray-500">
                Article • <span className="text-[#0EBAB0]">{article.date}</span>
              </p>
              <h3 className="text-[17px] font-bold leading-tight text-[#214F65] transition-colors hover:text-[#0EBAB0]">{article.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
