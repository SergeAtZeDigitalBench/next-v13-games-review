import React from "react";
import Link from "next/link";
import Image from "next/image";

import { IReviewSummary } from "@/types";

interface IFeaturedProps {
  reviews: IReviewSummary[];
}

const FeaturedList = ({ reviews }: IFeaturedProps): JSX.Element => (
  <ul className="flex flex-col gap-3">
    {reviews.map(({ slug, image, title, subtitle }, index) => (
      <li
        key={slug}
        className="bg-white border rounded shadow hover:shadow-xl w-80 sm:w-full"
      >
        <Link href={`/reviews/${slug}`} className="flex flex-col sm:flex-row">
          <Image
            priority={index === 0}
            src={image}
            alt={title}
            width={320}
            height={180}
            className="rounded-t mb-2 sm:rounded-l sm:rounded-r-none sm:mb-0"
          />
          <div className="px-2 py-1 text-center sm:text-left">
            <h2 className="text-xl text-center font-semibold font-orbitron">
              {title}
            </h2>
            <p className="hidden sm:block">{subtitle}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default FeaturedList;
