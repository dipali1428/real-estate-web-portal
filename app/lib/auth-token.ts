// Get Token
export const getToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie.match(/authToken=([^;]+)/)?.[1];
};

// Check if Expired or not
export const isTokenExpired = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};