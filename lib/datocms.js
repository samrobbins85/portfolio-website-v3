async function fetchAPI(query, { variables } = {}) {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
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

export async function getBlog(slug) {
  const data = await fetchAPI(
    `
query MyQuery($slug: String!) {
  article(filter: {slug: {eq: $slug}}) {
    title
    description
    date
    structuredtext{
      value
    }
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