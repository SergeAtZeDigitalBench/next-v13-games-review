export * from "./cms";
import { ICmsReviewDetails } from "./cms";
export interface IPageProps<P = Record<string, any>, Q = Record<string, any>> {
  params: P;
  searchParams: Q;
}

export interface IReviewSummary {
  title: string;
  date: string;
  image: string;
  slug: string;
  subtitle: string;
}

export interface IReviewDetails
  extends Omit<ICmsReviewDetails, "image" | "publishedAt"> {
  image: string;
  date: string;
}
