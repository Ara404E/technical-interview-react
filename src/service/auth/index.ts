import type { AuthResponse } from "./types";

export async function authApi(creds: AuthResponse): Promise<AuthResponse> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Authentication Failed");
  }
  return response.json();
}
