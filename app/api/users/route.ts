import { NextResponse } from "next/server";
import { auth } from "@/../app/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.groups?.some((group) => group.permissions.includes("MANAGE_USERS"))) {
            return new NextResponse("Non autorisé", { status: 403 });
        }

        const users = await prisma.user.findMany({
            include: {
                groups: {
                    include: {
                        group: true,
                    },
                },
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.groups?.some((group) => group.permissions.includes("MANAGE_USERS"))) {
            return new NextResponse("Non autorisé", { status: 403 });
        }

        const body = await request.json();
        const { name, email, password, groupIds } = body;

        // Vérification des champs requis
        if (!name || !email || !password) {
            return new NextResponse("Données manquantes", { status: 400 });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur avec ses groupes
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                groups: {
                    create: groupIds.map((groupId: string) => ({
                        group: {
                            connect: { id: groupId },
                        },
                    })),
                },
            },
            include: {
                groups: {
                    include: {
                        group: true,
                    },
                },
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}
