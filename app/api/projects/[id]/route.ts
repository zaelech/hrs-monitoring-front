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

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
                location: true, // Inclure les données de la location associée
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
        }

        return NextResponse.json(project);
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

        const updatedProject = await prisma.project.update({
            where: {
                id: Number(id),
            },
            data: {
                number: data.number,
                parcel: data.parcel,
                locationId: data.locationId,
            },
            include: {
                location: true, // Inclure les données de la location associée
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour du projet" }, { status: 500 });
    }
}
