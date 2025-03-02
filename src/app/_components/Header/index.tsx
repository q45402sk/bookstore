'use client';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import Link from 'next/link';

export default function Header({ backButton }: { backButton?: boolean }) {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back();
  };
  return (
    <header className={styles.container}>
      {backButton ? (
        <button
          type="button"
          onClick={handleBackButtonClick}
          className={styles.backButton}>
          뒤로가기
        </button>
      ) : (
        <div></div>
      )}
      <Link href="/" className={styles.logo}>
        송은문고
      </Link>
    </header>
  );
}
