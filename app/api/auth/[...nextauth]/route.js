import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/authService";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // const user = { id: 1, name: "Chheng", email: "dev@gmail.com" };
        try {
          const user = await authService.login(credentials.username, credentials.password);

          console.log('user' * 100);
          console.log(user);

          if (user && user.token) {
            return user;
          }
          return null;
        } catch (err) {
          console.error("Authorization failed:", err);
          return null;
        }

        // if (
        //   credentials?.username === "admin" &&
        //   credentials?.password === "123"
        // ) {
        //   return user;
        // }
        // return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
