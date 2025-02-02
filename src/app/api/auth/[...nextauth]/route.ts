import NextAuth from "next-auth";
import { authOptions } from "./options"; 

const handler = NextAuth(authOptions);

// Export only the required HTTP methods
export { handler as GET, handler as POST, handler as DELETE};