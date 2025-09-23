import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("User name is required")
      .min(3, {
        message: "User name must be at least 3 characters.",
      })
      .max(20, {
        message: "User name must be at most 20 characters.",
      }),
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
    rePassword: zod
      .string()
      .nonempty("Confirm Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        }
      ),
    phone: zod
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, {
        message: "Please enter a valid phone number.",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
