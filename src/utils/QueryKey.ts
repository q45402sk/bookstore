export const QueryKey = {
  LIST: 'list',
  BOOKS: {
    KEY: 'books',
    LIST: (page: number, limit: number, title: string, author: string) => [
      QueryKey.BOOKS.KEY,
      QueryKey.LIST,
      page,
      limit,
      title,
      author,
    ],
    DETAIL: (id: number) => [QueryKey.BOOKS.KEY, id],
  },
};
