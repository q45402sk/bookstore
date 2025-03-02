'use client';

import BookForm from '@/components/common/BookForm';
import styles from './Edit.module.scss';
import { useBookDetails } from '@/api/queryHooks/useBookList';

export default function EditBook({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { id } = params;
  const { data, isLoading } = useBookDetails(Number(id));

  return (
    <div className={styles.body}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>로딩중...</div>
      ) : (
        <BookForm mode={'edit'} initialData={data} />
      )}
    </div>
  );
}
