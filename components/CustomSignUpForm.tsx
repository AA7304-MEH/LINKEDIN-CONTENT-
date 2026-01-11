"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./CustomSignUpForm.module.css";
import { User, Mail, Lock, CheckCircle } from "lucide-react";

export default function CustomSignUpForm() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
                firstName,
                lastName,
            });

            // Send verification code
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.longMessage || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle verification code submission
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setError("Verification failed. Please check the code.");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.longMessage || "Invalid verification code.");
        } finally {
            setLoading(false);
        }
    };

    if (!pendingVerification) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join Resonate and start growing your brand.</p>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>First Name</label>
                            <input
                                className={styles.input}
                                placeholder="Jane"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Last Name</label>
                            <input
                                className={styles.input}
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="jane@example.com"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Creating account..." : "Continue"}
                    </button>
                </form>

                <div className={styles.footer}>
                    Already have an account?
                    <Link href="/sign-in" className={styles.link}>Sign in</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.verificationTitle}>Verify Email</h1>
            <p className={styles.verificationSubtitle}>
                We've sent a verification code to <strong>{emailAddress}</strong>.
                Please enter it below to complete your registration.
            </p>

            {error && <div className={styles.error}>{error}</div>}

            <form className={styles.form} onSubmit={handleVerify}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Verification Code</label>
                    <input
                        className={styles.input}
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Start Trial"}
                </button>
            </form>

            <div className={styles.footer}>
                Didn't receive a code?
                <button
                    className={styles.resendBtn}
                    onClick={() => signUp?.prepareEmailAddressVerification({ strategy: "email_code" })}
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
}
