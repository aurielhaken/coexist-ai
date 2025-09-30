# 🔧 Configuration de l'API GPT pour COEXIST.AI

## 🚨 **Problème Identifié**

Votre application est actuellement en **Mode Démo** et n'utilise pas votre vraie clé API GPT. C'est pourquoi l'IA donne toujours la même réponse générique.

## ✅ **Solution : Configuration de l'API**

### **Étape 1 : Créer le fichier .env.local**

Créez un fichier `.env.local` dans le dossier `coexist-ai` avec ce contenu :

```bash
# Variables d'environnement pour COEXIST.AI

# Remplacez par votre vraie clé API OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Mode démo désactivé pour utiliser les vraies réponses GPT
NEXT_PUBLIC_DEMO_MODE=false

# URL de l'application
NEXT_PUBLIC_APP_URL=https://coexist-ai.com
```

### **Étape 2 : Obtenir votre clé API OpenAI**

1. Allez sur https://platform.openai.com/api-keys
2. Connectez-vous à votre compte OpenAI
3. Cliquez sur "Create new secret key"
4. Copiez la clé (elle commence par `sk-`)
5. Remplacez `sk-your-openai-api-key-here` dans le fichier `.env.local`

### **Étape 3 : Redémarrer l'application**

```bash
cd /Users/aurielhaken/Documents/COEXIST.AI/coexist-ai
npm run dev
```

### **Étape 4 : Configurer Vercel pour la production**

Pour que l'API fonctionne aussi sur coexist-ai.com, configurez les variables d'environnement sur Vercel :

```bash
# Via CLI Vercel
npx vercel env add OPENAI_API_KEY
npx vercel env add NEXT_PUBLIC_DEMO_MODE production false

# Ou via le dashboard Vercel
# Allez sur https://vercel.com/spot-me1/coexist-ai/settings/environment-variables
```

## 🎯 **Résultat Attendu**

Une fois configuré correctement :

- ✅ **L'IA donnera des réponses personnalisées** selon vos questions
- ✅ **Plus de réponses génériques** répétitives
- ✅ **Intelligence artificielle réelle** avec GPT-4o
- ✅ **Fonctionnement local ET sur coexist-ai.com**

## 🔍 **Vérification**

Pour vérifier que l'API fonctionne :

1. **Testez une question spécifique** comme "J'ai peur de la guerre"
2. **L'IA devrait donner une réponse unique** et personnalisée
3. **Plus de message générique** "C'est une question intéressante..."

## 🆘 **En cas de problème**

### **Si l'IA donne encore des réponses génériques :**

1. Vérifiez que votre clé API est correcte
2. Vérifiez que `NEXT_PUBLIC_DEMO_MODE=false`
3. Redémarrez l'application
4. Vérifiez les logs dans la console du navigateur

### **Si l'API ne répond pas :**

1. Vérifiez votre crédit OpenAI
2. Vérifiez que la clé API est valide
3. Testez avec une autre question

## 💡 **Astuce**

Pour tester rapidement, utilisez cette commande :

```bash
curl -X POST https://coexist-ai.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour, comment allez-vous ?"}'
```

---

**Une fois configuré, votre COEXIST.AI sera pleinement fonctionnel avec de vraies réponses intelligentes ! 🚀**
