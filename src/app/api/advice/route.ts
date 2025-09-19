import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';

// Schéma de validation pour la requête
const RequestSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide"),
  useDemo: z.boolean().optional().default(true)
});

// Règles de coexistence COEXIST.AI
const COEXIST_RULES = `
Tu es COEXIST.AI, un assistant spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique.

RÈGLES FONDAMENTALES DE COEXISTENCE :

1. **ÉCOUTE ACTIVE** : Toujours chercher à comprendre tous les points de vue avant de juger
2. **EMPATHIE** : Reconnaître les émotions et besoins de chaque partie
3. **RESPECT MUTUEL** : Traiter chaque personne avec dignité, indépendamment des désaccords
4. **COMMUNICATION NON-VIOLENTE** : Utiliser un langage constructif et éviter les accusations
5. **RECHERCHE DE SOLUTIONS** : Se concentrer sur des solutions gagnant-gagnant
6. **PATIENCE** : Comprendre que la résolution de conflits prend du temps
7. **MÉDIATION** : Agir comme un pont entre les parties en conflit
8. **TOLÉRANCE** : Accepter les différences culturelles, religieuses et idéologiques
9. **JUSTICE** : Promouvoir l'équité et la fairness dans toutes les situations
10. **PAIX** : Toujours privilégier les solutions pacifiques aux confrontations

APPROCHE MÉTHODOLOGIQUE :
- Analyser le contexte et les enjeux
- Identifier les besoins sous-jacents de chaque partie
- Proposer des stratégies de communication
- Suggérer des compromis constructifs
- Encourager le dialogue et la compréhension mutuelle

Réponds toujours en français avec compassion, sagesse et pragmatisme.
`;

// Système d'analyse contextuelle avancée
interface ConflictAnalysis {
  context: string;
  emotions: string[];
  stakeholders: string[];
  issues: string[];
  urgency: 'low' | 'medium' | 'high';
}

