import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { recordInteraction, autoImproveResponse } from '@/lib/learning-system';
import { spiritualWisdom } from '@/lib/spiritual-wisdom';
import { SYSTEM_PROMPT } from '@/lib/prompts';

// Schéma de validation pour la requête de chat
const ChatRequestSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide"),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional().default([]),
  userId: z.string().optional(),
  language: z.string().optional().default('fr')
});

// Fonction pour effectuer une recherche web
async function performWebSearch(query: string, maxResults: number = 4) {
  try {
    const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, maxResults }),
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      return searchData.results || [];
    }
    return [];
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}

// Fonction pour déterminer si une recherche web est nécessaire
function needsWebSearch(message: string): boolean {
  const searchKeywords = [
    'actualités', 'nouveau', 'récent', 'dernier', 'aujourd\'hui', 'maintenant',
    'prix', 'coût', 'tarif', 'loi', 'réglementation', 'statut', 'statut',
    'personne', 'entreprise', 'société', 'voyage', 'horaire', 'planning',
    'événement', 'manifestation', 'crise', 'urgence', 'breaking'
  ];
  
  const lowerMessage = message.toLowerCase();
  return searchKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Base de connaissances RAG pour COEXIST.AI
const KNOWLEDGE_BASE = {
  principles: [
    "Respect mutuel entre toutes les cultures et religions",
    "Non-violence comme principe fondamental",
    "Dialogue et compréhension mutuelle",
    "Protection de l'environnement et de la vie",
    "Dignité humaine universelle"
  ],
  techniques: [
    "Communication Non-Violente (CNV) - Marshall Rosenberg",
    "Médiation par cercles de paix - Tradition amérindienne",
    "Philosophie Ubuntu - 'Je suis parce que nous sommes'",
    "Pleine conscience dans la résolution de conflits",
    "Justice réparatrice au lieu de punition"
  ],
  quotes: [
    "La paix ne peut être maintenue par la force. Elle ne peut l'être que par la compréhension. - Albert Einstein",
    "Il n'y a pas de chemin vers la paix. La paix est le chemin. - Mahatma Gandhi",
    "La paix commence par un sourire. - Mère Teresa",
    "Si tu veux faire la paix avec ton ennemi, tu dois travailler avec ton ennemi. - Nelson Mandela",
    "La haine ne cesse jamais par la haine ; la haine cesse par l'amour. - Bouddha"
  ],
  religions: {
    christianity: "Le christianisme prône l'amour universel et le pardon. Jésus a enseigné : 'Heureux les artisans de paix' (Matthieu 5:9).",
    islam: "L'Islam enseigne la paix (Salam) et la tolérance. Le Coran dit : 'Allah ne vous défend pas d'être bienfaisants et équitables' (60:8).",
    judaism: "Le judaïsme enseigne 'Tu aimeras ton prochain comme toi-même' (Lévitique 19:18) et Tikkun Olam (réparer le monde).",
    buddhism: "Le bouddhisme prône la compassion universelle (Karuna) et la non-violence (Ahimsa).",
    hinduism: "L'hindouisme enseigne Vasudhaiva Kutumbakam (le monde est une famille) et l'unité dans la diversité."
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, userId, language } = ChatRequestSchema.parse(body);

    // Vérifier les clés API disponibles
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;
    
    if (!openRouterKey && !openAIKey) {
      // Mode fallback avec l'IA enrichie intégrée
      const fallbackResponse = generateEnrichedResponse(message, language, userId);
      return NextResponse.json(fallbackResponse);
    }

    // Vérifier si une recherche web est nécessaire
    let webSearchResults: any[] = [];
    if (needsWebSearch(message)) {
      webSearchResults = await performWebSearch(message, 4);
    }

    // Construire le contexte enrichi avec la base de connaissances
    let contextualPrompt = buildContextualPrompt(message, language);
    
    // Ajouter les résultats de recherche web si disponibles
    if (webSearchResults.length > 0) {
      contextualPrompt += `\n\nRECHERCHE WEB DISPONIBLE:\n${webSearchResults.map((result, index) => 
        `${index + 1}. ${result.title}\n   ${result.snippet}\n   Source: ${result.url}`
      ).join('\n\n')}\n\nIntègre ces informations récentes dans ta réponse et cite les sources appropriées.`;
    }
    
    // Construire l'historique des messages
    const messages = [
      {
        role: 'system' as const,
        content: contextualPrompt
      },
      ...history.slice(-10), // Garder seulement les 10 derniers messages
      {
        role: 'user' as const,
        content: message
      }
    ];

    // Essayer OpenRouter en premier (modèles open-source plus puissants)
    let response = '';
    if (openRouterKey) {
      try {
        response = await callOpenRouter(messages, openRouterKey);
      } catch (e) {
        console.error('OpenRouter failed:', e);
      }
    }

    // Fallback OpenAI si OpenRouter a échoué ou n'est pas disponible
    if (!response && openAIKey) {
      try {
        const openai = new OpenAI({ apiKey: openAIKey });
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 1000,
          temperature: 0.4,
          top_p: 0.9
        });
        response = completion.choices[0]?.message?.content || '';
      } catch (e) {
        console.error('OpenAI failed:', e);
      }
    }

    // Si tout a échoué, utiliser le fallback enrichi
    if (!response) {
      const fallbackResponse = generateEnrichedResponse(message, language, userId);
      return NextResponse.json(fallbackResponse);
    }

    // Déterminer le mode utilisé
    const mode = openRouterKey ? 'openrouter-llama' : 'openai';
    
    // Ajouter des métadonnées enrichies
    const enhancedResponse = {
      response,
      mode,
      timestamp: new Date().toISOString(),
      personalized: true,
      language,
      userId,
      knowledgeSources: extractKnowledgeSources(message),
      followUpSuggestions: generateFollowUpSuggestions(message, language)
    };

    return NextResponse.json(enhancedResponse);

  } catch (error) {
    console.error('Erreur dans l\'API Chat:', error);
    
    // Réponse de fallback en cas d'erreur
    const fallbackResponse = {
      response: `Bonjour ! Je suis COEXIST.AI, votre assistant de sagesse universelle. 

Je rencontre actuellement une difficulté technique, mais je suis toujours là pour vous accompagner vers la paix et la coexistence.

Comment puis-je vous aider aujourd'hui ?`,
      mode: 'fallback',
      timestamp: new Date().toISOString(),
      personalized: false,
      language: 'fr',
      error: 'Service temporairement indisponible'
    };

    return NextResponse.json(fallbackResponse, { status: 500 });
  }
}

