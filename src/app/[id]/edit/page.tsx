/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
'use client';

import BookForm from '@/components/common/BookForm';
import styles from './Edit.module.scss';
import { useBookDetails } from '@/api/queryHooks/useBookList';
import Header from '@/app/_components/Header';

interface IPageParams {
  params: any;
}

export default function EditBook({ params }: IPageParams) {
  const { id } = params;
  const { data, isLoading, refetch } = useBookDetails(Number(id));

  return (
    <>
      <Header backButton={true} />
      <div className={styles.body}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>로딩중...</div>
        ) : (
          <BookForm mode={'edit'} initialData={data} refetch={refetch} />
        )}
      </div>
    </>
  );
}
