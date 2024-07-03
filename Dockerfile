# Image node 
FROM node:18-alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

COPY . .

# Génération de Prisma client
RUN npx prisma generate

EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]
