#!/bin/bash

# Mise à jour de la liste des paquets
sudo apt-get update

# Installation des paquets nécessaires
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    sshpass

# Ajouter la clé GPG officielle de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Utiliser le référentiel Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker Engine et Docker Compose
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Vérifier l'installation de Docker
sudo docker --version

# Installer Docker Compose (si non inclus avec Docker Engine)
sudo apt-get install -y docker-compose

# Vérifier l'installation de Docker Compose
docker-compose --version

# Créer le répertoire de l'application si nécessaire
mkdir -p /home/$USER/ressources-back

# Donner les permissions nécessaires
sudo chown -R $USER:$USER /home/$USER/ressources-back

# Copier les fichiers du projet dans le répertoire de l'application
cp -r * /home/$USER/ressources-back

# Aller dans le répertoire de l'application
cd /home/$USER/ressources-back

# Démarrer l'application avec Docker Compose
docker-compose up -d
