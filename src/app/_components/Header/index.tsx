import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>송은문고</div>
    </header>
  );
}
