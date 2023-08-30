export interface IPageProps<P = Record<string, any>, Q = Record<string, any>> {
  params: P;
  searchParams: Q;
}
