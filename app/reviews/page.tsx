import React from "react";
import Link from "next/link";

import Heading from "@/components/Heading";
import { getReviewsList } from "@/lib";

const ReviewsPage = async () => {
  const [reviewsList] = await getReviewsList();

  return (
    <>
      <Heading>Reviews</Heading>
      <nav>
        <ul className="flex flex-col gap-3">
          {!!reviewsList &&
            reviewsList.map(({ title, slug }) => (
              <li
                key={slug}
                className="bg-white border w-80 rounded shadow hover:shadow-xl"
              >
                <Link href={`/reviews/${slug}`}>
                  <img
                    src={`/images/${slug}.jpg`}
                    alt={title}
                    width={320}
                    height={180}
                    className="rounded-t mb-2"
                  />
                  <h2 className="text-xl text-center font-semibold font-orbitron">
                    {title}
                  </h2>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default ReviewsPage;
