import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export async function authHeader() {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
}

export async function serverFetch(path) {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });
  return handleStatusCode(res);
}

export async function protectedFetch(path) {
  const headers = await authHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    headers,
    cache: "no-store",
  });
  return handleStatusCode(res);
}

export async function serverMutation(path, data, method = "POST") {
  const authHeaders = await authHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(res);
}

function handleStatusCode(res) {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
}
