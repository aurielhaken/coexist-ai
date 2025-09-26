#!/usr/bin/env node

/**
 * Script pour générer les icônes PWA à partir du logo SVG
 * Usage: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Configuration des icônes à générer
const iconSizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 144, name: 'icon-144.png' },
  { size: 96, name: 'icon-96.png' },
  { size: 72, name: 'icon-72.png' },
  { size: 48, name: 'icon-48.png' }
];

console.log('🎨 Génération des icônes PWA pour COEXIST.AI...');

// Vérifier si le logo source existe
const logoPath = path.join(__dirname, 'public', 'coexist-logo-minimal.svg');
if (!fs.existsSync(logoPath)) {
  console.error('❌ Logo source non trouvé:', logoPath);
  process.exit(1);
}

console.log('✅ Logo source trouvé:', logoPath);

// Pour l'instant, créer des fichiers placeholder
// Dans un vrai projet, vous utiliseriez sharp, jimp ou un autre outil d'image
iconSizes.forEach(icon => {
  const iconPath = path.join(__dirname, 'public', icon.name);
  
  // Créer un SVG placeholder simple
  const svgContent = `
<svg width="${icon.size}" height="${icon.size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coexistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="25%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="75%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Cercle de coexistence -->
  <circle cx="50" cy="50" r="45" fill="url(#coexistGradient)" stroke="#ffffff" stroke-width="2"/>
  
  <!-- Sections colorées -->
  <path d="M 50 50 L 95 50 A 45 45 0 0 1 67.5 85.5 Z" fill="#3b82f6" opacity="0.8"/>
  <path d="M 50 50 L 67.5 85.5 A 45 45 0 0 1 32.5 85.5 Z" fill="#8b5cf6" opacity="0.8"/>
  <path d="M 50 50 L 32.5 85.5 A 45 45 0 0 1 14.5 67.5 Z" fill="#06b6d4" opacity="0.8"/>
  <path d="M 50 50 L 14.5 67.5 A 45 45 0 0 1 14.5 32.5 Z" fill="#10b981" opacity="0.8"/>
  <path d="M 50 50 L 14.5 32.5 A 45 45 0 0 1 32.5 14.5 Z" fill="#f59e0b" opacity="0.8"/>
  <path d="M 50 50 L 32.5 14.5 A 45 45 0 0 1 67.5 14.5 Z" fill="#ef4444" opacity="0.8"/>
  <path d="M 50 50 L 67.5 14.5 A 45 45 0 0 1 85.5 32.5 Z" fill="#ec4899" opacity="0.8"/>
  <path d="M 50 50 L 85.5 32.5 A 45 45 0 0 1 95 50 Z" fill="#6366f1" opacity="0.8"/>
  
  <!-- Cercle central -->
  <circle cx="50" cy="50" r="15" fill="#ffffff" opacity="0.9"/>
  
  <!-- Texte COEXIST -->
  <text x="50" y="55" font-family="Arial, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#1f2937">COEXIST</text>
</svg>`;

  fs.writeFileSync(iconPath.replace('.png', '.svg'), svgContent);
  console.log(`✅ Icône générée: ${icon.name.replace('.png', '.svg')}`);
});

// Créer un fichier de configuration pour les outils d'image
const configPath = path.join(__dirname, 'icon-config.json');
const config = {
  input: 'public/coexist-logo-minimal.svg',
  output: 'public/',
  sizes: iconSizes.map(icon => icon.size),
  formats: ['png', 'ico'],
  background: '#ffffff',
  padding: 10
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Configuration générée: icon-config.json');

console.log('\n🎉 Génération terminée !');
console.log('\n📝 Prochaines étapes :');
console.log('1. Installez un outil d\'image (sharp, jimp, imagemagick)');
console.log('2. Convertissez les SVG en PNG avec les tailles appropriées');
console.log('3. Ou utilisez un service en ligne comme https://realfavicongenerator.net/');
console.log('\n🌐 Pour l\'instant, les SVG fonctionnent parfaitement dans la PWA !');
