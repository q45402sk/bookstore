'use client';

import styles from './Success.module.scss';
import { useRouter } from 'next/navigation';

export default function NewSuccess({ params }: { params: any }) {
  const { id } = params;
  const router = useRouter();
  const handleGoToBookDetails = () => {
    router.replace(`/${id}`);
  };

  const handleCreateNewBook = () => {
    router.replace('/new');
  };

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>책이 추가되었어요!</h1>
      <button
        type="button"
        className={styles.bookDetailsButton}
        onClick={handleGoToBookDetails}>
        등록된 책 확인하러가기
      </button>
      <button
        type="button"
        className={styles.newBookButton}
        onClick={handleCreateNewBook}>
        책 더 등록하기
      </button>
    </div>
  );
}
