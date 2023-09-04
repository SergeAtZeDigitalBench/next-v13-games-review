import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import Heading from "@/components/Heading";
import { getReviewsList, getPageNumber, getSearchableReviews } from "@/lib";
import { CACHE_TAG } from "@/constants";
import { IPageProps } from "@/types";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Reviews",
  description: "The indie games review list",
};

const ReviewsPage = async ({
  searchParams,
}: IPageProps<{}, { page?: string }>) => {
  const [reviewsPage] = await getReviewsList(
    PAGE_SIZE,
    getPageNumber(searchParams.page),
    {
      next: { tags: [CACHE_TAG.REVIEWS_LIST] },
    },
  );

  const [reviewsSearchable] = await getSearchableReviews({
    next: { tags: [CACHE_TAG.REVIEWS_LIST] },
  });

  return (
    <>
      <Heading>Reviews</Heading>

      {reviewsPage && (
        <div className="flex justify-between mb-3">
          <Pagination
            href="/reviews"
            page={searchParams.page}
            totalPages={reviewsPage.pageCount}
            firstPage={1}
          />
          {reviewsSearchable && <SearchBox reviews={reviewsSearchable} />}
        </div>
      )}

      <nav>
        <ul className="flex gap-3 sm:flex-row flex-wrap">
          {!!reviewsPage &&
            reviewsPage.reviews.map(({ title, slug, image }, index) => (
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
