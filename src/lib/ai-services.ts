import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Configuration Gemini
let genAI: GoogleGenerativeAI | null = null;

function initializeGemini(apiKey: string) {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// Fonction pour appeler Gemini Pro
export async function callGemini(messages: any[], apiKey: string): Promise<string> {
  try {
    const genAI = initializeGemini(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Convertir les messages au format Gemini
    const conversationHistory = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    const systemMessage = messages.find(msg => msg.role === 'system');
    let prompt = systemMessage?.content || '';

    // Ajouter l'historique de conversation
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage.role === 'user') {
        prompt += `\n\nMessage de l'utilisateur: ${lastMessage.parts[0].text}`;
      }
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim() === '') {
      throw new Error('Réponse vide de Gemini');
    }

    return text;
  } catch (error) {
    console.error('Erreur Gemini API:', error);
    throw error;
  }
}

// Fonction pour appeler OpenRouter avec les meilleurs modèles
export async function callOpenRouter(messages: any[], apiKey: string): Promise<string> {
  // Modèles par ordre de préférence (du plus performant au moins performant)
  const MODELS = [
    'anthropic/claude-3.5-sonnet', // Le plus performant pour la compréhension
    'openai/gpt-4o', // Excellent pour le raisonnement
    'meta-llama/llama-3.1-70b-instruct', // Bon modèle open-source
    'google/gemini-pro-1.5', // Alternative Google
    'meta-llama/llama-3.1-8b-instruct' // Fallback plus léger
  ];

  for (const model of MODELS) {
    try {
      console.log(`Tentative avec le modèle: ${model}`);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://coexist-ai.com',
          'X-Title': 'COEXIST.AI',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3, // Plus déterministe pour de meilleures réponses
          top_p: 0.95,
          max_tokens: 1500, // Plus de tokens pour des réponses complètes
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.trim()) {
          console.log(`Succès avec le modèle: ${model}`);
          return content;
        }
      } else {
        console.log(`Modèle ${model} indisponible: ${response.status}`);
      }
    } catch (error) {
      console.log(`Erreur avec le modèle ${model}:`, error);
      continue; // Essayer le modèle suivant
    }
  }
  
  throw new Error('Tous les modèles OpenRouter ont échoué');
}

// Fonction pour appeler Claude directement
export async function callClaude(messages: any[], apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.3,
        messages: messages.filter(msg => msg.role !== 'system'),
        system: messages.find(msg => msg.role === 'system')?.content || ''
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  } catch (error) {
    console.error('Erreur Claude API:', error);
    throw error;
  }
}

// Fonction pour appeler OpenAI
export async function callOpenAI(messages: any[], apiKey: string): Promise<string> {
  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 1500,
      temperature: 0.3,
      top_p: 0.95
    });
    
    const content = completion.choices[0]?.message?.content;
    if (!content || content.trim() === '') {
      throw new Error('Réponse vide d\'OpenAI');
    }
    
    return content;
  } catch (error) {
    console.error('Erreur OpenAI API:', error);
    throw error;
  }
}
