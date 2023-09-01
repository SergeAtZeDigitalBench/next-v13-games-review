import React from "react";

import FeaturedList from "@/components/FeaturedList";
import Heading from "@/components/Heading";
import { getReviewsList } from "@/lib/fetch";
import { CACHE_TAG } from "@/constants";

const Homepage = async () => {
  const [featured, error] = await getReviewsList(3, {
    next: {
      tags: [CACHE_TAG.REVIEWS_LIST],
    },
  });

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="mb-3">Only the best indie games reviewed for you.</p>

      {featured ? (
        <FeaturedList reviews={featured} />
      ) : (
        <p className="text-red-600 font-bold text-xl text-center">{error}</p>
      )}
    </>
  );
};

export default Homepage;
