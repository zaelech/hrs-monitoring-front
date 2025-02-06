import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/../app/auth";

// Cette fonction gère les requêtes GET pour récupérer tous les projets
export async function GET() {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Utilisation de notre client Prisma pour récupérer tous les projets
        const projects = await prisma.project.findMany({
            include: {
                location: true, // Inclure les données de la location associée
            },
        });

        // Retourne les données au format JSON
        return NextResponse.json(projects);
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la récupération des projets" }, { status: 500 });
    }
}

// Cette fonction gère les requêtes POST pour créer un nouveau projet
export async function POST(request: Request) {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Récupération des données envoyées dans la requête
        const data = await request.json();

        // Création d'un nouveau projet dans la base de données
        const project = await prisma.project.create({
            data: data,
            include: {
                location: true, // Inclure les données de la location associée
            },
        });

        // Retourne le projet créé avec un statut 201 (Created)
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la création du projet" }, { status: 500 });
    }
}
