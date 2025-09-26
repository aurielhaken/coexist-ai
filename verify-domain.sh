#!/bin/bash

# Script de vérification du domaine COEXIST.AI
# Usage: ./verify-domain.sh votre-domaine.com

if [ -z "$1" ]; then
    echo "Usage: ./verify-domain.sh votre-domaine.com"
    echo "Exemple: ./verify-domain.sh coexist-ai.com"
    exit 1
fi

DOMAIN=$1

echo "🌐 Vérification du domaine: $DOMAIN"
echo "=================================="

echo "1. Vérification DNS A Record:"
dig +short $DOMAIN A

echo ""
echo "2. Vérification DNS CNAME (www):"
dig +short www.$DOMAIN CNAME

echo ""
echo "3. Vérification HTTPS:"
curl -I https://$DOMAIN 2>/dev/null | head -1

echo ""
echo "4. Vérification www HTTPS:"
curl -I https://www.$DOMAIN 2>/dev/null | head -1

echo ""
echo "5. Test de propagation DNS:"
echo "Vérifiez sur: https://www.whatsmydns.net/#A/$DOMAIN"

echo ""
echo "✅ Si tout fonctionne, votre domaine est configuré !"
echo "🔗 Votre site sera accessible à: https://$DOMAIN"

