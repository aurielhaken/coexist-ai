interface SpiritualWisdom {
  title: string;
  content: string;
  source: 'torah' | 'talmud' | 'bible' | 'coran' | 'bouddhisme' | 'hindouisme' | 'christianisme' | 'islam' | 'universel';
  language: string;
  keywords: string[];
  context: string[];
  emotion: string[];
  ageGroup: 'enfant' | 'adulte' | 'tous';
}

export const SPIRITUAL_WISDOM_BASE: SpiritualWisdom[] = [
  // SAGESSES DE LA TORAH
  {
    title: "L'amour du prochain - Torah",
    content: "Tu aimeras ton prochain comme toi-même (Lévitique 19:18). Cette mitzvah enseigne que chaque être humain est créé à l'image de Dieu et mérite respect et amour. L'amour véritable commence par l'acceptation de nos propres imperfections, puis s'étend naturellement vers les autres.",
    source: 'torah',
    language: 'fr',
    keywords: ['amour', 'prochain', 'respect', 'image de Dieu', 'mitzvah'],
    context: ['conflit', 'relation', 'famille', 'communauté'],
    emotion: ['colère', 'haine', 'isolement'],
    ageGroup: 'tous'
  },
  {
    title: "La paix - Torah",
    content: "Cherchez la paix et poursuivez-la (Psaumes 34:15). La Torah enseigne que la paix n'est pas seulement l'absence de conflit, mais un état actif de recherche du bien-être de tous. Chaque action qui réduit la souffrance et augmente l'harmonie participe à la construction de la paix.",
    source: 'torah',
    language: 'fr',
    keywords: ['paix', 'harmonie', 'bien-être', 'construction'],
    context: ['conflit', 'guerre', 'dispute', 'tension'],
    emotion: ['colère', 'peur', 'anxiété'],
    ageGroup: 'tous'
  },
  {
    title: "La justice sociale - Torah",
    content: "Tu ne commettras point d'injustice dans tes jugements (Lévitique 19:15). La Torah insiste sur l'équité pour tous, sans distinction de richesse, d'origine ou de statut. La justice véritable protège les plus vulnérables et rétablit l'équilibre dans la société.",
    source: 'torah',
    language: 'fr',
    keywords: ['justice', 'équité', 'vulnérables', 'société'],
    context: ['injustice', 'pauvreté', 'discrimination', 'inégalité'],
    emotion: ['colère', 'frustration', 'désespoir'],
    ageGroup: 'adulte'
  },
  {
    title: "La compassion - Torah",
    content: "Souviens-toi que tu as été esclave en Égypte (Deutéronome 15:15). Cette mémoire transforme la souffrance personnelle en compassion pour les autres. Quand nous nous souvenons de nos propres difficultés, nous développons naturellement l'empathie et l'envie d'aider.",
    source: 'torah',
    language: 'fr',
    keywords: ['compassion', 'empathie', 'mémoire', 'aide'],
    context: ['souffrance', 'difficulté', 'aide', 'service'],
    emotion: ['douleur', 'tristesse', 'isolement'],
    ageGroup: 'tous'
  },
  {
    title: "Le pardon - Torah",
    content: "Tu ne te vengeras point et tu ne garderas point de rancune (Lévitique 19:18). Le pardon libère autant celui qui pardonne que celui qui est pardonné. C'est un acte de courage qui brise le cycle de la violence et ouvre la voie à la guérison.",
    source: 'torah',
    language: 'fr',
    keywords: ['pardon', 'vengeance', 'rancune', 'guérison'],
    context: ['trahison', 'blessure', 'conflit', 'réconciliation'],
    emotion: ['colère', 'haine', 'amertume'],
    ageGroup: 'tous'
  },

  // SAGESSES DU TALMUD
  {
    title: "L'unité dans la diversité - Talmud",
    content: "Tous les Israélites sont responsables les uns des autres (Talmud Shevuot 39a). Cette responsabilité mutuelle s'étend à toute l'humanité. Chaque personne a un rôle unique à jouer, mais nous formons tous une seule famille humaine.",
    source: 'talmud',
    language: 'fr',
    keywords: ['responsabilité', 'unité', 'diversité', 'famille humaine'],
    context: ['division', 'isolement', 'communauté', 'solidarité'],
    emotion: ['solitude', 'rejet', 'exclusion'],
    ageGroup: 'tous'
  },
  {
    title: "La dignité humaine - Talmud",
    content: "Qui sauve une vie sauve le monde entier (Talmud Sanhédrin 37a). Chaque être humain contient la valeur de l'univers entier. Respecter une personne, c'est honorer la création divine tout entière.",
    source: 'talmud',
    language: 'fr',
    keywords: ['dignité', 'valeur', 'univers', 'création divine'],
    context: ['dévalorisation', 'mépris', 'respect', 'valeur'],
    emotion: ['honte', 'dévalorisation', 'mépris'],
    ageGroup: 'tous'
  },
  {
    title: "La réparation du monde - Talmud",
    content: "Il n'est pas à toi de terminer le travail, mais tu n'es pas libre de t'en désister (Pirkei Avot 2:16). Chaque petit acte de bonté contribue à réparer le monde. Nous sommes tous des partenaires dans cette œuvre de guérison universelle.",
    source: 'talmud',
    language: 'fr',
    keywords: ['réparation', 'travail', 'bonté', 'guérison'],
    context: ['désespoir', 'impuissance', 'action', 'espoir'],
    emotion: ['désespoir', 'impuissance', 'découragement'],
    ageGroup: 'adulte'
  },

  // SAGESSES CHRÉTIENNES
  {
    title: "L'amour universel - Christianisme",
    content: "Aimez vos ennemis, priez pour ceux qui vous persécutent (Matthieu 5:44). L'amour chrétien transcende les frontières et transforme les cœurs. C'est un amour actif qui cherche le bien même de ceux qui nous font du mal.",
    source: 'christianisme',
    language: 'fr',
    keywords: ['amour', 'ennemis', 'pardon', 'transformation'],
    context: ['haine', 'vengeance', 'réconciliation', 'paix'],
    emotion: ['haine', 'colère', 'vengeance'],
    ageGroup: 'tous'
  },
  {
    title: "La paix du Christ - Christianisme",
    content: "Je vous laisse la paix, je vous donne ma paix (Jean 14:27). La paix chrétienne n'est pas l'absence de troubles, mais la présence de Dieu au cœur de nos difficultés. C'est une paix qui dépasse toute compréhension humaine.",
    source: 'christianisme',
    language: 'fr',
    keywords: ['paix', 'Dieu', 'présence', 'troubles'],
    context: ['anxiété', 'peur', 'troubles', 'sérénité'],
    emotion: ['anxiété', 'peur', 'troubles'],
    ageGroup: 'tous'
  },
  {
    title: "Le service - Christianisme",
    content: "Celui qui veut être le premier sera l'esclave de tous (Marc 10:44). Le véritable leadership se manifeste par le service. Servir les autres élève notre âme et contribue au bien-être de toute la communauté.",
    source: 'christianisme',
    language: 'fr',
    keywords: ['service', 'leadership', 'communauté', 'élévation'],
    context: ['pouvoir', 'autorité', 'service', 'humilité'],
    emotion: ['orgueil', 'vanité', 'égoïsme'],
    ageGroup: 'adulte'
  },

  // SAGESSES ISLAMIQUES
  {
    title: "La compassion divine - Islam",
    content: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux (Coran 1:1). La miséricorde divine englobe toute la création. En tant que créatures de Dieu, nous sommes appelés à manifester cette même miséricorde envers tous les êtres vivants.",
    source: 'islam',
    language: 'fr',
    keywords: ['miséricorde', 'divine', 'création', 'compassion'],
    context: ['jugement', 'pardon', 'compassion', 'amour'],
    emotion: ['jugement', 'mépris', 'dureté'],
    ageGroup: 'tous'
  },
  {
    title: "La fraternité - Islam",
    content: "Les croyants sont frères (Coran 49:10). Cette fraternité s'étend à toute l'humanité. Nous sommes tous enfants d'Adam et Ève, partageant la même dignité humaine et la même responsabilité envers la création.",
    source: 'islam',
    language: 'fr',
    keywords: ['fraternité', 'croyants', 'humanité', 'dignité'],
    context: ['division', 'discrimination', 'unité', 'égalité'],
    emotion: ['haine', 'discrimination', 'supériorité'],
    ageGroup: 'tous'
  },
  {
    title: "La justice - Islam",
    content: "Ô vous qui croyez ! Soyez stricts dans l'observance de la justice (Coran 4:135). La justice islamique exige l'équité même envers nos ennemis. C'est un pilier fondamental qui maintient l'équilibre et l'harmonie dans la société.",
    source: 'islam',
    language: 'fr',
    keywords: ['justice', 'équité', 'équilibre', 'harmonie'],
    context: ['injustice', 'partialité', 'équité', 'droiture'],
    emotion: ['colère', 'injustice', 'frustration'],
    ageGroup: 'adulte'
  },

  // SAGESSES BOUDDHISTES
  {
    title: "La compassion universelle - Bouddhisme",
    content: "Que tous les êtres soient heureux et libres de souffrance. La compassion bouddhiste s'étend à tous les êtres sans exception. C'est un amour inconditionnel qui souhaite le bien-être de tous.",
    source: 'bouddhisme',
    language: 'fr',
    keywords: ['compassion', 'universelle', 'bonheur', 'libération'],
    context: ['souffrance', 'empathie', 'amour', 'libération'],
    emotion: ['souffrance', 'douleur', 'compassion'],
    ageGroup: 'tous'
  },
  {
    title: "L'interdépendance - Bouddhisme",
    content: "Tous les phénomènes sont interdépendants. Nous ne pouvons exister que grâce aux autres. Cette compréhension nous relie à toute la création et nous inspire à agir avec sagesse et compassion.",
    source: 'bouddhisme',
    language: 'fr',
    keywords: ['interdépendance', 'phénomènes', 'création', 'sagesse'],
    context: ['isolement', 'connexion', 'unité', 'responsabilité'],
    emotion: ['isolement', 'séparation', 'connexion'],
    ageGroup: 'adulte'
  },
  {
    title: "La paix intérieure - Bouddhisme",
    content: "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur. En cultivant la paix en nous-mêmes, nous contribuons naturellement à la paix dans le monde. La transformation commence par soi.",
    source: 'bouddhisme',
    language: 'fr',
    keywords: ['paix', 'intérieure', 'transformation', 'cultivation'],
    context: ['troubles', 'sérénité', 'méditation', 'paix'],
    emotion: ['anxiété', 'troubles', 'sérénité'],
    ageGroup: 'tous'
  },

  // SAGESSES HINDOUES
  {
    title: "L'unité dans la diversité - Hindouisme",
    content: "Vasudhaiva Kutumbakam - Le monde est une famille. Tous les êtres sont connectés dans la grande famille universelle. Cette vision unitaire transcende les différences et célèbre la diversité comme expression de l'unité divine.",
    source: 'hindouisme',
    language: 'fr',
    keywords: ['unité', 'diversité', 'famille', 'universelle'],
    context: ['division', 'unité', 'diversité', 'harmonie'],
    emotion: ['division', 'séparation', 'unité'],
    ageGroup: 'tous'
  },
  {
    title: "Le dharma - Hindouisme",
    content: "Dharma signifie le devoir juste et la vertu. Chaque être a un dharma unique à accomplir. En vivant selon notre dharma, nous contribuons à l'ordre cosmique et au bien-être de tous.",
    source: 'hindouisme',
    language: 'fr',
    keywords: ['dharma', 'devoir', 'vertu', 'ordre cosmique'],
    context: ['devoir', 'responsabilité', 'ordre', 'harmonie'],
    emotion: ['confusion', 'désordre', 'harmonie'],
    ageGroup: 'adulte'
  },
  {
    title: "L'ahimsa - Hindouisme",
    content: "Ahimsa - La non-violence en pensée, parole et action. Cette pratique fondamentale enseigne le respect de toute vie et la résolution pacifique des conflits. C'est la base de toute transformation positive.",
    source: 'hindouisme',
    language: 'fr',
    keywords: ['ahimsa', 'non-violence', 'respect', 'vie'],
    context: ['violence', 'conflit', 'paix', 'respect'],
    emotion: ['violence', 'colère', 'paix'],
    ageGroup: 'tous'
  },

  // SAGESSES DE LA KABBALE
  {
    title: "L'Arbre de Vie - Kabbale",
    content: "L'Arbre de Vie (Etz HaChayim) représente les 10 Sefirot qui relient le divin à l'humain. Chaque Sefira enseigne une qualité divine que nous pouvons développer : Hessed (bonté), Gevurah (force), Tiferet (beauté), Netzach (victoire), Hod (gloire), Yesod (fondation), Malchut (royauté). En équilibrant ces énergies en nous, nous participons à la réparation du monde (Tikkun Olam).",
    source: 'kabbale',
    language: 'fr',
    keywords: ['sefirot', 'arbre de vie', 'tikkun olam', 'équilibre', 'divin'],
    context: ['déséquilibre', 'harmonie', 'spiritualité', 'transformation'],
    emotion: ['déséquilibre', 'confusion', 'harmonie'],
    ageGroup: 'adulte'
  },
  {
    title: "Tikkun Olam - Réparation du Monde",
    content: "Tikkun Olam signifie 'réparation du monde'. Chaque acte de bonté, chaque parole de paix, chaque geste d'amour contribue à réparer les brisures de la création. Nous sommes tous des partenaires de Dieu dans cette œuvre de guérison universelle. Même le plus petit acte compte dans cette réparation cosmique.",
    source: 'kabbale',
    language: 'fr',
    keywords: ['tikkun olam', 'réparation', 'monde', 'bonté', 'guérison'],
    context: ['désespoir', 'impuissance', 'action', 'espoir'],
    emotion: ['désespoir', 'impuissance', 'espoir'],
    ageGroup: 'tous'
  },
  {
    title: "L'étincelle divine - Kabbale",
    content: "Chaque être humain contient une étincelle divine (Nitzotz Elohi). Cette étincelle nous relie directement à la source de toute existence. Reconnaître cette étincelle en nous et en autrui transforme notre vision du monde et nous inspire à agir avec compassion et respect.",
    source: 'kabbale',
    language: 'fr',
    keywords: ['étincelle divine', 'nitzotz', 'source', 'compassion'],
    context: ['dévalorisation', 'respect', 'dignité', 'divin'],
    emotion: ['dévalorisation', 'mépris', 'respect'],
    ageGroup: 'tous'
  },
  {
    title: "La Shekhina - Présence divine",
    content: "La Shekhina est la présence divine qui réside parmi nous. Elle se manifeste particulièrement quand nous créons des espaces de paix, d'amour et de justice. Chaque fois que nous agissons avec bonté, nous attirons la Shekhina dans le monde.",
    source: 'kabbale',
    language: 'fr',
    keywords: ['shekhina', 'présence divine', 'paix', 'amour', 'justice'],
    context: ['isolement', 'présence', 'divin', 'manifestation'],
    emotion: ['isolement', 'absence', 'présence'],
    ageGroup: 'adulte'
  },

  // SAGESSES DE LA GUEMARA
  {
    title: "L'étude et l'action - Guemara",
    content: "L'étude de la Torah est égale à tous les autres commandements réunis (Guemara Peah 1:1). Mais l'étude sans action est incomplète. La véritable sagesse se manifeste dans l'application concrète des enseignements dans notre vie quotidienne.",
    source: 'guemara',
    language: 'fr',
    keywords: ['étude', 'torah', 'action', 'sagesse', 'application'],
    context: ['théorie', 'pratique', 'sagesse', 'action'],
    emotion: ['confusion', 'inertie', 'clarté'],
    ageGroup: 'adulte'
  },
  {
    title: "La responsabilité mutuelle - Guemara",
    content: "Tous les Israélites sont responsables les uns des autres (Guemara Shevuot 39a). Cette responsabilité s'étend à toute l'humanité. Nous ne pouvons pas être sauvés seuls, mais seulement ensemble. Chaque personne compte dans le destin collectif.",
    source: 'guemara',
    language: 'fr',
    keywords: ['responsabilité', 'mutuelle', 'humanité', 'destin collectif'],
    context: ['isolement', 'solidarité', 'responsabilité', 'communauté'],
    emotion: ['isolement', 'égoïsme', 'solidarité'],
    ageGroup: 'tous'
  },
  {
    title: "La dignité humaine - Guemara",
    content: "Qui sauve une vie sauve le monde entier (Guemara Sanhédrin 37a). Chaque être humain est unique et irremplaçable. Respecter une personne, c'est honorer l'ensemble de l'humanité et la création divine.",
    source: 'guemara',
    language: 'fr',
    keywords: ['dignité', 'vie', 'monde', 'unique', 'irremplaçable'],
    context: ['dévalorisation', 'respect', 'valeur', 'unicité'],
    emotion: ['dévalorisation', 'mépris', 'respect'],
    ageGroup: 'tous'
  },
  {
    title: "La patience et la persévérance - Guemara",
    content: "Celui qui est patient dans les moments difficiles mérite d'être réconforté (Guemara Berakhot 5a). La patience n'est pas la passivité, mais la force intérieure qui nous permet de traverser les épreuves avec sagesse et espoir.",
    source: 'guemara',
    language: 'fr',
    keywords: ['patience', 'persévérance', 'difficultés', 'force intérieure'],
    context: ['épreuves', 'difficultés', 'patience', 'force'],
    emotion: ['impatience', 'découragement', 'patience'],
    ageGroup: 'tous'
  },

  // SAGESSES DE LA MISHNA
  {
    title: "L'amour du travail - Mishna",
    content: "Aime le travail et déteste la domination (Pirkei Avot 1:10). Le travail honnête élève l'âme et contribue au bien-être de la société. Mais le pouvoir et la domination corrompent. La véritable grandeur réside dans le service humble.",
    source: 'mishna',
    language: 'fr',
    keywords: ['travail', 'domination', 'service', 'humilité'],
    context: ['pouvoir', 'domination', 'service', 'humilité'],
    emotion: ['orgueil', 'vanité', 'humilité'],
    ageGroup: 'adulte'
  },
  {
    title: "La réception des invités - Mishna",
    content: "Que ta maison soit ouverte aux pauvres et que les pauvres soient les membres de ta famille (Pirkei Avot 1:5). L'hospitalité est une forme d'amour en action. Ouvrir sa maison et son cœur aux autres, c'est créer des espaces de paix et de fraternité.",
    source: 'mishna',
    language: 'fr',
    keywords: ['hospitalité', 'pauvres', 'famille', 'amour'],
    context: ['isolement', 'hospitalité', 'fraternité', 'ouverture'],
    emotion: ['isolement', 'fermeture', 'ouverture'],
    ageGroup: 'tous'
  },
  {
    title: "La modération - Mishna",
    content: "Sois modéré dans tes jugements, établis beaucoup d'élèves, et fais une barrière autour de la Torah (Pirkei Avot 1:1). La modération dans le jugement nous protège de l'erreur et nous permet de voir les situations avec équilibre et compassion.",
    source: 'mishna',
    language: 'fr',
    keywords: ['modération', 'jugements', 'équilibre', 'compassion'],
    context: ['jugement', 'extrémisme', 'modération', 'équilibre'],
    emotion: ['jugement', 'extrémisme', 'équilibre'],
    ageGroup: 'adulte'
  },
  {
    title: "L'humilité - Mishna",
    content: "Sois très humble, car l'espoir de l'homme est le ver (Pirkei Avot 4:4). L'humilité nous connecte à notre humanité commune et nous protège de l'orgueil destructeur. C'est dans l'humilité que nous trouvons la vraie grandeur.",
    source: 'mishna',
    language: 'fr',
    keywords: ['humilité', 'espoir', 'humanité', 'grandeur'],
    context: ['orgueil', 'vanité', 'humilité', 'grandeur'],
    emotion: ['orgueil', 'vanité', 'humilité'],
    ageGroup: 'adulte'
  },

  // SAGESSES DES MIDRASHIM
  {
    title: "La création de l'homme - Midrash",
    content: "Pourquoi l'homme fut-il créé seul ? Pour enseigner que quiconque détruit une seule âme, c'est comme s'il avait détruit tout un monde (Midrash Sanhédrin 37a). Chaque vie a une valeur infinie et mérite protection et respect.",
    source: 'midrash',
    language: 'fr',
    keywords: ['création', 'homme', 'seul', 'valeur infinie'],
    context: ['dévalorisation', 'respect', 'valeur', 'protection'],
    emotion: ['dévalorisation', 'mépris', 'respect'],
    ageGroup: 'tous'
  },
  {
    title: "La diversité humaine - Midrash",
    content: "Dieu créa l'homme à partir de la poussière de tous les endroits de la terre, pour que partout où l'homme irait, il se sentirait chez lui (Midrash Bereshit Rabba). Cette diversité est une bénédiction qui enrichit l'humanité.",
    source: 'midrash',
    language: 'fr',
    keywords: ['diversité', 'terre', 'chez soi', 'bénédiction'],
    context: ['exclusion', 'diversité', 'appartenance', 'richesse'],
    emotion: ['exclusion', 'isolement', 'appartenance'],
    ageGroup: 'tous'
  },

  // SAGESSES DU ZOHAR
  {
    title: "La lumière divine - Zohar",
    content: "La lumière divine ne peut briller que dans un récipient qui la reçoit avec humilité (Zohar). Notre âme est ce récipient. Plus nous cultivons l'humilité et l'ouverture, plus nous pouvons recevoir et transmettre la lumière divine.",
    source: 'zohar',
    language: 'fr',
    keywords: ['lumière divine', 'récipient', 'humilité', 'ouverture'],
    context: ['fermeture', 'ouverture', 'lumière', 'transmission'],
    emotion: ['fermeture', 'obscurité', 'lumière'],
    ageGroup: 'adulte'
  },
  {
    title: "L'unité des contraires - Zohar",
    content: "Dans le monde supérieur, il n'y a ni droite ni gauche, ni haut ni bas (Zohar). Les oppositions que nous percevons dans ce monde sont des manifestations d'une unité plus profonde. La sagesse consiste à voir au-delà des apparences.",
    source: 'zohar',
    language: 'fr',
    keywords: ['unité', 'contraires', 'oppositions', 'sagesse'],
    context: ['division', 'opposition', 'unité', 'harmonie'],
    emotion: ['division', 'conflit', 'unité'],
    ageGroup: 'adulte'
  },

  // SAGESSES UNIVERSELLES
  {
    title: "L'amour inconditionnel - Universel",
    content: "L'amour véritable ne connaît pas de conditions. Il embrasse tous les êtres dans leur humanité complète, avec leurs forces et leurs faiblesses. C'est cet amour qui guérit et transforme le monde.",
    source: 'universel',
    language: 'fr',
    keywords: ['amour', 'inconditionnel', 'humanité', 'guérison'],
    context: ['condition', 'jugement', 'acceptation', 'amour'],
    emotion: ['jugement', 'rejet', 'amour'],
    ageGroup: 'tous'
  },
  {
    title: "La dignité humaine - Universel",
    content: "Chaque être humain possède une dignité inaliénable qui ne peut être niée ou diminuée. Cette dignité est le fondement de tous les droits humains et de toute éthique véritable.",
    source: 'universel',
    language: 'fr',
    keywords: ['dignité', 'humaine', 'droits', 'éthique'],
    context: ['dévalorisation', 'respect', 'droits', 'égalité'],
    emotion: ['mépris', 'dévalorisation', 'respect'],
    ageGroup: 'tous'
  },
  {
    title: "L'unité de l'humanité - Universel",
    content: "Malgré nos différences apparentes, nous partageons tous la même essence humaine. Cette unité fondamentale transcende toutes les barrières et nous appelle à la fraternité universelle.",
    source: 'universel',
    language: 'fr',
    keywords: ['unité', 'humanité', 'essence', 'fraternité'],
    context: ['division', 'différence', 'unité', 'fraternité'],
    emotion: ['division', 'séparation', 'unité'],
    ageGroup: 'tous'
  }
];

