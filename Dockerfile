# Étape de construction
FROM node:20-alpine AS builder

# Définition du répertoire de travail
WORKDIR /app

# Installation des dépendances globales nécessaires
RUN apk add --no-cache python3 make g++

# Copie des fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm ci

# Copie des fichiers de configuration
COPY tsconfig*.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Copie du reste des fichiers
COPY . .

# Génération du client Prisma
RUN npx prisma generate

# Construction de l'application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Étape de production
FROM node:20-alpine AS runner

WORKDIR /app

# Copie des fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Configuration de l'environnement
ENV NODE_ENV=development
ENV APP_ENV=development
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=true

# Script de démarrage qui régénère le client Prisma si nécessaire
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exposition du port
EXPOSE 3000

# Démarrage de l'application
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]