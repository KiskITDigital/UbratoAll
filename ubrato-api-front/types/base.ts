export interface BaseResponse<T> {
  data: T;
}

export interface BaseTableResponse<T> extends BaseResponse<T> {
  pagination: {
    found: number;
    page: number;
    pages: number;
    per_page: number;
  };
}

export interface BaseRequest<
  Q = { [key: string]: string } | undefined,
  P = { [key: string]: string } | undefined,
  B = unknown | undefined,
> {
  query: Q extends undefined ? undefined : Q;
  params: P extends undefined ? undefined : P;
  body: B extends undefined ? undefined : B;
}

export interface BaseTableRequest {
  // /**
  //  * Сдвиг начала каждой страницы на указанное количество единиц.
  //  */
  // offset?: number;

  // /**
  //  * Максимальное количество объектов, которое может вернуть запрос.
  //  */
  // limit?: number;

  // /**
  //  * Определяет атрибут, по которому сортируются элементы.
  //  */
  // sort?: string;

  // /**
  //  * Направление сортировки результатов. По возрастанию (ASC), по убыванию (DESC).
  //  */
  // direction?: "ASC" | "DESC";

  /**
   * Номер страницы
   */
  page?: number;

  /**
   * Количество элементов на странице
   */
  per_page?: number;
}
