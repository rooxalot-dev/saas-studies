export interface IPageable<T extends {}> {
  data: T[],
  totalRecords: number,
  totalPages: number
}
