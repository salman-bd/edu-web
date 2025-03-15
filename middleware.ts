import { NextRequest, NextResponse } from 'next/server';  
import { getToken } from 'next-auth/jwt';  

export async function middleware(request: NextRequest) {  
    try {  
        const token = await getToken({ req: request });  
        console.log("Token in middleware: ", token);   

        const { pathname } = request.nextUrl;  
        if (!token && (pathname.startsWith('/profile') || pathname.startsWith('/dashboard'))) {  
            console.log("Redirecting to sign-in");   
            return NextResponse.redirect(new URL('/signin', request.url));  
        }  
    } catch (error) {  
        console.error("Error in middleware: ", error);  
    }  
}  

export const config = {  
    matcher: ['/profile/:path*', '/dashboard/:path*'],  
};  