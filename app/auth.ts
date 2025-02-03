import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Group, Permission } from "@/types/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Extension du type JWT
declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        groups?: Group[];
    }
}

export const config = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request: Request) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                        include: {
                            groups: {
                                include: {
                                    group: {
                                        include: {
                                            permissions: {
                                                include: {
                                                    permission: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    });

                    if (!user) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

                    if (!isPasswordValid) {
                        return null;
                    }

                    // Transformer les données pour correspondre au type User attendu
                    const transformedUser: User = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        groups: user.groups.map((ug) => ({
                            id: ug.group.id,
                            name: ug.group.name,
                            permissions: ug.group.permissions.map((gp) => gp.permission.name as Permission),
                        })),
                    };

                    return transformedUser;
                } catch (error) {
                    console.error("Erreur lors de l'authentification:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.groups = token.groups;
            }
            return session;
        },
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
                token.groups = user.groups;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Si l'URL commence par le baseUrl, on la retourne telle quelle
            if (url.startsWith(baseUrl)) return url;
            // Sinon on redirige vers la page d'accueil
            return baseUrl;
        },
    },
    pages: {
        signIn: "/fr/login",
        error: "/fr/login",
    },
} satisfies NextAuthConfig;

const { auth, handlers, signIn, signOut } = NextAuth(config);

export { auth, handlers, signIn, signOut };
