import NextAuth from "next-auth";
import { authOptions } from "../options";

// Create and export the handler as the default export
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };