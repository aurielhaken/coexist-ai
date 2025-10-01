# 🚀 Démarrage Rapide - Configuration API

## 📝 Étape 1 : Choisir un service IA

**Je recommande OpenRouter** pour commencer (le plus simple) :

### Option A : OpenRouter (RECOMMANDÉ pour débuter) 🔥

**Avantages** :
- ✅ Accès à plusieurs modèles IA (Claude, GPT-4, Llama)
- ✅ Fallback automatique entre modèles
- ✅ $5 suffisent pour tester
- ✅ Configuration en 5 minutes

**Comment faire** :
1. Allez sur : **https://openrouter.ai/**
2. Cliquez sur "Sign In" avec GitHub ou Google
3. Allez dans "Keys" → "Create Key"
4. Copiez la clé (commence par `sk-or-v1-`)
5. Allez dans "Credits" → Ajoutez $5-$10

---

### Option B : Claude (MEILLEUR pour la production) ⭐

**Avantages** :
- ✅ Meilleure compréhension émotionnelle
- ✅ Plus empathique pour la médiation
- ✅ Réponses de haute qualité

**Comment faire** :
1. Allez sur : **https://console.anthropic.com/**
2. Créez un compte
3. Allez dans "API Keys" → "Create Key"
4. Copiez la clé (commence par `sk-ant-`)
5. Ajoutez du crédit dans "Billing"

---

### Option C : OpenAI (POPULAIRE) 🤖

**Avantages** :
- ✅ GPT-4o très performant
- ✅ Service stable
- ✅ Bonne documentation

**Comment faire** :
1. Allez sur : **https://platform.openai.com/**
2. Créez un compte
3. Allez dans "API Keys" → "Create new secret key"
4. Copiez la clé (commence par `sk-`)
5. Ajoutez une carte dans "Billing"

---

## 🔑 Étape 2 : Configurer votre clé

### Méthode 1 : Éditer directement le fichier

```bash
# Ouvrez le fichier .env.local avec votre éditeur préféré
code .env.local
# ou
nano .env.local
# ou
vim .env.local
```

Puis collez votre clé :
```bash
# Si vous avez choisi OpenRouter :
OPENROUTER_API_KEY=sk-or-v1-VOTRE-CLE-ICI

# Si vous avez choisi Claude :
ANTHROPIC_API_KEY=sk-ant-VOTRE-CLE-ICI

# Si vous avez choisi OpenAI :
OPENAI_API_KEY=sk-VOTRE-CLE-ICI
```

### Méthode 2 : Commande rapide

```bash
# Remplacez VOTRE-CLE-ICI par votre vraie clé
echo "OPENROUTER_API_KEY=sk-or-v1-VOTRE-CLE-ICI" >> .env.local
```

---

## ✅ Étape 3 : Tester

### 1. Redémarrer le serveur

```bash
# Arrêtez le serveur actuel (Ctrl+C dans le terminal)
# Puis relancez :
npm run dev
```

### 2. Tester dans le navigateur

1. Ouvrez : **http://localhost:3000/chat**
2. Envoyez un message : "Bonjour, comment puis-je résoudre un conflit ?"
3. Vous devriez recevoir une réponse intelligente de l'IA ! 🎉

### 3. Tester avec curl (optionnel)

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour !"}'
```

---

## 🎯 Résolution de problèmes

### ❌ Erreur "401 Incorrect API key"
- Vérifiez que vous avez copié la clé complète
- Pas d'espaces avant/après la clé
- La clé commence bien par `sk-` ou `sk-ant-` ou `sk-or-v1-`

### ❌ Erreur "All API services failed"
- Aucune clé n'est configurée
- Ou toutes les clés sont invalides
- Vérifiez le fichier `.env.local`

### ❌ Erreur "Insufficient credits"
- Vous n'avez pas de crédit sur votre compte
- Allez sur le site du service et ajoutez du crédit

### ❌ Le serveur ne voit pas les changements
- Redémarrez le serveur (Ctrl+C puis `npm run dev`)
- Les variables d'environnement sont chargées au démarrage

---

## 💡 Conseils Pro

1. **Commencez avec OpenRouter** ($5) pour tester
2. **Passez à Claude** quand vous êtes satisfait
3. **Définissez une limite de dépenses** sur chaque service
4. **Surveillez votre utilisation** dans le dashboard du service

---

## 📊 Estimation des coûts pour tester

| Service | Crédit initial | Nombre de conversations |
|---------|----------------|------------------------|
| OpenRouter | $5 | ~500-1000 messages |
| Claude | $5 | ~500-800 messages |
| OpenAI | $5 | ~400-700 messages |

---

## ✨ C'est tout !

Une fois configuré, votre application COEXIST.AI sera pleinement fonctionnelle avec l'IA activée ! 🚀

Besoin d'aide ? Consultez le **GUIDE_API_KEYS.md** pour plus de détails.

