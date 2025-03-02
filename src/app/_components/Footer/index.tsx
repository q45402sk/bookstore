'use client';
import Image from 'next/image';
import styles from './Footer.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface book {
  id: number;
  title: string;
}

interface IFooterProps {
  totalPages: number;
  books: book[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handlePageChange: (page: number) => void;
}

export default function Footer({
  totalPages,
  books,
  currentPage,
  setCurrentPage,
  handlePageChange,
}: IFooterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.insideContainer}>
        {books.length !== 0 && (
          <div className={styles.buttons}>
            <button type="button" onClick={() => handlePageChange(1)}>
              <Image
                src={'/assets/icons/chevron-double-left.svg'}
                alt="맨 이전 번호로 가기"
                width={24}
                height={24}
              />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentPage(prev => {
                  if (prev !== 1) {
                    return prev - 1;
                  }
                  return prev;
                })
              }>
              <Image
                src={'/assets/icons/chevron-left.svg'}
                alt="이전 번호로 가기"
                width={24}
                height={24}
              />
            </button>
            {/* 1,2,3,4,5             {length: 5, start: 1}
        6,7,8,9,10           {length: 5, start: 6}
        11,12,13,14,15    {length: 5, start: 11}
        16, 17                 {length: 2, start: 16}

        17 나누기 5 = 몫:3, 나머지: 2 */}
            {Array.from(
              //페이지 숫자의 개수를 설정하는 부분 (화살표 사이에 들어가는 숫자의 개수)
              {
                length:
                  totalPages - currentPage <
                  totalPages - Math.floor(totalPages / 5) * 5
                    ? totalPages - Math.floor((currentPage - 1) / 5) * 5
                    : 5,
              },
              (_, i) => Math.floor((currentPage - 1) / 5) * 5 + i + 1
            ).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
                className={`${styles.numberButton} ${currentPage === page ? styles.green : ''}`}>
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setCurrentPage(prev => {
                  if (prev !== totalPages) {
                    return prev + 1;
                  }
                  return prev;
                })
              }>
              <Image
                src={'/assets/icons/chevron-right.svg'}
                alt="이후 번호로 가기"
                width={24}
                height={24}
              />
            </button>
            <button type="button" onClick={() => handlePageChange(totalPages)}>
              <Image
                src={'/assets/icons/chevron-double-right.svg'}
                alt="맨 이후 번호로 가기"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
