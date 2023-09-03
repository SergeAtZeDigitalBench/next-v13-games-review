export const getPageNumber = (page?: string): number => {
  if (!page || isNaN(+page)) return 1;
  return parseInt(page, 10);
};

export const getNextPage = (current: number, max: number): number => {
  const next = current + 1;
  return next < max ? next : max;
};

export const getPrevPage = (current: number, min = 1): number => {
  const next = current - 1;
  if (next <= min) return min;
  return next;
};
