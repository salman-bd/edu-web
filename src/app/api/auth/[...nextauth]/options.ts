import type { NextAuthOptions } from "next-auth";  
import CredentialsProvider from "next-auth/providers/credentials";  
import GoogleProvider from "next-auth/providers/google";  
import GitHubProvider from "next-auth/providers/github";  
import FacebookProvider from "next-auth/providers/facebook";  
import { mongoDbConnect } from "@/lib/dbConnect";  
import { compare } from "bcryptjs";  
import UserModel from "@/models/User";  
import { User as NextAuthUser } from "next-auth";  
import { sendWelcomeEmail } from "@/lib/sendEmails";
import clientPromise from "@/lib/mongodb";

interface User extends NextAuthUser {  
  _id: string;  
  email: string;  
  name: string;  
  isVerified: boolean;  
}  

export const authOptions: NextAuthOptions = {  
  providers: [  
    GoogleProvider({  
      clientId: process.env.GOOGLE_CLIENT_ID!,  
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  
    }),  
    GitHubProvider({  
      clientId: process.env.GITHUB_ID!,  
      clientSecret: process.env.GITHUB_SECRET!,  
    }),  
    FacebookProvider({  
      clientId: process.env.FACEBOOK_CLIENT_ID!,  
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,  
    }),  
    CredentialsProvider({  
      name: "Credentials",  
      credentials: {  
        email: { label: "Email", type: "text" },  
        password: { label: "Password", type: "password" },  
      },  
      async authorize(credentials) {  
        if (!credentials?.email || !credentials?.password) {  
          console.error("Missing email or password");  
          throw new Error("Email and password are required");  
        }  
        await mongoDbConnect();  

        try {  
          const client = await clientPromise;  
          const db = client.db("education_app");  
          const collection = db.collection('users');  
          const user = collection.findOne({email: credentials.email})

          if (!user) {  
            throw new Error("No user found with this email");  
          }  
          if (!user.isVerified) {  
            throw new Error("Please verify your account before logging in");  
          }  

          const isPasswordValid = user.password  
            ? await compare(credentials.password, user.password)  
            : false;  

          if (!isPasswordValid) {  
            throw new Error("Incorrect password");  
          }  

          return user.toObject() as User; // Convert Mongoose Document to plain object  
          
        } catch (error) {  
          console.error("Authentication error:", error);  
          throw new Error("Authentication failed. Please try again.");  
        }  
      },  
    }),  
  ],  
  callbacks: {  
    async signIn({ account, profile }) {  
      if (account?.provider && ["google", "github", "facebook"].includes(account.provider)) {  
        const email = profile?.email;  
        const name = profile?.name;  
        if (!email) {  
          return false;  
        }  

        await mongoDbConnect();  
        const existingUser = await UserModel.findOne({ email: email });  
        if (!existingUser) {  
          const expiryDate = new Date();  
          expiryDate.setDate(expiryDate.getDate() + 29);  

          const user = new UserModel({  
            name,  
            email,  
            password: "verified",  
            verifyCode: 1,  
            verifyCodeExpiry: expiryDate,  
            isVerified: true,  
          });  

          try {  
            const newUser = await user.save();  
            sendWelcomeEmail(newUser.email, newUser.name);
            console.log("New user created by a social media provider: ", newUser);  
          } catch (err) {  
            console.error("Error saving new user:", err);  
            return false; // Return false if user creation fails  
          }  
        }  
      }  
      return true; // Allow sign-in for other methods  
    },  
    async jwt({ token, user }) {  
      if (user) {  
        token._id = user._id?.toString();  
        token.name = user.name;  
        token.isVerified = user.isVerified;  
      }  
      return token;  
    },  
    async session({ session, token }) {  
      if (token) {  
        session.user._id = token._id;  
        session.user.name = token.name;  
        session.user.isVerified = token.isVerified;  
      }  
      // console.log("Session before return from auth provider: ", session);  
      return session;  
    },  
  },  
  pages: {  
    signIn: "/",  
    signOut: "/",  
    error: "/auth/error",  
    verifyRequest: "/auth/verify",  
    newUser: "/welcome",  
  },  
  session: {  
    strategy: "jwt",  
    maxAge: 30 * 24 * 60 * 60, // 30 days  
    updateAge: 24 * 60 * 60, // 24 hours  
  },  
  secret: process.env.NEXTAUTH_SECRET || "G8r@!93#mT7Z2sTA*3Jt&!93#$2s*3Jt&Cx",  
};