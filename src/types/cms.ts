export interface ICmsPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ICmsMeta extends Record<string, any> {
  pagination: ICmsPagination;
}

export interface ICmsItem<I = Record<string, any>> {
  id: number;
  attributes: I;
}
export interface ICmsListPayload<D = Record<string, any>> {
  data: ICmsItem<D>[];
  meta: ICmsMeta;
}

export interface ICmsItemPayload<D = Record<string, any>> {
  data: ICmsItem<D>;
  meta?: Record<string, any>;
}

export interface ICmsImage {
  url: string;
}

export interface ICmsReviewItem {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  image: ICmsItemPayload<ICmsImage>;
}

export interface ICmsReviewDetails extends ICmsReviewItem {
  body: string;
}

export type ICmsListOfReviews = ICmsListPayload<ICmsReviewItem>;

export type ICmsListOfReviewsDetails = ICmsListPayload<ICmsReviewDetails>;
