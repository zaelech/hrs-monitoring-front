import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Cette fonction gère les requêtes GET pour récupérer toutes les locations
export async function GET() {
    try {
        // Utilisation de notre client Prisma pour récupérer toutes les locations
        const locations = await prisma.location.findMany();

        // Retourne les données au format JSON
        return NextResponse.json(locations);
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la récupération des locations" }, { status: 500 });
    }
}

// Cette fonction gère les requêtes POST pour créer une nouvelle location
export async function POST(request: Request) {
    try {
        // Récupération des données envoyées dans la requête
        const data = await request.json();

        // Création d'une nouvelle location dans la base de données
        const location = await prisma.location.create({
            data: data,
        });

        // Retourne la location créée avec un statut 201 (Created)
        return NextResponse.json(location, { status: 201 });
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la création de la location" }, { status: 500 });
    }
}
