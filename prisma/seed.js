import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Création des permissions
    const permissions = await Promise.all([
        prisma.permission.upsert({
            where: { name: 'MANAGE_USERS' },
            update: {},
            create: {
                name: 'MANAGE_USERS',
                description: 'Permet de gérer les utilisateurs'
            }
        }),
        prisma.permission.upsert({
            where: { name: 'READ_LOCATIONS' },
            update: {},
            create: {
                name: 'READ_LOCATIONS',
                description: 'Permet de lire les emplacements'
            }
        }),
        prisma.permission.upsert({
            where: { name: 'WRITE_LOCATIONS' },
            update: {},
            create: {
                name: 'WRITE_LOCATIONS',
                description: 'Permet de modifier les emplacements'
            }
        }),
    ]);

    // Création du groupe admin
    const adminGroup = await prisma.group.upsert({
        where: { name: 'Administrateurs' },
        update: {},
        create: {
            name: 'Administrateurs',
            description: 'Groupe administrateur avec toutes les permissions',
            permissions: {
                create: permissions.map(permission => ({
                    permission: {
                        connect: { id: permission.id }
                    }
                }))
            }
        }
    });

    // Création de l'utilisateur admin
    const adminPassword = await bcrypt.hash('admin', 10);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@example.com',
            password: adminPassword,
            groups: {
                create: [{
                    group: {
                        connect: { id: adminGroup.id }
                    }
                }]
            }
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
