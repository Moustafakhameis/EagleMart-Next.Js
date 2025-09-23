export async function forgotPassword(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    console.log("ForgotPassword Response:", data);

    if (!res.ok || data.statusMsg === "fail") {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    return { success: true, message: data.message };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Unknown error occurred" };
    }
  }
}

export async function verifyResetCode(resetCode: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );

    const data = await res.json();

    if (!res.ok || data.statusMsg === "fail") {
      return { success: false, message: data.message || "Invalid reset code" };
    }

    return { success: true, message: "Code verified successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Unknown error occurred" };
    }
  }
}

export async function resetPassword(payload: {
  email: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.statusMsg === "fail") {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    return { success: true, message: "Password reset successfully" };
  }catch (error: unknown) {
  if (error instanceof Error) {
    return { success: false, message: error.message };
  } else {
    return { success: false, message: "Unknown error occurred" };
  }
}

}
