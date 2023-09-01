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

export interface IWhCmsEntryEvent<E = Record<string, any>> {
  event:
    | "entry.create"
    | "entry.update"
    | "entry.delete"
    | "entry.publish"
    | "entry.unpublish";
  createdAt: string;
  model: string;
  uid: string;
  entry: E;
}

export type IWhCmsReviewEvent = IWhCmsEntryEvent<ICmsReviewItem>;
