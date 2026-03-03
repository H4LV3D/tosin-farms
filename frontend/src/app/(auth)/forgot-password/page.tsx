"use client";

import { useState } from "react";
import Link from "next/link";
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
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordFormValues) => {
      const response = await axios.post("/api/auth/forgot-password", data);
      return response.data;
    },
    onSuccess: (data) => {
      setSuccessMessage(
        data.message || "Reset link sent! Please check your email.",
      );
      setErrorMessage("");
      form.reset();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setSuccessMessage("");
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    mutation.mutate(data);
  }

  return (
    <>
      <div className="space-y-2 text-center pt-2">
        <h1 className="font-display text-3xl font-semibold text-earth">
          Forgot Password
        </h1>
        <p className="text-sm text-stone-500">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-amber-700 font-bold hover:underline"
          >
            Sign in
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
            {successMessage && (
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                {successMessage}
              </div>
            )}
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
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
