#!/bin/bash

echo "🔐 Configuration GitHub Authentication pour COEXIST.AI"
echo "====================================================="

# Créer le fichier .env.local
echo "📝 Création du fichier .env.local..."

cat > .env.local << 'EOF'
# 🔐 Configuration GitHub Authentication pour COEXIST.AI

# -------------------------------
# 🔑 GitHub OAuth App Credentials
# -------------------------------

# Remplacez par vos vraies valeurs GitHub
GITHUB_CLIENT_ID=Iv1.abc1234567890
GITHUB_CLIENT_SECRET=your_client_secret_here

# -------------------------------
# 🌐 NextAuth Configuration
# -------------------------------

# URL de l'application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# -------------------------------
# 🤖 OpenAI API Configuration
# -------------------------------

# Clé API OpenAI (obligatoire)
OPENAI_API_KEY=sk-your-openai-api-key-here
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ Fichier .env.local créé !"
echo ""
echo "🚨 IMPORTANT : Vous devez maintenant :"
echo ""
echo "1️⃣  Créer une GitHub OAuth App :"
echo "   • Allez sur https://github.com/settings/applications/new"
echo "   • Nom: COEXIST.AI"
echo "   • Homepage URL: http://localhost:3000"
echo "   • Callback URL: http://localhost:3000/api/auth/callback/github"
echo ""
echo "2️⃣  Configurer le fichier .env.local :"
echo "   • Remplacez GITHUB_CLIENT_ID par votre Client ID"
echo "   • Remplacez GITHUB_CLIENT_SECRET par votre Client Secret"
echo "   • Générez un NEXTAUTH_SECRET aléatoire"
echo "   • Ajoutez votre clé API OpenAI"
echo ""
echo "3️⃣  Redémarrer l'application :"
echo "   npm run dev"
echo ""
echo "🎯 Fonctionnalités activées :"
echo "   ✅ Connexion avec GitHub"
echo "   ✅ Profil utilisateur dans l'interface"
echo "   ✅ Sessions persistantes"
echo "   ✅ Historique lié au compte"
echo ""
echo "🌐 Pour la production, configurez les mêmes variables sur Vercel !"
