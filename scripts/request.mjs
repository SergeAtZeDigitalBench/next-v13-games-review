import fs from "fs/promises";
import path from "path";
import qs from "qs";

const reviewsListUrl =
  "http://localhost:1337/api/reviews" +
  "?" +
  qs.stringify(
    {
      fields: ["slug", "title", "subtitle", "publishedAt"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
      pagination: {
        pageSize: 6,
      },
      sort: ["publishedAt:desc"],
    },
    { encodeValuesOnly: true },
  );

console.log("reviewsListUrl :>> ", reviewsListUrl);

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<[any, null]|[null, string]>}
 */
const fetchJsonData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText || "Request failed");
    }

    const data = await res.json();
    return [data, null];
  } catch (error) {
    const msg = error instanceof Error ? error.message : error.ToString();

    return [null, msg];
  }
};

const fetchReviews = async () => {
  const [reviews, error] = await fetchJsonData(reviewsListUrl);

  if (error) {
    console.log(error);
    return;
  }

  if (!!reviews) {
    fs.writeFile(
      path.join(process.cwd(), "scripts", "data.json"),
      JSON.stringify(reviews),
    );
  }
};

// fetchReviews();

/**
 * @param {string} slug
 */
const fetchReviewBySlug = async (slug) => {
  const reviewBySlugUrl =
    "http://localhost:1337/api/reviews" +
    "?" +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "body", "publishedAt"],
        populate: {
          image: {
            fields: ["url"],
          },
        },
        filters: {
          slug: { $eq: slug },
        },
      },
      { encodeValuesOnly: true },
    );

  const [reviewsFound, error] = await fetchJsonData(reviewBySlugUrl);

  if (error) {
    console.log("Error: ", error);
    return;
  }

  if (reviewsFound.data.length === 0) {
    console.log(`Error: Not found by ${slug}`);
    return;
  }

  if (!!reviewsFound) {
    const details = reviewsFound.data[0].attributes;
    fs.writeFile(
      path.join(process.cwd(), "scripts", "found.json"),
      JSON.stringify({
        ...details,
        image: "http://localhost:1337" + details.image.data.attributes.url,
      }),
    );
  }
};

fetchReviewBySlug("hades-2018");
