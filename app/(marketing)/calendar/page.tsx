import ContentCalendar from '@/components/ContentCalendar';
import styles from './page.module.css';

export default function CalendarPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Simple Content Calendar</h1>
            <p className={styles.subtitle}>Plan your week. Consistency is key.</p>
            <ContentCalendar />
        </main>
    );
}
