import { getBlog, getAllBlogsWithSlug } from "@/lib/datocms";
import Head from "next/head";
import Prism from "@/components/prism";
import { StructuredText, renderRule } from "react-datocms";
import { isCode } from "datocms-structured-text-utils";
import Nav from "@/components/newnav";

export default function Blog({ dato }) {
  return (
    <>
      <Head>
        <title>{dato.title} | Sam Robbins</title>
        <meta
          property="og:image"
          content={`https://og.csnotes.me/**${escape(dato.title)}**/${escape(
            dato.description
          )}.png?theme=dark&md=1&fontSize=100px`}
        />
        <meta property="og:title" content={dato.title} />
        <meta property="og:description" content={dato.description} />
      </Head>
      <Nav />

      <div className="max-w-85ch p-4 mx-auto">
        <header className="py-2 pb-4">
          <h1 className="text-4xl sm:text-5xl font-semibold text-center">
            {dato.title}
          </h1>
          <p className="text-center py-1 text-gray-600">
            {new Date(Date.parse(dato.date)).toLocaleString("en-gb", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </header>
        <main>
          <article className="prose mx-auto">
            <StructuredText
              data={dato.structuredtext}
              customRules={[
                renderRule(isCode, ({ node, key }) => (
                  <Prism
                    key={key}
                    code={node.code}
                    language={node.language || "unknown"}
                    highlightLines={node.highlight}
                    showLineNumbers={node.code.split(/\n/).length > 10}
                  />
                )),
              ]}
            />
          </article>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const dato = await getBlog(params.slug);
  return {
    props: {
      dato,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllBlogsWithSlug();
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
