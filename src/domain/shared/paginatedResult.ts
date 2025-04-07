export interface PaginatedResult<T> {
  result: T[];
  total: number;
  totalPages: number;
}
