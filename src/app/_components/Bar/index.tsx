import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Bar.module.scss';
import SearchBar from './SearchBar';
import EditBar from './EditBar/EditBar';

interface IBarProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  handleSearch: (title: string, author: string) => void;
}

export default function Bar({
  title,
  setTitle,
  author,
  setAuthor,
  handleSearch,
}: IBarProps) {
  const [isVisible, setIsVisible] = useState(true); // 바가 보이는지 여부
  const [lastScrollY, setLastScrollY] = useState(0); // 이전 스크롤 위치 저장

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // 아래로 스크롤하면 사라짐
      } else {
        setIsVisible(true); // 위로 스크롤하면 나타남
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}>
      <SearchBar
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        handleSearch={handleSearch}
      />
      <EditBar />
    </div>
  );
}
