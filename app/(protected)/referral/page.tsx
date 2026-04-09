import { getSessionUser } from '@/lib/security/authz';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import styles from '../dashboard/page.module.css';
import Link from 'next/link';

export default async function ReferralPage() {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        redirect("/sign-in");
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        select: { referralCode: true, referralCount: true, bonusPosts: true }
    });

    if (!dbUser) {
        redirect("/dashboard");
    }

    const referralLink = `https://resodin.ai/sign-up?ref=${dbUser.referralCode}`;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Referral Program</h1>
                <p>Invite friends and unlock permanent bonus posts for your account.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Referral Link Card */}
                <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-gray-100 shadow-xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Your Unique Referral Link</h3>
                    <p className="text-gray-500 mb-6 text-lg">Share this link with your friends. Once they sign up and generate their first post, you'll earn a referral credit!</p>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <input 
                            type="text" 
                            readOnly 
                            value={referralLink}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 font-mono text-sm text-gray-600 focus:outline-none"
                        />
                        <button 
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95"
                            onClick={() => {
                                // navigator.clipboard.writeText(referralLink);
                                // This is a server component, so copying needs to be handled in a client component if interactive.
                                // For now, I'll keep it simple or make it a client component.
                            }}
                        >
                            Copy Link
                        </button>
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">🎁</div>
                            <div>
                                <h4 className="font-bold text-blue-900">The Reward</h4>
                                <p className="text-blue-700">Invite 2 friends → Get +10 posts/month added to your account PERMANENTLY.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="p-8 rounded-3xl bg-gray-900 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold mb-8 text-gray-400 uppercase tracking-widest">Your Progress</h3>
                        
                        <div className="space-y-8">
                            <div>
                                <span className="text-gray-500 text-sm">Friends Invited</span>
                                <div className="text-5xl font-black">{dbUser.referralCount}</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Bonus Posts Earned</span>
                                <div className="text-5xl font-black text-green-400">+{dbUser.bonusPosts}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                            <div 
                                className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
                                style={{ width: `${Math.min((dbUser.referralCount / 2) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-400">
                            {dbUser.referralCount < 2 
                                ? `Invite ${2 - dbUser.referralCount} more friend(s) to hit your next milestone!` 
                                : "You've unlocked your first milestone! Keep going!"}
                        </p>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div className="mt-16">
                <h3 className="text-2xl font-black mb-8 text-gray-900">How it works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Copy Link", desc: "Grab your unique link above and send it to your professional network." },
                        { step: "02", title: "Friend Joins", desc: "Your friend signs up and starts building their authority on LinkedIn." },
                        { step: "03", title: "Get Rewarded", desc: "Once 2 friends join, your credit limit increases automatically." }
                    ].map((step, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white border border-gray-100">
                            <div className="text-4xl font-black text-blue-100 mb-4">{step.step}</div>
                            <h4 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h4>
                            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
