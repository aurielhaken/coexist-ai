#!/bin/bash

# Script de configuration pour coexist-ai.com
# À exécuter une fois le domaine acheté

echo "🌐 Configuration de coexist-ai.com"
echo "=================================="

echo "1. Ajout du domaine dans Vercel..."
npx vercel domains add coexist-ai.com

echo ""
echo "2. Configuration DNS requise chez votre registraire :"
echo "   A Record: @ → 76.76.19.61"
echo "   CNAME: www → cname.vercel-dns.com"
echo ""
echo "3. Attendre la propagation DNS (5-60 minutes)..."
echo ""
echo "4. Vérification du domaine..."
./verify-domain.sh coexist-ai.com

echo ""
echo "5. Mise à jour des métadonnées..."
node update-domain-metadata.js coexist-ai.com

echo ""
echo "6. Build et déploiement..."
npm run build
npx vercel --prod

echo ""
echo "✅ coexist-ai.com sera accessible à: https://coexist-ai.com"
echo "🎉 Votre site COEXIST.AI sera en ligne !"

