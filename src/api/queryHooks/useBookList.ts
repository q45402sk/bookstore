import { IBookList } from '@/types/response/book';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../apis/bookApi';
import { QueryKey } from '@/utils/QueryKey';

export const useBookList = (
  page: number,
  limit: number,
  title: string,
  author: string
) => {
  return useQuery<IBookList>({
    queryKey: QueryKey.BOOKS.LIST(page, limit, title, author),
    queryFn: () => getBooks(page, limit, title, author),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
