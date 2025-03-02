'use client';
import Image from 'next/image';
import Footer from './_components/Footer';
import { useBookList, useDeleteBook } from '@/api/queryHooks/useBookList';
import { IBookInfo } from '@/types/response/book';
import { useEffect, useState } from 'react';
import Header from './_components/Header';
import styles from './Home.module.scss';
import Link from 'next/link';
import Bar from './_components/Bar';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousTotalPages, setPreviousTotalPages] = useState(0);
  const [authorInput, setAuthorInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null); // 삭제 선택된 책 ID

  const { data, isLoading, isError } = useBookList(
    currentPage,
    10,
    title,
    author
  );
  const deleteBook = useDeleteBook(selectedBookId ?? 0);

  const {
    modalOpen: deleteModalOpen,
    handleModalOpen: handleDeleteModalOpen,
    handleModalClose: handleDeleteModalClose,
  } = useModal();

  console.log('데이터:', data, '로딩 중:', isLoading, '에러 발생:', isError);
  //데이타가 없을때 에러처리 필요

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (titleInput: string, authorInput: string) => {
    setAuthor(authorInput);
    setTitle(titleInput);
  };

  const handleDeleteBook = () => {
    if (selectedBookId === null) return;

    deleteBook.mutate(selectedBookId, {
      onSuccess: () => {
        setSelectedBookId(null); // 삭제 후 선택 ID 초기화
      },
      onError: () => {
        alert('책 삭제에 실패했습니다.');
        handleDeleteModalClose();
      },
    });
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
      <Bar
        author={authorInput}
        setAuthor={setAuthorInput}
        title={titleInput}
        setTitle={setTitleInput}
        handleSearch={handleSearch}
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
      />
      <div className={styles.body}>
        {isLoading && <div>로딩중...</div>}
        {isError && <div>에러가 발생했습니다.</div>}
        {data?.books?.map((book: IBookInfo) => {
          return (
            <div key={book.id} className={styles.bookContainer}>
              <div className={styles.deleteButtonWithBook}>
                {isDeleteMode && (
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => {
                      setSelectedBookId(book.id);
                      handleDeleteModalOpen();
                    }}>
                    <Image
                      src={'/assets/icons/trash.svg'}
                      alt="삭제 이미지"
                      width={24}
                      height={24}
                    />
                  </button>
                )}
                <Link className={styles.book} href={`/${book.id}`}>
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
              </div>
              <div className={styles.divider} />
              <Modal
                modalOpen={deleteModalOpen}
                onClose={() => {
                  handleDeleteModalClose();
                }}
                maxWidth={552}>
                <div className={styles.modalBackground}>
                  <div className={styles.description}>
                    <p> 책을 삭제하시겠습니까?</p>
                  </div>
                </div>
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteBook();
                    }}
                    disabled={deleteBook.isPending}
                    className={styles.modalFirstButton}>
                    네
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteModalClose}
                    disabled={deleteBook.isPending}
                    className={styles.modalSecondButton}>
                    아니오
                  </button>
                </div>
              </Modal>
            </div>
          );
        })}
      </div>

      <Footer
        totalPages={data?.pages || previousTotalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        books={data?.books || []}
      />
    </div>
  );
}
