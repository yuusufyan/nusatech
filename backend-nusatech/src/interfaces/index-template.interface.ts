export interface IPaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface IPaginateRequest {
  perPage?: number;
  page?: number;
}

export interface IPaginateResponse<T> {
  meta: IPaginationMeta;
  data: Array<T>;
}
