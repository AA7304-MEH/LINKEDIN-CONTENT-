import ViralHookAnalyzer from '@/components/ViralHookAnalyzer';
import styles from './page.module.css';

export default function HookAnalyzerPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Viral Hook Engine</h1>
                <p className={styles.description}>
                    Optimize your LinkedIn post opening lines for maximum engagement.
                </p>
                <ViralHookAnalyzer />
            </div>
        </main>
    );
}
