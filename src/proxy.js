import { NextResponse } from 'next/server'
import { getUserData } from './lib/crud'
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const user = await getUserData()
    if(!user){
         return NextResponse.redirect(new URL('/Login', request.url))
    }
     return NextResponse.next()
 
}
 

 
export const config = {
  matcher: ['/ForProxy','/dashboard','/donation_requests/:id','/dashboard/all-blood-donation-request','/dashboard/all-users','/dashboard/create-request','/dashboard/Edit-donation-request','/donation/my-donation-request','/dashboard/Profile'],
}