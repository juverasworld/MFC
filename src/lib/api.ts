type ErrorPayload = {
  message?: string;
  error?: string;
};

function asErrorPayload(value: unknown): ErrorPayload {
  if (!value || typeof value !== "object") return {};
  return value as ErrorPayload;
}

export async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  let response: Response;
  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  try {
    response = await fetch(input, {
      ...init,
      headers,
    });
  } catch {
    throw new Error("We couldn’t reach the service. Check your connection and try again.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const details = asErrorPayload(payload);
    throw new Error(details.message || details.error || "We couldn’t complete that request. Please try again.");
  }
  if (payload === null) throw new Error("The service returned an invalid response. Please try again.");
  return payload as T;
}

export function mfcApiUrl(path: string): string {
  const configuredBase = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
  if (!configuredBase) throw new Error("MFC account access is not configured yet. Please contact MFC.");

  const versionedBase = /\/api\/v1$/i.test(configuredBase) ? configuredBase : `${configuredBase}/api/v1`;
  return `${versionedBase}/${path.replace(/^\/+/, "")}`;
}

export function paymentApiUrl(path: string): string {
  const paymentBase = String(import.meta.env.VITE_PAYMENT_API_BASE_URL || "").trim().replace(/\/+$/, "");
  if (!paymentBase) return `/api/${path.replace(/^\/+/, "")}`;
  return `${paymentBase}/${path.replace(/^\/+/, "")}`;
}
