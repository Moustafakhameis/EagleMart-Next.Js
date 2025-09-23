import { loginSchema } from "./loginSchema";
import * as zod from "zod";

export type LoginFormType = zod.infer<typeof loginSchema>;