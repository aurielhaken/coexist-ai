import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { SYSTEM_PROMPT, CONFLICT_RESOLUTION_PROMPT } from '@/lib/prompts';
import { memorySystem, generatePersonalizedGreeting, getContextualAdvice } from '@/lib/knowledge-base';
import { detectLanguage, generateMultilingualResponse, getRandomPeaceQuote, getLanguageConfig } from '@/lib/multilingual';

// Schéma de validation étendu
const RequestSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide"),
  useDemo: z.boolean().optional().default(true),
  userId: z.string().optional(),
  language: z.string().optional(),
  culturalBackground: z.string().optional(),
  religiousBackground: z.string().optional()
});

// Interface pour la réponse enrichie
interface EnhancedResponse {
  response: string;
  mode: 'demo' | 'openai';
  timestamp: string;
  personalized: boolean;
  language: string;
  culturalContext?: string;
  knowledgeSources?: string[];
  followUpSuggestions?: string[];
  memoryUpdated?: boolean;
}

class UniversalWisdomAI {
  private userId: string;
  private language: string;
  private culturalContext?: string;
  private religiousContext?: string;

  constructor(userId: string, language: string, culturalContext?: string, religiousContext?: string) {
    this.userId = userId;
    this.language = language;
    this.culturalContext = culturalContext;
    this.religiousContext = religiousContext;
    
    // Initialiser la mémoire utilisateur
    this.initializeUserMemory();
  }

  private initializeUserMemory(): void {
    const memory = memorySystem.getUserMemory(this.userId);
    
    // Mettre à jour les préférences si fournies
    if (this.culturalContext || this.religiousContext) {
      memorySystem.updateUserMemory(this.userId, {
        preferredLanguage: this.language,
        culturalBackground: this.culturalContext,
        religiousBackground: this.religiousContext,
        preferences: {
          ...memory.preferences,
          language: this.language,
          culturalSensitivity: this.culturalContext ? [this.culturalContext] : [],
        }
      });
    }
  }

  async generateResponse(message: string): Promise<EnhancedResponse> {
    const memory = memorySystem.getUserMemory(this.userId);
    const detectedLanguage = detectLanguage(message);
    const finalLanguage = this.language || detectedLanguage;

    // 1. DÉTECTION D'URGENCE
    if (this.isEmergencySituation(message)) {
      return this.handleEmergencySituation(message, finalLanguage);
    }

    // 2. ANALYSE DU CONTEXTE
    const context = this.analyzeContext(message);
    
    // 3. PERSONNALISATION BASÉE SUR LA MÉMOIRE
    const personalizedGreeting = this.generatePersonalizedGreeting(memory, finalLanguage);
    
    // 4. RECHERCHE DANS LA BASE DE CONNAISSANCES (RAG)
    const knowledgeSources = this.searchKnowledgeBase(message, context);
    
    // 5. GÉNÉRATION DE LA RÉPONSE
    const response = await this.generateWisdomResponse(message, context, knowledgeSources, memory, finalLanguage);
    
    // 6. MISE À JOUR DE LA MÉMOIRE
    this.updateMemory(message, context, response);
    
    // 7. GÉNÉRATION DE SUGGESTIONS DE SUIVI
    const followUpSuggestions = this.generateFollowUpSuggestions(context, memory);

    return {
      response,
      mode: 'demo',
      timestamp: new Date().toISOString(),
      personalized: true,
      language: finalLanguage,
      culturalContext: this.culturalContext,
      knowledgeSources: knowledgeSources.map(k => k.title),
      followUpSuggestions,
      memoryUpdated: true
    };
  }

