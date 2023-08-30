import React from "react";
import Link from "next/link";

import Heading from "@/components/Heading";
import { GAMES } from "@/constants";

const FEATURED = GAMES[0];

const Homepage = () => {
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="mb-3">Only the best indie games reviewed for you.</p>
      <div className="bg-white border rounded shadow hover:shadow-xl w-80 sm:w-full">
        <Link
          href={`/reviews/${FEATURED.id}`}
          className="flex flex-col sm:flex-row"
        >
          <img
            src={`/images/${FEATURED.id}.jpg`}
            alt={FEATURED.title}
            width={320}
            height={180}
            className="rounded-t mb-2 sm:rounded-l sm:rounded-r-none sm:mb-0"
          />
          <h2 className="text-xl text-center font-semibold font-orbitron sm:px-2">
            {FEATURED.title}
          </h2>
        </Link>
      </div>
    </>
  );
};

export default Homepage;
