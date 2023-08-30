import React from "react";
import Link from "next/link";

import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib";

const Homepage = async () => {
  const [featured, error] = await getFeaturedReview();

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="mb-3">Only the best indie games reviewed for you.</p>

      {featured ? (
        <div className="bg-white border rounded shadow hover:shadow-xl w-80 sm:w-full">
          <Link
            href={`/reviews/${featured.slug}`}
            className="flex flex-col sm:flex-row"
          >
            <img
              src={`/images/${featured.slug}.jpg`}
              alt={featured.title}
              width={320}
              height={180}
              className="rounded-t mb-2 sm:rounded-l sm:rounded-r-none sm:mb-0"
            />
            <h2 className="text-xl text-center font-semibold font-orbitron sm:px-2">
              {featured.title}
            </h2>
          </Link>
        </div>
      ) : (
        <p className="text-red-600 font-bold text-xl text-center">{error}</p>
      )}
    </>
  );
};

export default Homepage;
