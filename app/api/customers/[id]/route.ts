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

        const customer = await prisma.customer.findUnique({
            where: { id: Number(id) },
        });

        if (!customer) {
            return NextResponse.json({ error: "Client non trouvé" }, { status: 404 });
        }

        return NextResponse.json(customer);
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

        const updatedCustomer = await prisma.customer.update({
            where: {
                id: Number(id),
            },
            data: {
                number: data.number,
                name: data.name,
                address: data.address,
                comment: data.comment,
            },
        });

        return NextResponse.json(updatedCustomer);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour du client" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Vérification de l'authentification
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Récupération de l'ID depuis l'URL
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        await prisma.customer.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ message: "Client supprimé avec succès" });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression du client" }, { status: 500 });
    }
}
