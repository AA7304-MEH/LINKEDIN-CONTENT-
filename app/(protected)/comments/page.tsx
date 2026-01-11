import CommentFinder from '@/components/CommentFinder';
import styles from './page.module.css';

export default function CommentsPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Comment Intelligence</h1>
            <p className={styles.subtitle}>Find trending conversations and engage with AI-crafted comments.</p>
            <CommentFinder />
        </main>
    );
}
