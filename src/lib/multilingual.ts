/**
 * COEXIST.AI - Système Multilingue Avancé
 * Support pour la Sagesse Universelle dans toutes les langues
 */

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  culturalContext: string[];
  greeting: string;
  peaceWord: string;
  respectWord: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    rtl: false,
    culturalContext: ['occidentale', 'francophone'],
    greeting: 'Bonjour',
    peaceWord: 'Paix',
    respectWord: 'Respect'
  },
  {
    code: 'en',
    name: 'Anglais',
    nativeName: 'English',
    rtl: false,
    culturalContext: ['occidentale', 'globale'],
    greeting: 'Hello',
    peaceWord: 'Peace',
    respectWord: 'Respect'
  },
  {
    code: 'es',
    name: 'Espagnol',
    nativeName: 'Español',
    rtl: false,
    culturalContext: ['latino', 'occidentale'],
    greeting: 'Hola',
    peaceWord: 'Paz',
    respectWord: 'Respeto'
  },
  {
    code: 'ar',
    name: 'Arabe',
    nativeName: 'العربية',
    rtl: true,
    culturalContext: ['arabe', 'islamique'],
    greeting: 'السلام عليكم',
    peaceWord: 'سلام',
    respectWord: 'احترام'
  },
  {
    code: 'he',
    name: 'Hébreu',
    nativeName: 'עברית',
    rtl: true,
    culturalContext: ['juive', 'israélienne'],
    greeting: 'שלום',
    peaceWord: 'שלום',
    respectWord: 'כבוד'
  },
  {
    code: 'zh',
    name: 'Chinois',
    nativeName: '中文',
    rtl: false,
    culturalContext: ['asiatique', 'confucianiste'],
    greeting: '你好',
    peaceWord: '和平',
    respectWord: '尊重'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    rtl: false,
    culturalContext: ['indienne', 'hindoue'],
    greeting: 'नमस्ते',
    peaceWord: 'शांति',
    respectWord: 'सम्मान'
  },
  {
    code: 'pt',
    name: 'Portugais',
    nativeName: 'Português',
    rtl: false,
    culturalContext: ['latino', 'occidentale'],
    greeting: 'Olá',
    peaceWord: 'Paz',
    respectWord: 'Respeito'
  },
  {
    code: 'ru',
    name: 'Russe',
    nativeName: 'Русский',
    rtl: false,
    culturalContext: ['slave', 'orthodoxe'],
    greeting: 'Привет',
    peaceWord: 'Мир',
    respectWord: 'Уважение'
  },
  {
    code: 'ja',
    name: 'Japonais',
    nativeName: '日本語',
    rtl: false,
    culturalContext: ['asiatique', 'bouddhiste'],
    greeting: 'こんにちは',
    peaceWord: '平和',
    respectWord: '尊重'
  }
];

