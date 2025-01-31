import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const config = {
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials?.username === "admin" && credentials?.password === "admin") {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@example.com",
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
