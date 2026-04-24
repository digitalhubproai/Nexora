const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nexora_access_token");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("nexora_access_token", access);
  localStorage.setItem("nexora_refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("nexora_access_token");
  localStorage.removeItem("nexora_refresh_token");
  localStorage.removeItem("nexora_user");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (res.status === 401) {
    clearTokens();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (res.status === 204) return undefined as T;

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || "Request failed");
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data?: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(url: string, data?: unknown) => request<T>(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

// Auth helpers
export async function login(email: string, password: string) {
  const data = await api.post<{
    access_token: string; refresh_token: string; user: Record<string, unknown>;
  }>("/auth/login", { email, password });
  setTokens(data.access_token, data.refresh_token);
  localStorage.setItem("nexora_user", JSON.stringify(data.user));
  return data;
}

export async function register(email: string, password: string, firstName: string, lastName: string, role = "employee") {
  const data = await api.post<{
    access_token: string; refresh_token: string; user: Record<string, unknown>;
  }>("/auth/register", { email, password, first_name: firstName, last_name: lastName, role });
  setTokens(data.access_token, data.refresh_token);
  localStorage.setItem("nexora_user", JSON.stringify(data.user));
  return data;
}

export function getStoredUser(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const u = localStorage.getItem("nexora_user");
  return u ? JSON.parse(u) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
