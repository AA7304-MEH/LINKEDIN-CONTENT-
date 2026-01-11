import Repurposer from '@/components/Repurposer';
import styles from './page.module.css';

export default function RepurposePage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>One-Click Repurposing</h1>
            <p className={styles.subtitle}>Turn articles, notes, or transcripts into formatted LinkedIn content.</p>
            <Repurposer />
        </main>
    );
}
