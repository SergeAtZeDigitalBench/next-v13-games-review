import React from "react";
import { marked } from "marked";
import matter from "gray-matter";
import { readFile } from "fs/promises";
import path from "path";

import Heading from "@/components/Heading";

interface IData {
  title: string;
  date: string;
  image: string;
}

interface FileMdData {
  data: IData;
  html: string;
}

const getFileContent = async (
  filePath: string,
): Promise<[FileMdData, null] | [null, string]> => {
  try {
    const md = await readFile(filePath, { encoding: "utf-8" });
    const { data, content } = matter(md);
    const html = marked.parse(content);

    return [{ data, html } as FileMdData, null];
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString();
    return [null, msg];
  }
};

const ReviewDetailsPage = async ({ params }: { params: { id: string } }) => {
  const pathToFile = path.join(
    process.cwd(),
    "content",
    "reviews",
    `${params.id}.md`,
  );
  const [fileData, error] = await getFileContent(pathToFile);

  return fileData ? (
    <>
      <Heading>{fileData.data.title}</Heading>
      <p className="pb-2 italic">
        Added on: {new Date(fileData.data.date).toDateString()}
      </p>
      <img
        src={fileData.data.image}
        alt={fileData.data.title}
        width={640}
        height={360}
        className="rounded mb-2"
      />

      <article
        className=" max-w-screen-sm prose prose-slate"
        dangerouslySetInnerHTML={{ __html: fileData.html }}
      />
    </>
  ) : (
    <p className="text-red-600 font-bold text-xl text-center">{error}</p>
  );
};

export default ReviewDetailsPage;
