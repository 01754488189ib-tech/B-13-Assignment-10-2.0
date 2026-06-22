"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function addBookmark(ebookId) {
  const result = await serverMutation("/api/bookmarks", { ebookId }, "POST");
  revalidatePath("/dashboard/user/bookmarks");
  revalidatePath("/dashboard/writer/bookmarks");
  return result;
}

export async function deleteBookmark(ebookId) {
  const result = await serverMutation(
    `/api/bookmarks/${ebookId}`,
    {},
    "DELETE",
  );
  revalidatePath("/dashboard/user/bookmarks");
  revalidatePath("/dashboard/writer/bookmarks");
  return result;
}
