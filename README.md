# hrs-monitoring-front

# Déploiement en local en vidant le cache :

docker-compose -f docker-compose.local.yml down && docker-compose -f docker-compose.local.yml build --no-cache && docker-compose -f docker-compose.local.yml up

# Déploiement en local sans vidage du cache :

docker-compose -f docker-compose.local.yml down && docker-compose -f docker-compose.local.yml build && docker-compose -f docker-compose.local.yml up

# Déploiement en production :

# Se connecter au registre Azure Container Registry

az acr login --name hrsmonitoringacr

# Construire l'image Docker pour l'architecture AMD64 (nécessaire pour Azure)

docker buildx build --platform linux/amd64 \
 -t hrsmonitoringacr.azurecr.io/hrs-monitoring:latest \
 --push .

# Mettre à jour la configuration du conteneur dans l'App Service

az webapp config container set \
 --name hrs-monitoring-app \
 --resource-group HRS-NORTH \
 --docker-custom-image-name hrsmonitoringacr.azurecr.io/hrs-monitoring:latest \
 --docker-registry-server-url https://hrsmonitoringacr.azurecr.io

# Redémarrer l'application pour appliquer les changements

az webapp restart \
 --name hrs-monitoring-app \
 --resource-group HRS-NORTH

# Vérifier les logs pour s'assurer que tout fonctionne

az webapp log tail \
 --name hrs-monitoring-app \
 --resource-group HRS-NORTH
