"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";

import { useIsClient } from "@/lib/hooks/useIsClient";
import { getSearchableReviews, fetchJsonData } from "@/lib";
import { IReviewSearchable } from "@/types";

interface IProps {}

const SearchBox = ({}: IProps): JSX.Element | null => {
  const isClient = useIsClient();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [reviews, setReviews] = useState<IReviewSearchable[]>([]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChange = (review: IReviewSearchable) => {
    router.push(`/reviews/${review.slug}`);
  };

  useEffect(() => {
    if (query.length < 2) return setReviews([]);
    const controller = new AbortController();

    (async () => {
      const [res, err] = await fetchJsonData<IReviewSearchable[]>(
        `/api/search?query=${query}`,
        {
          signal: controller.signal,
        },
      );
      res && setReviews(res);
      err && setReviews([{ slug: "", title: err }]);
    })();

    return () => {
      controller.abort();
    };
  }, [query]);

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
          {reviews.map((review) => (
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
