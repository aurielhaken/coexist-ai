interface LearningData {
  id: string;
  timestamp: string;
  userMessage: string;
  aiResponse: string;
  userFeedback?: 'positive' | 'negative' | 'neutral';
  context: string;
  emotions: string[];
  language: string;
  effectiveness: number; // 0-100
  improvements?: string[];
}

interface KnowledgePattern {
  pattern: string;
  context: string;
  effectiveResponse: string;
  successRate: number;
  usageCount: number;
  lastUsed: string;
}

class LearningSystem {
  private learningData: LearningData[] = [];
  private knowledgePatterns: KnowledgePattern[] = [];
  private userFeedback: Map<string, 'positive' | 'negative' | 'neutral'> = new Map();

  // Enregistrer une interaction pour l'apprentissage
  recordInteraction(
    userMessage: string,
    aiResponse: string,
    context: string,
    emotions: string[],
    language: string
  ): string {
    const interaction: LearningData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userMessage,
      aiResponse,
      context,
      emotions,
      language,
      effectiveness: 50 // Valeur par défaut
    };

    this.learningData.push(interaction);
    this.saveLearningData();
    
    return interaction.id;
  }

  // Enregistrer le feedback utilisateur
  recordFeedback(interactionId: string, feedback: 'positive' | 'negative' | 'neutral'): void {
    this.userFeedback.set(interactionId, feedback);
    
    // Mettre à jour l'efficacité basée sur le feedback
    const interaction = this.learningData.find(i => i.id === interactionId);
    if (interaction) {
      switch (feedback) {
        case 'positive':
          interaction.effectiveness = Math.min(100, interaction.effectiveness + 20);
          break;
        case 'negative':
          interaction.effectiveness = Math.max(0, interaction.effectiveness - 20);
          break;
        case 'neutral':
          interaction.effectiveness = Math.max(0, interaction.effectiveness - 5);
          break;
      }
    }
    
    this.saveLearningData();
  }

  // Analyser les patterns d'apprentissage
  analyzePatterns(): KnowledgePattern[] {
    const patterns: KnowledgePattern[] = [];
    
    // Grouper les interactions similaires
    const groupedInteractions = this.groupSimilarInteractions();
    
    groupedInteractions.forEach(group => {
      if (group.length >= 3) { // Au moins 3 interactions similaires
        const avgEffectiveness = group.reduce((sum, i) => sum + i.effectiveness, 0) / group.length;
        
        if (avgEffectiveness >= 70) { // Patterns efficaces
          const pattern: KnowledgePattern = {
            pattern: this.extractPattern(group[0].userMessage),
            context: group[0].context,
            effectiveResponse: this.findBestResponse(group),
            successRate: avgEffectiveness,
            usageCount: group.length,
            lastUsed: group[group.length - 1].timestamp
          };
          
          patterns.push(pattern);
        }
      }
    });
    
    this.knowledgePatterns = patterns;
    this.saveKnowledgePatterns();
    
    return patterns;
  }

  // Trouver des réponses similaires efficaces
  findSimilarEffectiveResponses(message: string, context: string): string[] {
    const similarPatterns = this.knowledgePatterns.filter(pattern => 
      pattern.context === context && 
      this.isSimilarMessage(message, pattern.pattern)
    );
    
    return similarPatterns
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 3)
      .map(pattern => pattern.effectiveResponse);
  }

  // Enrichir la base de connaissances
  enrichKnowledgeBase(newKnowledge: {
    title: string;
    content: string;
    keywords: string[];
    context: string[];
    source: string;
    effectiveness: number;
  }): void {
    // Cette fonction enrichit la base de connaissances existante
    console.log(`📚 Nouvelle connaissance ajoutée: ${newKnowledge.title}`);
    
    // Dans une vraie implémentation, on sauvegarderait dans la base de données
    // Pour l'instant, on log l'enrichissement
    this.logKnowledgeEnrichment(newKnowledge);
  }

  // Auto-amélioration des réponses
  autoImproveResponse(
    originalResponse: string,
    context: string,
    userMessage: string
  ): string {
    // Trouver des réponses similaires plus efficaces
    const similarResponses = this.findSimilarEffectiveResponses(userMessage, context);
    
    if (similarResponses.length > 0) {
      // Analyser les meilleures réponses
      const bestResponse = similarResponses[0];
      const improvements = this.identifyImprovements(originalResponse, bestResponse);
      
      if (improvements.length > 0) {
        console.log(`🔄 Amélioration automatique appliquée: ${improvements.join(', ')}`);
        return this.applyImprovements(originalResponse, improvements);
      }
    }
    
    return originalResponse;
  }

  // Apprentissage des préférences utilisateur
  learnUserPreferences(
    userId: string,
    preferences: {
      communicationStyle: 'formal' | 'casual' | 'empathic' | 'direct';
      responseLength: 'short' | 'medium' | 'long';
      language: string;
      topics: string[];
    }
  ): void {
    // Sauvegarder les préférences utilisateur
    const userPrefs = {
      userId,
      preferences,
      lastUpdated: new Date().toISOString(),
      interactionCount: this.getUserInteractionCount(userId)
    };
    
    this.saveUserPreferences(userPrefs);
  }

  // Générer des insights d'apprentissage
  generateLearningInsights(): {
    totalInteractions: number;
    averageEffectiveness: number;
    topPatterns: KnowledgePattern[];
    improvementAreas: string[];
    userSatisfaction: number;
  } {
    const totalInteractions = this.learningData.length;
    const averageEffectiveness = this.learningData.length > 0 
      ? this.learningData.reduce((sum, i) => sum + i.effectiveness, 0) / this.learningData.length
      : 0;
    
    const topPatterns = this.knowledgePatterns
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);
    
    const improvementAreas = this.identifyImprovementAreas();
    const userSatisfaction = this.calculateUserSatisfaction();
    
    return {
      totalInteractions,
      averageEffectiveness,
      topPatterns,
      improvementAreas,
      userSatisfaction
    };
  }

  // Méthodes privées
  private groupSimilarInteractions(): LearningData[][] {
    // Logique de regroupement des interactions similaires
    const groups: LearningData[][] = [];
    const processed = new Set<string>();
    
    this.learningData.forEach(interaction => {
      if (processed.has(interaction.id)) return;
      
      const similar = this.learningData.filter(other => 
        other.id !== interaction.id &&
        !processed.has(other.id) &&
        this.isSimilarMessage(interaction.userMessage, other.userMessage) &&
        interaction.context === other.context
      );
      
      if (similar.length > 0) {
        groups.push([interaction, ...similar]);
        similar.forEach(s => processed.add(s.id));
      }
      
      processed.add(interaction.id);
    });
    
    return groups;
  }

  private extractPattern(message: string): string {
    // Extraire le pattern principal du message
    return message.toLowerCase()
      .replace(/\d+/g, 'NUMBER')
      .replace(/[^\w\s]/g, '')
      .trim();
  }

  private isSimilarMessage(msg1: string, msg2: string): boolean {
    // Vérifier si deux messages sont similaires
    const similarity = this.calculateSimilarity(msg1.toLowerCase(), msg2.toLowerCase());
    return similarity > 0.7;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // Calcul de similarité simple (Jaccard)
    const words1 = new Set(str1.split(' '));
    const words2 = new Set(str2.split(' '));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }

  private findBestResponse(interactions: LearningData[]): string {
    // Trouver la meilleure réponse parmi un groupe d'interactions
    const sorted = interactions.sort((a, b) => b.effectiveness - a.effectiveness);
    return sorted[0].aiResponse;
  }

  private identifyImprovements(original: string, best: string): string[] {
    const improvements: string[] = [];
    
    // Analyser les différences et identifier les améliorations
    if (best.length > original.length * 1.2) {
      improvements.push('Réponse plus détaillée');
    }
    
    if (best.includes('💡') && !original.includes('💡')) {
      improvements.push('Ajout d\'insights visuels');
    }
    
    if (best.includes('Comment') && !original.includes('Comment')) {
      improvements.push('Ajout de suggestions pratiques');
    }
    
    return improvements;
  }

  private applyImprovements(response: string, improvements: string[]): string {
    let improvedResponse = response;
    
    if (improvements.includes('Réponse plus détaillée')) {
      improvedResponse += '\n\n💡 **Conseil supplémentaire** : N\'hésitez pas à explorer différentes approches pour trouver celle qui vous convient le mieux.';
    }
    
    if (improvements.includes('Ajout d\'insights visuels')) {
      improvedResponse = improvedResponse.replace(/\./g, ' ✨');
    }
    
    if (improvements.includes('Ajout de suggestions pratiques')) {
      improvedResponse += '\n\n🤝 **Prochaine étape** : Comment puis-je vous aider davantage dans cette situation ?';
    }
    
    return improvedResponse;
  }

  private identifyImprovementAreas(): string[] {
    const areas: string[] = [];
    
    // Analyser les interactions moins efficaces
    const lowEffectiveness = this.learningData.filter(i => i.effectiveness < 60);
    
    if (lowEffectiveness.length > this.learningData.length * 0.3) {
      areas.push('Améliorer la pertinence des réponses');
    }
    
    // Analyser les contextes difficiles
    const contextStats = this.getContextStatistics();
    Object.entries(contextStats).forEach(([context, stats]) => {
      if (stats.averageEffectiveness < 70) {
        areas.push(`Améliorer les réponses pour le contexte: ${context}`);
      }
    });
    
    return areas;
  }

  private calculateUserSatisfaction(): number {
    const feedbacks = Array.from(this.userFeedback.values());
    if (feedbacks.length === 0) return 50;
    
    const positive = feedbacks.filter(f => f === 'positive').length;
    const total = feedbacks.length;
    
    return (positive / total) * 100;
  }

  private getContextStatistics(): Record<string, { count: number; averageEffectiveness: number }> {
    const stats: Record<string, { count: number; averageEffectiveness: number }> = {};
    
    this.learningData.forEach(interaction => {
      if (!stats[interaction.context]) {
        stats[interaction.context] = { count: 0, averageEffectiveness: 0 };
      }
      stats[interaction.context].count++;
      stats[interaction.context].averageEffectiveness += interaction.effectiveness;
    });
    
    Object.keys(stats).forEach(context => {
      stats[context].averageEffectiveness /= stats[context].count;
    });
    
    return stats;
  }

  private getUserInteractionCount(userId: string): number {
    return this.learningData.filter(i => i.context.includes(userId)).length;
  }

  private saveLearningData(): void {
    localStorage.setItem('coexist-learning-data', JSON.stringify(this.learningData));
  }

  private saveKnowledgePatterns(): void {
    localStorage.setItem('coexist-knowledge-patterns', JSON.stringify(this.knowledgePatterns));
  }

  private saveUserPreferences(prefs: any): void {
    localStorage.setItem(`coexist-user-prefs-${prefs.userId}`, JSON.stringify(prefs));
  }

  private logKnowledgeEnrichment(knowledge: any): void {
    console.log('📚 Enrichissement de la base de connaissances:', knowledge);
  }
}

// Instance globale du système d'apprentissage
export const learningSystem = new LearningSystem();

// Fonctions utilitaires exportées
export const recordInteraction = (userMessage: string, aiResponse: string, context: string, emotions: string[], language: string) => {
  return learningSystem.recordInteraction(userMessage, aiResponse, context, emotions, language);
};

export const recordFeedback = (interactionId: string, feedback: 'positive' | 'negative' | 'neutral') => {
  learningSystem.recordFeedback(interactionId, feedback);
};

export const getLearningInsights = () => {
  return learningSystem.generateLearningInsights();
};

export const autoImproveResponse = (response: string, context: string, userMessage: string) => {
  return learningSystem.autoImproveResponse(response, context, userMessage);
};
