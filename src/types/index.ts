export * from "./cms";
import { ICmsReviewDetails } from "./cms";
export interface IPageProps<P = Record<string, any>, Q = Record<string, any>> {
  params: P;
  searchParams: Q;
}

export interface IData {
  title: string;
  date: string;
  image: string;
  slug: string;
}

export interface IFileMdData {
  data: IData;
  body: string;
}

export interface IReviewDetails extends Omit<ICmsReviewDetails, "image"> {
  image: string;
}
