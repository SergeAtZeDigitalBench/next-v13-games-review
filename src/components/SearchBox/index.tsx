"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";

import { useIsClient } from "@/lib/hooks/useIsClient";
import { IReviewSearchable } from "@/types";

const filterReviews = (
  reviews: IReviewSearchable[],
  query: string,
): IReviewSearchable[] => {
  if (!query) return reviews;
  const queryPattern = query.toLowerCase();

  return reviews.filter(({ title }) => {
    const titlePattern = title.toLowerCase();

    return (
      titlePattern.includes(queryPattern) || queryPattern.includes(titlePattern)
    );
  });
};

interface IProps {
  reviews: IReviewSearchable[];
}

const SearchBox = ({ reviews }: IProps): JSX.Element | null => {
  const [query, setQuery] = useState<string>("");
  const isClient = useIsClient();
  const router = useRouter();

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChange = (review: IReviewSearchable) => {
    router.push(`/reviews/${review.slug}`);
  };

  if (!isClient) return null;

  return (
    <div className="relative">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
          value={query}
          onChange={handleChangeQuery}
        />
        <Combobox.Options className="absolute bg-white w-full rounded-b-lg">
          {filterReviews(reviews, query).map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`px-1 block truncate w-full ${
                    active ? " bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchBox;
