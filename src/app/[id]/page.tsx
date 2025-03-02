'use client';

import { useBookDetails } from '@/api/queryHooks/useBookList';
import styles from './Details.module.scss';
import Image from 'next/image';
import Header from '../_components/Header';
import Link from 'next/link';

export default function BookDetails({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { id } = params;
  const { data, isLoading } = useBookDetails(Number(id));

  if (!data && !isLoading) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <>
      <Header backButton={true} />
      <div className={styles.body}>
        {isLoading ? (
          <div className={styles.loading}>로딩중...</div>
        ) : (
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <Image
                src={data?.thumbnail || ''}
                alt={data?.title || ''}
                width={200}
                height={300}
              />
            </div>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{data?.title}</h1>
              <Link href={`/${id}/edit`} className={styles.edit}>
                수정
              </Link>
            </div>
            <p className={styles.author}>{data?.author}</p>
            <p className={styles.price}>{data?.price}원</p>
            <p className={styles.count}>{data?.count}권</p>
            <p className={styles.summary}>{data?.summary}</p>
          </div>
        )}
      </div>
    </>
  );
}
