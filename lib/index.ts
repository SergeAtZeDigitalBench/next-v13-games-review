import { marked } from "marked";
import matter from "gray-matter";
import { readFile } from "fs/promises";
import path from "path";

interface IData {
  title: string;
  date: string;
  image: string;
}

interface FileMdData {
  data: IData;
  body: string;
}

export const getMdFileContent = async (
  filePath: string,
): Promise<[FileMdData, null] | [null, string]> => {
  try {
    const md = await readFile(filePath, { encoding: "utf-8" });
    const { data, content } = matter(md);
    const body = marked.parse(content);

    return [{ data, body } as FileMdData, null];
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
