#!/bin/bash

# Script de configuration des APIs premium pour COEXIST.AI
# Ce script vous aide à configurer les meilleures APIs IA disponibles

echo "🌟 Configuration des APIs Premium pour COEXIST.AI"
echo "================================================"
echo ""

# Vérifier si .env existe
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp env.example .env
    echo "✅ Fichier .env créé à partir d'env.example"
else
    echo "✅ Fichier .env existe déjà"
fi
echo ""

echo "🔑 APIs recommandées par ordre de priorité :"
echo ""
echo "1. 🥇 ANTHROPIC CLAUDE 3.5 SONNET (Recommandé)"
echo "   - Meilleure compréhension du langage naturel"
echo "   - Excellent pour les questions spirituelles et existentielles"
echo "   - Très empathique et sage"
echo "   - Prix: ~$15/million de tokens"
echo "   - Obtenez votre clé: https://console.anthropic.com/"
echo ""

echo "2. 🥈 OPENROUTER (Excellent)"
echo "   - Accès à Claude 3.5 Sonnet, GPT-4o, et autres modèles premium"
echo "   - Plus économique que les APIs directes"
echo "   - Fallback automatique entre modèles"
echo "   - Prix: Variable selon le modèle"
echo "   - Obtenez votre clé: https://openrouter.ai/"
echo ""

echo "3. 🥉 OPENAI GPT-4O (Fallback)"
echo "   - Modèle très performant"
echo "   - Bon pour le raisonnement et l'analyse"
echo "   - Prix: ~$5-15/million de tokens"
echo "   - Obtenez votre clé: https://platform.openai.com/"
echo ""

echo "📋 Instructions de configuration :"
echo ""
echo "1. Choisissez au moins une API (Claude recommandé)"
echo "2. Obtenez votre clé API sur le site correspondant"
echo "3. Ajoutez-la dans le fichier .env :"
echo ""

read -p "Voulez-vous configurer Anthropic Claude maintenant ? (y/n): " configure_claude

if [ "$configure_claude" = "y" ] || [ "$configure_claude" = "Y" ]; then
    echo ""
    echo "🔑 Configuration d'Anthropic Claude :"
    echo "1. Allez sur https://console.anthropic.com/"
    echo "2. Créez un compte ou connectez-vous"
    echo "3. Générez une clé API"
    echo "4. Collez-la ci-dessous :"
    echo ""
    
    read -p "Entrez votre clé Anthropic (sk-ant-...): " anthropic_key
    
    if [ ! -z "$anthropic_key" ]; then
        # Ajouter ou remplacer ANTHROPIC_API_KEY dans .env
        if grep -q "ANTHROPIC_API_KEY" .env; then
            sed -i.bak "s/ANTHROPIC_API_KEY=.*/ANTHROPIC_API_KEY=$anthropic_key/" .env
        else
            echo "ANTHROPIC_API_KEY=$anthropic_key" >> .env
        fi
        echo "✅ Clé Anthropic configurée !"
    fi
fi

echo ""
read -p "Voulez-vous configurer OpenRouter maintenant ? (y/n): " configure_openrouter

if [ "$configure_openrouter" = "y" ] || [ "$configure_openrouter" = "Y" ]; then
    echo ""
    echo "🔑 Configuration d'OpenRouter :"
    echo "1. Allez sur https://openrouter.ai/"
    echo "2. Créez un compte ou connectez-vous"
    echo "3. Ajoutez des crédits à votre compte"
    echo "4. Générez une clé API"
    echo "5. Collez-la ci-dessous :"
    echo ""
    
    read -p "Entrez votre clé OpenRouter (sk-or-v1-...): " openrouter_key
    
    if [ ! -z "$openrouter_key" ]; then
        # Ajouter ou remplacer OPENROUTER_API_KEY dans .env
        if grep -q "OPENROUTER_API_KEY" .env; then
            sed -i.bak "s/OPENROUTER_API_KEY=.*/OPENROUTER_API_KEY=$openrouter_key/" .env
        else
            echo "OPENROUTER_API_KEY=$openrouter_key" >> .env
        fi
        echo "✅ Clé OpenRouter configurée !"
    fi
fi

echo ""
read -p "Voulez-vous configurer OpenAI maintenant ? (y/n): " configure_openai

if [ "$configure_openai" = "y" ] || [ "$configure_openai" = "Y" ]; then
    echo ""
    echo "🔑 Configuration d'OpenAI :"
    echo "1. Allez sur https://platform.openai.com/"
    echo "2. Créez un compte ou connectez-vous"
    echo "3. Ajoutez des crédits à votre compte"
    echo "4. Générez une clé API"
    echo "5. Collez-la ci-dessous :"
    echo ""
    
    read -p "Entrez votre clé OpenAI (sk-...): " openai_key
    
    if [ ! -z "$openai_key" ]; then
        # Ajouter ou remplacer OPENAI_API_KEY dans .env
        if grep -q "OPENAI_API_KEY" .env; then
            sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$openai_key/" .env
        else
            echo "OPENAI_API_KEY=$openai_key" >> .env
        fi
        echo "✅ Clé OpenAI configurée !"
    fi
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📋 Résumé de votre configuration :"
echo "=================================="

if grep -q "ANTHROPIC_API_KEY=sk-ant-" .env; then
    echo "✅ Anthropic Claude : Configuré"
else
    echo "❌ Anthropic Claude : Non configuré"
fi

if grep -q "OPENROUTER_API_KEY=sk-or-v1-" .env; then
    echo "✅ OpenRouter : Configuré"
else
    echo "❌ OpenRouter : Non configuré"
fi

if grep -q "OPENAI_API_KEY=sk-" .env; then
    echo "✅ OpenAI : Configuré"
else
    echo "❌ OpenAI : Non configuré"
fi

echo ""
echo "🚀 Pour démarrer votre application avec les nouvelles APIs :"
echo "   npm run dev"
echo ""
echo "💡 Conseil : Claude 3.5 Sonnet est recommandé pour la meilleure compréhension !"
echo ""

# Nettoyer les fichiers de sauvegarde
rm -f .env.bak

echo "✨ Configuration terminée avec succès !"
