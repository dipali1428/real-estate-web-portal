import { getToken, isTokenExpired } from "./auth-token";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalAuthHandler({ isProtectedRoute }: { isProtectedRoute: boolean }) {
    const router = useRouter();

    useEffect(() => {
        if (isProtectedRoute) {
            const token = getToken();
            if (!token || isTokenExpired(token)) {
                router.push("/");
            }
        }
    }, [isProtectedRoute, router]);

    return null;
}