"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchPasskeyStatus } from "@/lib/api";
import { PasskeySetup } from "./PasskeySetup";
import { X, Fingerprint, ShieldCheck, Sparkles } from "lucide-react";

export function PasskeyNudge() {
  const { isAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if we should show the nudge
    const checkStatus = async () => {
      if (!isAuthenticated || dismissed) return;

      // check session storage if we've already checked this session
      const alreadyChecked = sessionStorage.getItem("passkey_checked");
      if (alreadyChecked) return;

      try {
        const { hasPasskey } = await fetchPasskeyStatus();
        if (!hasPasskey) {
          setShow(true);
        }
        sessionStorage.setItem("passkey_checked", "true");
      } catch (err) {
        console.error("Failed to check passkey status", err);
      }
    };

    checkStatus();
  }, [isAuthenticated, dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    // Maybe store in localStorage to never show again for X days
    localStorage.setItem("passkey_nudge_dismissed", Date.now().toString());
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="group relative w-full max-w-sm bg-[#1c1917] text-white rounded-[2rem] p-6 shadow-2xl shadow-stone-900/40 border border-white/10 overflow-hidden">
        {/* Background glow Decor */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/20 blur-[80px] rounded-full group-hover:bg-amber-500/30 transition-all duration-700" />

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/40">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base tracking-tight">
                Setup Passkey
              </h3>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Sign in faster and more securely using your device&apos;s
              biometric authentication. No more passwords!
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <PasskeySetup
            onSuccess={() => {
              setTimeout(() => setShow(false), 2000);
            }}
            className="w-full"
            variant="default"
          />

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-amber-500/50" />
            Secure & Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
