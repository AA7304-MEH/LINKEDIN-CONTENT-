"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bestPosts: '',
        stories: [{ title: '', summary: '' }, { title: '', summary: '' }],
        perspective: '',
        tone: 'Professional Expert'
    });

    const handleStoryChange = (index: number, field: 'title' | 'summary', value: string) => {
        const newStories = [...formData.stories];
        newStories[index][field] = value;
        setFormData({ ...formData, stories: newStories });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/voice-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save profile');

            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.progress}>
                    <div className={styles.progressBar} style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>

                {step === 1 && (
                    <div className={styles.step}>
                        <h1>Step 1: Your Best Content</h1>
                        <p>Paste your 3 best-performing LinkedIn posts here. We'll analyze your style.</p>
                        <textarea
                            className={styles.textarea}
                            rows={10}
                            placeholder="Paste posts here..."
                            value={formData.bestPosts}
                            onChange={(e) => setFormData({ ...formData, bestPosts: e.target.value })}
                        />
                        <button className={styles.button} onClick={() => setStep(2)}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.step}>
                        <h1>Step 2: Your Stories</h1>
                        <p>Share 2 personal career stories we can weave into your content.</p>
                        {formData.stories.map((story, i) => (
                            <div key={i} className={styles.storyInput}>
                                <input
                                    type="text"
                                    placeholder={`Story ${i + 1} Title`}
                                    className={styles.input}
                                    value={story.title}
                                    onChange={(e) => handleStoryChange(i, 'title', e.target.value)}
                                />
                                <textarea
                                    placeholder="Summary (2-3 sentences)"
                                    className={styles.textareaSmall}
                                    value={story.summary}
                                    onChange={(e) => handleStoryChange(i, 'summary', e.target.value)}
                                />
                            </div>
                        ))}
                        <div className={styles.buttons}>
                            <button className={styles.secondaryButton} onClick={() => setStep(1)}>Back</button>
                            <button className={styles.button} onClick={() => setStep(3)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.step}>
                        <h1>Step 3: Any Unique Perspectives?</h1>
                        <p>What is your unique take or philosophy in one sentence?</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="e.g., 'Consistency beats intensity every time.'"
                            value={formData.perspective}
                            onChange={(e) => setFormData({ ...formData, perspective: e.target.value })}
                        />
                        <div className={styles.buttons}>
                            <button className={styles.secondaryButton} onClick={() => setStep(2)}>Back</button>
                            <button className={styles.button} onClick={() => setStep(4)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className={styles.step}>
                        <h1>Step 4: Choose Your Tone</h1>
                        <p>How do you want to sound?</p>
                        <div className={styles.grid}>
                            {['Professional Expert', 'Casual Storyteller', 'Data-Driven Analyst', 'Motivational Coach'].map((tone) => (
                                <div
                                    key={tone}
                                    className={`${styles.card} ${formData.tone === tone ? styles.selected : ''}`}
                                    onClick={() => setFormData({ ...formData, tone })}
                                >
                                    {tone}
                                </div>
                            ))}
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.secondaryButton} onClick={() => setStep(3)}>Back</button>
                            <button className={styles.button} onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Saving...' : 'Complete Profile'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
