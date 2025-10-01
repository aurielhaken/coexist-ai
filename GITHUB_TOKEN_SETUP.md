# 🔐 Configuration du Token GitHub

## Option la plus simple : Personal Access Token

### Étape 1 : Créer un token GitHub (2 minutes)

1. **Allez sur :** https://github.com/settings/tokens/new
2. **Remplissez :**
   - Note : `COEXIST.AI - Deployment`
   - Expiration : `No expiration` (ou 90 days si vous préférez)
   - **Cochez les permissions suivantes :**
     - ✅ `repo` (tout cocher dans cette section)
     - ✅ `workflow`
3. **Cliquez sur** "Generate token" en bas
4. **Copiez le token** (commence par `ghp_...`)
   - ⚠️ **IMPORTANT** : Vous ne pourrez plus le revoir !
   - Sauvegardez-le temporairement quelque part

---

### Étape 2 : Donnez-moi le token

Une fois que vous avez le token, **donnez-le moi** et je le configurerai !

Le token ressemble à :
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Alternative : Configuration manuelle

Si vous préférez le faire vous-même :

```bash
# 1. Configurer Git avec le token
git remote set-url origin https://VOTRE-TOKEN@github.com/aurielhaken/coexist-ai.git

# 2. Pousser le code
git push -u origin main
```

Remplacez `VOTRE-TOKEN` par votre token GitHub.

---

**Prêt ? Créez le token et donnez-le moi !** 🚀

**Lien direct :** https://github.com/settings/tokens/new

