"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "_/components/ui/form";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { LoginFormType } from "./loginSchemaType";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({ resolver: zodResolver(loginSchema) });
  const { control, register } = form;

  const onSubmit = async (data: LoginFormType) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Login successful", {
          duration: 3000,
          position: "top-right",
          id: "login-toast",
        });
        window.location.href = "/";
      } else {
        toast.error("Invalid email or password", {
          duration: 3000,
          position: "top-right",
          id: "login-toast",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 xl:space-y-6"
      >
        <FormField
          control={control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">Email :</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Email"
                  {...register("email")}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">Password :</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Password"
                  {...register("password")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="link"
          className="text-sm text-pink-600 dark:text-pink-500 p-0 h-auto"
          asChild
        >
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
        <div className="flex justify-center items-center">
          <Button type="submit" className="w-40 xl:mt-1" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
