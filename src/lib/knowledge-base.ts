/**
 * COEXIST.AI - Base de Connaissances et Système de Mémoire
 * RAG (Retrieval Augmented Generation) pour la Sagesse Universelle
 */

export interface UserMemory {
  id: string;
  name?: string;
  preferredLanguage: string;
  culturalBackground?: string;
  religiousBackground?: string;
  previousConversations: ConversationSummary[];
  conflictHistory: ConflictRecord[];
  preferences: UserPreferences;
  lastInteraction: Date;
  relationshipStatus: 'new' | 'returning' | 'frequent';
}

export interface ConversationSummary {
  id: string;
  date: Date;
  topic: string;
  context: 'conflict' | 'education' | 'general' | 'emergency';
  resolution?: string;
  keyInsights: string[];
  emotions: string[];
}

export interface ConflictRecord {
  id: string;
  type: 'familial' | 'professionnel' | 'amoureux' | 'amical' | 'voisinage' | 'général';
  status: 'ongoing' | 'resolved' | 'escalated';
  description: string;
  parties: string[];
  solutions: string[];
  outcome?: string;
  dateStarted: Date;
  lastUpdate: Date;
}

export interface UserPreferences {
  communicationStyle: 'direct' | 'gentle' | 'poetic' | 'analytical';
  preferredQuoteStyle: 'religious' | 'philosophical' | 'practical' | 'inspiring';
  culturalSensitivity: string[];
  language: string;
  timezone?: string;
}

export interface KnowledgeEntry {
  id: string;
  category: 'religion' | 'culture' | 'conflict_resolution' | 'peace_philosophy' | 'practical_tools';
  title: string;
  content: string;
  tags: string[];
  culturalContext?: string[];
  religiousContext?: string[];
  applicableConflicts: string[];
  citations: string[];
  effectiveness: number; // 0-1 score
  usageCount: number;
}

