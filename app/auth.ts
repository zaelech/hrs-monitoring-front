import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Group } from "@/types/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const config = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: {
                            groups: {
                                include: {
                                    group: {
                                        include: {
                                            permissions: {
                                                include: {
                                                    permission: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (!user) {
                        console.log("Utilisateur non trouvé:", credentials.email);
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) {
                        console.log("Mot de passe invalide pour:", credentials.email);
                        return null;
                    }

                    // Transformation des données pour correspondre au format attendu
                    const formattedGroups = user.groups.map(groupUser => ({
                        id: groupUser.group.id,
                        name: groupUser.group.name,
                        permissions: groupUser.group.permissions.map(gp => gp.permission.name)
                    }));

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        groups: formattedGroups
                    };
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
                session.user.groups = token.groups as Group[];
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
