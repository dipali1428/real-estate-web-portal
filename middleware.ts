import { NextResponse,NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    const { pathname } = req.nextUrl;

    // Protect ALL dashboard routes
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            const loginUrl = new URL("/", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    if (pathname.startsWith("/admin")) {
        if (!token) {
            const loginUrl = new URL("/", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next();
}

// Apply middleware ONLY to dashboard
export const config = {
    matcher: ["/dashboard/:path*"],
};
