/**
 * Lightweight JWT payload decoder (no signature verification).
 * Used only for server-side layout guards — real verification happens
 * on the NestJS backend for every protected API call.
 */
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    exp?: number;
    iat?: number;
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    try {
        if (!token || typeof token !== "string") return null;

        const parts = token.split(".");
        if (parts.length !== 3) return null;

        // Base64url → standard Base64 → UTF-8 string
        const base64url = parts[1];
        const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
        // Add padding if needed (base64url omits it)
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

        // Buffer is available in Next.js Node.js runtime
        const decoded = Buffer.from(padded, "base64").toString("utf8");
        const payload = JSON.parse(decoded) as JwtPayload;

        // Basic sanity: must have a subject
        if (!payload?.sub) return null;

        return payload;
    } catch {
        return null;
    }
}

/**
 * Returns true if the token is expired.
 * Treats tokens without an `exp` claim as never-expiring (safe for layout
 * guards; the backend will still enforce proper expiry on API calls).
 */
export function isTokenExpired(payload: JwtPayload): boolean {
    if (!payload.exp) return false; // No expiry claim → treat as valid
    return Math.floor(Date.now() / 1000) >= payload.exp;
}
