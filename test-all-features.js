#!/usr/bin/env node

/**
 * COEXIST.AI - Script de test complet
 * Teste toutes les fonctionnalités de l'application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Couleurs pour les messages
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(50)}`, 'cyan');
  log(title, 'cyan');
  log('='.repeat(50), 'cyan');
}

function logTest(testName, success) {
  const status = success ? '✅' : '❌';
  const color = success ? 'green' : 'red';
  log(`${status} ${testName}`, color);
}

// Tests à effectuer
const tests = [
  {
    name: 'Vérification des fichiers essentiels',
    test: () => {
      const essentialFiles = [
        'package.json',
        'next.config.ts',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'public/manifest.json',
        'public/sw.js',
        'electron/main.js',
        'electron/preload.js'
      ];
      
      let allExist = true;
      essentialFiles.forEach(file => {
        if (!fs.existsSync(file)) {
          logTest(`Fichier manquant: ${file}`, false);
          allExist = false;
        } else {
          logTest(`Fichier présent: ${file}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Vérification des composants React',
    test: () => {
      const components = [
        'src/components/ChatInterface.tsx',
        'src/components/MeditationGuide.tsx',
        'src/components/VoiceInterface.tsx',
        'src/components/FeedbackSystem.tsx',
        'src/components/LearningInsights.tsx',
        'src/components/Dashboard.tsx',
        'src/components/InstallPrompt.tsx',
        'src/components/NotificationManager.tsx'
      ];
      
      let allExist = true;
      components.forEach(component => {
        if (!fs.existsSync(component)) {
          logTest(`Composant manquant: ${component}`, false);
          allExist = false;
        } else {
          logTest(`Composant présent: ${component}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Vérification des APIs',
    test: () => {
      const apis = [
        'src/app/api/chat/route.ts',
        'src/app/api/notifications/subscribe/route.ts',
        'src/app/api/notifications/unsubscribe/route.ts'
      ];
      
      let allExist = true;
      apis.forEach(api => {
        if (!fs.existsSync(api)) {
          logTest(`API manquante: ${api}`, false);
          allExist = false;
        } else {
          logTest(`API présente: ${api}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Vérification des libs',
    test: () => {
      const libs = [
        'src/lib/prompts.ts',
        'src/lib/spiritual-wisdom.ts',
        'src/lib/learning-system.ts',
        'src/lib/ai-services.ts',
        'src/lib/performance.ts'
      ];
      
      let allExist = true;
      libs.forEach(lib => {
        if (!fs.existsSync(lib)) {
          logTest(`Lib manquante: ${lib}`, false);
          allExist = false;
        } else {
          logTest(`Lib présente: ${lib}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Vérification du PWA',
    test: () => {
      const pwaFiles = [
        'public/manifest.json',
        'public/sw.js',
        'public/icon-192.svg',
        'public/icon-512.svg'
      ];
      
      let allExist = true;
      pwaFiles.forEach(file => {
        if (!fs.existsSync(file)) {
          logTest(`PWA file manquant: ${file}`, false);
          allExist = false;
        } else {
          logTest(`PWA file présent: ${file}`, true);
        }
      });
      
      // Vérifier le contenu du manifest
      try {
        const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
        let manifestValid = true;
        
        requiredFields.forEach(field => {
          if (!manifest[field]) {
            logTest(`Manifest field manquant: ${field}`, false);
            manifestValid = false;
          } else {
            logTest(`Manifest field présent: ${field}`, true);
          }
        });
        
        return allExist && manifestValid;
      } catch (error) {
        logTest('Manifest JSON invalide', false);
        return false;
      }
    }
  },
  
  {
    name: 'Vérification d\'Electron',
    test: () => {
      const electronFiles = [
        'electron/main.js',
        'electron/preload.js',
        'package-electron.json'
      ];
      
      let allExist = true;
      electronFiles.forEach(file => {
        if (!fs.existsSync(file)) {
          logTest(`Electron file manquant: ${file}`, false);
          allExist = false;
        } else {
          logTest(`Electron file présent: ${file}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Vérification des scripts de build',
    test: () => {
      const scripts = [
        'build-all-platforms.sh',
        'deploy.sh'
      ];
      
      let allExist = true;
      scripts.forEach(script => {
        if (!fs.existsSync(script)) {
          logTest(`Script manquant: ${script}`, false);
          allExist = false;
        } else {
          logTest(`Script présent: ${script}`, true);
        }
      });
      
      return allExist;
    }
  },
  
  {
    name: 'Test de compilation TypeScript',
    test: () => {
      try {
        log('Compilation TypeScript en cours...', 'yellow');
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        logTest('Compilation TypeScript réussie', true);
        return true;
      } catch (error) {
        logTest('Erreurs de compilation TypeScript', false);
        log(error.stdout?.toString() || error.message, 'red');
        return false;
      }
    }
  },
  
  {
    name: 'Test de linting',
    test: () => {
      try {
        log('Linting en cours...', 'yellow');
        execSync('npm run lint', { stdio: 'pipe' });
        logTest('Linting réussi', true);
        return true;
      } catch (error) {
        logTest('Erreurs de linting', false);
        log(error.stdout?.toString() || error.message, 'red');
        return false;
      }
    }
  },
  
  {
    name: 'Test de build Next.js',
    test: () => {
      try {
        log('Build Next.js en cours...', 'yellow');
        execSync('npm run build', { stdio: 'pipe' });
        logTest('Build Next.js réussi', true);
        return true;
      } catch (error) {
        logTest('Erreur de build Next.js', false);
        log(error.stdout?.toString() || error.message, 'red');
        return false;
      }
    }
  }
];

// Fonction principale
async function runTests() {
  log('🌟 COEXIST.AI - Test Complet de Toutes les Fonctionnalités', 'magenta');
  log('='.repeat(60), 'magenta');
  
  let totalTests = 0;
  let passedTests = 0;
  
  for (const test of tests) {
    logSection(test.name);
    totalTests++;
    
    try {
      const result = await test.test();
      if (result) {
        passedTests++;
      }
    } catch (error) {
      logTest(`Erreur lors du test: ${error.message}`, false);
    }
  }
  
  // Résumé final
  logSection('Résumé des Tests');
  log(`Tests exécutés: ${totalTests}`, 'white');
  log(`Tests réussis: ${passedTests}`, 'green');
  log(`Tests échoués: ${totalTests - passedTests}`, 'red');
  log(`Taux de réussite: ${Math.round((passedTests / totalTests) * 100)}%`, 'cyan');
  
  if (passedTests === totalTests) {
    log('\n🎉 Tous les tests sont passés ! COEXIST.AI est prêt !', 'green');
  } else {
    log('\n⚠️  Certains tests ont échoué. Vérifiez les erreurs ci-dessus.', 'yellow');
  }
  
  // Recommandations
  logSection('Recommandations');
  log('1. Tester l\'application en mode développement: npm run dev', 'white');
  log('2. Tester l\'installation PWA sur mobile', 'white');
  log('3. Tester l\'application desktop avec Electron', 'white');
  log('4. Vérifier les fonctionnalités vocales', 'white');
  log('5. Tester les méditations guidées', 'white');
  log('6. Vérifier le système de feedback', 'white');
  
  log('\n🌟 COEXIST.AI - Test terminé !', 'magenta');
}

// Exécuter les tests
runTests().catch(console.error);
