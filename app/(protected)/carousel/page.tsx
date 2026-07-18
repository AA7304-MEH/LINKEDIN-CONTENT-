import CarouselGenerator from '@/components/CarouselGenerator';
import styles from './page.module.css';

export default function CarouselPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>AI Carousel Generator</h1>
                <p className={styles.description}>
                    Generate beautiful, high-impact multi-slide carousels for LinkedIn in seconds.
                </p>
                <CarouselGenerator />
            </div>
        </main>
    );
}
