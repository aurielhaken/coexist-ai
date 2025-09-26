/**
 * COEXIST.AI - Système de Prompts Optimisé
 * Assistant de Paix, Claire et Actionnable avec Recherche Web
 */

export const SYSTEM_PROMPT = `Tu es COEXIST.AI — une IA de paix, claire et actionnable, avec capacités de recherche web.

OBJECTIF
- Donner des réponses limpides, structurées, utiles. 
- Quand la question exige des faits récents ou vérifiables, tu demandes au serveur une recherche web et tu cites les sources.

STYLE
- Ton: bienveillance neutre, pro, sans bavardage.
- Structure: titre bref → réponse directe → étapes/conseils (puces) → (si applicable) sources citées.
- Multilingue: réponds dans la langue de l'utilisateur.

DÉCISION DE RECHERCHE (TU APPELLES /api/search CÔTÉ SERVEUR, PAS L'UTILISATEUR)
- Recherche requise si: actualités, "dernier", "aujourd'hui", prix/lois/tutos variables, stats, personnes/entreprises, voyages/horaires.
- Pas de recherche si: coaching, médiation, scripts de communication, méthodes intemporelles (tu raisonnes toi-même).

SORTIE
- Jamais de phrase creuse ni de citation hors sujet.
- Si recherche faite: affiche 2–4 sources max, format court, avec titres.

GARDE-FOUS
- Pas de conseils médicaux/juridiques spécifiques; oriente vers un pro si nécessaire.`;

export const CONFLICT_RESOLUTION_PROMPT = `
## 🔧 PROTOCOLE DE RÉSOLUTION DE CONFLITS

### Types de Conflits et Approches

**👨‍👩‍👧‍👦 FAMILIAL**
- Focus : Amour, pardon, traditions
- Approche : Médiation douce, réconciliation
- Outils : Rituels familiaux, souvenirs positifs

**💼 PROFESSIONNEL**
- Focus : Efficacité, respect mutuel, objectifs communs
- Approche : Communication claire, solutions pragmatiques
- Outils : Médiation structurée, compromis créatifs

**💕 AMOUREUX**
- Focus : Intimité, compréhension mutuelle, croissance
- Approche : Écoute empathique, réparation émotionnelle
- Outils : Communication non-violente, gestes de réconciliation

**🤝 AMICAL**
- Focus : Fidélité, respect, plaisir partagé
- Approche : Honnêteté bienveillante, pardon
- Outils : Activités communes, conversations sincères

**🏠 VOISINAGE**
- Focus : Respect mutuel, vie en communauté
- Approche : Diplomatie, solutions pratiques
- Outils : Médiation communautaire, compromis
`;

export const MULTILINGUAL_RESPONSES = {
  greeting: {
    fr: "Bonjour ! Je suis COEXIST.AI, votre assistant de paix. Comment puis-je vous aider ?",
    en: "Hello! I am COEXIST.AI, your peace assistant. How can I help you?",
    es: "¡Hola! Soy COEXIST.AI, tu asistente de paz. ¿Cómo puedo ayudarte?",
    ar: "مرحباً! أنا COEXIST.AI، مساعدك للسلام. كيف يمكنني مساعدتك؟",
    he: "שלום! אני COEXIST.AI, עוזר השלום שלך. איך אוכל לעזור לך?",
    zh: "你好！我是COEXIST.AI，您的和平助手。如何帮助您？",
    hi: "नमस्ते! मैं COEXIST.AI हूं, आपका शांति सहायक। मैं आपकी कैसे मदद कर सकता हूं?"
  },
  emergency: {
    fr: "🚨 URGENCE - Je détecte une situation dangereuse. Arrêtez-vous immédiatement et appelez les services d'urgence si nécessaire.",
    en: "🚨 EMERGENCY - I detect a dangerous situation. Stop immediately and call emergency services if needed.",
    es: "🚨 EMERGENCIA - Detecto una situación peligrosa. Detente inmediatamente y llama a los servicios de emergencia si es necesario.",
    ar: "🚨 طوارئ - أكتشف موقفاً خطيراً. توقف فوراً واتصل بخدمات الطوارئ إذا لزم الأمر.",
    he: "🚨 חירום - אני מזהה מצב מסוכן. עצור מיד והתקשר לשירותי חירום אם נדרש.",
    zh: "🚨 紧急情况 - 我检测到危险情况。立即停止并在需要时拨打紧急服务。",
    hi: "🚨 आपातकाल - मैं एक खतरनाक स्थिति का पता लगाता हूं। तुरंत रुकें और आवश्यकता होने पर आपातकालीन सेवाओं को कॉल करें।"
  }
};

export const PEACE_QUOTES_DATABASE = [
  {
    text: "La paix ne peut être maintenue par la force. Elle ne peut l'être que par la compréhension.",
    author: "Albert Einstein",
    context: "science, universalité"
  },
  {
    text: "Si tu veux faire la paix avec ton ennemi, tu dois travailler avec ton ennemi. Alors il devient ton partenaire.",
    author: "Nelson Mandela",
    context: "réconciliation, collaboration"
  },
  {
    text: "La paix commence par un sourire.",
    author: "Mère Teresa",
    context: "simplicité, bienveillance"
  },
  {
    text: "Il n'y a pas de chemin vers la paix. La paix est le chemin.",
    author: "Mahatma Gandhi",
    context: "philosophie, action"
  },
  {
    text: "La haine ne cesse jamais par la haine ; la haine cesse par l'amour. C'est une loi éternelle.",
    author: "Bouddha",
    context: "spiritualité, compassion"
  },
  {
    text: "Tu aimeras ton prochain comme toi-même.",
    author: "Jésus-Christ",
    context: "christianisme, amour universel"
  },
  {
    text: "Allah ne vous défend pas d'être bienfaisants et équitables envers ceux qui ne vous ont pas combattus.",
    author: "Coran 60:8",
    context: "islam, tolérance"
  },
  {
    text: "Vasudhaiva Kutumbakam - Le monde est une famille.",
    author: "Mahā Upanishad",
    context: "hindouisme, unité"
  }
];

export const CULTURAL_KNOWLEDGE_BASE = {
  religions: {
    judaisme: {
      greeting: "Shalom",
      principle: "Tikkun Olam - Réparer le monde",
      peace_concept: "Shalom - Paix complète, harmonie"
    },
    christianisme: {
      greeting: "Que la paix soit avec vous",
      principle: "Aimez-vous les uns les autres",
      peace_concept: "Pax Christi - Paix du Christ"
    },
    islam: {
      greeting: "As-salamu alaykum",
      principle: "Rahma - Miséricorde divine",
      peace_concept: "Salam - Paix et sécurité"
    },
    bouddhisme: {
      greeting: "Namaste",
      principle: "Ahimsa - Non-violence",
      peace_concept: "Shanti - Paix intérieure et extérieure"
    },
    hindouisme: {
      greeting: "Namaste",
      principle: "Dharma - Ordre moral universel",
      peace_concept: "Shanti - Paix tripartite"
    }
  },
  cultures: {
    occidentale: {
      approach: "Directe, analytique",
      conflict_style: "Confrontation ouverte",
      resolution: "Compromis logique"
    },
    orientale: {
      approach: "Harmonie, consensus",
      conflict_style: "Évitement, médiation",
      resolution: "Préservation de la face"
    },
    africaine: {
      approach: "Communauté, ubuntu",
      conflict_style: "Médiation communautaire",
      resolution: "Restauration des relations"
    },
    arabe: {
      approach: "Hospitalité, honneur",
      conflict_style: "Médiation par l'autorité",
      resolution: "Réconciliation publique"
    }
  }
};