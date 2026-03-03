"use client";

import Link from "next/link";
import { useState } from "react";
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
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import appAxios from "@/config/axios";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

async function loginUser(data: LoginFormValues) {
  const res = await appAxios.post<{
    token: string;
    role: string;
    email: string;
    name?: string;
  }>("/auth/login", data);
  return res.data;
}

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setCredentials } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Welcome back! Login successful.", {
        style: {
          background: "#fdf8f0",
          color: "#292524",
          border: "1px solid #b45309",
        },
        iconTheme: {
          primary: "#b45309",
          secondary: "#fdf8f0",
        },
      });

      setCredentials(
        { email: data.email, role: data.role, name: data.name || data.email },
        data.token,
      );

      setTimeout(() => {
        if (data.role === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 1000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const message =
        err?.response?.data?.message || "Invalid email or password.";
      toast.error(message, {
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #f87171",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
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

  return (
    <>
      <div className="text-center space-y-2 pt-2">
        <h1 className="font-display text-3xl font-semibold text-earth">
          Welcome Back
        </h1>
        <p className="text-sm text-stone-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-amber-700 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <CardContent className="pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="h-12 bg-stone-50 focus-visible:ring-amber-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                      Password
                    </FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[13px] text-amber-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-12 bg-stone-50 focus-visible:ring-amber-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {errorMsg && (
              <p className="text-sm text-red-500 font-medium">{errorMsg}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold tracking-widest uppercase transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 mb-6 flex items-center justify-center space-x-4">
          <Separator className="flex-1" />
          <span className="text-xs uppercase font-bold text-stone-400 tracking-widest">
            Or continue with
          </span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full h-12 font-semibold text-earth border-stone-200 hover:bg-stone-50 hover:text-earth transition-colors"
          onClick={handleGoogleSignIn}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
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
          Sign in with Google
        </Button>
      </CardContent>
    </>
  );
}
