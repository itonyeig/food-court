export interface PaginationResult<T> {
  previousPage?: number;
  nextPage?: number;
  total: number;
  currentPage: number;
  totalPages: number;
  content: T[];
}

export function paginate<T>(
  data: T[],
  page: number,
  limit: number,
): PaginationResult<T> {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    ...(startIndex > 0 && { previousPage: page - 1 }),
    ...(endIndex < total && { nextPage: page + 1 }),
    total,
    currentPage: page,
    totalPages,
    content: data.slice(startIndex, endIndex),
  };
}
