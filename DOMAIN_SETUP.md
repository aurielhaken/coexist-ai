# 🌐 Configuration du Nom de Domaine COEXIST.AI

## 📋 **Étapes de Configuration**

### **1. Achat du Nom de Domaine**
- Achetez votre domaine sur : **Namecheap**, **GoDaddy**, ou **Cloudflare**
- Exemple : `coexist-ai.com` ou `coexist-ai.fr`

### **2. Configuration DNS dans Vercel**

#### **Méthode A : Via Dashboard Vercel (Recommandée)**
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `coexist-ai`
3. Allez dans **Settings** → **Domains**
4. Cliquez **Add Domain**
5. Entrez votre domaine : `coexist-ai.com`
6. Vercel vous donnera des **records DNS** à configurer

#### **Méthode B : Via CLI**
```bash
npx vercel domains add coexist-ai.com
```

### **3. Configuration DNS chez votre Registraire**

#### **Records DNS à Ajouter :**
```
Type    Name                    Value
-----   ----                    -----
A       @                      76.76.19.61
CNAME   www                     cname.vercel-dns.com
```

#### **Pour Namecheap :**
1. Connectez-vous à votre compte
2. Allez dans **Domain List** → **Manage**
3. Allez dans **Advanced DNS**
4. Ajoutez les records ci-dessus

#### **Pour GoDaddy :**
1. Connectez-vous à votre compte
2. Allez dans **My Products** → **DNS**
3. Ajoutez les records DNS

### **4. Vérification SSL**
- Vercel configure automatiquement le SSL/HTTPS
- Attendez 5-10 minutes pour la propagation DNS
- Testez : `https://coexist-ai.com`

### **5. Configuration Avancée (Optionnelle)**

#### **Redirection www vers domaine principal :**
```bash
npx vercel domains redirect www.coexist-ai.com coexist-ai.com
```

#### **Configuration des sous-domaines :**
```bash
# Pour une version API
npx vercel domains add api.coexist-ai.com

# Pour une version staging
npx vercel domains add staging.coexist-ai.com
```

## 🔧 **Configuration Post-Déploiement**

### **Variables d'Environnement (Optionnel)**
Dans Vercel Dashboard → Settings → Environment Variables :
```
OPENAI_API_KEY = votre_clé_openai_ici
NEXT_PUBLIC_DEMO_MODE = true
```

### **Mise à Jour des Métadonnées**
Une fois le domaine configuré, mettez à jour `src/app/layout.tsx` :
```typescript
openGraph: {
  url: 'https://coexist-ai.com', // Votre domaine final
  // ... reste de la config
}
```

## 🚀 **Commandes de Déploiement Rapide**

### **Déploiement Initial :**
```bash
cd /Users/aurielhaken/Documents/COEXIST.AI/coexist-ai
npx vercel
```

### **Déploiements Futurs :**
```bash
# Déploiement automatique à chaque push Git
git add .
git commit -m "Update COEXIST.AI"
git push origin main

# Ou déploiement manuel
npx vercel --prod
```

### **Vérification du Déploiement :**
```bash
# Voir les déploiements
npx vercel ls

# Voir les logs
npx vercel logs
```

## 📊 **Monitoring Post-Lancement**

### **Analytics (Recommandé)**
1. Activez **Vercel Analytics** dans le dashboard
2. Ajoutez **Google Analytics** si souhaité

### **Métriques à Surveiller :**
- Temps de chargement
- Taux d'erreur
- Utilisation de l'API
- Feedback utilisateurs

## 🔒 **Sécurité**

### **Headers de Sécurité (Déjà Configurés)**
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin

### **SSL/HTTPS**
- ✅ Automatiquement configuré par Vercel
- ✅ Renouvellement automatique

## 🎯 **Checklist Finale**

- [ ] Domaine acheté
- [ ] Projet déployé sur Vercel
- [ ] DNS configuré
- [ ] HTTPS fonctionnel
- [ ] Site accessible via votre domaine
- [ ] Métadonnées mises à jour
- [ ] Analytics configuré (optionnel)

## 🆘 **Support**

### **En cas de problème :**
1. Vérifiez la propagation DNS : [whatsmydns.net](https://www.whatsmydns.net/)
2. Consultez les logs Vercel : `npx vercel logs`
3. Vérifiez les DNS : [dnschecker.org](https://dnschecker.org/)

### **Temps de Propagation :**
- DNS : 5-60 minutes
- SSL : 5-10 minutes
- Cache : 24-48h (peut être vidé manuellement)

---

**Votre site sera accessible à : `https://coexist-ai.com`** 🎉

