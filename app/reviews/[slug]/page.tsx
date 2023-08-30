import React from "react";

import Heading from "@/components/Heading";
import { IPageProps } from "@/types";
import { getReview } from "@/lib";

const ReviewDetailsPage = async ({ params }: IPageProps<{ slug: string }>) => {
  const [review, error] = await getReview(params.slug);

  return review ? (
    <>
      <Heading>{review.data.title}</Heading>
      <p className="pb-2 italic">
        Added on: {new Date(review.data.date).toDateString()}
      </p>
      <img
        src={review.data.image}
        alt={review.data.title}
        width={640}
        height={360}
        className="rounded mb-2"
      />

      <article
        className=" max-w-screen-sm prose prose-slate"
        dangerouslySetInnerHTML={{ __html: review.body }}
      />
    </>
  ) : (
    <p className="text-red-600 font-bold text-xl text-center">{error}</p>
  );
};

export default ReviewDetailsPage;
