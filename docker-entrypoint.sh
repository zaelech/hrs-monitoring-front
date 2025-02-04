#!/bin/sh

# Régénérer le client Prisma
echo "Generating Prisma Client..."
npx prisma generate

# Exécuter la commande passée en argument
echo "Starting application..."
exec "$@"
