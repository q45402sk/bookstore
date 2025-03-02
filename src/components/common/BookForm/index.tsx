import { IBookInfo } from '@/types/request/Book';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './BookForm.module.scss';
import Image from 'next/image';
import FileInput from '../FileInput';
import { useRouter } from 'next/navigation';
import {
  useCreateBook,
  useDeleteBook,
  useUpdateBook,
} from '@/api/queryHooks/useBookList';
import { QueryKey } from '@/utils/QueryKey';
import { useQueryClient } from '@tanstack/react-query';

interface IBookFormProps {
  mode: 'create' | 'edit';
  initialData?: IBookInfo; //edit 모드일 때만 필요
}

export default function BookForm({ mode, initialData }: IBookFormProps) {
  const editMode = mode === 'edit';
  const router = useRouter();
  const createBook = useCreateBook();
  const updateBook = useUpdateBook(initialData?.id || 0);
  const deleteBook = useDeleteBook(initialData?.id || 0);
  const queryClient = useQueryClient();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const methods = useForm<IBookInfo>({
    mode: 'all',
    defaultValues: {
      id: initialData?.id || Math.floor(100000 + Math.random() * 900000),
      title: initialData?.title || '',
      author: initialData?.author || '',
      thumbnail: initialData?.thumbnail || '',
      summary: initialData?.summary || '',
      count: initialData?.count || 0,
      price: initialData?.price || 0,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = methods;

  const onSubmit = async (bookInfo: IBookInfo) => {
    setIsButtonDisabled(true);

    if (mode === 'create') {
      createBook.mutate(bookInfo, {
        onSuccess: async () => {
          router.replace(`/new/success/${bookInfo.id}`);
          queryClient.invalidateQueries({
            queryKey: QueryKey.BOOKS.LIST,
            refetchType: 'all',
          });
        },
        onError: () => {
          alert(`책 등록에 실패했어요.`);
          setIsButtonDisabled(false);
        },
      });
    } else {
      updateBook.mutate(bookInfo, {
        onSuccess: async () => {
          router.replace(`/${initialData?.id}`);
          queryClient.invalidateQueries({
            queryKey: QueryKey.BOOKS.LIST,
            refetchType: 'all',
          });
        },
        onError: () => {
          alert(`책 수정에 실패했어요.`);
          router.back();
          setIsButtonDisabled(false);
        },
      });
    }
  };

  const handleDeleteBook = () => {
    deleteBook.mutate(initialData?.id || 0, {
      onSuccess: () => {
        router.back();
      },
      onError: () => {
        alert('책 삭제에 실패했습니다.');
        // handleDeleteModalClose();
      },
    });
  };

  // 'image' 필드의 값 변화를 감지
  const watchedImage = watch('thumbnail');

  useEffect(() => {
    if (!editMode) {
      setValue('id', Math.floor(100000 + Math.random() * 900000));
    }
  }, [setValue, editMode]);

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.title}>
                제목
              </label>
              <p className={styles.titleDescription}>책 제목은 무엇인가요?</p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="title"
                  {...register('title', { required: '제목을 입력해 주세요.' })}
                  className={`${styles.commonInput} ${errors.title && styles.error}`}
                  placeholder={'책 제목을 입력해 주세요.'}
                />
                <div className={styles.errorMessage}>
                  {errors.title && errors.title.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.title && !errors.title && '좋은 제목이네요!'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.author}>
                작가
              </label>
              <p className={styles.titleDescription}>작가는 누구인가요?</p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="author"
                  {...register('author', {
                    required: '작가명을 입력해 주세요.',
                  })}
                  className={`${styles.commonInput} ${errors.author && styles.error}`}
                  placeholder={'작가명을 입력해 주세요.'}
                />
                <div className={styles.errorMessage}>
                  {errors.author && errors.author.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.author && !errors.author && '훌륭한 작가네요.'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="price" className={styles.author}>
                가격
              </label>
              <p className={styles.titleDescription}>가격을 정해주세요.</p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="price"
                  {...register('price', {
                    required: '가격을 정해주세요.',
                  })}
                  className={`${styles.commonInput} ${errors.price && styles.error}`}
                  placeholder={'가격을 정해주세요.'}
                />
                <div className={styles.errorMessage}>
                  {errors.price && errors.price.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.price && !errors.price && '적당한 가격이네요.'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="summary" className={styles.title}>
                내용 입력
              </label>
              <p className={styles.titleDescription}>
                어떤 모임인지 설명해 주세요!
              </p>
              <div className={styles.textEditor}>
                <textarea
                  id="summary"
                  value={initialData?.summary}
                  // onChangeWithReactHookForm={register('content').onChange}
                  {...register('summary', {
                    required: '책 요약을 입력해 주세요.',
                  })}
                />
                <div className={styles.errorMessage}>
                  {errors.summary && errors.summary.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.summary && !errors.summary && '좋은 내용이네요.'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="image" className={styles.title}>
                이미지
              </label>
              <p className={styles.titleDescription}>
                썸네일로 사용되는 이미지에요!
                <br />
                직관적이고 잘 알아볼 수 있도록 사진을 넣어주세요.
              </p>
              <div className={styles.fileInput}>
                <FileInput
                  id="thumbnail"
                  setValue={setValue}
                  selectedImageUrl={initialData?.thumbnail || ''}
                  height={'264px'}
                  width={'100%'}>
                  <Image
                    className={styles.downloadIcon}
                    src={'/assets/icons/download.svg'}
                    alt="다운로드 아이콘"
                    width={20}
                    height={20}
                    priority
                  />
                  <p className={styles.fileInputTitle}>이미지 업로드</p>
                  <p className={styles.fileInputDescription}>
                    파일 형식: jpg 또는 png
                  </p>
                  <p className={styles.fileInputDescription}>
                    권장 사이즈: 가로 204px, 세로 247px
                  </p>
                  <p className={styles.fileInputDescription}>
                    상세 페이지에서 제일 먼저 보이는 이미지 입니다.
                  </p>
                </FileInput>
                <div
                  className={`${styles.successMessage} ${!watchedImage && styles.info}`}>
                  {watchedImage
                    ? '사진이 너무 멋있어요!'
                    : '이미지를 업로드하지 않으시면, 기본 이미지가 보여집니다.'}
                </div>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="count" className={styles.author}>
                판매 수량
              </label>
              <p className={styles.titleDescription}>
                판매 수량을 입력해 주세요.
              </p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="count"
                  {...register('count', {
                    required: '판매 수량을 입력해 주세요.',
                  })}
                  className={`${styles.commonInput} ${errors.count && styles.error}`}
                  placeholder={'판매 수량을 입력해 주세요.'}
                />
                <div className={styles.errorMessage}>
                  {errors.count && errors.count.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.count && !errors.count && '좋습니다.'}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              disabled={!isValid || isButtonDisabled}
              className={styles.submitButton}>
              {editMode ? '수정하기' : '확인'}
            </button>
            {editMode && (
              <button
                type="button"
                disabled={deleteBook.isPending}
                className={styles.deleteButton}
                onClick={handleDeleteBook}>
                책 삭제
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
