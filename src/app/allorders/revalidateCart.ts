"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCart() {
  revalidatePath("/cart");
}
