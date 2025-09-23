"use client";

import { useState } from "react";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { forgotPassword } from "_/app/_services/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await forgotPassword(email);

    if (res.success) {
      toast.success(res.message || "Code sent to your email" , { duration: 3000 , position: "top-right", id: "forgot-toast" });
      router.push("/verify-code");
    } else {
      toast.error(res.message || "Something went wrong", { duration: 3000 , position: "top-right", id: "forgot-toast" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleForgot} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={loading} className="w-40 mx-auto flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Send Code"}
      </Button>
    </form>
  );
}
