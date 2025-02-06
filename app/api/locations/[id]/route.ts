import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/../app/auth";

export async function GET(request: NextRequest) {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Récupération de l'ID depuis l'URL
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop(); // Récupère l'ID depuis le chemin

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        const location = await prisma.location.findUnique({
            where: { id: Number(id) },
        });

        if (!location) {
            return NextResponse.json({ error: "Location non trouvée" }, { status: 404 });
        }

        return NextResponse.json(location);
    } catch (error) {
        return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        const data = await request.json();

        const updatedLocation = await prisma.location.update({
            where: {
                id: Number(id),
            },
            data: {
                place: data.place,
                zipCode: data.zipCode,
                number: data.number,
                municipality: data.municipality,
                bfsNumber: data.bfsNumber,
                canton: data.canton,
                coordinateE: data.coordinateE,
                coordinateN: data.coordinateN,
                language: data.language,
                validity: data.validity,
            },
        });

        return NextResponse.json(updatedLocation);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour de la location" }, { status: 500 });
    }
}
