import Head from "next/head";
import FilledNav from "@/components/fillednav";

import TimeLineItem from "@/components/home/timeline";
import { useState } from "react";
import { ChevronDownIcon } from "@primer/octicons-react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Job from "@/components/home/job";
import { getAbout } from "../lib/datocms";

function Article({ image, publisher, link, title, description }) {
  return (
    <div className="flex">
      <img className="h-12 w-12 mr-2" src={image} alt={publisher} />
      <div className="grid">
        <a
          href={link}
          className="text-xl font-semibold text-cyan-700 hover:underline flex items-baseline gap-x-1"
        >
          {title}
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
        <span className="text-gray-600">{description}</span>
      </div>
    </div>
  );
}

export default function Home({ about }) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <Head>
        <title>About | Sam Robbins</title>
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
      <FilledNav />
      <div className="py-6 px-4 max-w-85ch mx-auto">
        <h1 className="text-5xl font-semibold pb-4">About</h1>
        <h2 className="text-3xl font-semibold">Jobs</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {about.jobs.map((item) => (
            <Job
              key={item.company}
              logo={item.logo.url}
              title={item.role}
              duration={item.duration}
              company={item.company}
            />
          ))}
        </div>
        <h2 className="text-3xl font-semibold py-6">Published Articles</h2>
        <div className="grid">
          {about.articles.map((x) => (
            <Article
              image={x.logo.url}
              publisher={x.publisher}
              link={x.link}
              title={x.title}
              description={x.description}
            />
          ))}
        </div>
        <h2 className="text-3xl font-semibold py-6">Timeline</h2>
        <ul className="px-1">
          {about.timeline
            .slice(0, expand ? about.timeline.length : 5)
            .map((item) => (
              <TimeLineItem data={item} key={item.description} />
            ))}
        </ul>
        {!expand && (
          <div className="flex justify-center">
            <button
              className="flex items-center"
              type="button"
              onClick={() => setExpand(true)}
            >
              <ChevronDownIcon aria-hidden="true" className="mr-2" size={16} />
              <span>Show more</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const about = await getAbout();
  // I think this is no longer necessary, but better safe than sorry
  about.timeline = about.timeline
    .sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (b.date > a.date) {
        return -1;
      }
      return 0;
    })
    .reverse();
  return {
    props: { about },
  };
}
