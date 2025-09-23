import * as zod from "zod";

export const resetPasswordSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email address."),
    newPassword: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one lowercase, one uppercase, one digit, and one special character (min 8 characters).",
        }
      ),
    confirmPassword: zod
      .string()
      .nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
