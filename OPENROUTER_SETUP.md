# Configuration OpenRouter pour COEXIST.AI

## 🚀 OpenRouter - Modèles Open-Source Puissants

OpenRouter permet d'utiliser des modèles open-source avancés comme **Llama 3.1 70B** à moindre coût, tout en gardant OpenAI comme fallback.

## 📋 Configuration

### 1. Obtenir une clé OpenRouter

1. Allez sur [openrouter.ai](https://openrouter.ai)
2. Créez un compte
3. Générez une clé API (`sk-or-v1-...`)
4. Ajoutez des crédits (très économique)

### 2. Configurer les variables d'environnement

#### Local (.env.local)
```bash
# OpenRouter (recommandé - modèles open-source)
OPENROUTER_API_KEY=sk-or-v1-your_key_here

# OpenAI (optionnel - fallback)
OPENAI_API_KEY=sk-your_openai_key_here
```

#### Vercel (Production)
```bash
vercel env add OPENROUTER_API_KEY
# Puis coller votre clé OpenRouter

vercel env add OPENAI_API_KEY  
# Puis coller votre clé OpenAI (optionnel)
```

## 🤖 Modèles Disponibles

### Modèle Principal (OpenRouter)
- **Llama 3.1 70B Instruct** : Modèle open-source très puissant
- **Coût** : ~$0.59/1M tokens (vs $5/1M pour GPT-4)
- **Qualité** : Excellente pour la médiation et la résolution de conflits

### Fallback (OpenAI)
- **GPT-4o-mini** : Modèle OpenAI économique
- **Coût** : $0.15/1M tokens
- **Qualité** : Très bonne, utilisé en fallback

## 🔄 Architecture de Fallback

```
1. Essai OpenRouter (Llama 3.1 70B) → Si succès ✅
2. Fallback OpenAI (GPT-4o-mini) → Si échec ❌
3. Mode enrichi intégré → Si tout échoue 🔄
```

## 💰 Coûts Estimés

### Avec OpenRouter
- **1000 conversations/mois** : ~$2-5
- **10,000 conversations/mois** : ~$20-50
- **Économie** : 80-90% vs OpenAI pur

### Sans API (Mode Fallback)
- **Coût** : $0 (utilise l'IA enrichie intégrée)
- **Qualité** : Bonne pour la plupart des cas

## 🎯 Avantages OpenRouter

✅ **Modèles open-source** (pas de dépendance à OpenAI)
✅ **Coût réduit** (80-90% d'économie)
✅ **Qualité excellente** (Llama 3.1 70B)
✅ **Fallback robuste** (OpenAI + mode intégré)
✅ **Transparence** (modèles ouverts)

## 🔧 Test de Configuration

```bash
# Test local
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour, comment allez-vous ?"}'

# Test production
curl -X POST https://coexist-ai.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour, comment allez-vous ?"}'
```

## 📊 Monitoring

L'API retourne le mode utilisé :
- `openrouter-llama` : OpenRouter avec Llama 3.1 70B
- `openai` : OpenAI GPT-4o-mini
- `enriched-fallback` : IA enrichie intégrée

## 🚨 Dépannage

### Erreur "No model response"
- Vérifiez vos clés API
- Vérifiez vos crédits OpenRouter
- Le mode fallback s'activera automatiquement

### Réponses génériques
- L'IA enrichie intégrée est active
- Configurez OpenRouter pour de meilleures réponses

### Coûts élevés
- Utilisez OpenRouter au lieu d'OpenAI
- Le mode fallback est gratuit
