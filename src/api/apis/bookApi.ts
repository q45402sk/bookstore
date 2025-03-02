import { IBookList } from '@/types/response/book';
import { axiosInstance } from '../instance';
import { IBookInfo } from '@/types/request/Book';

export const bookAPI = {
  getBooks: async (
    page: number,
    limit: number,
    title: string,
    author: string
  ) => {
    const response = await axiosInstance.get<IBookList>('/api/books', {
      params: {
        page,
        limit,
        title,
        author,
      },
    });
    return response.data;
  },
  deleteBook: async (id: number) => {
    return axiosInstance.delete(`/api/books/${id}`);
  },
  createBook: async (book: IBookInfo) => {
    const response = await axiosInstance.post('/api/books', book);
    return response;
  },
  updateBook: async (id: number, book: IBookInfo) => {
    const { data } = await axiosInstance.put(`/api/books/${id}`, book);
    return data;
  },
};
