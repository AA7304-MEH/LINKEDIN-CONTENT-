"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './CarouselGenerator.module.css';

interface Slide {
    slide: number;
    headline: string;
    points: string[];
    cta: boolean;
}

export default function CarouselGenerator() {
    const [topic, setTopic] = useState('');
    const [slideCount, setSlideCount] = useState(5);
    const [style, setStyle] = useState('Gradient');
    const [slides, setSlides] = useState<Slide[]>([]);
    const [activePreviewSlide, setActivePreviewSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setSlides([]);

        try {
            const res = await fetch('/api/carousel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, slideCount, style }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate carousel');
            }

            setSlides(data.slides);
            setActivePreviewSlide(0);
            toast.success("Carousel generated successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to generate carousel. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (slides.length === 0) return;
        
        try {
            const { jsPDF } = await import('jspdf');
            
            // square format 1080x1080 px representation
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: [600, 600]
            });

            slides.forEach((slide, index) => {
                if (index > 0) {
                    doc.addPage();
                }

                // 1. Draw Background
                if (style === 'Dark') {
                    doc.setFillColor(10, 15, 30); // #0A0F1E
                    doc.rect(0, 0, 600, 600, 'F');
                } else if (style === 'Light') {
                    doc.setFillColor(248, 250, 252); // #F8FAFC
                    doc.rect(0, 0, 600, 600, 'F');
                } else { // Gradient
                    // jsPDF doesn't natively draw css gradients easily, let's use a nice custom solid color matching theme
                    doc.setFillColor(13, 27, 42); // Navy Gradient Base
                    doc.rect(0, 0, 600, 600, 'F');
                    
                    // Add secondary colored design accent on the side
                    doc.setFillColor(6, 182, 212); // Cyan #06B6D4
                    doc.rect(0, 0, 15, 600, 'F');
                }

                // 2. Add Branding/Top Header
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(14);
                if (style === 'Light') {
                    doc.setTextColor(10, 15, 30);
                } else {
                    doc.setTextColor(6, 182, 212);
                }
                doc.text("Resodin AI", 40, 50);

                // 3. Slide Number Indicator
                doc.setFontSize(12);
                doc.setFont('Helvetica', 'normal');
                if (style === 'Light') {
                    doc.setTextColor(148, 163, 184);
                } else {
                    doc.setTextColor(100, 116, 139);
                }
                doc.text(`${slide.slide} / ${slides.length}`, 520, 50);

                // 4. Draw Headline
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(28);
                if (style === 'Light') {
                    doc.setTextColor(15, 23, 42);
                } else {
                    doc.setTextColor(255, 255, 255);
                }

                // Text wrapping for headline
                const headlineLines = doc.splitTextToSize(slide.headline, 500);
                doc.text(headlineLines, 40, 120);

                // Calculate Y position after headline
                let currentY = 120 + (headlineLines.length * 35) + 30;

                // 5. Draw Bullet Points
                doc.setFont('Helvetica', 'normal');
                doc.setFontSize(18);
                if (style === 'Light') {
                    doc.setTextColor(51, 65, 85);
                } else {
                    doc.setTextColor(203, 213, 225);
                }

                slide.points.forEach((point) => {
                    const pointLines = doc.splitTextToSize(`•  ${point}`, 480);
                    doc.text(pointLines, 50, currentY);
                    currentY += (pointLines.length * 24) + 15;
                });

                // 6. Draw Footer CTA Decorator
                if (slide.cta) {
                    doc.setFont('Helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.setTextColor(6, 182, 212);
                    doc.text("👉 Get started free at resodin.com", 40, 550);
                }
            });

            doc.save("linkedin-carousel.pdf");
            toast.success("PDF Downloaded!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate PDF download.");
        }
    };

    const handleCopyAllText = () => {
        if (slides.length === 0) return;
        const text = slides.map(s => `Slide ${s.slide}:\n${s.headline}\n${s.points.map(p => `• ${p}`).join('\n')}`).join('\n\n');
        navigator.clipboard.writeText(text);
        toast.success("Copied all slides text!");
    };

    return (
        <div className={styles.container}>
            <div className={styles.editorCard}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>What is your carousel topic?</label>
                    <textarea
                        className={styles.textarea}
                        placeholder="e.g. 5 steps to scaling your B2B sales using AI..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        rows={3}
                    />
                </div>

                <div className={styles.settingsGrid}>
                    <div className={styles.selectGroup}>
                        <label className={styles.label}>Number of Slides</label>
                        <select
                            className={styles.select}
                            value={slideCount}
                            onChange={(e) => setSlideCount(Number(e.target.value))}
                        >
                            <option value={5}>5 Slides</option>
                            <option value={7}>7 Slides</option>
                            <option value={10}>10 Slides</option>
                        </select>
                    </div>

                    <div className={styles.selectGroup}>
                        <label className={styles.label}>Visual Theme</label>
                        <select
                            className={styles.select}
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                        >
                            <option value="Gradient">Gradient Navy</option>
                            <option value="Dark">Clean Dark</option>
                            <option value="Light">Minimalist Light</option>
                        </select>
                    </div>
                </div>

                <button
                    className={styles.generateButton}
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                >
                    {loading ? "Generating Carousel..." : "Generate Carousel"}
                </button>
            </div>

            {slides.length > 0 && (
                <div className={styles.previewSection}>
                    <div className={styles.previewHeader}>
                        <h3>Visual Carousel Preview</h3>
                        <div className={styles.actionButtons}>
                            <button className={styles.secondaryBtn} onClick={handleCopyAllText}>
                                Copy Text
                            </button>
                            <button className={styles.primaryBtn} onClick={handleDownloadPDF}>
                                Download PDF
                            </button>
                        </div>
                    </div>

                    <div className={styles.carouselContainer}>
                        {/* Slide Card Canvas */}
                        <div 
                            className={`${styles.slideCanvas} ${
                                style === 'Dark' ? styles.canvasDark :
                                style === 'Light' ? styles.canvasLight : styles.canvasGradient
                            }`}
                        >
                            <div className={styles.canvasHeader}>
                                <span className={styles.canvasBrand}>Resodin AI</span>
                                <span className={styles.canvasIndex}>
                                    {slides[activePreviewSlide].slide} / {slides.length}
                                </span>
                            </div>

                            <div className={styles.canvasBody}>
                                <h2 className={styles.canvasHeadline}>
                                    {slides[activePreviewSlide].headline}
                                </h2>
                                <ul className={styles.canvasPoints}>
                                    {slides[activePreviewSlide].points.map((pt, i) => (
                                        <li key={i}>{pt}</li>
                                    ))}
                                </ul>
                            </div>

                            {slides[activePreviewSlide].cta && (
                                <div className={styles.canvasCta}>
                                    👉 Get started free at resodin.com
                                </div>
                            )}
                        </div>

                        {/* Navigation controls */}
                        <div className={styles.controls}>
                            <button 
                                className={styles.controlBtn}
                                disabled={activePreviewSlide === 0}
                                onClick={() => setActivePreviewSlide(prev => prev - 1)}
                            >
                                ← Prev
                            </button>
                            <span className={styles.indicator}>
                                Slide {activePreviewSlide + 1} of {slides.length}
                            </span>
                            <button 
                                className={styles.controlBtn}
                                disabled={activePreviewSlide === slides.length - 1}
                                onClick={() => setActivePreviewSlide(prev => prev + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
