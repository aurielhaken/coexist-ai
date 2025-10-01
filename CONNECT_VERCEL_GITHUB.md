# 🔗 Connecter Vercel à GitHub

## ✅ Ce qui est fait :
- ✅ Code poussé sur GitHub
- ✅ Dépôt : https://github.com/aurielhaken/coexist-ai
- ✅ Site déployé sur Vercel : https://coexist-ai.com

## 🎯 Prochaine étape : Connexion automatique

### Option 1 : Via le Dashboard Vercel (Recommandé - 2 minutes)

1. **Allez sur :** https://vercel.com/dashboard
2. **Trouvez votre projet** `coexist-ai`
3. **Cliquez sur** Settings → Git
4. **Cliquez sur** "Connect Git Repository"
5. **Sélectionnez** GitHub
6. **Choisissez** le repo `aurielhaken/coexist-ai`
7. **Cliquez sur** Connect

**C'est tout !** 🎉

---

### Option 2 : Via Vercel CLI (Alternative)

```bash
# Connecter le projet au repo GitHub
vercel link
```

Suivez les instructions interactives.

---

## ✨ Résultat

Une fois connecté, **chaque fois que vous faites** :

```bash
git add .
git commit -m "Mes modifications"
git push
```

➡️ **Vercel déploiera automatiquement** sur https://coexist-ai.com ! 🚀

---

## 🧪 Test du déploiement automatique

Pour tester, faisons une petite modification :

```bash
# Modifier le README
echo "# COEXIST.AI - Version GitHub intégrée" >> README.md

# Commit et push
git add README.md
git commit -m "test: vérification du déploiement automatique"
git push

# Attendre 1-2 minutes et vérifier sur https://coexist-ai.com
```

---

**Prêt à connecter Vercel à GitHub ?** 🔗

