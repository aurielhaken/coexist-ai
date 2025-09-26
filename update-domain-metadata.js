#!/usr/bin/env node

// Script pour mettre à jour les métadonnées avec votre domaine personnalisé
// Usage: node update-domain-metadata.js votre-domaine.com

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
    console.log('Usage: node update-domain-metadata.js votre-domaine.com');
    console.log('Exemple: node update-domain-metadata.js coexist-ai.com');
    process.exit(1);
}

const domain = process.argv[2];
const layoutPath = path.join(__dirname, 'src/app/layout.tsx');

console.log(`🔄 Mise à jour des métadonnées pour: ${domain}`);

// Lire le fichier layout.tsx
let content = fs.readFileSync(layoutPath, 'utf8');

// Remplacer l'URL dans les métadonnées OpenGraph
content = content.replace(
    /url: 'https:\/\/coexist-ai\.vercel\.app'/g,
    `url: 'https://${domain}'`
);

// Remplacer l'URL dans les métadonnées Twitter
content = content.replace(
    /url: 'https:\/\/coexist-ai\.vercel\.app'/g,
    `url: 'https://${domain}'`
);

// Sauvegarder le fichier
fs.writeFileSync(layoutPath, content);

console.log('✅ Métadonnées mises à jour !');
console.log(`🌐 OpenGraph URL: https://${domain}`);
console.log(`🐦 Twitter URL: https://${domain}`);
console.log('');
console.log('📝 Prochaines étapes:');
console.log('1. npm run build');
console.log('2. npx vercel --prod');

