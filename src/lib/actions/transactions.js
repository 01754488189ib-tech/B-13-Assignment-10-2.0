"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function createTransaction(subInfo) {
  const result = await serverMutation("/api/transactions", subInfo, "POST");

  // Revalidate dashboards to reflect changes instantly
  revalidatePath("/dashboard/user");
  revalidatePath("/dashboard/writer");
  revalidatePath("/dashboard/admin");

  return result;
}