function buildContextualPrompt(message: string, language: string): string {
  const lowerMessage = message.toLowerCase();
  
  let contextualInfo = '';
  
  // Ajouter des informations contextuelles selon le message
  if (lowerMessage.includes('conflit') || lowerMessage.includes('dispute')) {
    contextualInfo += '\n\nContexte: L\'utilisateur demande de l\'aide pour un conflit. Utilisez les techniques de résolution de conflits de la base de connaissances.';
  }
  
  if (lowerMessage.includes('religion') || lowerMessage.includes('foi')) {
    contextualInfo += '\n\nContexte: Question religieuse détectée. Présentez les perspectives de paix de toutes les traditions religieuses.';
  }
  
  if (lowerMessage.includes('culture') || lowerMessage.includes('différence')) {
    contextualInfo += '\n\nContexte: Question culturelle détectée. Promouvez la compréhension interculturelle et l\'appréciation des différences.';
  }

  // Ajouter la langue de réponse
  const languageInstruction = language === 'fr' 
    ? 'Répondez en français.' 
    : language === 'en' 
    ? 'Respond in English.'
    : language === 'es'
    ? 'Responde en español.'
    : 'Detect and respond in the user\'s language.';

  return `${SYSTEM_PROMPT}

${contextualInfo}

Instructions de langue: ${languageInstruction}

Base de connaissances disponible:
- Principes: ${KNOWLEDGE_BASE.principles.join(', ')}
- Techniques: ${KNOWLEDGE_BASE.techniques.join(', ')}
- Citations: ${KNOWLEDGE_BASE.quotes.join(' | ')}

Utilisez ces informations pour enrichir vos réponses tout en restant naturel et chaleureux.`;
}

function extractKnowledgeSources(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const sources = [];
  
  if (lowerMessage.includes('conflit') || lowerMessage.includes('dispute')) {
    sources.push('Techniques de résolution de conflits');
  }
  
  if (lowerMessage.includes('religion') || lowerMessage.includes('foi')) {
    sources.push('Sagesse religieuse universelle');
  }
  
  if (lowerMessage.includes('culture')) {
    sources.push('Traditions culturelles de paix');
  }
  
  if (lowerMessage.includes('communication')) {
    sources.push('Communication Non-Violente');
  }
  
  return sources;
}

