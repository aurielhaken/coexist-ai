# 🌟 COEXIST.AI - Guide Complet

## 🎯 Vue d'ensemble

COEXIST.AI est une plateforme complète d'intelligence artificielle dédiée à la promotion de la paix et de la coexistence. L'application est disponible sur **toutes les plateformes** : web, mobile et desktop.

## 🚀 Fonctionnalités Principales

### 🤖 **Assistant IA Avancé**
- **Prompts sophistiqués** avec détection contextuelle
- **Base de connaissances spirituelle** de toutes les traditions
- **Support multilingue** (français, anglais, espagnol, arabe, hébreu, chinois, hindi)
- **Système d'apprentissage** adaptatif et personnalisé
- **Cache intelligent** pour des réponses rapides

### 🧘‍♀️ **Méditations Guidées**
- **4 types de méditations** : Respiration, Amour-bienveillant, Unité, Gratitude
- **Timer intégré** avec barre de progression
- **Instructions étape par étape** pour chaque méditation
- **Durées adaptables** (5-30 minutes)

### 🎤 **Interface Vocale**
- **Reconnaissance vocale** en temps réel
- **Synthèse vocale** pour les réponses
- **Transcription automatique** des messages
- **Support multilingue** pour la voix

### 📊 **Tableau de Bord Intelligent**
- **Insights d'apprentissage** en temps réel
- **Statistiques de performance** détaillées
- **Patterns d'efficacité** identifiés automatiquement
- **Zones d'amélioration** suggérées

### 💝 **Système de Feedback**
- **Évaluation des réponses** (Utile/Correct/Pas utile)
- **Feedback détaillé** optionnel
- **Amélioration continue** basée sur les retours

## 🌐 Disponibilité Multi-Plateformes

### **Web (PWA)**
- ✅ **Progressive Web App** complète
- ✅ **Installation native** sur tous les appareils
- ✅ **Fonctionnement hors ligne** avec cache intelligent
- ✅ **Notifications push** pour les rappels
- ✅ **Interface responsive** pour tous les écrans

### **Mobile (PWA Optimisée)**
- ✅ **Interface mobile** optimisée
- ✅ **Installation** via "Ajouter à l'écran d'accueil"
- ✅ **Notifications** push natives
- ✅ **Performance** optimisée pour mobile

### **Desktop (Electron)**
- ✅ **Application native** pour Windows, macOS, Linux
- ✅ **Menu contextuel** et raccourcis clavier
- ✅ **Notifications** système
- ✅ **Mises à jour** automatiques

## 🛠️ Installation et Déploiement

### **Développement Local**

```bash
# Cloner le repository
git clone https://github.com/coexist-ai/coexist-ai.git
cd coexist-ai

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

### **Build pour Toutes les Plateformes**

```bash
# Exécuter le script de build complet
./build-all-platforms.sh

# Les builds seront créés dans dist-all-platforms/
# - web/     : Application web PWA
# - mobile/  : Application mobile PWA
# - desktop/ : Application desktop Electron
```

### **Déploiement Web**

```bash
# Configurer l'URL de déploiement
export DEPLOY_URL=https://votre-domaine.com

# Déployer
./deploy.sh
```

### **Déploiement Mobile**

1. **PWA** : Uploader le contenu de `dist-all-platforms/mobile/` sur votre serveur
2. **App Store** : Utiliser Capacitor ou Cordova pour créer des apps natives
3. **Google Play** : Même processus que App Store

### **Déploiement Desktop**

```bash
# Installer Electron Builder
npm install electron-builder --save-dev

# Construire pour toutes les plateformes
npm run electron-make

# Les installateurs seront dans dist-electron/
```

## 🔧 Configuration Avancée

### **Variables d'Environnement**

```env
# APIs IA
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key

# Base de données (optionnel)
DATABASE_URL=your_database_url

