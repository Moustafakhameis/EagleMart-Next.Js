"use client";

import { useState } from "react";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { verifyResetCode } from "_/app/_services/auth";

export default function VerifyCodeForm() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await verifyResetCode(resetCode);

    if (res.success) {
      toast.success("Code verified successfully" , { duration: 3000 , position: "top-right", id: "verify-toast" });
      router.push("/reset-password" );
    } else {
      toast.error(res.message || "Invalid reset code" , { duration: 3000 , position: "top-right", id: "verify-toast" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <Input
        placeholder="Enter reset code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
      />
      <Button type="submit" disabled={loading} className="w-40 mx-auto flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</> : "Verify Code"}
      </Button>
    </form>
  );
}
