import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentBlogs, getBlogBySlug } from "@/app/lib/blog-data";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }
  const { prev, next } = getAdjacentBlogs(slug);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-28 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{blog.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{blog.date}</p>
      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image src={blog.image} alt={blog.title} fill className="object-cover" />
      </div>
      <p className="mt-6 text-lg text-slate-700">{blog.excerpt}</p>
      <article className="mt-6 space-y-4 text-slate-700">
        {blog.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </article>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>{prev ? <Link className="font-semibold text-teal-700 hover:underline" href={`/blogs/${prev.slug}`}>Previous Blog: {prev.title}</Link> : <span className="text-slate-400">No previous blog</span>}</div>
        <div>{next ? <Link className="font-semibold text-teal-700 hover:underline" href={`/blogs/${next.slug}`}>Next Blog: {next.title}</Link> : <span className="text-slate-400">No next blog</span>}</div>
      </div>
      </div>
      <Footer />
    </>
  );
}
