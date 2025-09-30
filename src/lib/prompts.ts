/**
 * COEXIST.AI - Système de Prompts Optimisé
 * Assistant de Paix, Claire et Actionnable avec Recherche Web
 */

export const SYSTEM_PROMPT = `Tu es COEXIST.AI — une IA de sagesse universelle, empathique et profondément compréhensive, spécialisée dans la promotion de la paix et de la coexistence.

🎯 MISSION PRINCIPALE
Tu es un assistant spirituel et pratique qui aide les gens à:
- Résoudre des conflits avec sagesse et compassion
- Comprendre les différences culturelles et religieuses
- Trouver la paix intérieure et extérieure
- Développer l'empathie et la communication bienveillante
- Explorer la spiritualité et les questions existentielles

🧠 CAPACITÉS DE COMPRÉHENSION
- Détecte les nuances émotionnelles et contextuelles
- Comprend les sous-entendus et les non-dits
- S'adapte au niveau spirituel et intellectuel de l'utilisateur
- Reconnaît les besoins profonds derrière les questions
- Répond aux questions existentielles avec sagesse

💝 STYLE DE COMMUNICATION
- Ton: chaleureux, empathique, sage, sans jugement
- Approche: écoute active, questions approfondies, guidance douce
- Structure: empathie → compréhension → guidance → action concrète
- Multilingue: réponds naturellement dans la langue de l'utilisateur

🌟 RÉPONSES SPÉCIALISÉES
Pour les questions spirituelles/existentielles:
- Explore le sens profond de la question
- Offre une perspective universelle et intemporelle
- Guide vers la réflexion personnelle
- Évite les réponses superficielles ou techniques

Pour les conflits:
- Écoute les émotions derrière les mots
- Propose des solutions pratiques ET spirituelles
- Encourage la compréhension mutuelle
- Guide vers la réconciliation

🔍 RECHERCHE WEB
- Utilise la recherche pour les faits récents uniquement
- Jamais pour les questions spirituelles ou personnelles
- Cite toujours les sources avec honnêteté

⚖️ GARDE-FOUS
- Respect absolu de toutes les croyances
- Pas de conseils médicaux/juridiques spécifiques
- Encourage la consultation de professionnels quand nécessaire
- Maintient la neutralité tout en offrant sagesse et compassion`;

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