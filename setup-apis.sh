#!/bin/bash

# Script de configuration des APIs pour COEXIST.AI
# Usage: ./setup-apis.sh

echo "🚀 Configuration des APIs pour COEXIST.AI"
echo "========================================"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installez-le avec:"
    echo "   npm i -g vercel"
    exit 1
fi

echo ""
echo "📋 Ce script va configurer vos clés API sur Vercel"
echo ""

# Configuration OpenRouter
echo "🔑 Configuration OpenRouter (recommandé)"
echo "Obtenez votre clé sur: https://openrouter.ai"
echo "Format: sk-or-v1-..."
read -p "Entrez votre clé OpenRouter (ou appuyez sur Entrée pour ignorer): " OPENROUTER_KEY

if [ ! -z "$OPENROUTER_KEY" ]; then
    echo "Configuration de OPENROUTER_API_KEY..."
    echo "$OPENROUTER_KEY" | vercel env add OPENROUTER_API_KEY production
    echo "✅ OPENROUTER_API_KEY configuré"
else
    echo "⏭️  OpenRouter ignoré"
fi

echo ""

# Configuration OpenAI (optionnel)
echo "🔑 Configuration OpenAI (optionnel - fallback)"
echo "Obtenez votre clé sur: https://platform.openai.com"
echo "Format: sk-..."
read -p "Entrez votre clé OpenAI (ou appuyez sur Entrée pour ignorer): " OPENAI_KEY

if [ ! -z "$OPENAI_KEY" ]; then
    echo "Configuration de OPENAI_API_KEY..."
    echo "$OPENAI_KEY" | vercel env add OPENAI_API_KEY production
    echo "✅ OPENAI_API_KEY configuré"
else
    echo "⏭️  OpenAI ignoré"
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📊 Modes disponibles:"
if [ ! -z "$OPENROUTER_KEY" ]; then
    echo "   ✅ OpenRouter (Llama 3.1 70B) - Recommandé"
fi
if [ ! -z "$OPENAI_KEY" ]; then
    echo "   ✅ OpenAI (GPT-4o-mini) - Fallback"
fi
echo "   ✅ Mode enrichi intégré - Toujours disponible"
echo ""
echo "🚀 Déployez maintenant avec:"
echo "   vercel --prod --yes"
echo ""
echo "🧪 Testez avec:"
echo "   curl -X POST https://coexist-ai.com/api/chat \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"message\": \"Bonjour !\", \"userId\": \"test\"}'"
echo ""
