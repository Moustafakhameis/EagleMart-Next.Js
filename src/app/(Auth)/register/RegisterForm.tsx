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
import { registerSchema } from "./registerSchema";
import { handleRegister } from "./registerActions";
import { toast } from "sonner";
import { RegisterFormType } from "./registerSchemaType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(registerSchema) });
  const { register, control } = form;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormType) => {
    setLoading(true);

    const isRegistered = await handleRegister(data);

    if (isRegistered.success) {
      toast.success(isRegistered.message, {
        duration: 3000,
        position: "top-right",
        id: "register-toast",
      });

      router.push("/login");
    } else {
      toast.error(isRegistered.message, {
        duration: 3000,
        position: "top-right",
        id: "register-toast",
      });
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 xl:space-y-6"
      >
        {/* User Name */}
        <FormField
          control={control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">
                User Name :
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your User Name => ex: Moustafa"
                  {...register("name")}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">Email : </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Email => ex: 0Ys7E@example.com"
                  {...register("email")}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">
                Password :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Password => ex: 123456"
                  {...register("password")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={control}
          name="rePassword"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">
                Confirm Password :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your Password => ex: 123456"
                  {...register("rePassword")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={control}
          name="phone"
          render={() => (
            <FormItem>
              <FormLabel className="text-right font-bold">Phone : </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Phone => ex: 01010700701"
                  {...register("phone")}
                  type="tel"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button with loader */}
        <div className="flex justify-center items-center">
          <Button type="submit" className="w-40 xl:mt-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
