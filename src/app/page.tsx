'use client';
import Image from 'next/image';
import Footer from './_components/Footer';
import { useBookList } from '@/api/queryHooks/useBookList';
import { IBookInfo } from '@/types/response/book';
import { useEffect, useState } from 'react';
import Header from './_components/Header';
import styles from './Home.module.scss';
import Link from 'next/link';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousTotalPages, setPreviousTotalPages] = useState(0);

  const { data, isLoading, isError } = useBookList(currentPage, 10, '', '');

  console.log('데이터:', data, '로딩 중:', isLoading, '에러 발생:', isError);
  //데이타가 없을때 에러처리 필요

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 총 페이지 값 저장 (페이지를 넘길 때 페이지 숫자가 보이지 않는 것을 방지)
  useEffect(() => {
    if (data?.pages && previousTotalPages !== data.pages) {
      setPreviousTotalPages(data.pages);
    }
  }, [data?.pages, previousTotalPages]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        {isLoading && <div>로딩중...</div>}
        {isError && <div>에러가 발생했습니다.</div>}
        {data?.books?.map((book: IBookInfo) => {
          return (
            <div key={book.id} className={styles.bookContainer}>
              <Link className={styles.book} href={'/id'}>
                <Image
                  src={book.thumbnail}
                  alt="썸네일 이미지"
                  width={100}
                  height={150}
                />
                <div className={styles.bookDetails}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <div className={styles.keyDetails}>
                      <div className={styles.title}>{book.title}</div>
                      <div className={styles.author}>{book.author}</div>
                      <div className={styles.price}>{book.price}원</div>
                    </div>
                    <div className={styles.count}>{book.count}권</div>
                  </div>
                  <div className={styles.summary}>{book.summary}</div>
                </div>
              </Link>
              <div className={styles.divider} />
            </div>
          );
        })}
      </div>
      <Footer
        totalPages={data?.pages || previousTotalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        books={[
          { id: 1, title: 'apple' },
          { id: 1, title: 'banana' },
        ]}
      />
    </div>
  );
}
