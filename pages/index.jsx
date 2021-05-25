import Head from "next/head";
import Link from "next/link";
import SocialLinks from "@/components/home/social";
import Nav from "@/components/newnav";
import Image from "next/image";
import { getPortfolios } from "../lib/graphcms";
import { getHome } from "../lib/datocms";

const graphcmsLoader = ({ src, width }) => {
  let url = src.split("/");
  url.splice(3, 0, `resize=width:${width}`);
  url = url.join("/");
  return url;
};

export default function Home({ portfolios, home }) {
  return (
    <>
      <Head>
        <title>Sam Robbins</title>
        <meta
          property="og:image"
          content={`https://og.csnotes.me/**${escape(
            "Sam Robbins"
          )}**.png?theme=dark&md=1&fontSize=100px`}
        />
        <meta property="og:title" content="Sam Robbins" />
        <meta
          property="og:description"
          content="The personal website of Sam Robbins"
        />
      </Head>
      <Nav />
      <div className="py-6 px-4 max-w-85ch mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold py-4 pb-8 text-nord-10 dark:text-nord-8">
          {home.title}
        </h1>
        <h2 className="text-lg text-gray-800 dark:text-gray-200">
          {home.description}
        </h2>
        <div className="flex gap-x-4 pt-8 pb-4 items-start gap-y-4 flex-wrap">
          <a
            href={`mailto:${home.email}`}
            className="border border-nord-4 bg-nord-4 dark:border-gray-700 px-4 py-2 rounded hover:bg-nord-5 focus:bg-gray-50 dark:hover:bg-nord-2 dark:focus:bg-nord-2 font-medium whitespace-nowrap dark:bg-dark-contrast"
          >
            Contact Me
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-2 py-2 justify-center">
            <SocialLinks />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-nord-10 dark:text-nord-8">
          Projects
        </h2>

        <div className="grid gap-x-8 gap-y-8 py-4">
          {portfolios
            .filter((item) => item.featured)
            .slice(0, 3)
            .map((item) => (
              <div className="bg-nord-5 dark:bg-nord-0 p-2 grid sm:grid-cols-2 rounded">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-center pt-4 text-nord-2 dark:text-nord-6">
                    {item.title}
                  </p>
                  <p className="py-4 text-center dark:text-nord-5">
                    {item.description}
                  </p>
                  <Link href={`/portfolio/${item.slug}`}>
                    <a className="hidden sm:block underline text-blue-900 dark:text-cyan-300">
                      Find out more
                    </a>
                  </Link>
                </div>
                <div className="p-4">
                  <Image
                    loader={graphcmsLoader}
                    width={item.screenshot.width}
                    height={item.screenshot.height}
                    src={item.screenshot.url}
                    alt={item.title}
                  />
                </div>
                <Link href={`/portfolio/${item.slug}`}>
                  <a className="sm:hidden underline pb-2 text-center text-blue-900 dark:text-cyan-300">
                    Find out more
                  </a>
                </Link>
              </div>
            ))}
        </div>

        <div>
          <p className="text-center">
            To see all my projects, check out my{" "}
            <Link href="/portfolio">
              <a className="text-cyan-700 hover:underline dark:text-cyan-300">
                portfolio
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const portfolios = (await getPortfolios()) || [];
  const home = (await getHome()) || {};

  return {
    props: { portfolios, home },
  };
}
