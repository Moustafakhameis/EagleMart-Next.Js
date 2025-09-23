import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import {
  ApiResponse,
  DecodedToken,
  CustomSession,
} from "../app/_InterFaces/next-auth";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "EagleMart",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        if (!res.ok) {
          throw new Error("Invalid email or password");
        }
        const finalRes: ApiResponse = await res.json();
        // console.log("finalRes", finalRes);
        // if (res.ok && finalRes.message === "success")
        if (finalRes.message === "success" && finalRes.token) {
          //   const { role, ...rest } = finalRes.user;
          //   return rest;

          const decodedTokenObject: DecodedToken = jwtDecode(finalRes.token);

          return {
            id: decodedTokenObject.id,
            message: finalRes.message,
            name: finalRes.user.name,
            email: finalRes.user.email,
            accessToken: finalRes.token,
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // console.log("params", token, user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user  as { accessToken?: string }).accessToken;
      }

      //   return { ...token, ...user };
      return token;
    },

    async session({ session, token }) {
      //   if (session.user) {
      //     session.user.id = token.id as string;
      //     session.user.name = token.name;
      //     session.user.email = token.email;
      //     (session as any).accessToken = token.accessToken;
      //   }
      //   return session;
      const customSession = session as CustomSession;

      if (customSession.user) {
        customSession.user.id = token.id as string;
        customSession.user.name = token.name;
        customSession.user.email = token.email;
        customSession.accessToken = token.accessToken as string;
      }

      return customSession;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
};