// Templates de réponses multilingues
export const MULTILINGUAL_TEMPLATES = {
  greeting: {
    fr: (name?: string) => name ? `Bonjour ${name} ! Je suis COEXIST.AI, votre assistant de sagesse universelle. Comment puis-je vous accompagner vers la paix aujourd'hui ?` : 'Bonjour ! Je suis COEXIST.AI, votre assistant de sagesse universelle. Comment puis-je vous accompagner vers la paix aujourd\'hui ?',
    en: (name?: string) => name ? `Hello ${name}! I am COEXIST.AI, your universal wisdom assistant. How may I guide you toward peace today?` : 'Hello! I am COEXIST.AI, your universal wisdom assistant. How may I guide you toward peace today?',
    es: (name?: string) => name ? `¡Hola ${name}! Soy COEXIST.AI, tu asistente de sabiduría universal. ¿Cómo puedo guiarte hacia la paz hoy?` : '¡Hola! Soy COEXIST.AI, tu asistente de sabiduría universal. ¿Cómo puedo guiarte hacia la paz hoy?',
    ar: (name?: string) => name ? `مرحباً ${name}! أنا COEXIST.AI، مساعدك للحكمة العالمية. كيف يمكنني أن أرشدك نحو السلام اليوم؟` : 'مرحباً! أنا COEXIST.AI، مساعدك للحكمة العالمية. كيف يمكنني أن أرشدك نحو السلام اليوم؟',
    he: (name?: string) => name ? `שלום ${name}! אני COEXIST.AI, עוזר החוכמה האוניברסלי שלך. איך אוכל להנחות אותך לעבר השלום היום?` : 'שלום! אני COEXIST.AI, עוזר החוכמה האוניברסלי שלך. איך אוכל להנחות אותך לעבר השלום היום?',
    zh: (name?: string) => name ? `你好${name}！我是COEXIST.AI，您的全球智慧助手。今天如何引导您走向和平？` : '你好！我是COEXIST.AI，您的全球智慧助手。今天如何引导您走向和平？',
    hi: (name?: string) => name ? `नमस्ते ${name}! मैं COEXIST.AI हूं, आपका सार्वभौमिक ज्ञान सहायक। आज मैं आपको शांति की ओर कैसे मार्गदर्शन कर सकता हूं?` : 'नमस्ते! मैं COEXIST.AI हूं, आपका सार्वभौमिक ज्ञान सहायक। आज मैं आपको शांति की ओर कैसे मार्गदर्शन कर सकता हूं?',
    pt: (name?: string) => name ? `Olá ${name}! Eu sou COEXIST.AI, seu assistente de sabedoria universal. Como posso guiá-lo em direção à paz hoje?` : 'Olá! Eu sou COEXIST.AI, seu assistente de sabedoria universal. Como posso guiá-lo em direção à paz hoje?',
    ru: (name?: string) => name ? `Привет ${name}! Я COEXIST.AI, ваш универсальный помощник мудрости. Как я могу направить вас к миру сегодня?` : 'Привет! Я COEXIST.AI, ваш универсальный помощник мудрости. Как я могу направить вас к миру сегодня?',
    ja: (name?: string) => name ? `こんにちは${name}！私はCOEXIST.AI、あなたの普遍的知恵アシスタントです。今日はどのように平和に向けてあなたを導けばよいでしょうか？` : 'こんにちは！私はCOEXIST.AI、あなたの普遍的知恵アシスタントです。今日はどのように平和に向けてあなたを導けばよいでしょうか？'
  },

  emergency: {
    fr: '🚨 **URGENCE - SITUATION DANGEREUSE DÉTECTÉE** 🚨\n\n**ARRÊTEZ-VOUS IMMÉDIATEMENT !**\n\nJe ressens votre colère intense, et je comprends que vous soyez au bord du gouffre. Mais la violence n\'est JAMAIS la solution.',
    en: '🚨 **EMERGENCY - DANGEROUS SITUATION DETECTED** 🚨\n\n**STOP IMMEDIATELY!**\n\nI feel your intense anger, and I understand you\'re on the edge. But violence is NEVER the solution.',
    es: '🚨 **EMERGENCIA - SITUACIÓN PELIGROSA DETECTADA** 🚨\n\n**¡DETENTE INMEDIATAMENTE!**\n\nSiento tu ira intensa, y entiendo que estás al límite. Pero la violencia NUNCA es la solución.',
    ar: '🚨 **طوارئ - موقف خطير تم اكتشافه** 🚨\n\n**توقف فوراً!**\n\nأشعر بغضبك الشديد، وأفهم أنك على الحافة. لكن العنف ليس الحل أبداً.',
    he: '🚨 **חירום - זוהה מצב מסוכן** 🚨\n\n**עצור מיד!**\n\nאני מרגיש את הכעס העז שלך, ואני מבין שאתה על הקצה. אבל אלימות היא אף פעם לא הפתרון.',
    zh: '🚨 **紧急情况 - 检测到危险情况** 🚨\n\n**立即停止！**\n\n我感受到你强烈的愤怒，我理解你处于边缘。但暴力绝不是解决方案。',
    hi: '🚨 **आपातकाल - खतरनाक स्थिति का पता चला** 🚨\n\n**तुरंत रुकें!**\n\nमैं आपकी तीव्र क्रोध को महसूस करता हूं, और मैं समझता हूं कि आप कगार पर हैं। लेकिन हिंसा कभी भी समाधान नहीं है।',
    pt: '🚨 **EMERGÊNCIA - SITUAÇÃO PERIGOSA DETECTADA** 🚨\n\n**PARE IMEDIATAMENTE!**\n\nSinto sua raiva intensa, e entendo que você está no limite. Mas a violência NUNCA é a solução.',
    ru: '🚨 **ЧРЕЗВЫЧАЙНАЯ СИТУАЦИЯ - ОБНАРУЖЕНА ОПАСНАЯ СИТУАЦИЯ** 🚨\n\n**ОСТАНОВИТЕСЬ НЕМЕДЛЕННО!**\n\nЯ чувствую вашу сильную ярость и понимаю, что вы на грани. Но насилие НИКОГДА не является решением.',
    ja: '🚨 **緊急事態 - 危険な状況が検出されました** 🚨\n\n**すぐに止まってください！**\n\nあなたの激しい怒りを感じ、あなたが限界にいることを理解しています。しかし、暴力は決して解決策ではありません。'
  },

  culturalValidation: {
    fr: 'Vos sentiments sont comme des couleurs sur une palette... 🎨 Chacun mérite d\'être vu et honoré.',
    en: 'Your feelings are like colors on a palette... 🎨 Each one deserves to be seen and honored.',
    es: 'Tus sentimientos son como colores en una paleta... 🎨 Cada uno merece ser visto y honrado.',
    ar: 'مشاعرك مثل الألوان على لوحة... 🎨 كل لون يستحق أن يُرى ويُكرم.',
    he: 'הרגשות שלך כמו צבעים על פלטה... 🎨 כל אחד ראוי להיראות ולהיכבד.',
    zh: '你的感受就像调色板上的颜色... 🎨 每一种都值得被看见和尊重。',
    hi: 'आपकी भावनाएं पैलेट पर रंगों की तरह हैं... 🎨 हर एक को देखे जाने और सम्मानित होने का अधिकार है।',
    pt: 'Seus sentimentos são como cores em uma paleta... 🎨 Cada um merece ser visto e honrado.',
    ru: 'Ваши чувства как цвета на палитре... 🎨 Каждый заслуживает быть увиденным и почитаемым.',
    ja: 'あなたの感情はパレットの色のよう... 🎨 それぞれが見られ、尊重される価値があります。'
  },

  wisdomClosing: {
    fr: '✨ **Inspiration** : Chaque conflit résolu avec sagesse et compassion contribue à un monde plus paisible. Votre engagement envers la coexistence fait de vous un artisan de paix.',
    en: '✨ **Inspiration**: Every conflict resolved with wisdom and compassion contributes to a more peaceful world. Your commitment to coexistence makes you a peacemaker.',
    es: '✨ **Inspiración**: Cada conflicto resuelto con sabiduría y compasión contribuye a un mundo más pacífico. Tu compromiso con la coexistencia te convierte en un artesano de la paz.',
    ar: '✨ **إلهام**: كل صراع يُحل بالحكمة والرحمة يساهم في عالم أكثر سلاماً. التزامك بالتعايش يجعلك صانع سلام.',
    he: '✨ **השראה**: כל סכסוך שנפתר בחוכמה ובחמלה תורם לעולם שליו יותר. המחויבות שלך לדו-קיום הופכת אותך לאומן שלום.',
    zh: '✨ **灵感**：每一个以智慧和同情心解决的冲突都为更和平的世界做出贡献。你对共存的承诺使你成为和平的工匠。',
    hi: '✨ **प्रेरणा**: बुद्धिमत्ता और करुणा से हल किया गया हर संघर्ष अधिक शांतिपूर्ण दुनिया में योगदान देता है। सह-अस्तित्व के प्रति आपकी प्रतिबद्धता आपको शांति का कारीगर बनाती है।',
    pt: '✨ **Inspiração**: Cada conflito resolvido com sabedoria e compaixão contribui para um mundo mais pacífico. Seu compromisso com a coexistência o torna um artesão da paz.',
    ru: '✨ **Вдохновение**: Каждый конфликт, решенный с мудростью и состраданием, способствует более мирному миру. Ваша приверженность сосуществованию делает вас миротворцем.',
    ja: '✨ **インスピレーション**：知恵と慈悲をもって解決されるすべての対立は、より平和な世界に貢献します。共存へのあなたの献身があなたを平和の職人にします。'
  }
};

