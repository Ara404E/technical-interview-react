import type { AuthRequest, AuthResponse } from "./types";

export async function authApi(creds: AuthRequest): Promise<AuthResponse> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error.message);
  }
  return response.json();
}

export async function getMeApi() {
  const token = localStorage.getItem("token");
  const response = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error.message);
  }

  return response.json();
}
