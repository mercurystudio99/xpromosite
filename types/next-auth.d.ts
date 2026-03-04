import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Extend the built-in session types
     */
    interface Session {
        user: {
            id: string
            role?: string
            // Include any other custom user properties you need
        } & DefaultSession["user"]
    }

    /**
     * Extend the built-in user types
     */
    interface User extends DefaultUser {
        role?: string
        // Include any other custom user properties you need
    }
}

declare module "next-auth/jwt" {
    /**
     * Extend the built-in JWT types
     */
    interface JWT {
        id: string
        role?: string
        // Include any other custom JWT properties you need
    }
}