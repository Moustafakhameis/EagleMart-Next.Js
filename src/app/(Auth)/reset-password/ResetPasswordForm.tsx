"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "_/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { resetPasswordSchema } from "./resetPasswordSchema";
import { resetPassword } from "_/app/_services/auth";

// infer type من schema
type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordType) => {
    setLoading(true);

    try {
      const res = await resetPassword({
        email: data.email,
        newPassword: data.newPassword,
      });

      if (res.message?.toLowerCase().includes("success")) {
        toast.success("Password reset successfully");
        router.push("/login");
      } else {
        toast.error(res.message || "Something went wrong", {
          duration: 3000,
          position: "top-right",
          id: "reset-toast",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 3000,
          position: "top-right",
          id: "reset-toast",
        });
      } else {
        toast.error("Network error", {
          duration: 3000,
          position: "top-right",
          id: "reset-toast",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
