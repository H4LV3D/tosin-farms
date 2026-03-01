"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string().min(6, "Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const mutation = useMutation({
        mutationFn: async (data: ResetPasswordFormValues) => {
            const response = await axios.post("/api/auth/reset-password", {
                token,
                password: data.password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            setSuccessMessage(data.message || "Password successfully reset!");
            setErrorMessage("");
            form.reset();
        },
        onError: (error: any) => {
            setErrorMessage(
                error.response?.data?.message || "Failed to reset password. The link might be expired."
            );
            setSuccessMessage("");
        },
    });

    function onSubmit(data: ResetPasswordFormValues) {
        if (!token) {
            setErrorMessage("No reset token found in the URL.");
            return;
        }
        mutation.mutate(data);
    }

    // If no token is provided in the URL, show an error state early
    if (!token) {
        return (
            <Card className="w-full max-w-md shadow-xl bg-white">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="font-display text-3xl font-semibold text-earth">
                        Invalid Link
                    </CardTitle>
                    <CardDescription className="text-red-500 break-words">
                        The password reset link is invalid or missing a token.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Link href="/auth/forgot-password">
                        <Button variant="outline" className="w-full">Request a new link</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md shadow-xl bg-white">
            <CardHeader className="space-y-3 text-center">
                <CardTitle className="font-display text-3xl font-semibold text-earth">
                    Set New Password
                </CardTitle>
                <CardDescription className="text-stone-500">
                    Please enter your new password below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {successMessage ? (
                    <div className="space-y-6">
                        <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200 text-center font-medium">
                            {successMessage}
                        </div>
                        <Link href="/login" className="block w-full">
                            <Button className="w-full h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold tracking-widest uppercase transition-all">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            New Password
                                        </FormLabel>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Confirm New Password
                                        </FormLabel>
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
                            {errorMessage && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                                    {errorMessage}
                                </div>
                            )}
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="w-full h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold tracking-widest uppercase transition-all"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 pt-24">
            <Suspense
                fallback={
                    <div className="w-full max-w-md h-64 bg-white shadow-xl rounded-xl flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
                    </div>
                }
            >
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
