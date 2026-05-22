import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/director",
  "/departmenthead",
  "/customer",
  "/branch",
  "/branchhead",
  "/admin",
  "/accounts",
  "/hr",
  "/rm",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect if no token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/director/:path*",
    "/departmenthead/:path*",
    "/customer/:path*",
    "/branch/:path*",
    "/branchhead/:path*",
    "/admin/:path*",
    "/accounts/:path*",
    "/hr/:path*",
    "/rm/:path*",
  ],
};
