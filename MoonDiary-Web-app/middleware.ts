import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();
  
  // If user is not authenticated and trying to access protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If user is authenticated
  if (userId) {
    try {
      // Redirect authenticated users away from public routes (except API)
      if (isPublicRoute(req) && !req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Handle admin routes
      if (isAdminRoute(req)) {
        // You can add admin role checking logic here if needed
        // For now, allow access to admin routes for authenticated users
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
