import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import styles from './EditBar.module.scss';

interface IEditBarProps {
  isDeleteMode: boolean;
  setIsDeleteMode: Dispatch<SetStateAction<boolean>>;
}

export default function EditBar({
  isDeleteMode,
  setIsDeleteMode,
}: IEditBarProps) {
  const router = useRouter();
  const handleNewButtonClick = () => {
    router.push('/new');
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleNewButtonClick}>
        추가
      </button>
      <button type="button" onClick={handleDeleteButtonClick}>
        삭제
      </button>
    </div>
  );
}
