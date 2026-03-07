"use client";

import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { Button } from "@/components/ui/button";
import { Fingerprint, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
    getPasskeyRegistrationOptions,
    verifyPasskeyRegistration
} from "@/lib/api";
import { cn } from "@/lib/utils";

interface PasskeySetupProps {
    onSuccess?: () => void;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "secondary";
}

export function PasskeySetup({ onSuccess, className, variant = "default" }: PasskeySetupProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSetup = async () => {
        setLoading(true);
        setStatus("idle");
        setErrorMsg("");

        try {
            // 1. Get options from server
            const options = await getPasskeyRegistrationOptions();

            // 2. Start browser registration
            const attestationResponse = await startRegistration(options as any);

            // 3. Verify with server
            const result = await verifyPasskeyRegistration(attestationResponse);

            if (result.verified) {
                setStatus("success");
                onSuccess?.();
            } else {
                throw new Error("Verification failed on server");
            }
        } catch (err: any) {
            console.error("Passkey setup error:", err);
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong during setup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            <Button
                type="button"
                variant={variant}
                disabled={loading || status === "success"}
                onClick={handleSetup}
                className="w-full h-11 rounded-xl font-bold gap-2 uppercase tracking-widest text-xs relative overflow-hidden"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                    <Fingerprint className="w-4 h-4" />
                )}
                {status === "success" ? "Passkey Enabled" : "Enable Passkey Login"}
            </Button>

            {status === "error" && (
                <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{errorMsg}</p>
                </div>
            )}
        </div>
    );
}
