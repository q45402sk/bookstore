import Image from 'next/image';
import styles from './SearchBar.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface ISearchBarProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  handleSearch: (title: string, author: string) => void;
}

export default function SearchBar({
  title,
  setTitle,
  author,
  setAuthor,
  handleSearch,
}: ISearchBarProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="title">제목</label>
      <input
        id="title"
        className={styles.input}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="author">저자</label>
      <input
        id="author"
        className={styles.input}
        value={author}
        onChange={e => {
          setAuthor(e.target.value);
        }}
      />
      <button onClick={() => handleSearch(title, author)}>
        <Image
          src={'/assets/icons/search.svg'}
          alt="돋보기 이미지"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
