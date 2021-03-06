import { getAllBlogs } from "@/lib/datocms";
import Link from "next/link";
import Layout from "@/components/layout";

export default function Blog({ blogs }) {
  return (
    <Layout title="Blog" description="Blogs about a range of technical topics">
      <h1 className="text-5xl font-semibold text-center text-radix-mint11">
        Blog
      </h1>

      <div className="grid">
        {blogs.map((item) => (
          <div className="py-4" key={item.title}>
            <div>
              <Link href={`/blog/${item.slug}`}>
                <a>
                  <h2 className="font-semibold text-xl sm:text-2xl text-radix-cyan11">
                    {item.title}
                  </h2>
                </a>
              </Link>
              <div className="py-1">
                <time
                  className="text-radix-slate11 text-sm uppercase"
                  dateTime={item.date}
                >
                  {new Date(item.date).toLocaleString("en-gb", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="sm:text-lg text-radix-slate11">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const blogs = (await getAllBlogs()) || [];
  return {
    props: { blogs },
  };
}