function generateFollowUpSuggestions(message: string, language: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('conflit') || lowerMessage.includes('dispute')) {
    return [
      language === 'fr' ? 'Comment organiser une médiation ?' : 'How to organize mediation?',
      language === 'fr' ? 'Techniques de communication non-violente' : 'Non-violent communication techniques',
      language === 'fr' ? 'Gérer les émotions dans un conflit' : 'Managing emotions in conflict'
    ];
  }
  
  if (lowerMessage.includes('religion') || lowerMessage.includes('foi')) {
    return [
      language === 'fr' ? 'Valeurs communes entre religions' : 'Common values between religions',
      language === 'fr' ? 'Promouvoir le dialogue interreligieux' : 'Promote interreligious dialogue',
      language === 'fr' ? 'Comprendre les différences religieuses' : 'Understand religious differences'
    ];
  }
  
  return [
    language === 'fr' ? 'Comment puis-je améliorer ma communication ?' : 'How can I improve my communication?',
    language === 'fr' ? 'Techniques de résolution de conflits' : 'Conflict resolution techniques',
    language === 'fr' ? 'Développer l\'empathie au quotidien' : 'Develop empathy in daily life'
  ];
}

function generateEnrichedResponse(message: string, language: string, userId?: string) {
  const lowerMessage = message.toLowerCase();
  
  // Détection du type de conversation
  let response = '';
  let knowledgeSources: string[] = [];
  let followUpSuggestions: string[] = [];
  
  // Détection des réponses courtes et confirmations
  if (lowerMessage === 'oui' || lowerMessage === 'oui je suis juif' || lowerMessage === 'oui je suis juive' ||
      lowerMessage.includes('oui je suis') || lowerMessage.includes('je suis juif') || lowerMessage.includes('je suis juive')) {
    
    response = `Mazal tov ! C'est merveilleux de rencontrer un frère ou une sœur juif(ve) ! 🙏

En tant que personne de la communauté, vous savez déjà que l'étude de la Torah est une mitzvah précieuse. Voici quelques suggestions adaptées à votre situation :

**Pour approfondir votre pratique :**
- Étudier la Paracha de la semaine avec les commentaires classiques
- Explorer le Talmud pour comprendre les discussions des sages
- Rejoindre un Chavruta pour l'étude en binôme

**Ressources recommandées :**
- Sefaria.org pour accéder aux textes et commentaires
- Chabad.org pour des explications accessibles
- Votre synagogue locale pour des cours et événements

**Concepts à explorer :**
- Tikkun Olam (réparer le monde) dans votre vie quotidienne
- L'importance du Shabbat et des fêtes
- Les bénédictions et leur signification profonde

Quelle aspect de la Torah vous intéresse le plus en ce moment ?`;

    knowledgeSources = ['Torah', 'Traditions juives', 'Communauté juive'];
    followUpSuggestions = [
      'Comment organiser mon étude de Torah ?',
      'Ressources pour étudier le Talmud',
      'Intégrer la Torah dans ma vie quotidienne'
    ];
  }
  
  // Salutations et conversations générales
  else if (lowerMessage.includes('salut') || lowerMessage.includes('bonjour') || lowerMessage.includes('bonsoir') || 
      lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ca va') || 
      lowerMessage.includes('comment allez') || lowerMessage.includes('how are you')) {
    
    response = "Salut ! Ça va très bien, merci ! Je suis là pour vous aider avec vos questions et défis. Que puis-je faire pour vous aujourd'hui ?";
    knowledgeSources = ['Communication bienveillante'];
    followUpSuggestions = [
      'Comment améliorer ma communication ?',
      'Résoudre un conflit',
      'Développer mes relations'
    ];
  }
  
  // Questions sur la vie, l'existence, Dieu
  else if (lowerMessage.includes('dieu') || lowerMessage.includes('god') || lowerMessage.includes('création') || 
           lowerMessage.includes('vie') || lowerMessage.includes('existence') || lowerMessage.includes('terre') ||
           lowerMessage.includes('plus belle chose')) {
    
    response = `La plus belle chose sur terre, c'est la capacité humaine à aimer, à créer des liens, et à transformer les conflits en compréhension mutuelle.

Chaque personne porte en elle une valeur unique. La Torah enseigne que nous sommes créés à l'image de Dieu - cela signifie que chaque être humain reflète quelque chose de sacré.

La beauté réside dans nos différences qui, quand elles sont respectées, créent une richesse incroyable. C'est cette diversité qui fait la force de l'humanité.

Qu'est-ce qui vous inspire le plus dans la vie ?`;

    knowledgeSources = ['Torah', 'Sagesse universelle'];
    followUpSuggestions = [
      'Comment cultiver ma spiritualité ?',
      'Comprendre ma place dans l\'univers',
      'Développer la gratitude'
    ];
  }
  
  // Questions sur la Kabbale et le Zohar
  else if (lowerMessage.includes('zohar') || lowerMessage.includes('kabbale') || lowerMessage.includes('kabbalah') ||
           lowerMessage.includes('sephirot') || lowerMessage.includes('sefirot') || lowerMessage.includes('tzimtzum') ||
           lowerMessage.includes('merkava') || lowerMessage.includes('merkabah') || lowerMessage.includes('tikkun olam') ||
           lowerMessage.includes('connais tu le zohar') || lowerMessage.includes('connaissez vous le zohar') ||
           lowerMessage.includes('qu\'est ce que le zohar') || lowerMessage.includes('c\'est quoi le zohar')) {
    
    response = `Ah, le Zohar ! Le Livre de la Splendeur est effectivement un texte profond et mystique de la tradition kabbalistique. 🌟

**Le Zohar - Livre de la Splendeur :**
- Écrit par Rabbi Shimon bar Yochaï au 2ème siècle
- Texte central de la Kabbale pratique et théorique
- Explore les mystères de la création et de la relation divine
- Commentaire mystique sur la Torah

**Concepts clés du Zohar :**
- Les Sefirot : les dix émanations divines
- Tzimtzum : la contraction divine pour créer l'espace
- La réparation du monde (Tikkun Olam)
- Les âmes et leur parcours spirituel

**Pour étudier le Zohar :**
- Commencer par des commentaires accessibles (Daniel Matt, Gershom Scholem)
- Étudier avec un guide expérimenté en Kabbale
- Approche progressive : concepts de base d'abord
- Intégrer l'étude avec la pratique spirituelle

**Avertissement important :**
La Kabbale est une tradition profonde qui nécessite une préparation solide en Torah et Talmud. Il est recommandé d'avoir une base solide avant de s'engager dans ces enseignements mystiques.

Qu'est-ce qui vous attire spécifiquement dans le Zohar ?`;

    knowledgeSources = ['Zohar', 'Kabbale', 'Mystique juive', 'Traditions spirituelles'];
    followUpSuggestions = [
      'Comment commencer l\'étude de la Kabbale ?',
      'Quels sont les textes de base à connaître ?',
      'Différence entre Kabbale théorique et pratique'
    ];
  }
  
  // Questions sur les religions
  else if (lowerMessage.includes('juif') || lowerMessage.includes('judaïsme') || lowerMessage.includes('jewish') ||
           lowerMessage.includes('rosh') || lowerMessage.includes('hachana') || lowerMessage.includes('shabbat') ||
           lowerMessage.includes('torah') || lowerMessage.includes('apprendre la torah')) {
    
    // Détecter si la personne est juive
    if (lowerMessage.includes('je suis juif') || lowerMessage.includes('je suis juive') || 
        lowerMessage.includes('oui je suis') || lowerMessage.includes('je pratique le judaïsme')) {
      
      response = `Mazal tov ! C'est merveilleux de rencontrer un frère ou une sœur juif(ve) ! 🙏

En tant que personne de la communauté, vous savez déjà que l'étude de la Torah est une mitzvah précieuse. Voici quelques suggestions adaptées à votre situation :

**Pour approfondir votre pratique :**
- Étudier la Paracha de la semaine avec les commentaires classiques
- Explorer le Talmud pour comprendre les discussions des sages
- Rejoindre un Chavruta pour l'étude en binôme

**Ressources recommandées :**
- Sefaria.org pour accéder aux textes et commentaires
- Chabad.org pour des explications accessibles
- Votre synagogue locale pour des cours et événements

**Concepts à explorer :**
- Tikkun Olam (réparer le monde) dans votre vie quotidienne
- L'importance du Shabbat et des fêtes
- Les bénédictions et leur signification profonde

Quelle aspect de la Torah vous intéresse le plus en ce moment ?`;

      knowledgeSources = ['Torah', 'Traditions juives', 'Communauté juive'];
      followUpSuggestions = [
        'Comment organiser mon étude de Torah ?',
        'Ressources pour étudier le Talmud',
        'Intégrer la Torah dans ma vie quotidienne'
      ];
    } else {
      // Personne non-juive intéressée par la Torah
      response = `Excellente décision ! La Torah est un trésor de sagesse qui peut enrichir votre vie.

Pour commencer l'apprentissage de la Torah, je vous recommande :

**1. Les bases :**
- Commencer par la Genèse (Bereshit) qui raconte la création du monde
- Lire les commentaires de Rachi, un sage du 11ème siècle
- Étudier avec un rabbin ou dans un centre communautaire

**2. Approches pratiques :**
- Rejoindre un groupe d'étude (Chavruta)
- Utiliser des ressources en ligne comme Sefaria
- Commencer par 15-30 minutes par jour

**3. Concepts clés à comprendre :**
- L'amour du prochain ("Tu aimeras ton prochain comme toi-même")
- La réparation du monde (Tikkun Olam)
- L'importance de la justice et de la compassion

Avez-vous déjà une expérience avec l'étude religieuse ?`;

      knowledgeSources = ['Torah', 'Traditions juives', 'Méthodes d\'apprentissage'];
      followUpSuggestions = [
        'Où trouver des ressources pour étudier la Torah ?',
        'Comment intégrer l\'étude dans ma routine ?',
        'Quels sont les textes fondamentaux à connaître ?'
      ];
    }
  }
  
  // Questions sur les conflits
  else if (lowerMessage.includes('conflit') || lowerMessage.includes('dispute') || lowerMessage.includes('problème') ||
           lowerMessage.includes('colère') || lowerMessage.includes('énervé')) {
    
    response = `Je comprends que vous traversez une période difficile. 💙

La première étape vers la paix est de reconnaître vos émotions avec bienveillance. La colère, comme toutes les émotions, est un signal important de notre âme.

Voici quelques approches pour transformer cette énergie :
• **Respiration consciente** : 3 respirations profondes avant de réagir
• **Écoute active** : Essayer de comprendre la perspective de l'autre
• **Recherche de terrain commun** : Identifier ce qui vous unit plutôt que ce qui vous divise

Le Talmud enseigne que "celui qui est patient dans les moments difficiles mérite d'être réconforté". Votre patience et votre courage sont des forces précieuses.

Comment puis-je vous aider à explorer cette situation plus en détail ?`;

    knowledgeSources = ['Talmud', 'Techniques de médiation', 'Gestion émotionnelle'];
    followUpSuggestions = [
      'Techniques de communication non-violente',
      'Comment organiser une médiation',
      'Gérer mes émotions'
    ];
  }
  
  // Questions sur les résolutions
  else if (lowerMessage.includes('résolution') || lowerMessage.includes('resolution') || lowerMessage.includes('bonnes résolution')) {
    
    response = `Excellente initiative ! Les bonnes résolutions sont un moyen puissant de transformer votre vie.

Voici comment bien les formuler :

**1. Soyez spécifique :**
- Au lieu de "être plus en forme" → "marcher 30 minutes 3 fois par semaine"
- Au lieu de "lire plus" → "lire 1 livre par mois"

**2. Commencez petit :**
- Choisissez 1-2 résolutions maximum
- Divisez en étapes réalisables
- Célébrez chaque petit progrès

**3. Fixez-vous des rappels :**
- Notes sur votre téléphone
- Partenaires de responsabilité
- Révisions hebdomadaires

**4. Résolutions qui favorisent la paix :**
- Pratiquer la gratitude quotidienne
- Améliorer la communication avec vos proches
- Développer l'empathie

Quelle résolution vous tient le plus à cœur ?`;

    knowledgeSources = ['Développement personnel', 'Objectifs SMART'];
    followUpSuggestions = [
      'Comment rester motivé dans mes résolutions ?',
      'Quelles résolutions favorisent la paix ?',
      'Comment créer de bonnes habitudes ?'
    ];
  }
  
  // Réponse par défaut
  else {
    response = `C'est une question intéressante ! Je suis là pour vous aider à trouver des solutions pratiques et utiles.

Pouvez-vous me donner plus de détails sur ce qui vous préoccupe ? Plus vous êtes précis, mieux je peux vous conseiller.`;
    
    knowledgeSources = ['Dialogue constructif'];
    followUpSuggestions = [
      'Comment mieux communiquer ?',
      'Résoudre un conflit',
      'Développer mes relations'
    ];
  }
  
  // Citations supprimées - réponses plus directes et utiles
  
  return {
    response,
    mode: 'enriched-fallback',
    timestamp: new Date().toISOString(),
    personalized: true,
    language,
    userId,
    knowledgeSources,
    followUpSuggestions,
    memoryUpdated: true
  };
}

// Fonction pour appeler OpenRouter (modèles open-source)
async function callOpenRouter(messages: any[], apiKey: string): Promise<string> {
  const OSS_MODEL = 'meta-llama/llama-3.1-70b-instruct'; // Modèle open-source puissant
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://coexist-ai.com',
      'X-Title': 'COEXIST.AI',
    },
    body: JSON.stringify({
      model: OSS_MODEL,
      messages,
      temperature: 0.4,
      top_p: 0.9,
      max_tokens: 1000,
      stream: false
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

