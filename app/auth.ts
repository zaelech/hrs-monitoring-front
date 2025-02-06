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
    basePath: "/api/auth",
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    cookies: {
        sessionToken: {
            name: process.env.NEXT_ENVIRONMENT === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NEXT_ENVIRONMENT === "production",
                // domain sera géré automatiquement par NextAuth
            },
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request: Request) {
                console.log("Début de l'autorisation");
                console.log("Environnement:", process.env.NEXT_ENVIRONMENT);
                console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Identifiants manquants");
                    return null;
                }

                try {
                    console.log("Tentative de connexion à la base de données");
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

                    console.log("Résultat de la recherche utilisateur:", user ? "Trouvé" : "Non trouvé");

                    if (!user) {
                        return null;
                    }
                    console.log("Vérification du mot de passe");
                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

                    console.log("Mot de passe valide:", isPasswordValid);

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
                    console.error("Erreur détaillée lors de l'authentification:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            console.log("=========== SESSION CALLBACK ===========");
            console.log("Session complète:", JSON.stringify(session));
            console.log("Token complet:", JSON.stringify(token));
            console.log("======================================");
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.groups = token.groups;
            }
            return session;
        },
        async jwt({ token, user }) {
            console.log("============== JWT CALLBACK ============");
            console.log("Token avant modification:", JSON.stringify(token));
            console.log("User data:", JSON.stringify(user));
            console.log("Environnement:", process.env.NEXT_ENVIRONMENT);
            console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
            console.log("======================================");
            if (user) {
                token.id = user.id;
                token.groups = user.groups;
            }
            return token;
        },
    },
    pages: {
        signIn: "/fr/login",
        error: "/fr/login",
    },
} satisfies NextAuthConfig;

const { auth, handlers, signIn, signOut } = NextAuth(config);

export { auth, handlers, signIn, signOut };
