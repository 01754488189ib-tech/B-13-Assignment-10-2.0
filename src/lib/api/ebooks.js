import { serverFetch, protectedFetch } from "../core/server";

export async function getEbooks(queryString = "") {
  return serverFetch(`/api/ebooks?${queryString}`);
}

export async function getEbookById(id) {
  return serverFetch(`/api/ebooks/${id}`);
}

export async function getWriterEbooks() {
  return protectedFetch("/api/writer/my-ebooks");
}

export async function getAdminUsers() {
  return protectedFetch("/api/admin/users");
}

export async function getAdminTransactions() {
  return protectedFetch("/api/admin/transactions");
}

export async function getAdminAnalytics() {
  return protectedFetch("/api/admin/analytics");
}
