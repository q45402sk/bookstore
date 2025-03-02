import { IBookList } from '@/types/response/book';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { bookAPI } from '../apis/bookApi';
import { IBookInfo } from '@/types/request/Book';

export const useBookList = (
  page: number,
  limit: number,
  title: string,
  author: string
) => {
  return useQuery<IBookList>({
    queryKey: QueryKey.BOOKS.LIST(page, limit, title, author),
    queryFn: () => bookAPI.getBooks(page, limit, title, author),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useDeleteBook = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await bookAPI.deleteBook(id);
    },
    onSettled: () => {
      queryClient.removeQueries({
        queryKey: QueryKey.BOOKS.DETAIL(id),
      });
      queryClient.invalidateQueries({
        queryKey: QueryKey.BOOKS.LIST,
        refetchType: 'all',
      });
    },
  });
};

export const useCreateBook = () => {
  return useMutation({
    mutationFn: async (book: IBookInfo) => {
      return await bookAPI.createBook(book);
    },
  });
};

export const useUpdateBook = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (book: IBookInfo) => {
      return await bookAPI.updateBook(id, book);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKey.BOOKS.DETAIL(id),
        refetchType: 'all',
      });
    },
  });
};
