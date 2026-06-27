
import { auth } from "./auth"
import { headers } from "next/headers"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER

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

