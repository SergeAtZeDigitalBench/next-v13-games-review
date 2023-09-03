import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getReview, getSlugs } from "@/lib";
import ShareLink from "@/components/ShareLink";
import Heading from "@/components/Heading";
import { IPageProps } from "@/types";
import { CACHE_TAG } from "@/constants";

interface IPageParams {
  slug: string;
}

/**
 * @description https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export const generateStaticParams = async (): Promise<IPageParams[]> => {
  const [slugs] = await getSlugs();
  if (!slugs) return [];

  return slugs.map((slug) => ({ slug }));
};

/**
 * @description https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const generateMetadata = async (
  props: IPageProps<{ slug: string }>,
): Promise<Metadata> => {
  const [review, error] = await getReview(props.params.slug);

  if (error !== null || !review) {
    notFound();
  }

  return {
    title: review ? review.title : "Review",
  };
};

const ReviewDetailsPage = async ({ params }: IPageProps<{ slug: string }>) => {
  const [found, error] = await getReview(params.slug, {
    next: { tags: [CACHE_TAG.REVIEW_DETAILS] },
  });

  if (error !== null || !found) {
    notFound();
  }

  return found ? (
    <>
      <Heading>{found.title}</Heading>
      <p className="font-semibold mb-3">{found.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="pb-2 italic">
          Added on: {new Date(found.date).toDateString()}
        </p>
        <ShareLink />
      </div>
      <Image
        priority
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
