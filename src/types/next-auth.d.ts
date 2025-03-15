import NextAuth from "next-auth";

declare module 'next-auth' {
    interface User {
        _id?: string;
        name: string;
        isVerified?: boolean;
    }
    interface Session {
        user: {
            _id?: string;
            name: string;
            isVerified?: boolean;
        }& DefaultSession['user'];
    } 
}

declare module 'next-auth/jwt' {
    interface JTWT {
        _id?: string;
        name: string;
        isVerified?: boolean;
    }
}
