import { NextResponse } from "next/server";
import { auth } from "@/../app/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();
        console.log("Session utilisateur :", JSON.stringify(session, null, 2));

        if (!session?.user) {
            console.log("Aucun utilisateur connecté");
            return new NextResponse("Non authentifié", { status: 401 });
        }

        if (!session.user.email) {
            console.log("Email de l'utilisateur manquant");
            return new NextResponse("Email de l'utilisateur manquant", { status: 400 });
        }

        // Vérification des permissions de l'utilisateur en utilisant l'email
        const userWithGroups = await prisma.user.findUnique({
            where: { email: session.user.email },
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

        console.log("Utilisateur avec groupes et permissions :", JSON.stringify(userWithGroups, null, 2));

        if (!userWithGroups) {
            console.log("Utilisateur non trouvé dans la base de données");
            return new NextResponse("Utilisateur non trouvé", { status: 404 });
        }

        const hasManageUsersPermission = userWithGroups.groups.some(
            groupUser => groupUser.group.permissions.some(
                gp => gp.permission.name === "MANAGE_USERS"
            )
        );

        console.log("A la permission MANAGE_USERS :", hasManageUsersPermission);

        if (!hasManageUsersPermission) {
            console.log("Accès refusé : l'utilisateur n'a pas la permission MANAGE_USERS");
            return new NextResponse("Non autorisé", { status: 403 });
        }

        // Récupération des groupes avec leurs permissions
        const groups = await prisma.group.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });

        // Transformation des données pour le format attendu par le front-end
        const formattedGroups = groups.map(group => ({
            ...group,
            permissions: group.permissions.map(gp => gp.permission.name)
        }));

        console.log("Groupes formatés renvoyés :", JSON.stringify(formattedGroups, null, 2));

        return NextResponse.json(formattedGroups);
    } catch (error) {
        console.error("Erreur lors de la récupération des groupes:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}
