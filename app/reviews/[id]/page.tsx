import React from "react";
import { readFile } from "fs/promises";
import path from "path";

import Heading from "@/components/Heading";

const getFileContent = async (
  filePath: string,
): Promise<[string, null] | [null, string]> => {
  try {
    const md = await readFile(filePath, { encoding: "utf-8" });
    return [md, null];
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString();
    return [null, msg];
  }
};

const toSentenceCase = (paramStringValue: string) =>
  paramStringValue
    .split("-")
    .map((current) => current.charAt(0).toUpperCase() + current.slice(1))
    .join(" ");

const ReviewDetailsPage = async ({ params }: { params: { id: string } }) => {
  const title = toSentenceCase(params.id);
  const imageSrc = `/images/${params.id}.jpg`;
  const pathToFile = path.join(
    process.cwd(),
    "content",
    "reviews",
    `${params.id}.md`,
  );
  const [data, error] = await getFileContent(pathToFile);

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
      {data && <div>{data}</div>}
    </div>
  );
};

export default ReviewDetailsPage;
