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

const getImageUrl = (img: ICmsItemPayload<ICmsImage>) =>
  CMS_BASE_URL + img.data.attributes.url;

export const getReviewsList = async (): Promise<
  [IReviewSummary[], null] | [null, string]
> => {
  const [reviews, error] = await fetchJsonData<ICmsListOfReviews>(reviewsUrl);

  if (error !== null) return [null, error];

  const reviewsList = reviews.data.map(
    ({ attributes: { title, image, publishedAt, slug } }) => ({
      title,
      image: getImageUrl(image),
      date: publishedAt,
      slug,
    }),
  );

  return [reviewsList, null];
};

export const getFeaturedReview = async (): Promise<
  [IReviewSummary, null] | [null, string]
> => {
  const [reviewsList, error] = await getReviewsList();
  if (!reviewsList) {
    return [null, error];
  }

  return [reviewsList[0], null];
};

export const getReview = async (
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

  const { publishedAt, image, ...restOfDetails } =
    reviewsFound.data[0].attributes;

  return [
    { ...restOfDetails, image: getImageUrl(image), date: publishedAt },
    null,
  ];
};