// Base de connaissances statique
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'conflict-communication-nvc',
    category: 'conflict_resolution',
    title: 'Communication Non-Violente (CNV)',
    content: `La Communication Non-Violente (CNV) développée par Marshall Rosenberg est une méthode de communication qui vise à établir des relations harmonieuses. Elle se base sur 4 étapes :
    
    1. **Observation** : Décrire les faits sans jugement
    2. **Sentiments** : Exprimer ses émotions authentiques
    3. **Besoins** : Identifier les besoins universels sous-jacents
    4. **Demande** : Formuler une demande concrète et positive
    
    **Exemple :** "Quand je vois que tu arrives en retard (observation), je me sens inquiète (sentiment) parce que j'ai besoin de sécurité et de fiabilité (besoin). Serais-tu d'accord pour m'appeler si tu prévois d'être en retard ? (demande)"`,
    tags: ['communication', 'empathie', 'résolution', 'marshall_rosenberg'],
    culturalContext: ['occidentale', 'universelle'],
    applicableConflicts: ['familial', 'professionnel', 'amoureux', 'amical'],
    citations: ['Marshall Rosenberg - Les mots sont des fenêtres'],
    effectiveness: 0.9,
    usageCount: 0
  },
  
  {
    id: 'mediation-7-steps',
    category: 'conflict_resolution',
    title: 'Médiation en 7 Étapes',
    content: `La médiation traditionnelle suit généralement ces étapes :
    
    1. **Préparation** : Établir les règles, créer un environnement sûr
    2. **Écoute des parties** : Chaque partie s'exprime sans interruption
    3. **Clarification** : Reformuler, poser des questions de clarification
    4. **Identification des enjeux** : Distinguer positions et intérêts
    5. **Génération d'options** : Brainstorming de solutions possibles
    6. **Évaluation et négociation** : Analyser les options, négocier
    7. **Accord et suivi** : Formaliser l'accord, prévoir le suivi`,
    tags: ['médiation', 'structure', 'processus'],
    culturalContext: ['universelle'],
    applicableConflicts: ['familial', 'professionnel', 'voisinage'],
    citations: ['Techniques de médiation - William Ury'],
    effectiveness: 0.85,
    usageCount: 0
  },

  {
    id: 'peace-circle-indigenous',
    category: 'culture',
    title: 'Cercles de Paix - Tradition Amérindienne',
    content: `Les cercles de paix sont une tradition amérindienne qui utilise un objet sacré (bâton de parole, plume, pierre) pour faciliter la communication. 
    
    **Principes :**
    - Seul celui qui tient l'objet peut parler
    - Tous les autres écoutent avec respect
    - Pas d'interruption ni de commentaires
    - Chacun parle de son cœur, pas de sa tête
    - Le cercle crée l'égalité entre tous
    
    **Application moderne :**
    - Utiliser un objet symbolique (bâton, livre, objet personnel)
    - Créer un espace sacré (bougies, silence)
    - Commencer par une intention de paix
    - Terminer par une action concrète`,
    tags: ['tradition', 'amérindien', 'cercle', 'sacré'],
    culturalContext: ['amérindienne', 'spirituelle'],
    applicableConflicts: ['familial', 'amical', 'voisinage'],
    citations: ['Traditions amérindiennes de médiation'],
    effectiveness: 0.8,
    usageCount: 0
  },

  {
    id: 'ubuntu-philosophy',
    category: 'peace_philosophy',
    title: 'Ubuntu - "Je suis parce que nous sommes"',
    content: `Ubuntu est une philosophie africaine qui signifie "humanité envers les autres" ou "je suis parce que nous sommes".
    
    **Principes clés :**
    - L'identité individuelle est liée à la communauté
    - Le bien-être de l'individu dépend du bien-être de tous
    - La compassion et le partage sont naturels
    - Les conflits se résolvent par la restauration des relations
    - L'harmonie communautaire prime sur les intérêts individuels
    
    **Application aux conflits :**
    - Se concentrer sur la restauration des relations
    - Impliquer la communauté dans la résolution
    - Rechercher la réconciliation plutôt que la punition
    - Valoriser la dignité de tous les partis`,
    tags: ['africain', 'communauté', 'harmonie', 'réconciliation'],
    culturalContext: ['africaine', 'collectiviste'],
    applicableConflicts: ['familial', 'voisinage', 'communauté'],
    citations: ['Desmond Tutu - Ubuntu', 'Philosophie africaine traditionnelle'],
    effectiveness: 0.85,
    usageCount: 0
  },

  {
    id: 'mindfulness-conflict',
    category: 'practical_tools',
    title: 'Pleine Conscience dans les Conflits',
    content: `La pleine conscience peut transformer la façon dont nous gérons les conflits :
    
    **Techniques de base :**
    1. **Respiration consciente** : 3 respirations profondes avant de répondre
    2. **Observation des émotions** : Reconnaître sans juger
    3. **Pause consciente** : Prendre du temps avant de réagir
    4. **Écoute active** : Être pleinement présent à l'autre
    
    **Exercice "STOP" :**
    - **S**top : Arrêter ce que vous faites
    - **T**ake a breath : Prendre une respiration
    - **O**bserve : Observer vos pensées et émotions
    - **P**roceed : Procéder avec conscience
    
    **Application pratique :**
    - Utiliser la méditation guidée avant les conversations difficiles
    - Pratiquer la gratitude pour réduire la colère
    - Cultiver la compassion envers soi et l'autre`,
    tags: ['mindfulness', 'méditation', 'conscience', 'émotions'],
    culturalContext: ['bouddhiste', 'universelle'],
    applicableConflicts: ['familial', 'professionnel', 'amoureux', 'amical'],
    citations: ['Thich Nhat Hanh - La paix en soi', 'Jon Kabat-Zinn - Mindfulness'],
    effectiveness: 0.88,
    usageCount: 0
  },

  {
    id: 'restorative-justice',
    category: 'conflict_resolution',
    title: 'Justice Réparatrice',
    content: `La justice réparatrice se concentre sur la réparation des dommages et la restauration des relations plutôt que sur la punition.
    
    **Principes :**
    - Reconnaître le tort causé
    - Comprendre l'impact sur les victimes
    - Prendre la responsabilité de ses actes
    - Réparer dans la mesure du possible
    - Réintégrer dans la communauté
    
    **Processus :**
    1. **Reconnaissance** : L'auteur reconnaît ses actes
    2. **Empathie** : Comprendre l'impact sur les autres
    3. **Responsabilité** : Prendre la responsabilité
    4. **Réparation** : Actions concrètes de réparation
    5. **Réintégration** : Retour dans la communauté
    
    **Application :**
    - Conflits familiaux (réconciliation parent-enfant)
    - Harcèlement scolaire (restauration des relations)
    - Conflits de voisinage (réparation des dommages)`,
    tags: ['justice', 'réparation', 'réconciliation', 'responsabilité'],
    culturalContext: ['occidentale', 'maori', 'universelle'],
    applicableConflicts: ['familial', 'voisinage', 'communauté'],
    citations: ['Howard Zehr - Justice réparatrice', 'Traditions maori'],
    effectiveness: 0.82,
    usageCount: 0
  }
];

// Système de mémoire utilisateur (simulé - dans un vrai système, utiliser une base de données)
export class MemorySystem {
  private userMemories: Map<string, UserMemory> = new Map();
  
  // Récupérer ou créer la mémoire utilisateur
  getUserMemory(userId: string): UserMemory {
    if (!this.userMemories.has(userId)) {
      this.userMemories.set(userId, {
        id: userId,
        preferredLanguage: 'fr',
        previousConversations: [],
        conflictHistory: [],
        preferences: {
          communicationStyle: 'gentle',
          preferredQuoteStyle: 'inspiring',
          culturalSensitivity: [],
          language: 'fr'
        },
        lastInteraction: new Date(),
        relationshipStatus: 'new'
      });
    }
    return this.userMemories.get(userId)!;
  }
  
