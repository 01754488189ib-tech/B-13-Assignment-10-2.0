"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function updateUserRole(userId, role) {
  const result = await serverMutation(
    `/api/admin/users/${userId}/role`,
    { role },
    "PATCH",
  );
  revalidatePath("/dashboard/admin/users");
  return result;
}

export async function deleteUser(userId) {
  const result = await serverMutation(
    `/api/admin/users/${userId}`,
    {},
    "DELETE",
  );
  revalidatePath("/dashboard/admin/users");
  return result;
}
