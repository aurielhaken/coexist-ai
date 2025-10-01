import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { recordInteraction, autoImproveResponse } from '@/lib/learning-system';
import { enrichWithSpiritualWisdom, getInspirationalQuote } from '@/lib/spiritual-wisdom';
import { SYSTEM_PROMPT, MEDITATION_PROMPT, EMOTIONAL_INTELLIGENCE_PROMPT, MULTILINGUAL_RESPONSES } from '@/lib/prompts';
import { callGemini, callOpenRouter, callClaude, callOpenAI } from '@/lib/ai-services';
import { cacheResponse, getCachedResponse, generateCacheKey, measureResponseTime } from '@/lib/performance';

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
    const geminiKey = process.env.GOOGLE_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;
    const claudeKey = process.env.ANTHROPIC_API_KEY;
    
    // Vérifier si nous avons au moins une clé API
    if (!geminiKey && !openRouterKey && !openAIKey && !claudeKey) {
      return NextResponse.json({
        response: `Je suis désolé, mais les services d'intelligence artificielle ne sont pas configurés actuellement. 

Pour activer les réponses intelligentes, veuillez configurer une clé API OpenAI, OpenRouter ou Anthropic dans les variables d'environnement.

En attendant, je peux vous aider avec mes connaissances intégrées sur la paix, la coexistence et la sagesse universelle. Comment puis-je vous accompagner aujourd'hui ?`,
        mode: 'fallback',
        timestamp: new Date().toISOString(),
        personalized: false,
        language: 'fr',
        error: 'No API keys configured'
      }, { status: 503 });
    }

    // Vérifier si une recherche web est nécessaire
    let webSearchResults: any[] = [];
    if (needsWebSearch(message)) {
      webSearchResults = await performWebSearch(message, 4);
    }

    // Vérifier le cache avant de traiter la requête
    const cacheKey = generateCacheKey(message, language);
    const cachedResponse = getCachedResponse(cacheKey);
    
    if (cachedResponse) {
      return NextResponse.json({
        response: cachedResponse,
        mode: 'cached',
        timestamp: new Date().toISOString(),
        personalized: true,
        language,
        userId,
        cached: true
      });
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

    // Stratégie de fallback améliorée avec les meilleurs modèles
    let response = '';
    let mode = 'fallback';
    
    // 1. Essayer Gemini Pro en premier (GRATUIT - 60 req/min)
    if (!response && geminiKey) {
      try {
        console.log('Tentative avec Gemini Pro (gratuit)...');
        response = await callGemini(messages, geminiKey);
        mode = 'gemini-pro';
      } catch (e) {
        console.error('Gemini failed:', e);
      }
    }

    // 2. Essayer Claude 3.5 Sonnet directement (le plus performant)
    if (!response && claudeKey) {
      try {
        console.log('Tentative avec Claude 3.5 Sonnet...');
        response = await callClaude(messages, claudeKey);
        mode = 'claude-3.5-sonnet';
      } catch (e) {
        console.error('Claude failed:', e);
      }
    }

    // 3. Essayer OpenRouter avec les meilleurs modèles
    if (!response && openRouterKey) {
      try {
        console.log('Tentative avec OpenRouter...');
        response = await callOpenRouter(messages, openRouterKey);
        mode = 'openrouter-premium';
      } catch (e) {
        console.error('OpenRouter failed:', e);
      }
    }

    // 4. Fallback OpenAI GPT-4o
    if (!response && openAIKey) {
      try {
        console.log('Tentative avec OpenAI GPT-4o...');
        response = await callOpenAI(messages, openAIKey);
        mode = 'openai-gpt-4o';
      } catch (e) {
        console.error('OpenAI failed:', e);
      }
    }

    // 5. Si tout a échoué, retourner une erreur
    if (!response) {
      console.log('Toutes les APIs ont échoué...');
      return NextResponse.json({
        response: `Je rencontre actuellement des difficultés techniques avec les services d'intelligence artificielle. 

Veuillez réessayer dans quelques instants. Si le problème persiste, vérifiez que les clés API sont correctement configurées.

Je reste à votre disposition pour vous aider dès que les services seront rétablis.`,
        mode: 'error',
        timestamp: new Date().toISOString(),
        personalized: false,
        language: 'fr',
        error: 'All API services failed'
      }, { status: 503 });
    }
    
    // Enrichir la réponse avec la sagesse spirituelle
    let enrichedResponse = response;
    
    // Détecter le contexte et les émotions pour enrichir la réponse
    const context = detectContext(message);
    const emotions = detectEmotions(message);
    
    // Enrichir avec la sagesse spirituelle appropriée
    enrichedResponse = enrichWithSpiritualWisdom(
      response,
      message,
      context,
      emotions[0] || 'neutre',
      language,
      'tous'
    );
    
    // Ajouter une citation inspirante si approprié
    if (shouldAddInspirationalQuote(message)) {
      const quote = getInspirationalQuote(language);
      enrichedResponse += `\n\n💫 **Citation inspirante** :\n"${quote}"`;
    }
    
    // Ajouter des suggestions de méditation si approprié
    if (needsMeditationSuggestion(message)) {
      enrichedResponse += `\n\n🧘‍♀️ **Suggestion de bien-être** :\nVoulez-vous que je vous guide dans une méditation pour cultiver la paix intérieure ?`;
    }

    // Mettre en cache la réponse
    cacheResponse(cacheKey, enrichedResponse);

    // Ajouter des métadonnées enrichies
    const enhancedResponse = {
      response: enrichedResponse,
      mode,
      timestamp: new Date().toISOString(),
      personalized: true,
      language,
      userId,
      knowledgeSources: extractKnowledgeSources(message),
      followUpSuggestions: generateFollowUpSuggestions(message, language),
      spiritualWisdom: context,
      emotions: emotions,
      meditationSuggested: needsMeditationSuggestion(message),
      cached: false
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
  let specializedPrompt = '';
  
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

  // Détecter les besoins de méditation
  if (lowerMessage.includes('méditation') || lowerMessage.includes('stress') || lowerMessage.includes('anxiété') || lowerMessage.includes('relaxation')) {
    specializedPrompt += '\n\n' + MEDITATION_PROMPT;
  }

  // Détecter les besoins d'intelligence émotionnelle
  if (lowerMessage.includes('émotion') || lowerMessage.includes('colère') || lowerMessage.includes('tristesse') || lowerMessage.includes('peur')) {
    specializedPrompt += '\n\n' + EMOTIONAL_INTELLIGENCE_PROMPT;
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

${specializedPrompt}

Instructions de langue: ${languageInstruction}

Base de connaissances disponible:
- Principes: ${KNOWLEDGE_BASE.principles.join(', ')}
- Techniques: ${KNOWLEDGE_BASE.techniques.join(', ')}
- Citations: ${KNOWLEDGE_BASE.quotes.join(' | ')}

Utilisez ces informations pour enrichir vos réponses tout en restant naturel, chaleureux et inspirant.`;
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

function detectContext(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('conflit') || lowerMessage.includes('dispute')) return 'conflit';
  if (lowerMessage.includes('religion') || lowerMessage.includes('foi')) return 'religion';
  if (lowerMessage.includes('culture') || lowerMessage.includes('différence')) return 'culture';
  if (lowerMessage.includes('méditation') || lowerMessage.includes('stress')) return 'bien-être';
  if (lowerMessage.includes('émotion') || lowerMessage.includes('colère')) return 'émotion';
  
  return 'général';
}

function detectEmotions(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const emotions = [];
  
  if (lowerMessage.includes('colère') || lowerMessage.includes('frustré')) emotions.push('colère');
  if (lowerMessage.includes('tristesse') || lowerMessage.includes('triste')) emotions.push('tristesse');
  if (lowerMessage.includes('peur') || lowerMessage.includes('anxiété')) emotions.push('peur');
  if (lowerMessage.includes('joie') || lowerMessage.includes('heureux')) emotions.push('joie');
  if (lowerMessage.includes('gratitude') || lowerMessage.includes('reconnaissant')) emotions.push('gratitude');
  
  return emotions.length > 0 ? emotions : ['neutre'];
}

function shouldAddInspirationalQuote(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const quoteTriggers = ['inspiration', 'motivation', 'espoir', 'difficile', 'découragé', 'perdu'];
  return quoteTriggers.some(trigger => lowerMessage.includes(trigger));
}

function needsMeditationSuggestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const meditationTriggers = ['stress', 'anxiété', 'tension', 'relaxation', 'calme', 'paix intérieure'];
  return meditationTriggers.some(trigger => lowerMessage.includes(trigger));
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
  
  if (lowerMessage.includes('méditation') || lowerMessage.includes('stress')) {
    return [
      language === 'fr' ? 'Techniques de respiration' : 'Breathing techniques',
      language === 'fr' ? 'Méditation de l\'amour-bienveillant' : 'Loving-kindness meditation',
      language === 'fr' ? 'Gestion du stress au quotidien' : 'Daily stress management'
    ];
  }
  
  return [
    language === 'fr' ? 'Comment puis-je améliorer ma communication ?' : 'How can I improve my communication?',
    language === 'fr' ? 'Techniques de résolution de conflits' : 'Conflict resolution techniques',
    language === 'fr' ? 'Développer l\'empathie au quotidien' : 'Develop empathy in daily life'
  ];
}

// Note: Les fonctions callGemini, callOpenRouter, callClaude et callOpenAI 
// sont maintenant dans le fichier ai-services.ts
