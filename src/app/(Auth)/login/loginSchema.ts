import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .email({
      message: "Please enter a valid email address.",
    })
    .nonempty("Email is required"),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      }
    ),
});
