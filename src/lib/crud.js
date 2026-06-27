
import { auth } from "./auth"
import { headers } from "next/headers"

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

