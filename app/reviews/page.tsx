import React from "react";
import Link from "next/link";

import Heading from "@/components/Heading";

const GAMES = [
  { id: "baldour-gates", title: "Baldour Gates" },
  { id: "hollow-knight", title: "Hollow Knight" },
];

const ReviewsPage = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          {GAMES.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/reviews/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Heading>Reviews Page</Heading>
      <p>Here is the list of all reviews.</p>
    </>
  );
};

export default ReviewsPage;
