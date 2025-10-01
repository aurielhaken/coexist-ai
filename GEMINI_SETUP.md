# 🆓 Configuration de l'API Gemini (GRATUITE)

Google Gemini offre une API **GRATUITE** avec 60 requêtes par minute - parfait pour COEXIST.AI !

## 📝 Étapes pour obtenir votre clé API Gemini

### 1. Créer un compte Google AI Studio

Rendez-vous sur : **https://ai.google.dev/gemini-api**

### 2. Obtenir votre clé API gratuite

1. Connectez-vous avec votre compte Google
2. Cliquez sur **"Get API Key"**
3. Créez un nouveau projet ou sélectionnez-en un existant
4. Copiez votre clé API (format : `AIza...`)

### 3. Configurer COEXIST.AI

Ouvrez le fichier `.env.local` et ajoutez votre clé :

```bash
GOOGLE_API_KEY=AIzaSy... # Votre clé API ici
```

### 4. Redémarrer le serveur

```bash
npm run dev
```

## ✨ Avantages de Gemini Pro

- ✅ **100% GRATUIT** (60 requêtes/minute)
- ✅ Performances excellentes
- ✅ Multilingue (français, anglais, etc.)
- ✅ Contexte long (32K tokens)
- ✅ Réponses naturelles et empathiques

## 🔄 Ordre de priorité des APIs

COEXIST.AI utilise maintenant cet ordre :

1. **Gemini Pro** (gratuit) - Priorité #1 ⭐🆓
2. **Claude 3.5 Sonnet** (si configuré)
3. **OpenRouter** (si configuré)
4. **OpenAI GPT-4o** (si configuré)

## 📊 Limites gratuites

- **60 requêtes par minute**
- **1,500 requêtes par jour**
- **1 million de tokens par mois**

Parfait pour un usage personnel ou des tests ! 🎉

## 🆘 Problèmes ?

Si vous rencontrez des erreurs :

1. Vérifiez que votre clé commence par `AIza`
2. Assurez-vous que l'API Gemini est activée dans votre projet Google Cloud
3. Vérifiez que vous n'avez pas dépassé les limites gratuites

## 🚀 Prêt à tester !

Une fois votre clé configurée, COEXIST.AI utilisera automatiquement Gemini Pro en priorité.

```bash
# Test rapide
curl http://localhost:3000/api/chat -X POST -H "Content-Type: application/json" -d '{"message": "Bonjour COEXIST.AI!"}'
```

---

**Note** : Gemini Pro est idéal pour COEXIST.AI car il excelle dans la compréhension contextuelle, l'empathie et les réponses nuancées - parfait pour la médiation et la résolution de conflits ! 🌟