// Citations de paix multilingues
export const PEACE_QUOTES_MULTILINGUAL = {
  fr: [
    "La paix ne peut être maintenue par la force. Elle ne peut l'être que par la compréhension. - Albert Einstein",
    "Il n'y a pas de chemin vers la paix. La paix est le chemin. - Mahatma Gandhi",
    "La paix commence par un sourire. - Mère Teresa",
    "Si tu veux faire la paix avec ton ennemi, tu dois travailler avec ton ennemi. - Nelson Mandela"
  ],
  en: [
    "Peace cannot be kept by force; it can only be achieved by understanding. - Albert Einstein",
    "There is no way to peace, peace is the way. - Mahatma Gandhi",
    "Peace begins with a smile. - Mother Teresa",
    "If you want to make peace with your enemy, you have to work with your enemy. - Nelson Mandela"
  ],
  es: [
    "La paz no puede mantenerse por la fuerza; solo puede lograrse mediante la comprensión. - Albert Einstein",
    "No hay camino hacia la paz, la paz es el camino. - Mahatma Gandhi",
    "La paz comienza con una sonrisa. - Madre Teresa",
    "Si quieres hacer las paces con tu enemigo, tienes que trabajar con tu enemigo. - Nelson Mandela"
  ],
  ar: [
    "لا يمكن الحفاظ على السلام بالقوة؛ يمكن تحقيقه فقط من خلال الفهم. - ألبرت أينشتاين",
    "لا توجد طريقة للسلام، السلام هو الطريقة. - المهاتما غاندي",
    "السلام يبدأ بابتسامة. - الأم تيريزا",
    "إذا كنت تريد صنع السلام مع عدوك، عليك أن تعمل مع عدوك. - نيلسون مانديلا"
  ],
  he: [
    "שלום לא יכול להישמר בכוח; הוא יכול להיות מושג רק באמצעות הבנה. - אלברט איינשטיין",
    "אין דרך לשלום, השלום הוא הדרך. - מהטמה גנדי",
    "שלום מתחיל בחיוך. - אמא תרזה",
    "אם אתה רוצה לעשות שלום עם האויב שלך, אתה צריך לעבוד עם האויב שלך. - נלסון מנדלה"
  ],
  zh: [
    "和平不能用武力维持；只有通过理解才能实现。 - 阿尔伯特·爱因斯坦",
    "没有通往和平的道路，和平就是道路。 - 圣雄甘地",
    "和平始于微笑。 - 特蕾莎修女",
    "如果你想与敌人和平相处，你必须与敌人合作。 - 纳尔逊·曼德拉"
  ],
  hi: [
    "शांति को बल से नहीं रखा जा सकता; इसे केवल समझ के माध्यम से प्राप्त किया जा सकता है। - अल्बर्ट आइंस्टीन",
    "शांति का कोई रास्ता नहीं है, शांति ही रास्ता है। - महात्मा गांधी",
    "शांति मुस्कान से शुरू होती है। - मदर टेरेसा",
    "यदि आप अपने दुश्मन के साथ शांति बनाना चाहते हैं, तो आपको अपने दुश्मन के साथ काम करना होगा। - नेल्सन मंडेला"
  ],
  pt: [
    "A paz não pode ser mantida pela força; só pode ser alcançada através da compreensão. - Albert Einstein",
    "Não há caminho para a paz, a paz é o caminho. - Mahatma Gandhi",
    "A paz começa com um sorriso. - Madre Teresa",
    "Se você quer fazer as pazes com seu inimigo, você tem que trabalhar com seu inimigo. - Nelson Mandela"
  ],
  ru: [
    "Мир нельзя удержать силой; его можно достичь только через понимание. - Альберт Эйнштейн",
    "Нет пути к миру, мир - это путь. - Махатма Ганди",
    "Мир начинается с улыбки. - Мать Тереза",
    "Если вы хотите заключить мир с врагом, вы должны работать с врагом. - Нельсон Мандела"
  ],
  ja: [
    "平和は力で維持することはできません；理解を通してのみ達成できます。 - アルバート・アインシュタイン",
    "平和への道はありません、平和が道です。 - マハトマ・ガンジー",
    "平和は笑顔から始まります。 - マザー・テレサ",
    "敵と平和を築きたいなら、敵と協力しなければなりません。 - ネルソン・マンデラ"
  ]
};