  private isEmergencySituation(message: string): boolean {
    const emergencyKeywords = ['tuer', 'mort', 'suicide', 'meurtre', 'violence', 'agresser', 'frapper', 'battre', 'détruire'];
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  private handleEmergencySituation(message: string, language: string): EnhancedResponse {
    const emergencyResponse = generateMultilingualResponse('emergency', language);
    const additionalResources = this.getEmergencyResources(language);
    
    return {
      response: `${emergencyResponse}\n\n${additionalResources}`,
      mode: 'demo',
      timestamp: new Date().toISOString(),
      personalized: false,
      language,
      memoryUpdated: false
    };
  }

  private getEmergencyResources(language: string): string {
    const resources = {
      fr: `**🆘 RESSOURCES D'URGENCE :**
- **SOS Amitié** : 09 72 39 40 50
- **Suicide Écoute** : 01 45 39 40 00
- **Police** : 17 (si danger immédiat)
- **Samu** : 15 (urgence médicale)`,
      en: `**🆘 EMERGENCY RESOURCES :**
- **National Suicide Prevention Lifeline** : 988
- **Crisis Text Line** : Text HOME to 741741
- **Emergency** : 911
- **Police** : 911`,
      es: `**🆘 RECURSOS DE EMERGENCIA :**
- **Línea Nacional de Prevención del Suicidio** : 988
- **Crisis Text Line** : Envía HOME al 741741
- **Emergencias** : 911
- **Policía** : 911`,
      ar: `**🆘 موارد الطوارئ :**
- **خط مساعدة منع الانتحار الوطني** : 988
- **خط نص الأزمة** : أرسل HOME إلى 741741
- **الطوارئ** : 911
- **الشرطة** : 911`
    };
    
    return resources[language as keyof typeof resources] || resources.fr;
  }

  private analyzeContext(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Détection des contextes de conflit
    if (this.containsAny(lowerMessage, ['famille', 'parent', 'enfant', 'frère', 'sœur', 'mère', 'père'])) {
      return 'familial';
    }
    if (this.containsAny(lowerMessage, ['travail', 'bureau', 'collègue', 'patron', 'manager', 'équipe'])) {
      return 'professionnel';
    }
    if (this.containsAny(lowerMessage, ['couple', 'amoureux', 'mari', 'femme', 'petit ami', 'petite amie'])) {
      return 'amoureux';
    }
    if (this.containsAny(lowerMessage, ['ami', 'amie', 'copain', 'copine'])) {
      return 'amical';
    }
    if (this.containsAny(lowerMessage, ['voisin', 'voisine', 'appartement', 'immeuble', 'quartier'])) {
      return 'voisinage';
    }
    
    // Détection des questions générales
    if (this.containsAny(lowerMessage, ['religion', 'dieu', 'foi', 'spiritualité', 'juif', 'chrétien', 'musulman', 'bouddhiste', 'hindou'])) {
      return 'religieux';
    }
    if (this.containsAny(lowerMessage, ['culture', 'art', 'histoire', 'tradition'])) {
      return 'culturel';
    }
    if (this.containsAny(lowerMessage, ['salut', 'bonjour', 'bonsoir', 'hello', 'hi'])) {
      return 'salutation';
    }
    
    return 'général';
  }

  private searchKnowledgeBase(message: string, context: string) {
    return getContextualAdvice(this.userId, context);
  }

  private generatePersonalizedGreeting(memory: any, language: string): string {
    if (memory.relationshipStatus === 'new') {
      return generateMultilingualResponse('greeting', language);
    }
    
    const name = memory.name;
    const lastTopic = memory.previousConversations[memory.previousConversations.length - 1]?.topic;
    
    if (memory.relationshipStatus === 'returning' && lastTopic) {
      const greetings = {
        fr: name ? `Bonjour ${name} ! Je me souviens de notre conversation sur ${lastTopic}. Comment puis-je vous aider aujourd'hui ?` : `Bonjour ! Je me souviens de notre conversation sur ${lastTopic}. Comment puis-je vous aider aujourd'hui ?`,
        en: name ? `Hello ${name}! I remember our conversation about ${lastTopic}. How can I help you today?` : `Hello! I remember our conversation about ${lastTopic}. How can I help you today?`,
        es: name ? `¡Hola ${name}! Recuerdo nuestra conversación sobre ${lastTopic}. ¿Cómo puedo ayudarte hoy?` : `¡Hola! Recuerdo nuestra conversación sobre ${lastTopic}. ¿Cómo puedo ayudarte hoy?`
      };
      
      return greetings[language as keyof typeof greetings] || greetings.fr;
    }
    
    return generateMultilingualResponse('greeting', language, name);
  }

  private async generateWisdomResponse(
    message: string, 
    context: string, 
    knowledgeSources: any[], 
    memory: any, 
    language: string
  ): Promise<string> {
    
    // Construction du prompt enrichi
    let enhancedPrompt = SYSTEM_PROMPT;
    
    // Ajout du contexte culturel et religieux
    if (this.culturalContext) {
      enhancedPrompt += `\n\nCONTEXTE CULTUREL DE L'UTILISATEUR : ${this.culturalContext}`;
    }
    if (this.religiousContext) {
      enhancedPrompt += `\n\nCONTEXTE RELIGIEUX DE L'UTILISATEUR : ${this.religiousContext}`;
    }
    
    // Ajout des sources de connaissances
    if (knowledgeSources.length > 0) {
      enhancedPrompt += `\n\nSOURCES DE CONNAISSANCES PERTINENTES :\n`;
      knowledgeSources.forEach(source => {
        enhancedPrompt += `- ${source.title}: ${source.content.substring(0, 200)}...\n`;
      });
    }
    
    // Ajout de l'historique utilisateur
    if (memory.previousConversations.length > 0) {
      enhancedPrompt += `\n\nHISTORIQUE DE CONVERSATIONS :\n`;
      memory.previousConversations.slice(-3).forEach((conv: any) => {
        enhancedPrompt += `- ${conv.topic} (${conv.date.toDateString()}): ${conv.keyInsights.join(', ')}\n`;
      });
    }
    
    // Citations supprimées - réponses plus directes et utiles
    
    // Génération de la réponse avec le nouveau système
    const response = this.generateContextualResponse(message, context, enhancedPrompt, language);
    
    return response;
  }

  private generateContextualResponse(message: string, context: string, _enhancedPrompt: string, language: string): string {
    // Utilisation du système de prompts existant mais enrichi
    const analyzer = new SmartConflictAnalyzer();
    
    // Analyse enrichie
    const analysis = analyzer.analyzeContext(message);
    
    // Génération de la réponse personnalisée
    let response = '';
    
    // Salutation personnalisée
    if (context === 'salutation') {
      response = generateMultilingualResponse('greeting', language);
      return response;
    }
    
    // Réponse selon le contexte avec personnalisation
    switch (context) {
      case 'familial':
        response = this.generateFamilialResponse(analysis, language);
        break;
      case 'professionnel':
        response = this.generateProfessionnelResponse(analysis, language);
        break;
      case 'amoureux':
        response = this.generateAmoureuxResponse(analysis, language);
        break;
      case 'religieux':
        response = this.generateReligiousResponse(message, language);
        break;
      case 'culturel':
        response = this.generateCulturalResponse(message, language);
        break;
      default:
        response = analyzer.generateSmartResponse(message);
    }
    
    // Citations supprimées - réponses plus directes et utiles
    
    return response;
  }

  private generateFamilialResponse(_analysis: unknown, language: string): string {
    const baseResponse = generateMultilingualResponse('culturalValidation', language);
    
    const familyWisdom = {
      fr: `\n\n💝 **Sagesse Familiale** : Les liens familiaux sont comme les racines d'un arbre - ils nourrissent même quand ils semblent invisibles. Chaque conflit familial est une opportunité de renforcer ces racines avec plus d'amour et de compréhension.`,
      en: `\n\n💝 **Family Wisdom**: Family bonds are like tree roots - they nourish even when they seem invisible. Every family conflict is an opportunity to strengthen these roots with more love and understanding.`,
      es: `\n\n💝 **Sabiduría Familiar**: Los lazos familiares son como las raíces de un árbol - nutren incluso cuando parecen invisibles. Cada conflicto familiar es una oportunidad para fortalecer estas raíces con más amor y comprensión.`
    };
    
    return baseResponse + familyWisdom[language as keyof typeof familyWisdom] || familyWisdom.fr;
  }

  private generateProfessionnelResponse(_analysis: unknown, language: string): string {
    const baseResponse = generateMultilingualResponse('culturalValidation', language);
    
    const workWisdom = {
      fr: `\n\n💼 **Sagesse Professionnelle** : Dans l'espace professionnel, chaque conflit résolu renforce l'équipe tout entière. La collaboration naît de la diversité des perspectives, pas de l'uniformité.`,
      en: `\n\n💼 **Professional Wisdom**: In the professional space, every resolved conflict strengthens the entire team. Collaboration emerges from the diversity of perspectives, not from uniformity.`,
      es: `\n\n💼 **Sabiduría Profesional**: En el espacio profesional, cada conflicto resuelto fortalece a todo el equipo. La colaboración nace de la diversidad de perspectivas, no de la uniformidad.`
    };
    
    return baseResponse + workWisdom[language as keyof typeof workWisdom] || workWisdom.fr;
  }

  private generateAmoureuxResponse(_analysis: unknown, language: string): string {
    const baseResponse = generateMultilingualResponse('culturalValidation', language);
    
    const loveWisdom = {
      fr: `\n\n💕 **Sagesse Amoureuse** : L'amour, comme un jardin, demande attention et soin pour fleurir. Les conflits sont comme la pluie - ils peuvent sembler difficiles, mais ils nourrissent la croissance de votre amour.`,
      en: `\n\n💕 **Love Wisdom**: Love, like a garden, requires attention and care to bloom. Conflicts are like rain - they may seem difficult, but they nourish the growth of your love.`,
      es: `\n\n💕 **Sabiduría del Amor**: El amor, como un jardín, requiere atención y cuidado para florecer. Los conflictos son como la lluvia - pueden parecer difíciles, pero nutren el crecimiento de su amor.`
    };
    
    return baseResponse + loveWisdom[language as keyof typeof loveWisdom] || loveWisdom.fr;
  }

  private generateReligiousResponse(message: string, language: string): string {
    // Utiliser la base de connaissances existante mais enrichie
    const lowerMessage = message.toLowerCase();
    
    if (this.containsAny(lowerMessage, ['juifs', 'juif', 'judaïsme'])) {
      return this.getEnhancedJudaismResponse(language);
    }
    if (this.containsAny(lowerMessage, ['musulmans', 'musulman', 'islam'])) {
      return this.getEnhancedIslamResponse(language);
    }
    if (this.containsAny(lowerMessage, ['chrétiens', 'chrétien', 'christianisme'])) {
      return this.getEnhancedChristianityResponse(language);
    }
    
    return generateMultilingualResponse('culturalValidation', language);
  }

  private generateCulturalResponse(message: string, language: string): string {
    return generateMultilingualResponse('culturalValidation', language);
  }

  private getEnhancedJudaismResponse(language: string): string {
    const baseResponse = `🕍 **Le Judaïsme - Une Tradition Millénaire**

**Qui sont les Juifs ?** Les Juifs sont les membres du peuple juif, qui pratiquent le judaïsme, l'une des plus anciennes religions monothéistes au monde.

**Perspective de Coexistence :**
✨ Le judaïsme enseigne "Tu aimeras ton prochain comme toi-même" (Lévitique 19:18). Cette valeur de respect mutuel est au cœur de la coexistence pacifique.

🤝 **Leçon pour nous tous :** Malgré des siècles de persécutions, les Juifs ont préservé leur identité tout en contribuant au progrès de l'humanité. C'est un exemple de résilience et de coexistence !`;

    const languageSpecific = {
      en: `🕍 **Judaism - A Millennial Tradition**

**Who are the Jews?** Jews are members of the Jewish people, who practice Judaism, one of the world's oldest monotheistic religions.

**Coexistence Perspective:**
✨ Judaism teaches "Love your neighbor as yourself" (Leviticus 19:18). This value of mutual respect is at the heart of peaceful coexistence.

🤝 **Lesson for all of us:** Despite centuries of persecution, Jews have preserved their identity while contributing to human progress. This is an example of resilience and coexistence!`,
      es: `🕍 **El Judaísmo - Una Tradición Milenaria**

**¿Quiénes son los judíos?** Los judíos son miembros del pueblo judío, que practican el judaísmo, una de las religiones monoteístas más antiguas del mundo.

**Perspectiva de Coexistencia:**
✨ El judaísmo enseña "Amarás a tu prójimo como a ti mismo" (Levítico 19:18). Este valor de respeto mutuo está en el corazón de la coexistencia pacífica.

🤝 **Lección para todos nosotros:** A pesar de siglos de persecución, los judíos han preservado su identidad mientras contribuían al progreso humano. ¡Este es un ejemplo de resiliencia y coexistencia!`
    };

    return languageSpecific[language as keyof typeof languageSpecific] || baseResponse;
  }

  private getEnhancedIslamResponse(language: string): string {
    // Réponse enrichie similaire pour l'Islam
    return `🕌 **L'Islam - Une Religion de Paix**

**Perspective de Coexistence :**
✨ Le Coran dit : "Allah ne vous défend pas d'être bienfaisants et équitables envers ceux qui ne vous ont pas combattus" (60:8).

🤝 **Message de Tolérance :** L'islam prône la coexistence pacifique avec les "Gens du Livre" (juifs et chrétiens).`;
  }

  private getEnhancedChristianityResponse(language: string): string {
    // Réponse enrichie similaire pour le Christianisme
    return `⛪ **Le Christianisme - Une Religion d'Amour**

**Perspective de Coexistence :**
✨ Jésus a enseigné : "Heureux les artisans de paix" (Matthieu 5:9). Le christianisme prône l'amour universel et le pardon.

🤝 **Message de Paix :** Malgré des conflits historiques, le cœur du christianisme est l'amour et la réconciliation.`;
  }

  private updateMemory(message: string, context: string, _response: string): void {
    const summary = {
      date: new Date(),
      topic: context,
      context: context as 'familial' | 'professionnel' | 'amoureux' | 'amical' | 'voisinage' | 'général',
      keyInsights: [context, 'réponse personnalisée'],
      emotions: this.extractEmotions(message)
    };
    
    memorySystem.addConversation(this.userId, summary);
  }

  private extractEmotions(message: string): string[] {
    const emotions = [];
    const lowerMessage = message.toLowerCase();
    
    if (this.containsAny(lowerMessage, ['colère', 'énervé', 'frustré', 'furieux'])) emotions.push('colère');
    if (this.containsAny(lowerMessage, ['triste', 'déprimé', 'découragé', 'peine'])) emotions.push('tristesse');
    if (this.containsAny(lowerMessage, ['peur', 'inquiet', 'anxieux', 'stressé'])) emotions.push('peur');
    if (this.containsAny(lowerMessage, ['content', 'heureux', 'joyeux', 'satisfait'])) emotions.push('joie');
    
    return emotions;
  }

  private generateFollowUpSuggestions(context: string, _memory: unknown): string[] {
    const suggestions = {
      familial: [
        "Comment organiser une conversation familiale apaisée ?",
        "Techniques de médiation familiale",
        "Gérer les différences générationnelles"
      ],
      professionnel: [
        "Améliorer la communication en équipe",
        "Gérer les conflits hiérarchiques",
        "Créer un environnement de travail harmonieux"
      ],
      amoureux: [
        "Exercices de couple pour renforcer la relation",
        "Communication non-violente dans le couple",
        "Rituels de réconciliation"
      ],
      religieux: [
        "Comprendre les différences religieuses",
        "Promouvoir le dialogue interreligieux",
        "Valeurs communes entre religions"
      ]
    };
    
    return suggestions[context as keyof typeof suggestions] || [
      "Comment puis-je améliorer ma communication ?",
      "Techniques de résolution de conflits",
      "Développer l'empathie au quotidien"
    ];
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

// Classe existante SmartConflictAnalyzer (simplifiée pour l'intégration)
class SmartConflictAnalyzer {
  analyzeContext(_message: string): { context: string; emotions: string[]; urgency: string } {
    // Analyse simplifiée - dans la vraie implémentation, utiliser la logique existante
    return {
      context: 'général',
      emotions: [],
      urgency: 'low'
    };
  }

  generateSmartResponse(message: string): string {
    // Génération de réponse intelligente basée sur le message
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('torah') || lowerMessage.includes('apprendre')) {
      return `Excellente décision ! La Torah est un trésor de sagesse qui peut enrichir votre vie.

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
    }
    
    if (lowerMessage.includes('salut') || lowerMessage.includes('bonjour') || lowerMessage.includes('ca va')) {
      return "Salut ! Ça va très bien, merci ! Je suis là pour vous aider avec vos questions et défis. Que puis-je faire pour vous aujourd'hui ?";
    }
    
    return "C'est une question intéressante ! Je suis là pour vous aider à trouver des solutions pratiques et utiles. Pouvez-vous me donner plus de détails sur ce qui vous préoccupe ?";
  }
}

// Fonction principale de l'API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, useDemo, userId, language, culturalBackground, religiousBackground } = RequestSchema.parse(body);

    // Générer un userId si non fourni
    const finalUserId = userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Détecter la langue si non fournie
    const finalLanguage = language || detectLanguage(message);

    if (useDemo) {
      // Utiliser le nouveau système de sagesse universelle
      const wisdomAI = new UniversalWisdomAI(
        finalUserId, 
        finalLanguage, 
        culturalBackground, 
        religiousBackground
      );
      
      const enhancedResponse = await wisdomAI.generateResponse(message);
      
      return NextResponse.json(enhancedResponse);
    }

    // Mode OpenAI (inchangé pour l'instant)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Clé API OpenAI manquante. Utilisez le mode démo." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

    return NextResponse.json({
      response,
      mode: 'openai',
      timestamp: new Date().toISOString(),
      personalized: false,
      language: finalLanguage
    });

  } catch (error) {
    console.error('Erreur dans l\'API COEXIST.AI:', error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
