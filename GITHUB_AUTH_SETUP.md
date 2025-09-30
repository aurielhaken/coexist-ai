# 🔐 Configuration GitHub Authentication pour COEXIST.AI

## 🚀 Variables d'Environnement Vercel

Pour activer l'authentification GitHub sur coexist-ai.com, configurez ces variables sur Vercel :

### 📋 Variables Obligatoires

```bash
# GitHub OAuth App
GITHUB_CLIENT_ID=Iv1.abc1234567890
GITHUB_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=https://coexist-ai.com
NEXTAUTH_SECRET=your_nextauth_secret_here

# OpenAI API (pour les réponses IA)
OPENAI_API_KEY=sk-your-openai-key
NEXT_PUBLIC_DEMO_MODE=false
```

### 🔧 Configuration GitHub OAuth App

1. **Allez sur GitHub Settings** : https://github.com/settings/applications/new
2. **Configurez votre app** :
   - **Application name** : `COEXIST.AI`
   - **Homepage URL** : `https://coexist-ai.com`
   - **Authorization callback URL** : `https://coexist-ai.com/api/auth/callback/github`
3. **Générez les credentials** et copiez-les dans Vercel

### 📝 Configuration Vercel

#### **Méthode 1 : Dashboard Vercel (Recommandée)**

1. Allez sur https://vercel.com/spot-me1/coexist-ai/settings/environment-variables
2. Ajoutez chaque variable :

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `GITHUB_CLIENT_ID` | `Iv1.abc1234567890` | Production, Preview, Development |
| `GITHUB_CLIENT_SECRET` | `your_client_secret_here` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://coexist-ai.com` | Production |
| `NEXTAUTH_SECRET` | `your_nextauth_secret_here` | Production, Preview, Development |
| `OPENAI_API_KEY` | `sk-your-openai-key` | Production, Preview, Development |
| `NEXT_PUBLIC_DEMO_MODE` | `false` | Production, Preview, Development |

#### **Méthode 2 : CLI Vercel**

```bash
# Ajouter les variables GitHub
npx vercel env add GITHUB_CLIENT_ID
npx vercel env add GITHUB_CLIENT_SECRET
npx vercel env add NEXTAUTH_URL
npx vercel env add NEXTAUTH_SECRET

# Redéployer
npx vercel --prod
```

### 🎯 Fonctionnalités Activées

Une fois configuré, les utilisateurs pourront :

- ✅ **Se connecter avec GitHub** - Authentification OAuth sécurisée
- ✅ **Profil utilisateur** - Avatar et nom GitHub dans l'interface
- ✅ **Sessions persistantes** - Reste connecté entre les visites
- ✅ **Conversations liées** - Historique lié au compte GitHub
- ✅ **Déconnexion sécurisée** - Bouton de déconnexion dans le header

### 🔍 Test de Fonctionnement

1. **Allez sur** https://coexist-ai.com
2. **Cliquez sur "Se connecter"** dans le header
3. **Autorisez GitHub** sur la page OAuth
4. **Vous devriez être connecté** avec votre profil GitHub visible

### 🛠️ URLs de Callback

- **Production** : `https://coexist-ai.com/api/auth/callback/github`
- **Développement** : `http://localhost:3000/api/auth/callback/github`

### 🔒 Sécurité

- **NEXTAUTH_SECRET** : Générez une chaîne aléatoire de 32+ caractères
- **GITHUB_CLIENT_SECRET** : Gardez cette valeur secrète
- **HTTPS obligatoire** : GitHub OAuth nécessite HTTPS en production

### 🎨 Interface Utilisateur

- **Header mis à jour** : Bouton de connexion/déconnexion
- **Profil utilisateur** : Avatar GitHub et nom d'utilisateur
- **Menu utilisateur** : Déconnexion et informations du profil
- **Pages d'authentification** : Design cohérent avec l'app

---

## 🎉 Résultat Final

**Votre COEXIST.AI aura :**
- ✅ **Authentification GitHub** complète et sécurisée
- ✅ **Interface utilisateur** avec profil GitHub
- ✅ **Sessions persistantes** pour une meilleure UX
- ✅ **Prêt pour les fonctionnalités premium** basées sur l'utilisateur

**Il ne reste plus qu'à configurer les variables sur Vercel ! 🚀**
