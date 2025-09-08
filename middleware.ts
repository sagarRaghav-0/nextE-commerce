// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Match any routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/checkout",
  "/orders"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // This will redirect to sign-in if the user is not logged in
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
