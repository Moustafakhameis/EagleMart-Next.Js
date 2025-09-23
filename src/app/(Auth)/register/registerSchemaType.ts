import { registerSchema } from "./registerSchema";
import * as zod from "zod";

export type RegisterFormType = zod.infer<typeof registerSchema>;