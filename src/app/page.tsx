'use client';
import Image from 'next/image';
import Footer from './_components/Footer';
import { useBookList } from '@/api/queryHooks/useBookList';
import { IBookInfo } from '@/types/response/book';

export default function Home() {
  const { data, isLoading, isError } = useBookList(1, 10, '', '');

  console.log('데이터:', data, '로딩 중:', isLoading, '에러 발생:', isError);
  //데이타가 없을때 에러처리 필요

  return (
    <div>
      <Image
        src="https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9791191214185.jpg&w=3840&q=80"
        alt="test"
        width={144}
        height={222}
      />
      <div>
        {isLoading && <div>로딩중...</div>}
        {isError && <div>에러가 발생했습니다.</div>}
        {data?.books?.map((book: IBookInfo) => {
          return <div key={book.id}>{book.title}</div>;
        })}
      </div>
      <Footer
        totalPages={17}
        books={[
          { id: 1, title: 'apple' },
          { id: 1, title: 'banana' },
        ]}
      />
    </div>
  );
}
