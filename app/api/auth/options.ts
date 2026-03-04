import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (!user || !user.password) {
          throw new Error("User not found");
        }
        
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            if (!existingUser.role) {
              await User.updateOne(
                { email: user.email },
                { $set: { role: "user" } }
              );
            }
            
            user.role = existingUser.role || "user";
          } else {
            user.role = "user";
          }
        } catch (error) {
          console.error("Error in Google sign in callback:", error);
          return true;
        }
      }
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      
      if (!token.role && token.id) {
        try {
          await connectToDatabase();
          
          const dbUser = await User.findById(token.id);
          if (dbUser && dbUser.role) {
            token.role = dbUser.role;
          } else {
            token.role = "user";
          }
        } catch (error) {
          console.error("Error fetching user role for token:", error);
          token.role = "user";
        }
      }
      
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async ({ user }) => {
      if (!user.role) {
        try {
          await connectToDatabase();
          await User.updateOne(
            { _id: user.id },
            { $set: { role: "user" } }
          );
        } catch (error) {
          console.error("Error setting default role for new user:", error);
        }
      }
    }
  }
};