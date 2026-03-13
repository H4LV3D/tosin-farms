"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, Fingerprint, X, Heart } from "lucide-react";
import appAxios from "@/config/axios";
import { startAuthentication } from "@simplewebauthn/browser";
import { getPasskeyLoginOptions, verifyPasskeyLogin } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

async function loginUser(data: LoginFormValues) {
  const res = await appAxios.post<{
    id: string;
    token: string;
    role: string;
    email: string;
    name?: string;
  }>("/auth/login", data);
  return res.data;
}

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  /** Called after successful login — no redirect, stays on page */
  onSuccess?: () => void;
}

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setCredentials } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setErrorMsg(null);
    }
  }, [open, form]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Welcome back!", {
        style: {
          background: "#fdf8f0",
          color: "#292524",
          border: "1px solid #b45309",
        },
        iconTheme: { primary: "#b45309", secondary: "#fdf8f0" },
      });

      setCredentials(
        {
          email: data.email,
          role: data.role,
          name: data.name || data.email,
          id: data.id,
        },
        data.token,
      );

      onClose();
      onSuccess?.();
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message || "Invalid email or password.";
      toast.error(message, {
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #f87171",
        },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
      setErrorMsg(message);
    },
  });

  function onSubmit(data: LoginFormValues) {
    setErrorMsg(null);
    mutate(data);
  }

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handlePasskeySignIn = async () => {
    setErrorMsg(null);
    const email = form.getValues("email");

    try {
      const sanitizedEmail = email?.trim() || undefined;
      const optionsData = await getPasskeyLoginOptions(sanitizedEmail);
      const { sessionToken, ...options } = optionsData;
      const authResponse = await startAuthentication(options);
      const data = await verifyPasskeyLogin(
        authResponse,
        sanitizedEmail,
        sessionToken,
      );

      toast.success("Passkey login successful.");
      setCredentials(
        {
          email: data.email,
          role: data.role,
          name: data.name || data.email,
          id: data.id,
        },
        data.token,
      );

      onClose();
      onSuccess?.();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Passkey login failed. Please try again.";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-8 pt-8 pb-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-3">
              <Heart className="w-5 h-5 text-amber-700" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-earth">
              Save to Wishlist
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Sign in to save this product and access it later.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        className="h-11 bg-stone-50 focus-visible:ring-amber-400 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-[12px] text-amber-700 hover:underline"
                        onClick={onClose}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 bg-stone-50 focus-visible:ring-amber-400 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {errorMsg && (
                <p className="text-sm text-red-500 font-medium bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-amber-700 hover:bg-amber-600 text-white font-bold tracking-widest uppercase rounded-xl transition-all mt-1"
              >
                {isPending ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] uppercase font-bold text-stone-400 tracking-widest">
              Or
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 font-semibold text-earth border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="h-11 font-bold uppercase tracking-widest text-[10px] border-stone-200 hover:bg-stone-50 hover:text-amber-700 rounded-xl transition-all gap-2"
              onClick={handlePasskeySignIn}
            >
              <Fingerprint className="w-4 h-4 text-stone-400" />
              Passkey
            </Button>
          </div>

          <p className="text-center text-xs text-stone-400 mt-5">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-amber-700 font-bold hover:underline"
              onClick={onClose}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}