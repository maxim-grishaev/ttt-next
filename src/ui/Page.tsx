import styles from './Page.module.css';

export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.page}>
    <main className={styles.main}>{children}</main>
  </div>
);
