import React from "react";
import Link from "next/link";

import Heading from "@/components/Heading";
import { GAMES } from "@/constants";

const ReviewsPage = (): JSX.Element => {
  return (
    <>
      <Heading>Reviews</Heading>
      <nav>
        <ul className="flex flex-col gap-3">
          {GAMES.map(({ id, title }) => (
            <li
              key={id}
              className="bg-white border w-80 rounded shadow hover:shadow-xl"
            >
              <Link href={`/reviews/${id}`}>
                <img
                  src={`/images/${id}.jpg`}
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
