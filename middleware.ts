import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/audit",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/blog(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/help(.*)",
  "/api/cron(.*)",
  "/api/webhooks(.*)",
  "/api/unsubscribe(.*)",
  "/api/check-keys(.*)",
  "/api/test-razorpay(.*)",
  "/pricing(.*)",
  "/r/(.*)",
  "/video-demo(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const session = await auth();
    if (!session.userId) {
      if (request.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
