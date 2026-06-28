

import { authClient } from "./auth-client";



export const userData = () =>{
    const {data : session, isPending} = authClient.useSession()
    const obj = {
        userInfo : session?.user,
        isLoading : isPending
    }
    return obj
}

const getAuthHeaders = async () => {
    try {
        const { data, error } = await authClient.token();
        console.log(data)
        if (data?.token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            };
        }
    } catch (err) {
        console.error("Failed to fetch auth token:", err);
    }
    return { 'Content-Type': 'application/json' };
};

export const postFLocal = async(url,bodys) => {
    const headers = await getAuthHeaders();
    const postman = await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`,{
        method : "POST",
        headers : headers,
        body : JSON.stringify(bodys)
    })
    const returnback = await postman.json()
    return returnback
   
}

export const getFLocal = async(url) => {
    const headers = await getAuthHeaders()
    const getman = await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`,{
        method : 'GET' ,
        headers : headers
    })
    const returnData = await getman.json()
    return returnData
}

export const patchFLocal = async(url) =>{
    const headers = await getAuthHeaders();
    const updateman = await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`,{
        method : 'PATCH',
        headers : headers
        
    })
     const returnData = await updateman.json()
    return returnData
}

export const deleteFlocal = async(url) => {
    const headers = await getAuthHeaders();
    const deleteman = await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`,{
        method : 'DELETE',
        headers : headers
    })
    const returnData = await deleteman.json()
    return returnData
}