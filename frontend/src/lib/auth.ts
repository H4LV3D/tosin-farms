/**
 * Lightweight JWT payload decoder (no signature verification — only for layout guards).
 * Real verification happens on the backend for every protected API call.
 */
export function decodeJwtPayload(token: string): { sub: string; email: string; role: string; exp: number } | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        // Base64url → Base64 → decode
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const json = Buffer.from(padded, "base64").toString("utf8");
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function isTokenExpired(payload: { exp: number }): boolean {
    return Date.now() / 1000 > payload.exp;
}
