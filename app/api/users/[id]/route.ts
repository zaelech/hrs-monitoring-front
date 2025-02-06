import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/../app/auth";

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Vérifier les permissions de l'utilisateur
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user?.email as string },
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
            },
        });

        if (!currentUser?.groups.some(g => g.group.permissions.some(p => p.permission.name === "MANAGE_USERS"))) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
        }

        // Récupération de l'ID depuis l'URL
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        const data = await request.json();
        const { name, email, password, groupIds } = data;

        // Préparer les données de mise à jour
        const updateData: any = {
            name,
            email,
            groups: {
                deleteMany: {},
                create: groupIds.map((groupId: string) => ({
                    group: {
                        connect: { id: groupId }
                    }
                }))
            }
        };

        // N'inclure le mot de passe que s'il est fourni
        if (password) {
            updateData.password = password;
        }

        // Mettre à jour l'utilisateur
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                groups: {
                    include: {
                        group: true
                    }
                }
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour de l'utilisateur" }, { status: 500 });
    }
}
