# 🔑 Guide de Configuration des Clés API - COEXIST.AI

## 📋 Vue d'ensemble

Pour activer l'intelligence artificielle de COEXIST.AI, vous devez configurer **AU MOINS UNE** clé API parmi les options suivantes.

---

## ⭐ OPTION 1 : Claude API (RECOMMANDÉ)

**Pourquoi Claude ?**
- 🎯 Meilleure compréhension contextuelle
- 💙 Plus empathique et bienveillant
- 🌟 Excellent pour la médiation et les conflits
- 💰 Prix compétitif (~$3/million tokens)

### 📝 Étapes pour obtenir votre clé Claude :

1. **Créer un compte Anthropic**
   - Allez sur : https://console.anthropic.com/
   - Cliquez sur "Sign Up" (Inscription)
   - Utilisez votre email professionnel

2. **Obtenir votre clé API**
   - Une fois connecté, allez dans "API Keys"
   - Cliquez sur "Create Key"
   - Nommez votre clé (ex: "COEXIST-AI-Production")
   - Copiez la clé (elle commence par `sk-ant-`)

3. **Configurer dans COEXIST.AI**
   ```bash
   # Ouvrez le fichier .env.local
   # Collez votre clé après ANTHROPIC_API_KEY=
   ANTHROPIC_API_KEY=sk-ant-api03-votre-clé-ici
   ```

4. **Recharger le crédit** (si nécessaire)
   - Allez dans "Billing" dans la console Anthropic
   - Ajoutez $5-$20 pour commencer
   - Claude coûte environ $3 par million de tokens

---

## 🔥 OPTION 2 : OpenRouter (FLEXIBLE)

**Pourquoi OpenRouter ?**
- 🌐 Accès à PLUSIEURS modèles (Claude, GPT-4, Llama, etc.)
- 🔀 Fallback automatique entre modèles
- 💸 Pay-as-you-go avec prix compétitifs
- 🚀 Pas besoin de plusieurs clés API

### 📝 Étapes pour obtenir votre clé OpenRouter :

1. **Créer un compte OpenRouter**
   - Allez sur : https://openrouter.ai/
   - Cliquez sur "Sign In" avec GitHub ou Google
   - Acceptez les conditions

2. **Obtenir votre clé API**
   - Une fois connecté, allez dans "Keys" dans le menu
   - Cliquez sur "Create Key"
   - Nommez votre clé (ex: "COEXIST-AI")
   - Copiez la clé (elle commence par `sk-or-v1-`)

3. **Configurer dans COEXIST.AI**
   ```bash
   # Ouvrez le fichier .env.local
   # Collez votre clé après OPENROUTER_API_KEY=
   OPENROUTER_API_KEY=sk-or-v1-votre-clé-ici
   ```

4. **Ajouter du crédit**
   - Allez dans "Credits" dans OpenRouter
   - Ajoutez $5-$10 pour commencer
   - Les prix varient selon le modèle utilisé

---

## 🤖 OPTION 3 : OpenAI API (POPULAIRE)

**Pourquoi OpenAI ?**
- 🏆 GPT-4o est très performant
- 📚 Documentation excellente
- 🌍 Service stable et éprouvé
- 💰 Prix : ~$2.50/million tokens

### 📝 Étapes pour obtenir votre clé OpenAI :

1. **Créer un compte OpenAI**
   - Allez sur : https://platform.openai.com/
   - Cliquez sur "Sign Up"
   - Vérifiez votre email

2. **Obtenir votre clé API**
   - Allez dans : https://platform.openai.com/api-keys
   - Cliquez sur "Create new secret key"
   - Nommez votre clé (ex: "COEXIST-AI")
   - Copiez la clé (elle commence par `sk-`)
   - ⚠️ **IMPORTANT** : Sauvegardez-la, vous ne pourrez plus la revoir !

3. **Configurer dans COEXIST.AI**
   ```bash
   # Ouvrez le fichier .env.local
   # Collez votre clé après OPENAI_API_KEY=
   OPENAI_API_KEY=sk-votre-clé-ici
   ```

4. **Ajouter du crédit**
   - Allez dans "Billing" → "Add payment method"
   - Ajoutez une carte de crédit
   - Définissez une limite mensuelle (ex: $20)

---

## 🔒 Configuration NextAuth (Obligatoire)

Pour sécuriser votre application, générez une clé secrète :

```bash
# Dans votre terminal, exécutez :
openssl rand -base64 32

# Copiez le résultat et collez-le dans .env.local :
NEXTAUTH_SECRET=le-résultat-de-la-commande-ci-dessus
```

---

## ✅ Vérification de la configuration

### Étape 1 : Vérifier le fichier .env.local

```bash
# Affichez votre fichier (sans montrer les clés complètes)
cat .env.local | grep -E "^[A-Z]" | head -10
```

Vous devriez voir au moins une de ces lignes remplie :
- `ANTHROPIC_API_KEY=sk-ant-...`
- `OPENROUTER_API_KEY=sk-or-v1-...`
- `OPENAI_API_KEY=sk-...`

### Étape 2 : Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

### Étape 3 : Tester l'API

```bash
# Testez une requête au chat :
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour, peux-tu m'\''aider ?"}'
```

✅ **Si ça fonctionne**, vous verrez une réponse intelligente de l'IA !

❌ **Si ça ne fonctionne pas**, vérifiez :
1. Les clés API sont correctement copiées (pas d'espaces)
2. Vous avez du crédit sur votre compte
3. Le serveur a été redémarré
4. Le fichier `.env.local` est bien à la racine du projet

---

## 💰 Estimation des coûts

### Pour 1000 utilisateurs par mois :

| Service | Coût estimé | Avantages |
|---------|-------------|-----------|
| **Claude** | $30-50/mois | Meilleure qualité, empathie |
| **OpenRouter** | $20-40/mois | Flexibilité, plusieurs modèles |
| **OpenAI** | $25-45/mois | Fiabilité, documentation |

**Conseil** : Commencez avec **OpenRouter** ($5-10) pour tester, puis passez à **Claude** pour la production.

---

## 🛡️ Sécurité - Bonnes pratiques

1. **Ne partagez JAMAIS vos clés API** sur GitHub ou ailleurs
2. **Ajoutez `.env.local` dans `.gitignore`** (déjà fait)
3. **Définissez des limites de dépenses** dans chaque service
4. **Surveillez votre utilisation** régulièrement
5. **Régénérez vos clés** tous les 3-6 mois

---

## 🆘 Besoin d'aide ?

### Problèmes courants :

**Erreur 401 - Clé invalide**
- Vérifiez que vous avez copié la clé complète
- Assurez-vous qu'il n'y a pas d'espaces avant/après
- Vérifiez que la clé n'a pas expiré

**Erreur 429 - Trop de requêtes**
- Vous avez atteint la limite de votre plan gratuit
- Ajoutez du crédit à votre compte
- Attendez quelques minutes avant de réessayer

**Erreur 503 - Service indisponible**
- Le service API est temporairement en panne
- Essayez une autre option (Claude, OpenRouter, OpenAI)
- Attendez quelques minutes

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Documentation officielle** :
   - Anthropic : https://docs.anthropic.com/
   - OpenRouter : https://openrouter.ai/docs
   - OpenAI : https://platform.openai.com/docs

2. **Support COEXIST.AI** :
   - Email : contact@coexist-ai.com
   - GitHub : https://github.com/coexist-ai

---

**Bonne chance ! 🌟**

Une fois votre clé API configurée, COEXIST.AI pourra vous offrir une expérience d'IA complète et empathique pour la résolution de conflits !

