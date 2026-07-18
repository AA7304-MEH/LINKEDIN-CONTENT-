import InspirationBoard from '@/components/InspirationBoard';
import styles from './page.module.css';

export default function InspirationPage() {
    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.title}>Inspiration Board</h1>
                <p className={styles.subtitle}>
                    Found a LinkedIn post you love? Paste it here — AI will decode <strong>why it worked</strong> and instantly generate a similar post in your voice.
                </p>
            </div>
            <InspirationBoard />
        </main>
    );
}
