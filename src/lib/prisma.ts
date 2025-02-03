import { PrismaClient } from "@prisma/client";

// Déclaration pour TypeScript pour éviter les erreurs de type
declare global {
    var prisma: PrismaClient | undefined;
}

// Cette approche évite de créer plusieurs instances en développement
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;
