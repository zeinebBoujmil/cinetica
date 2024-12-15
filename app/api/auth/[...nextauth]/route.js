import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { users } from "@/app/Repository/users";


const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),


    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((u) => u.username === credentials.username);
        if (!user) {
          throw new Error("Nom d'utilisateur incorrect");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Mot de passe incorrect");
        }

        return { username: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/discover",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const email = profile.email;


        const userExists = users.some((user) => user.username === email);


        if (!userExists) {
          users.push({
            username: email,
            password: null, 
          });
        }
      }
      return true; 
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      console.log(url);
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};
