import NextAuth from "next-auth"
import { authOptions } from "./options"

const handler = NextAuth({
  ...authOptions,
  // debug: process.env.NODE_ENV === "development",
  // logger: {
  //   error(code, ...message) {
  //     console.error(code, ...message)
  //   },
  //   warn(code, ...message) {
  //     console.warn(code, ...message)
  //   },
  //   debug(code, ...message) {
  //     if (process.env.NODE_ENV === "development") {
  //       console.debug(code, ...message)
  //     }
  //   },
  // },
})

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PETCH,}

