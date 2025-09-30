#!/bin/bash

echo "🔧 Configuration de l'API GPT pour COEXIST.AI"
echo "=============================================="

# Créer le fichier .env.local
echo "📝 Création du fichier .env.local..."

cat > .env.local << 'EOF'
# Variables d'environnement pour COEXIST.AI

# Remplacez par votre vraie clé API OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Mode démo désactivé pour utiliser les vraies réponses GPT
NEXT_PUBLIC_DEMO_MODE=false

# URL de l'application
NEXT_PUBLIC_APP_URL=https://coexist-ai.com
EOF

echo "✅ Fichier .env.local créé !"
echo ""
echo "🚨 IMPORTANT : Vous devez maintenant :"
echo "1. Ouvrir le fichier .env.local"
echo "2. Remplacer 'sk-your-openai-api-key-here' par votre vraie clé API OpenAI"
echo "3. Redémarrer l'application avec: npm run dev"
echo ""
echo "🔑 Pour obtenir une clé API OpenAI :"
echo "- Allez sur https://platform.openai.com/api-keys"
echo "- Créez une nouvelle clé API"
echo "- Copiez-la dans le fichier .env.local"
echo ""
echo "🎯 Une fois configuré, l'IA donnera de vraies réponses personnalisées !"
