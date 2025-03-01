import { IBookList } from '@/types/response/book';
import { axiosInstance } from '../instance';

export const getBooks = async (
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
};
