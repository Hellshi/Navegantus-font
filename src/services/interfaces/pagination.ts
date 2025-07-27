export interface PaginationResponse {
  currentPage: number;
  limitPerPage: number;
  totalItems: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface PaginatedResponse<T> {
  data: Array<T>;
  pagination: PaginationResponse;
}
