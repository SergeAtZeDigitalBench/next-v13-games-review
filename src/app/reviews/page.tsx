import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

import Heading from "@/components/Heading";
import { getReviewsList } from "@/lib/fetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  description: "The indie games review list",
};

const ReviewsPage = async () => {
  const [reviewsList] = await getReviewsList(6);

  return (
    <>
      <Heading>Reviews</Heading>
      <nav>
        <ul className="flex gap-3 sm:flex-row flex-wrap">
          {!!reviewsList &&
            reviewsList.map(({ title, slug, image }, index) => (
              <li
                key={slug}
                className="bg-white border w-80 rounded shadow hover:shadow-xl"
              >
                <Link href={`/reviews/${slug}`}>
                  <Image
                    priority={index === 0}
                    src={image}
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
