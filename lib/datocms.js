async function fetchAPI(query, { variables } = {}) {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATO}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllBlogsWithSlug() {
  const data = await fetchAPI(`
    {
      allArticles {
        slug
      }
    }
  `);
  return data.allArticles;
}

export async function essaySlugs() {
  const data = await fetchAPI(`
    {
      allEssays {
        slug
      }
    }
  `);
  return data.allEssays;
}

export async function getAllBlogs() {
  const data = await fetchAPI(`
  {
    allArticles(orderBy: date_DESC) {
      slug
      title
      description
      date
    }
  }
  `);
  return data.allArticles;
}

export async function getAllEssays() {
  const data = await fetchAPI(`
  {
    allEssays(orderBy: date_DESC) {
      slug
      title
      date
    }
  }
  `);
  return data.allEssays;
}

export async function getAbout() {
  const data = await fetchAPI(`
  {
    about {
      articles {
        title
        link
        description
        publisher
        logo {
          url
          width
          height
        }
      }
      jobs {
        role
        logo {
          url
          width
          height
        }
        duration
        company
      }
      timeline {
        title
        description
        category
        date
        link
      }
      skills {
        name
        link
        logo {
          width
          height
          url
        }
        lightlogo {
          width
          height
          url
        }
      }
    }
  }
  `);
  return data.about;
}

export async function getHome() {
  const data = await fetchAPI(`
  {
    homepage {
      unsplash
      twitter
      title
      npm
      linkedin
      github
      polywork
      email
      description
    }
  }
  `);
  return data.homepage;
}

export async function getBlog(slug) {
  const data = await fetchAPI(
    `
query MyQuery($slug: String!) {
  article(filter: {slug: {eq: $slug}}) {
    title
    description
    date
    markdown
  }
}
  `,

    {
      variables: {
        slug,
      },
    }
  );
  return data.article;
}

export async function getEssay(slug) {
  const data = await fetchAPI(
    `
query MyQuery($slug: String!) {
  essay(filter: {slug: {eq: $slug}}) {
    title
    date
    content
  }
}
  `,

    {
      variables: {
        slug,
      },
    }
  );
  return data.essay;
}