// Fonction pour récupérer la sagesse spirituelle appropriée
export function getSpiritualWisdom(
  message: string,
  context: string,
  emotion: string,
  language: string = 'fr',
  ageGroup: string = 'tous'
): SpiritualWisdom[] {
  const lowerMessage = message.toLowerCase();
  const relevantWisdom = SPIRITUAL_WISDOM_BASE.filter(wisdom => {
    // Filtrage par langue et âge
    if (wisdom.language !== language && wisdom.language !== 'fr') return false;
    if (wisdom.ageGroup !== ageGroup && wisdom.ageGroup !== 'tous') return false;
    
    // Correspondance avec le contexte
    if (wisdom.context.includes(context)) return true;
    
    // Correspondance avec les émotions
    if (wisdom.emotion.includes(emotion)) return true;
    
    // Correspondance avec les mots-clés
    return wisdom.keywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
  });
  
  // Retourner les 3 plus pertinentes
  return relevantWisdom.slice(0, 3);
}

// Fonction pour enrichir une réponse avec la sagesse spirituelle
export function enrichWithSpiritualWisdom(
  originalResponse: string,
  message: string,
  context: string,
  emotion: string,
  language: string = 'fr',
  ageGroup: string = 'tous'
): string {
  const wisdom = getSpiritualWisdom(message, context, emotion, language, ageGroup);
  
  if (wisdom.length === 0) return originalResponse;
  
  let enrichedResponse = originalResponse;
  
  wisdom.forEach((w, index) => {
    const sourceEmoji = {
      'torah': '📜',
      'talmud': '📚',
      'bible': '✝️',
      'coran': '☪️',
      'bouddhisme': '🕉️',
      'hindouisme': '🕉️',
      'christianisme': '✝️',
      'islam': '☪️',
      'universel': '🌍'
    }[w.source] || '✨';
    
    enrichedResponse += `\n\n${sourceEmoji} **${w.title}** :\n${w.content}`;
  });
  
  return enrichedResponse;
}

// Fonction pour obtenir une citation spirituelle inspirante
export function getInspirationalQuote(language: string = 'fr'): string {
  const quotes = {
    fr: [
      "La paix commence par un sourire - Mère Teresa",
      "Soyez le changement que vous voulez voir dans le monde - Gandhi",
      "L'amour est la seule force capable de transformer un ennemi en ami - Martin Luther King",
      "Dans la tempête, soyez comme un roseau qui plie mais ne rompt pas - Proverbe chinois",
      "La sagesse véritable consiste à connaître ses limites - Socrate"
    ],
    en: [
      "Peace begins with a smile - Mother Teresa",
      "Be the change you want to see in the world - Gandhi",
      "Love is the only force capable of transforming an enemy into a friend - Martin Luther King",
      "In the storm, be like a reed that bends but does not break - Chinese Proverb",
      "True wisdom consists in knowing one's limits - Socrates"
    ]
  };
  
  const languageQuotes = quotes[language as keyof typeof quotes] || quotes.fr;
  return languageQuotes[Math.floor(Math.random() * languageQuotes.length)];
}
