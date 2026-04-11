/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['nodemailer'],
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_cGlja2VkLWNhdC00Ny5jbGVyay5hY2NvdW50cy5kZXYk",
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: "/",
    },
};

module.exports = nextConfig;
