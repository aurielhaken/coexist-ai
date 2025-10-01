#!/bin/bash

# COEXIST.AI - Script de build pour toutes les plateformes
# Ce script construit l'application pour web, mobile et desktop

echo "🌟 COEXIST.AI - Build pour toutes les plateformes"
echo "=================================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

print_status "Installation des dépendances..."
npm install

# 1. Build pour le web (PWA)
print_status "🌐 Construction de l'application web (PWA)..."
npm run build

if [ $? -eq 0 ]; then
    print_success "✅ Build web terminé avec succès"
else
    print_error "❌ Erreur lors du build web"
    exit 1
fi

# 2. Build pour mobile (PWA optimisée)
print_status "📱 Optimisation pour mobile..."
# Créer un dossier mobile avec des optimisations spécifiques
mkdir -p dist-mobile
cp -r out/* dist-mobile/

# Optimiser le manifest pour mobile
cat > dist-mobile/manifest.json << EOF
{
  "name": "COEXIST.AI",
  "short_name": "COEXIST.AI",
  "description": "Assistant de Paix",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#8b5cf6",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "fr",
  "categories": ["lifestyle", "health", "education"],
  "icons": [
    {
      "src": "/icon-192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
EOF

print_success "✅ Optimisation mobile terminée"

# 3. Build pour desktop (Electron)
print_status "🖥️  Construction de l'application desktop (Electron)..."

# Installer les dépendances Electron
if [ ! -f "package-electron.json" ]; then
    print_error "❌ Fichier package-electron.json non trouvé"
    exit 1
fi

# Copier le package.json pour Electron
cp package-electron.json package.json

# Installer les dépendances Electron
npm install electron electron-builder electron-updater --save-dev

# Construire l'application Electron
npm run electron-dist

if [ $? -eq 0 ]; then
    print_success "✅ Build desktop terminé avec succès"
else
    print_warning "⚠️  Build desktop échoué, mais l'application web fonctionne"
fi

# 4. Créer les packages de distribution
print_status "📦 Création des packages de distribution..."

# Créer un dossier de distribution
mkdir -p dist-all-platforms

# Copier les builds
cp -r out dist-all-platforms/web
cp -r dist-mobile dist-all-platforms/mobile

# Copier les builds Electron s'ils existent
if [ -d "dist-electron" ]; then
    cp -r dist-electron dist-all-platforms/desktop
fi

# Créer un README pour la distribution
cat > dist-all-platforms/README.md << EOF
# COEXIST.AI - Toutes les plateformes

## 🌐 Web (PWA)
- Dossier: \`web/\`
- Accès: Ouvrir \`web/index.html\` dans un navigateur
- Installation: Suivre les instructions PWA dans le navigateur

## 📱 Mobile (PWA optimisée)
- Dossier: \`mobile/\`
- Accès: Ouvrir \`mobile/index.html\` dans un navigateur mobile
- Installation: Ajouter à l'écran d'accueil

## 🖥️ Desktop (Electron)
- Dossier: \`desktop/\`
- Installation: Exécuter l'installateur approprié pour votre OS

## 🚀 Déploiement

### Web
1. Uploader le contenu du dossier \`web/\` sur votre serveur web
2. Configurer HTTPS (requis pour PWA)
3. Configurer le Service Worker

### Mobile
1. Uploader le contenu du dossier \`mobile/\` sur votre serveur web
2. Configurer HTTPS
3. Les utilisateurs peuvent installer via "Ajouter à l'écran d'accueil"

### Desktop
1. Distribuer les installateurs dans le dossier \`desktop/\`
2. Les utilisateurs peuvent installer l'application native

## 📋 Prérequis
- Serveur web avec HTTPS
- Support des Service Workers
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

## 🔧 Support
- Email: contact@coexist-ai.com
- Documentation: https://coexist-ai.com/docs
- GitHub: https://github.com/coexist-ai/coexist-ai

---
Développé avec ❤️ pour un monde plus paisible 🌍
EOF

print_success "✅ Packages de distribution créés dans dist-all-platforms/"

# 5. Créer un script de déploiement
print_status "🚀 Création du script de déploiement..."

cat > deploy.sh << 'EOF'
#!/bin/bash

# Script de déploiement COEXIST.AI
echo "🚀 Déploiement de COEXIST.AI..."

# Vérifier les variables d'environnement
if [ -z "$DEPLOY_URL" ]; then
    echo "❌ Variable DEPLOY_URL non définie"
    echo "Exemple: export DEPLOY_URL=https://coexist-ai.com"
    exit 1
fi

# Déployer l'application web
echo "📤 Déploiement de l'application web..."
rsync -avz --delete dist-all-platforms/web/ $DEPLOY_URL/

# Déployer l'application mobile
echo "📱 Déploiement de l'application mobile..."
rsync -avz --delete dist-all-platforms/mobile/ $DEPLOY_URL/mobile/

echo "✅ Déploiement terminé !"
echo "🌐 Web: $DEPLOY_URL"
echo "📱 Mobile: $DEPLOY_URL/mobile"
EOF

chmod +x deploy.sh

print_success "✅ Script de déploiement créé (deploy.sh)"

# 6. Résumé final
echo ""
echo "🎉 COEXIST.AI - Build terminé avec succès !"
echo "=========================================="
echo ""
echo "📁 Fichiers générés:"
echo "  - dist-all-platforms/web/     (Application web PWA)"
echo "  - dist-all-platforms/mobile/  (Application mobile PWA)"
if [ -d "dist-electron" ]; then
    echo "  - dist-all-platforms/desktop/ (Application desktop Electron)"
fi
echo "  - deploy.sh                   (Script de déploiement)"
echo ""
echo "🚀 Prochaines étapes:"
echo "  1. Tester l'application: npm run dev"
echo "  2. Déployer: ./deploy.sh (après configuration de DEPLOY_URL)"
echo "  3. Distribuer les packages desktop si nécessaire"
echo ""
echo "🌟 COEXIST.AI est prêt à promouvoir la paix dans le monde !"
