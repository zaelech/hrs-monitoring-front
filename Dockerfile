# Étape de construction
FROM node:20-alpine AS builder

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances avec un cache plus propre
RUN npm ci

# Copie des fichiers de configuration
COPY tsconfig*.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Copie du code source en restructurant pour Next.js
COPY src ./src
RUN mkdir -p app && mv src/* app/ || true

# Copie des assets publics
COPY public ./public

# Génération du client Prisma et build de l'application
RUN npx prisma generate
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

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Démarrage de l'application
CMD ["node", "server.js"]