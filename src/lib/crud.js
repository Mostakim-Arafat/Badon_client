
import { auth } from "./auth"
import { headers } from "next/headers"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER
const AUTH_URL = process.env.BETTER_AUTH_URL

export const getServerAuthHeaders = async () => {
    const baseHeaders = { "Content-Type": "application/json" };

    try {
        const requestHeaders = await headers();
        const cookie = requestHeaders.get("cookie");

        if (!cookie || !AUTH_URL) {
            return baseHeaders;
        }

        const response = await fetch(`${AUTH_URL}/api/auth/token`, {
            method: "GET",
            headers: { cookie },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Server JWT fetch failed:", response.status);
            return baseHeaders;
        }

        const payload = await response.json();

        if (payload?.token) {
            return {
                ...baseHeaders,
                authorization: `Bearer ${payload.token}`,
            };
        }
    } catch (error) {
        console.error("Error fetching server auth token:", error);
    }

    return baseHeaders;
}

export const getFLocalServer = async (url) => {
    const authHeaders = await getServerAuthHeaders();
    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "GET",
        headers: authHeaders,
    });
    return response.json();
}

export const getUserData = async() => {
    
    try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    return session?.user; 
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
}

export const postToServer = async (url, body) => {

  const response = await fetch(`${SERVER_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}): ${text}`);
  }

  return response.json();
}

