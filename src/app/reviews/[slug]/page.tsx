import React from "react";
import { Metadata } from "next";

import { getReview, getReviewsList } from "@/lib/fetch";
import ShareLink from "@/components/ShareLink";
import Heading from "@/components/Heading";
import { IPageProps } from "@/types";

interface IPageParams {
  slug: string;
}

/**
 * @description https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export const generateStaticParams = async (): Promise<IPageParams[]> => {
  const [reviews] = await getReviewsList();
  if (!reviews) return [];

  return reviews.map((curent) => ({ slug: curent.slug }));
};

/**
 * @description https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const generateMetadata = async (
  props: IPageProps<{ slug: string }>,
): Promise<Metadata> => {
  const [review] = await getReview(props.params.slug);

  return {
    title: review ? review.title : "Review",
  };
};

const ReviewDetailsPage = async ({ params }: IPageProps<{ slug: string }>) => {
  const [found, error] = await getReview(params.slug);

  return found ? (
    <>
      <Heading>{found.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="pb-2 italic">
          Added on: {new Date(found.date).toDateString()}
        </p>
        <ShareLink />
      </div>
      <img
        src={found.image}
        alt={found.title}
        width={640}
        height={360}
        className="rounded mb-2"
      />

      <article
        className=" max-w-screen-sm prose prose-slate"
        dangerouslySetInnerHTML={{ __html: found.body }}
      />
    </>
  ) : (
    <p className="text-red-600 font-bold text-xl text-center">{error}</p>
  );
};

export default ReviewDetailsPage;
