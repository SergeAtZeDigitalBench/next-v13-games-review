import React from "react";
import Link from "next/link";

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
      <h1>Reviews Page</h1>
      <p>Here is the list of all reviews.</p>
    </>
  );
};

export default ReviewsPage;