class SmartConflictAnalyzer {
  private analyzeContext(message: string): ConflictAnalysis {
    const lowerMessage = message.toLowerCase();
    
    // Détection du contexte
    let context = 'général';
    if (this.containsAny(lowerMessage, ['famille', 'parent', 'enfant', 'frère', 'sœur', 'mère', 'père', 'maman', 'papa', 'grands-parents'])) {
      context = 'familial';
    } else if (this.containsAny(lowerMessage, ['travail', 'collègue', 'patron', 'chef', 'bureau', 'équipe', 'projet', 'réunion', 'entreprise'])) {
      context = 'professionnel';
    } else if (this.containsAny(lowerMessage, ['couple', 'conjoint', 'mari', 'femme', 'copain', 'copine', 'amoureux', 'relation', 'mariage'])) {
      context = 'amoureux';
    } else if (this.containsAny(lowerMessage, ['ami', 'amitié', 'copain', 'copine', 'pote', 'groupe'])) {
      context = 'amical';
    } else if (this.containsAny(lowerMessage, ['voisin', 'quartier', 'immeuble', 'bruit', 'parking'])) {
      context = 'voisinage';
    }

    // Détection des émotions
    const emotions: string[] = [];
    if (this.containsAny(lowerMessage, ['colère', 'énervé', 'furieux', 'rage', 'irrité'])) emotions.push('colère');
    if (this.containsAny(lowerMessage, ['triste', 'déprimé', 'blessé', 'peine', 'mal'])) emotions.push('tristesse');
    if (this.containsAny(lowerMessage, ['peur', 'anxieux', 'inquiet', 'stressé', 'angoissé'])) emotions.push('peur');
    if (this.containsAny(lowerMessage, ['frustré', 'bloqué', 'incompris', 'ignoré'])) emotions.push('frustration');
    if (this.containsAny(lowerMessage, ['déçu', 'trahis', 'abandonné'])) emotions.push('déception');

    // Détection des parties prenantes
    const stakeholders: string[] = [];
    if (this.containsAny(lowerMessage, ['je', 'moi', 'mon', 'ma', 'mes'])) stakeholders.push('vous');
    if (this.containsAny(lowerMessage, ['il', 'elle', 'lui', 'son', 'sa', 'ses'])) stakeholders.push('autre personne');
    if (this.containsAny(lowerMessage, ['nous', 'notre', 'nos'])) stakeholders.push('groupe');

    // Détection des problèmes
    const issues: string[] = [];
    if (this.containsAny(lowerMessage, ['communication', 'parler', 'écouter', 'comprendre'])) issues.push('communication');
    if (this.containsAny(lowerMessage, ['argent', 'finances', 'budget', 'dépenses'])) issues.push('finances');
    if (this.containsAny(lowerMessage, ['temps', 'disponibilité', 'présence'])) issues.push('temps');
    if (this.containsAny(lowerMessage, ['respect', 'considération', 'reconnaissance'])) issues.push('respect');
    if (this.containsAny(lowerMessage, ['confiance', 'mensonge', 'tromperie', 'secret'])) issues.push('confiance');

    // Évaluation de l'urgence
    let urgency: 'low' | 'medium' | 'high' = 'medium';
    if (this.containsAny(lowerMessage, ['urgent', 'crise', 'grave', 'terrible', 'catastrophe', 'immédiat'])) {
      urgency = 'high';
    } else if (this.containsAny(lowerMessage, ['léger', 'petit', 'mineur', 'pas grave'])) {
      urgency = 'low';
    }

    return { context, emotions, stakeholders, issues, urgency };
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  generateSmartResponse(message: string): string {
    const analysis = this.analyzeContext(message);
    
    // Réponse personnalisée basée sur l'analyse
    let response = this.getContextualIntro(analysis);
    response += '\n\n' + this.getEmotionalValidation(analysis);
    response += '\n\n' + this.getSpecificAdvice(analysis);
    response += '\n\n' + this.getActionPlan(analysis);
    
    return response;
  }

  private getContextualIntro(analysis: ConflictAnalysis): string {
    const intros = {
      familial: "Les liens familiaux sont précieux et méritent qu'on investisse du temps pour les préserver. Je comprends que les conflits familiaux peuvent être particulièrement douloureux car ils touchent au cœur de nos relations les plus importantes.",
      professionnel: "L'environnement professionnel présente des défis uniques en matière de relations humaines. Il est essentiel de maintenir un équilibre entre efficacité et harmonie dans l'équipe.",
      amoureux: "Les relations amoureuses sont le fondement de notre épanouissement personnel. Chaque défi dans un couple est une opportunité de renforcer votre lien et de mieux vous comprendre mutuellement.",
      amical: "L'amitié authentique est un trésor rare. Les conflits entre amis, bien que douloureux, peuvent souvent être résolus avec de la patience et de la sincérité.",
      voisinage: "La vie en communauté nécessite des compromis et du respect mutuel. Les conflits de voisinage peuvent souvent être résolus par le dialogue et la recherche de solutions créatives.",
      général: "Chaque situation conflictuelle est unique et mérite une approche personnalisée. Je vais vous accompagner dans cette démarche de résolution."
    };
    return intros[analysis.context] || intros.général;
  }

  private getEmotionalValidation(analysis: ConflictAnalysis): string {
    if (analysis.emotions.length === 0) {
      return "Vos sentiments dans cette situation sont légitimes et méritent d'être entendus.";
    }

    const emotionResponses = {
      colère: "Votre colère est compréhensible et révèle probablement des besoins non satisfaits. Utilisons cette énergie de manière constructive.",
      tristesse: "La tristesse que vous ressentez montre à quel point cette relation vous tient à cœur. C'est un signe de votre capacité d'empathie.",
      peur: "Il est naturel de ressentir de l'appréhension face à l'incertitude. Identifions ensemble ce qui vous préoccupe vraiment.",
      frustration: "Votre frustration indique que vous avez essayé plusieurs approches. Explorons de nouvelles stratégies ensemble.",
      déception: "La déception révèle que vous aviez des attentes légitimes. Voyons comment les communiquer plus efficacement."
    };

    const validations = analysis.emotions.map(emotion => emotionResponses[emotion]).filter(Boolean);
    return validations.length > 0 ? validations.join(' ') : "Vos émotions sont valides et importantes dans ce processus.";
  }

  private getSpecificAdvice(analysis: ConflictAnalysis): string {
    const adviceMap = {
      communication: "🗣️ **Communication**: Proposez un moment calme pour échanger. Utilisez des 'messages-je' : 'Je ressens... quand... parce que j'ai besoin de...'",
      finances: "💰 **Finances**: Établissez un budget transparent ensemble. Les questions d'argent touchent souvent à des valeurs plus profondes comme la sécurité et l'autonomie.",
      temps: "⏰ **Temps**: Créez un planning partagé qui respecte les besoins de chacun. La qualité du temps passé ensemble compte plus que la quantité.",
      respect: "🤝 **Respect**: Définissez ensemble vos limites et vos attentes. Le respect mutuel est la base de toute relation saine.",
      confiance: "🔒 **Confiance**: La reconstruction de la confiance demande du temps et de la cohérence. Commencez par de petits engagements tenus."
    };

    const relevantAdvice = analysis.issues.map(issue => adviceMap[issue]).filter(Boolean);
    return relevantAdvice.length > 0 ? relevantAdvice.join('\n\n') : "Concentrez-vous sur l'écoute active et l'expression de vos besoins de manière non-violente.";
  }

  private getActionPlan(analysis: ConflictAnalysis): string {
    const urgencyPlans = {
      high: "**Plan d'action immédiat** :\n1. Prenez une pause si les émotions sont trop intenses\n2. Contactez un médiateur professionnel si nécessaire\n3. Organisez une discussion dans les 24h avec des règles claires",
      medium: "**Prochaines étapes** :\n1. Réfléchissez à vos vrais besoins dans cette situation\n2. Choisissez le bon moment pour une conversation calme\n3. Préparez des solutions concrètes à proposer",
      low: "**Approche progressive** :\n1. Observez la situation avec bienveillance\n2. Cherchez des opportunités naturelles de dialogue\n3. Renforcez les aspects positifs de la relation"
    };

    const followUpQuestions = this.generateFollowUpQuestions(analysis);
    
    return urgencyPlans[analysis.urgency] + "\n\n💡 **Rappelez-vous** : Chaque petit pas vers la compréhension mutuelle est une victoire." + followUpQuestions;
  }

  private generateFollowUpQuestions(analysis: ConflictAnalysis): string {
    const questions: string[] = [];
    
    // Questions spécifiques au contexte
    const contextQuestions = {
      familial: [
        "Depuis combien de temps cette tension existe-t-elle dans votre famille ?",
        "Y a-t-il eu un événement déclencheur particulier ?",
        "Quels sont les moments où vous vous entendez bien ensemble ?"
      ],
      professionnel: [
        "Cette situation affecte-t-elle votre productivité ou celle de l'équipe ?",
        "Avez-vous des objectifs professionnels communs que vous pourriez utiliser comme point de départ ?",
        "Y a-t-il une hiérarchie impliquée dans ce conflit ?"
      ],
      amoureux: [
        "Vous souvenez-vous de ce qui vous a rapprochés au début ?",
        "Avez-vous déjà traversé des difficultés similaires ensemble ?",
        "Êtes-vous tous les deux prêts à faire des efforts pour améliorer la situation ?"
      ],
      amical: [
        "Cette amitié est-elle importante pour vous deux ?",
        "Y a-t-il eu des malentendus non résolus par le passé ?",
        "Avez-vous des amis communs qui pourraient vous aider ?"
      ],
      voisinage: [
        "Avez-vous déjà eu de bonnes relations avec ces voisins ?",
        "Le problème est-il récurrent ou ponctuel ?",
        "Y a-t-il des règles de copropriété ou de quartier à considérer ?"
      ]
    };

    // Questions basées sur les émotions détectées
    if (analysis.emotions.includes('colère')) {
      questions.push("Qu'est-ce qui vous met le plus en colère dans cette situation ?");
    }
    if (analysis.emotions.includes('tristesse')) {
      questions.push("Qu'est-ce que vous aimeriez retrouver dans cette relation ?");
    }
    if (analysis.emotions.includes('peur')) {
      questions.push("Quelle est votre plus grande crainte si rien ne change ?");
    }

    // Ajouter des questions contextuelles
    const contextSpecific = contextQuestions[analysis.context] || [];
    questions.push(...contextSpecific.slice(0, 2)); // Limiter à 2 questions contextuelles

    // Questions générales de réflexion
    questions.push("Quel serait pour vous le résultat idéal de cette situation ?");

    if (questions.length > 0) {
      const selectedQuestions = questions.slice(0, 3); // Max 3 questions
      return "\n\n🤔 **Questions pour approfondir** :\n" + 
             selectedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    }

    return "";
  }
}

const smartAnalyzer = new SmartConflictAnalyzer();

function getDemoResponse(message: string): string {
  // Utilisation du nouveau système d'analyse intelligent
  return smartAnalyzer.generateSmartResponse(message);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, useDemo } = RequestSchema.parse(body);

    // Mode démo - pas besoin de clé API
    if (useDemo) {
      const demoResponse = getDemoResponse(message);
      
      return NextResponse.json({
        response: demoResponse,
        mode: 'demo',
        timestamp: new Date().toISOString()
      });
    }

    // Mode API OpenAI (nécessite une clé API)
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
          content: COEXIST_RULES
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";

    return NextResponse.json({
      response,
      mode: 'openai',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur API:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API COEXIST.AI - Endpoint pour conseils de coexistence",
    version: "1.0.0",
    endpoints: {
      POST: "/api/advice - Envoyer un message pour recevoir des conseils"
    },
    demo: true
  });
}
