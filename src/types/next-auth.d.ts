import 'next-auth';


declare module 'next-auth' {
    interface User {
        _id?: string;
        name: string;
        isVerified?: boolean;
        username?: string;
    }
    interface Session {
        user: {
            _id?: string;
            name: string;
            isVerified?: boolean;
            username?: string;
        }& DefaultSession['user'];
    } 
}

declare module 'next-auth/jwt' {
    interface JTWT {
        _id?: string;
        name: string;
        isVerified?: boolean;
        username?: string;
    }
}