// Fonctions utilitaires
export function detectLanguage(text: string): string {
  // Détection simple basée sur les caractères et mots clés
  if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabe
  if (/[\u0590-\u05FF]/.test(text)) return 'he'; // Hébreu
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh'; // Chinois
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'ja'; // Japonais
  if (/[\u0900-\u097f]/.test(text)) return 'hi'; // Hindi
  if (/[\u0400-\u04ff]/.test(text)) return 'ru'; // Russe
  
  // Détection par mots clés
  const words = text.toLowerCase().split(/\s+/);
  if (words.some(w => ['hello', 'hi', 'how', 'are', 'you', 'the', 'and'].includes(w))) return 'en';
  if (words.some(w => ['hola', 'como', 'estas', 'que', 'tal'].includes(w))) return 'es';
  if (words.some(w => ['olá', 'como', 'você', 'está', 'tudo'].includes(w))) return 'pt';
  if (words.some(w => ['bonjour', 'salut', 'comment', 'allez', 'vous'].includes(w))) return 'fr';
  
  return 'fr'; // Défaut
}

export function getLanguageConfig(languageCode: string): LanguageConfig {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode) || SUPPORTED_LANGUAGES[0];
}

export function generateMultilingualResponse(
  templateKey: keyof typeof MULTILINGUAL_TEMPLATES,
  languageCode: string,
  ...args: unknown[]
): string {
  const template = MULTILINGUAL_TEMPLATES[templateKey][languageCode as keyof typeof MULTILINGUAL_TEMPLATES[typeof templateKey]];
  if (typeof template === 'function') {
    return template(...args);
  }
  return template || MULTILINGUAL_TEMPLATES[templateKey].fr;
}

export function getRandomPeaceQuote(languageCode: string): string {
  const quotes = PEACE_QUOTES_MULTILINGUAL[languageCode as keyof typeof PEACE_QUOTES_MULTILINGUAL];
  if (!quotes || quotes.length === 0) {
    return PEACE_QUOTES_MULTILINGUAL.fr[0]; // Fallback
  }
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function formatMultilingualText(text: string, languageCode: string): string {
  const config = getLanguageConfig(languageCode);
  
  // Ajuster la direction du texte pour les langues RTL
  if (config.rtl) {
    return `dir="rtl" style="text-align: right; direction: rtl;" ${text}`;
  }
  
  return text;
}
