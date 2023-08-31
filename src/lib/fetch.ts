import qs from "qs";

import {
  ICmsListOfReviews,
  IData,
  ICmsListOfReviewsDetails,
  IReviewDetails,
} from "@/types";
import { CMS_BASE_URL } from "@/constants";

const reviewsUrl =
  `${CMS_BASE_URL}/api/reviews` +
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

const fetchJsonData = async <D = unknown>(
  url: string,
  options?: RequestInit,
): Promise<[D, null] | [null, string]> => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText || "Request failed");
    }

    const data: D = await res.json();
    return [data, null];
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString();

    return [null, msg];
  }
};

const getImageUrl = (imgPath: string) => CMS_BASE_URL + imgPath;

export const getReviewsList = async (): Promise<
  [IData[], null] | [null, string]
> => {
  const [reviews, error] = await fetchJsonData<ICmsListOfReviews>(reviewsUrl);

  if (error !== null) return [null, error];

  const reviewsList = reviews.data.map(
    ({ attributes: { title, image, publishedAt, slug } }) => ({
      title,
      image: getImageUrl(image.data.attributes.url),
      date: publishedAt,
      slug,
    }),
  );

  return [reviewsList, null];
};

export const fetchReviewBySlug = async (
  slug: string,
): Promise<[IReviewDetails, null] | [null, string]> => {
  const reviewBySlugUrl =
    `${CMS_BASE_URL}/api/reviews` +
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

  const [reviewsFound, error] =
    await fetchJsonData<ICmsListOfReviewsDetails>(reviewBySlugUrl);

  if (error !== null) {
    return [null, error];
  }

  if (reviewsFound.data.length === 0) {
    return [null, `Error: Not found by ${slug}`];
  }

  const details = reviewsFound.data[0].attributes;

  return [
    { ...details, image: getImageUrl(details.image.data.attributes.url) },
    null,
  ];
};
