"use server";

import { serverMutation } from "../core/server";

export async function createTransaction(subInfo) {
  const result = await serverMutation("/api/transactions", subInfo, "POST");
  return result;
}
