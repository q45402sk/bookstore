export interface IBookInfo {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  summary: string;
  count: number;
  price: number;
}

export interface IBookList {
  books: IBookInfo[];
  total: number;
  page: number;
  pages: number;
}
