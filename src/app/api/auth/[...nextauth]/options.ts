import { NextAuthOptions } from "next-auth";   
import CredentialsProvider from "next-auth/providers/credentials";  
import GithubProvider from "next-auth/providers/github";  
import GoogleProvider from "next-auth/providers/google";  
import bcrypt from 'bcrypt';
import { mongoDbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";



export const authOptions: NextAuthOptions = {  
    providers: [  
        CredentialsProvider({  
            id: "credentials",  
            name: "Credentials",  
            credentials: {  
                identifier: { label: "Identifier", type: "text" },  
                password: { label: "Password", type: "password" }  
            },  
            async authorize(credentials: any): Promise<any> {  
                await mongoDbConnect();  
                // console.log("credentials: ", credentials);
                try {  
                    const user = await UserModel.findOne({  
                        $or: [  
                            { email: credentials.identifier },  
                            { username: credentials.identifier }  
                        ]  
                    });  
                    if (!user) {  
                        throw new Error("No user found with this email or username");  
                    }  
                    if (!user.isVerified) {  
                        throw new Error("Please verify your account before logging in");  
                    }  
                    const isValidPassword  = await bcrypt.compare(credentials.password, user.password);  
                    if (!isValidPassword ) {  
                        throw new Error("Incorrect password");  
                    }
                    console.log("User in authorize: ", user);
                    return user;   
                } catch (error) {  
                    throw new Error(error instanceof Error ? error.message : "An error occurred during authorization");  
                }  
            }  
        }),
        GoogleProvider({  
            clientId: process.env.GOOGLE_CLIENT_ID,  
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
        }),  
        GithubProvider({  
            clientId: process.env.GITHUB_ID,  
            clientSecret: process.env.GITHUB_SECRET,  
        }),  
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.isVerified = user.isVerified;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id?.toString();
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }
            // console.log("Session in options: ", session);
            return session;
        }
    },
    pages: {  
        signIn: '/dashboard', // Custom login page  
        signOut: '/', // Custom sign-out page  
        error: '/auth/error', // Custom error page for any sign-in/out errors  
        verifyRequest: '/auth/verify', // Custom verification request page  
        newUser: '/welcome', // Redirect new users to a welcome page  
    },  
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days  
        updateAge: 24 * 60 * 60, // 24 hours  
    }
};
