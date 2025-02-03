# Utilisation d'une image Node.js LTS comme base
FROM node:20-alpine AS builder

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./

# Installation des dépendances
RUN npm ci

# Copie du reste du code source
COPY . .

# Construction de l'application
RUN npm run build

# Étape de production
FROM node:20-alpine AS runner

WORKDIR /app

# Copie des fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Installation des dépendances de production uniquement
RUN npm ci --only=production

# Exposition du port
EXPOSE 3000

# Génération du client Prisma
RUN npx prisma generate

# Commande de démarrage
CMD ["npm", "start"]