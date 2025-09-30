# 🚀 Configuration Vercel pour COEXIST.AI

## ⚡ Configuration Rapide

Pour activer l'API GPT sur coexist-ai.com, configurez ces variables d'environnement sur Vercel :

### 🔑 Variables d'Environnement Requises

```bash
# Clé API OpenAI (obligatoire)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Mode démo désactivé (obligatoire)
NEXT_PUBLIC_DEMO_MODE=false

# URL de l'application
NEXT_PUBLIC_APP_URL=https://coexist-ai.com
```

### 📋 Étapes de Configuration

#### **Méthode 1 : Dashboard Vercel (Recommandée)**

1. Allez sur https://vercel.com/spot-me1/coexist-ai/settings/environment-variables
2. Cliquez sur "Add New"
3. Ajoutez chaque variable :
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-your-actual-openai-key`
   - **Environments:** Production, Preview, Development
4. Répétez pour `NEXT_PUBLIC_DEMO_MODE` avec la valeur `false`

#### **Méthode 2 : CLI Vercel**

```bash
# Ajouter la clé API OpenAI
npx vercel env add OPENAI_API_KEY

# Désactiver le mode démo
npx vercel env add NEXT_PUBLIC_DEMO_MODE

# Redéployer
npx vercel --prod
```

### 🎯 Résultat Attendu

Une fois configuré :
- ✅ **Interface ChatGPT-like** - Design moderne et paisible
- ✅ **Réponses intelligentes** - Vraie IA avec GPT-4o
- ✅ **Plus de mode démo** - Fonctionnement complet
- ✅ **Expérience premium** - Interface classe et fluide

### 🔧 Test de Fonctionnement

Pour vérifier que tout fonctionne :

1. Allez sur https://coexist-ai.com
2. Posez une question comme "Comment résoudre un conflit ?"
3. L'IA devrait donner une réponse personnalisée et intelligente
4. Plus de message générique "C'est une question intéressante..."

---

**Une fois configuré, votre COEXIST.AI sera un véritable assistant IA de classe mondiale ! 🌟**
