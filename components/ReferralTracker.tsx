"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Tracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ref = searchParams.get("ref");
        if (ref) {
            // Store the referral code in a cookie for 30 days
            document.cookie = `ref_code=${encodeURIComponent(ref)}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax; Secure`;
        }
    }, [searchParams]);

    return null;
}

export default function ReferralTracker() {
    return (
        <Suspense fallback={null}>
            <Tracker />
        </Suspense>
    );
}
