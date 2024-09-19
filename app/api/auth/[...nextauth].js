import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = { id: "1", name: "chheng", email: "chheng@gmail.com" }
        if(user) {
          return user;
        } else {
          return null
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      return session
    },
  },
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
      // async authorize(credentials) {
      //   const user = await findUserByEmail(credentials.email, credentials.password);

      //   if (user) {
      //     return user;
      //   } else {
      //     return null; 
      //   }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async session({ session, token }) {
//       console.log('hi', session)
//       session.user.id = token.id;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
// });

// const handler = NextAuth();

// export { handler as GET, handler as POST };
