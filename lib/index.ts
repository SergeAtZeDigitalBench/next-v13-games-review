import { marked } from "marked";
import matter from "gray-matter";
import { readFile, readdir } from "fs/promises";
import path from "path";

import { IFileMdData, IData } from "@/types";

export const getMdFileContent = async (
  filePath: string,
): Promise<[IFileMdData, null] | [null, string]> => {
  try {
    const md = await readFile(filePath, { encoding: "utf-8" });
    const { data, content } = matter(md);
    const body = marked.parse(content);

    return [{ data, body } as IFileMdData, null];
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString();
    return [null, msg];
  }
};

export const getReview = (slug: string) => {
  const pathToFile = path.join(
    process.cwd(),
    "content",
    "reviews",
    `${slug}.md`,
  );

  return getMdFileContent(pathToFile);
};

const getReviewSummary = async (fileName: string): Promise<IData> => {
  const pathToFile = path.join(process.cwd(), "content", "reviews", fileName);
  const md = await readFile(pathToFile, { encoding: "utf-8" });
  const { data } = matter(md);
  return data as IData;
};

export const getReviewsList = async (): Promise<
  [IData[], null] | [null, string]
> => {
  try {
    const pathToDir = path.join(process.cwd(), "content", "reviews");
    const filenames = await readdir(pathToDir);
    const reviews = await Promise.all(
      filenames.map((fileName) => getReviewSummary(fileName)),
    );
    return [reviews, null];
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString();
    return [null, msg];
  }
};

export const getFeaturedReview = async (): Promise<
  [IData, null] | [null, string]
> => {
  const [reviewsList, error] = await getReviewsList();
  if (!reviewsList) {
    return [null, error];
  }

  return [reviewsList[0], null];
};
