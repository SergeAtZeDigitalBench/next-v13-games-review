import { marked } from "marked";
import qs from "qs";

import {
  ICmsListOfReviews,
  IReviewSummary,
  ICmsListOfReviewsDetails,
  IReviewDetails,
  ICmsImage,
  ICmsItemPayload,
} from "@/types";
import { CMS_BASE_URL } from "@/constants";

const API_URL_REVIEWS = `${CMS_BASE_URL}/api/reviews`;

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

const getImageUrl = (img: ICmsItemPayload<ICmsImage>) =>
  CMS_BASE_URL + img.data.attributes.url;

export const getReviewsList = async (
  pageSize: number,
): Promise<[IReviewSummary[], null] | [null, string]> => {
  const reviewsUrl =
    API_URL_REVIEWS +
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
          pageSize,
        },
        sort: ["publishedAt:desc"],
      },
      { encodeValuesOnly: true },
    );
  const [reviews, error] = await fetchJsonData<ICmsListOfReviews>(reviewsUrl);

  if (error !== null) return [null, error];

  const reviewsList = reviews.data.map(
    ({ attributes: { title, image, publishedAt, slug, subtitle } }) => ({
      title,
      image: getImageUrl(image),
      date: publishedAt,
      slug,
      subtitle,
    }),
  );

  return [reviewsList, null];
};

export const getReview = async (
  slug: string,
): Promise<[IReviewDetails, null] | [null, string]> => {
  const reviewBySlugUrl =
    API_URL_REVIEWS +
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
        pagination: {
          pageSize: 1,
          withCount: false,
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

  const { publishedAt, image, body, ...restOfDetails } =
    reviewsFound.data[0].attributes;

  return [
    {
      ...restOfDetails,
      image: getImageUrl(image),
      date: publishedAt,
      body: marked.parse(body),
    },
    null,
  ];
};

export const getSlugs = async (): Promise<
  [string[], null] | [null, string]
> => {
  const reviewsListUrlSlugsOnly =
    API_URL_REVIEWS +
    "?" +
    qs.stringify(
      {
        fields: ["slug", "publishedAt"],
        pagination: {
          pageSize: 100,
        },
        sort: ["publishedAt:desc"],
      },
      { encodeValuesOnly: true },
    );

  const [reviews, error] = await fetchJsonData<ICmsListOfReviews>(
    reviewsListUrlSlugsOnly,
  );

  if (error !== null) return [null, error];

  const pageParams = reviews.data.map((current) => current.attributes.slug);

  return [pageParams, null];
};
