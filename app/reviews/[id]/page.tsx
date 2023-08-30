import React from "react";

import Heading from "@/components/Heading";

const toSentenceCase = (paramStringValue: string) =>
  paramStringValue
    .split("-")
    .map((current) => current.charAt(0).toUpperCase() + current.slice(1))
    .join(" ");

const ReviewDetailsPage = ({
  params,
}: {
  params: { id: string };
}): JSX.Element => {
  const title = toSentenceCase(params.id);
  const imageSrc = `/images/${params.id}.jpg`;
  return (
    <div>
      <Heading>{title}</Heading>
      <img
        src={imageSrc}
        alt={title}
        width={640}
        height={360}
        className="rounded mb-2"
      />
      <p>THis will be a review about the {title}</p>
    </div>
  );
};

export default ReviewDetailsPage;
