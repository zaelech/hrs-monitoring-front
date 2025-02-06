import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/../app/auth";

// Cette fonction gère les requêtes GET pour récupérer tous les clients
export async function GET() {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Utilisation de notre client Prisma pour récupérer tous les clients
        const customers = await prisma.customer.findMany();

        // Retourne les données au format JSON
        return NextResponse.json(customers);
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la récupération des clients" }, { status: 500 });
    }
}

// Cette fonction gère les requêtes POST pour créer un nouveau client
export async function POST(request: Request) {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Récupération des données envoyées dans la requête
        const data = await request.json();

        // Création d'un nouveau client dans la base de données
        const customer = await prisma.customer.create({
            data: data,
        });

        // Retourne le client créé avec un statut 201 (Created)
        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        // En cas d'erreur, on retourne un message d'erreur avec un statut 500
        return NextResponse.json({ error: "Erreur lors de la création du client" }, { status: 500 });
    }
}