  // Mettre à jour la mémoire utilisateur
  updateUserMemory(userId: string, updates: Partial<UserMemory>): void {
    const memory = this.getUserMemory(userId);
    Object.assign(memory, updates);
    memory.lastInteraction = new Date();
    
    // Déterminer le statut de relation
    const conversationCount = memory.previousConversations.length;
    if (conversationCount === 0) {
      memory.relationshipStatus = 'new';
    } else if (conversationCount < 5) {
      memory.relationshipStatus = 'returning';
    } else {
      memory.relationshipStatus = 'frequent';
    }
  }
  
  // Ajouter une conversation
  addConversation(userId: string, summary: Omit<ConversationSummary, 'id'>): void {
    const memory = this.getUserMemory(userId);
    const conversation: ConversationSummary = {
      id: `conv_${Date.now()}`,
      ...summary
    };
    memory.previousConversations.push(conversation);
    
    // Garder seulement les 10 dernières conversations
    if (memory.previousConversations.length > 10) {
      memory.previousConversations = memory.previousConversations.slice(-10);
    }
  }
  
  // Rechercher dans la base de connaissances
  searchKnowledge(query: string, context?: string): KnowledgeEntry[] {
    const lowerQuery = query.toLowerCase();
    
    return KNOWLEDGE_BASE
      .filter(entry => {
        const matchesContent = entry.content.toLowerCase().includes(lowerQuery);
        const matchesTags = entry.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        const matchesTitle = entry.title.toLowerCase().includes(lowerQuery);
        
        if (context) {
          const matchesContext = entry.applicableConflicts.includes(context) ||
                                entry.culturalContext?.includes(context) ||
                                entry.religiousContext?.includes(context);
          return (matchesContent || matchesTags || matchesTitle) && matchesContext;
        }
        
        return matchesContent || matchesTags || matchesTitle;
      })
      .sort((a, b) => b.effectiveness - a.effectiveness)
      .slice(0, 3); // Retourner les 3 meilleures correspondances
  }
  
  // Obtenir une citation inspirante adaptée au contexte
  getInspirationalQuote(context: string, userPreferences?: UserPreferences): string {
    const quotes = KNOWLEDGE_BASE.filter(entry => entry.category === 'peace_philosophy');
    
    if (userPreferences?.preferredQuoteStyle) {
      // Filtrer selon les préférences utilisateur
      // (logique simplifiée)
    }
    
    // Retourner une citation adaptée au contexte
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote.content;
  }
}

// Instance globale du système de mémoire
export const memorySystem = new MemorySystem();

// Fonctions utilitaires pour l'intégration
export function generatePersonalizedGreeting(userId: string): string {
  const memory = memorySystem.getUserMemory(userId);
  const { name, relationshipStatus, preferredLanguage } = memory;
  
  const greetings = {
    fr: {
      new: name ? `Bonjour ${name} ! Je suis ravi de faire votre connaissance.` : 'Bonjour ! Je suis ravi de faire votre connaissance.',
      returning: name ? `Bonjour ${name} ! C\'est un plaisir de vous revoir.` : 'Bonjour ! C\'est un plaisir de vous revoir.',
      frequent: name ? `Salut ${name} ! Toujours là pour vous accompagner.` : 'Salut ! Toujours là pour vous accompagner.'
    },
    en: {
      new: name ? `Hello ${name}! I'm delighted to meet you.` : 'Hello! I\'m delighted to meet you.',
      returning: name ? `Hello ${name}! It\'s a pleasure to see you again.` : 'Hello! It\'s a pleasure to see you again.',
      frequent: name ? `Hey ${name}! Always here to support you.` : 'Hey! Always here to support you.'
    }
  };
  
  return greetings[preferredLanguage as keyof typeof greetings]?.[relationshipStatus] || greetings.fr.new;
}

export function getContextualAdvice(userId: string, conflictType: string): KnowledgeEntry[] {
  const memory = memorySystem.getUserMemory(userId);
  const { culturalBackground, religiousBackground } = memory;
  
  // Rechercher des conseils adaptés au contexte culturel et religieux
  let advice = memorySystem.searchKnowledge(conflictType, conflictType);
  
  // Filtrer selon le contexte culturel si disponible
  if (culturalBackground) {
    advice = advice.filter(entry => 
      entry.culturalContext?.includes(culturalBackground) || 
      entry.culturalContext?.includes('universelle')
    );
  }
  
  // Filtrer selon le contexte religieux si disponible
  if (religiousBackground) {
    advice = advice.filter(entry => 
      entry.religiousContext?.includes(religiousBackground) ||
      entry.religiousContext?.length === 0
    );
  }
  
  return advice;
}
