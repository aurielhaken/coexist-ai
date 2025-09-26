# 🌐 Configuration DNS pour coexist-ai.com

## 📋 **Records DNS Exactes**

### **Records à Ajouter :**

```
Type: A
Name: @ (ou laissez vide)
Value: 76.76.19.61
TTL: 3600 (ou auto)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (ou auto)
```

## 🔧 **Instructions par Registraire**

### **Namecheap :**
1. Connectez-vous à votre compte Namecheap
2. Allez dans **Domain List**
3. Cliquez sur **Manage** à côté de `coexist-ai.com`
4. Allez dans l'onglet **Advanced DNS**
5. Supprimez les records existants (si nécessaire)
6. Cliquez **Add New Record** :
   - **Type** : A Record
   - **Host** : @
   - **Value** : 76.76.19.61
   - **TTL** : Automatic
7. Cliquez **Add New Record** :
   - **Type** : CNAME Record
   - **Host** : www
   - **Value** : cname.vercel-dns.com
   - **TTL** : Automatic
8. Cliquez **Save All Changes**

### **Cloudflare :**
1. Ajoutez `coexist-ai.com` à Cloudflare
2. Allez dans **DNS** → **Records**
3. Supprimez les records existants (si nécessaire)
4. Cliquez **Add record** :
   - **Type** : A
   - **Name** : @
   - **IPv4 address** : 76.76.19.61
   - **Proxy status** : DNS only (gris)
5. Cliquez **Add record** :
   - **Type** : CNAME
   - **Name** : www
   - **Target** : cname.vercel-dns.com
   - **Proxy status** : DNS only (gris)

### **GoDaddy :**
1. Connectez-vous à votre compte GoDaddy
2. Allez dans **My Products**
3. Cliquez sur **DNS** à côté de `coexist-ai.com`
4. Supprimez les records existants (si nécessaire)
5. Cliquez **Add** :
   - **Type** : A
   - **Name** : @
   - **Data** : 76.76.19.61
   - **TTL** : 1 Hour
6. Cliquez **Add** :
   - **Type** : CNAME
   - **Name** : www
   - **Data** : cname.vercel-dns.com
   - **TTL** : 1 Hour

## ⏰ **Temps de Propagation**

- **DNS** : 5-60 minutes
- **SSL/HTTPS** : 5-10 minutes
- **Cache global** : jusqu'à 24h

## ✅ **Vérification**

### **Script de Vérification :**
```bash
./verify-domain.sh coexist-ai.com
```

### **Vérification Manuelle :**
1. **DNS Propagation** : https://www.whatsmydns.net/#A/coexist-ai.com
2. **Test HTTPS** : https://coexist-ai.com
3. **Test www** : https://www.coexist-ai.com

## 🚀 **Déploiement Final**

Une fois les DNS configurés :

```bash
# 1. Ajouter le domaine dans Vercel
npx vercel domains add coexist-ai.com

# 2. Attendre la propagation (10-30 minutes)

# 3. Vérifier
./verify-domain.sh coexist-ai.com

# 4. Déployer
npm run build
npx vercel --prod
```

## 🎯 **Résultat Final**

Votre site sera accessible à :
- **https://coexist-ai.com** (domaine principal)
- **https://www.coexist-ai.com** (redirection vers le principal)

## 🆘 **En cas de Problème**

1. **Vérifiez la propagation DNS** : https://www.whatsmydns.net/
2. **Consultez les logs Vercel** : `npx vercel logs`
3. **Vérifiez les DNS** : https://dnschecker.org/
4. **Contactez le support** de votre registraire

---

**Une fois configuré, coexist-ai.com sera votre site officiel !** 🎉