# Notifications
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Analytics (optionnel)
GOOGLE_ANALYTICS_ID=your_ga_id
```

### **Configuration PWA**

Le fichier `public/manifest.json` contient la configuration PWA :

```json
{
  "name": "COEXIST.AI - Assistant de Paix",
  "short_name": "COEXIST.AI",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#8b5cf6",
  "background_color": "#ffffff"
}
```

### **Configuration Electron**

Le fichier `electron/main.js` contient la configuration desktop :

```javascript
// Personnaliser l'icône, le menu, etc.
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  icon: path.join(__dirname, '../public/icon-512.png')
});
```

## 📱 Utilisation

### **Interface Web/Mobile**

1. **Accueil** : Page d'accueil avec logo et description
2. **Chat** : Interface de conversation avec l'IA
3. **Méditation** : Bouton pour accéder aux méditations guidées
4. **Voix** : Bouton pour activer l'interface vocale
5. **Tableau de Bord** : Insights et statistiques

### **Interface Desktop**

1. **Menu** : Menu contextuel avec options avancées
2. **Raccourcis** : Ctrl+Q (quitter), F11 (plein écran)
3. **Notifications** : Notifications système natives
4. **Mises à jour** : Vérification automatique des mises à jour

### **Fonctionnalités Avancées**

1. **Apprentissage** : L'IA apprend de vos interactions
2. **Personnalisation** : Adaptation à vos préférences
3. **Cache** : Réponses rapides grâce au cache intelligent
4. **Feedback** : Système d'évaluation des réponses

## 🔒 Sécurité et Confidentialité

### **Protection des Données**
- ✅ **Chiffrement** des communications
- ✅ **Pas de stockage** de données personnelles
- ✅ **Cache local** uniquement
- ✅ **HTTPS** obligatoire pour PWA

### **Conformité**
- ✅ **RGPD** compatible
- ✅ **Cookies** minimaux
- ✅ **Transparence** des données

## 📊 Performance et Optimisation

### **Métriques de Performance**
- ⚡ **Temps de réponse** : < 2 secondes
- 🧠 **Cache hit rate** : > 80%
- 📱 **Taille PWA** : < 5MB
- 🖥️ **Taille desktop** : < 100MB

### **Optimisations**
- ✅ **Lazy loading** des composants
- ✅ **Compression** des données
- ✅ **Cache intelligent** des réponses
- ✅ **Préchargement** des ressources

## 🌍 Internationalisation

### **Langues Supportées**
- 🇫🇷 **Français** (par défaut)
- 🇺🇸 **Anglais**
- 🇪🇸 **Espagnol**
- 🇸🇦 **Arabe**
- 🇮🇱 **Hébreu**
- 🇨🇳 **Chinois**
- 🇮🇳 **Hindi**

### **Ajout d'une Nouvelle Langue**

1. Ajouter les traductions dans `src/lib/multilingual.ts`
2. Mettre à jour les prompts dans `src/lib/prompts.ts`
3. Tester avec `?lang=xx` dans l'URL

## 🚀 Roadmap Future

### **Version 2.0**
- [ ] **Reconnaissance d'émotions** via webcam
- [ ] **Méditations en réalité virtuelle**
- [ ] **Intégration** avec calendriers
- [ ] **Mode hors ligne** complet

### **Version 3.0**
- [ ] **IA conversationnelle** avancée
- [ ] **Thérapie** assistée par IA
- [ ] **Communauté** d'utilisateurs
- [ ] **API** publique

## 🤝 Contribution

### **Comment Contribuer**
1. Fork le repository
2. Créer une branche feature
3. Faire vos modifications
4. Tester localement
5. Créer une Pull Request

### **Guidelines**
- Respecter la mission de paix
- Code propre et documenté
- Tests pour les nouvelles fonctionnalités
- Respect des standards de sécurité

## 📞 Support et Contact

### **Support Technique**
- 📧 **Email** : contact@coexist-ai.com
- 📚 **Documentation** : https://coexist-ai.com/docs
- 🐛 **Issues** : https://github.com/coexist-ai/coexist-ai/issues

### **Communauté**
- 💬 **Discord** : https://discord.gg/coexist-ai
- 🐦 **Twitter** : @coexist_ai
- 📱 **LinkedIn** : COEXIST.AI

## 📄 Licence

MIT License - Utilisez librement pour promouvoir la coexistence pacifique.

---

## 🎉 Conclusion

COEXIST.AI est maintenant une plateforme complète et sophistiquée disponible sur toutes les plateformes. Avec ses fonctionnalités avancées d'IA, de méditation, d'interface vocale et d'apprentissage intelligent, elle offre une expérience utilisateur exceptionnelle tout en restant fidèle à sa mission de promouvoir la paix dans le monde.

**Développé avec ❤️ pour un monde plus paisible** 🌍✨

---

*Pour plus d'informations, consultez la documentation complète dans le dossier `docs/` ou visitez https://coexist-ai.com*
