"use client";

import { useEffect, useState } from "react";

export function useClientCookie(name: string) {
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const match = document.cookie.match(
            new RegExp(`${name}=([^;]+)`)
        );

        setValue(match ? match[1] : null);
    }, [name]);

    return value;
}
