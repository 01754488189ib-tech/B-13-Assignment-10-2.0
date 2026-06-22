"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function createEbook(data) {
  const result = await serverMutation("/api/ebooks", data, "POST");
  revalidatePath("/browse");
  revalidatePath("/dashboard/writer/ebooks");
  return result;
}

export async function updateEbook(id, data) {
  const result = await serverMutation(`/api/ebooks/${id}`, data, "PATCH");
  revalidatePath(`/browse/${id}`);
  revalidatePath("/dashboard/writer/ebooks");
  revalidatePath("/dashboard/admin/ebooks");
  return result;
}

export async function deleteEbook(id) {
  const result = await serverMutation(`/api/ebooks/${id}`, {}, "DELETE");
  revalidatePath("/browse");
  revalidatePath("/dashboard/writer/ebooks");
  revalidatePath("/dashboard/admin/ebooks");
  return result;
}
