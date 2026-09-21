import { StageInfo } from '../types';

export const STAGES_LIST: StageInfo[] = [
  {
    id: 1,
    title: 'Escolher o Tema',
    subtitle: 'O que você quer pesquisar?',
    icon: 'Search',
    color: '#93C5FD', // soft blue
    badgeName: 'Explorador Curioso',
    badgeIcon: '🧭',
  },
  {
    id: 2,
    title: 'Pergunta de Pesquisa',
    subtitle: 'Transforme o tema em curiosidade',
    icon: 'HelpCircle',
    color: '#FCD34D', // soft yellow
    badgeName: 'Mente Questionadora',
    badgeIcon: '❓',
  },
  {
    id: 3,
    title: 'Conversar com a IA',
    subtitle: 'O IA como guia, não resolvedor',
    icon: 'Bot',
    color: '#A7F3D0', // soft mint
    badgeName: 'Diálogo Inteligente',
    badgeIcon: '🤖',
  },
  {
    id: 4,
    title: 'Verificar Informações',
    subtitle: 'Investigar fontes e confirmar fatos',
    icon: 'CheckCheck',
    color: '#FBCFE8', // soft pink
    badgeName: 'Detetive da Verdade',
    badgeIcon: '🔍',
  },
  {
    id: 5,
    title: 'Com Suas Palavras',
    subtitle: 'Registre o que você compreendeu',
    icon: 'PenTool',
    color: '#DDD6FE', // soft purple
    badgeName: 'Pensador Autêntico',
    badgeIcon: '✍️',
  },
  {
    id: 6,
    title: 'Criar Produto Autoral',
    subtitle: 'Desenho, texto ou cartaz autoral',
    icon: 'Palette',
    color: '#FED7AA', // soft peach
    badgeName: 'Criador Brilhante',
    badgeIcon: '🎨',
  },
  {
    id: 7,
    title: 'Código do Bom Usuário',
    subtitle: 'Ética, privacidade e segurança',
    icon: 'Shield',
    color: '#BAE6FD', // soft sky blue
    badgeName: 'Guardião da Consciência',
    badgeIcon: '🛡️',
  },
  {
    id: 8,
    title: 'O Que Eu Aprendi?',
    subtitle: 'Reflexão sobre as descobertas',
    icon: 'Brain',
    color: '#FEF08A', // soft lemon
    badgeName: 'Sábio Reflexivo',
    badgeIcon: '🧠',
  },
  {
    id: 9,
    title: 'Recompensa Final',
    subtitle: 'Dossiê e Certificado Oficial',
    icon: 'Trophy',
    color: '#FDE047', // golden
    badgeName: 'Mestre da Pesquisa Consciente',
    badgeIcon: '🏆',
  },
];

export const SUGGESTED_TOPICS = [
  {
    id: 'dinos',
    emoji: '🦕',
    title: 'Como os dinossauros viviam?',
    category: 'Ciências & Paleontologia',
    starterQuestion: 'Como os dinossauros se comunicavam e cuidavam dos seus filhotes?',
  },
  {
    id: 'space',
    emoji: '🚀',
    title: 'Mistérios dos Buracos Negros',
    category: 'Astronomia',
    starterQuestion: 'O que acontece de verdade perto de um buraco negro no espaço?',
  },
  {
    id: 'ocean',
    emoji: '🐋',
    title: 'Criaturas do Fundo do Oceano',
    category: 'Biologia Marinha',
    starterQuestion: 'Como os animais marinhos conseguem viver na escuridão profunda sem luz do sol?',
  },
  {
    id: 'ai',
    emoji: '🤖',
    title: 'Como a Inteligência Artificial aprende?',
    category: 'Tecnologia',
    starterQuestion: 'Qual é a diferença entre a inteligência de um ser humano e uma IA?',
  },
  {
    id: 'rainforest',
    emoji: '🦜',
    title: 'Animais Incríveis da Amazônia',
    category: 'Meio Ambiente',
    starterQuestion: 'Por que a floresta amazônica é tão essencial para o clima do planeta inteiro?',
  },
  {
    id: 'solar',
    emoji: '☀️',
    title: 'Energia Solar e Fontes Limpas',
    category: 'Sustentabilidade',
    starterQuestion: 'Como a luz do sol pode ser transformada em eletricidade para ligar cidades?',
  },
];

export const VERIFICATION_QUIZ = [
  {
    id: 'q1',
    claim: '“Se uma Inteligência Artificial disse algo com muita certeza, então o fato é 100% verdadeiro e não precisa conferir.”',
    isTrue: false,
    explanation: 'Falso! As IAs podem errar, misturar dados ou inventar coisas (chamado de alucinação). Informações importantes sempre precisam ser checadas em fontes confiáveis!',
    ruleLearned: 'Sempre confira fatos em livros, sites de ciência ou com seus professores.',
  },
  {
    id: 'q2',
    claim: '“Toda pesquisa escolar deve citar de onde vieram as informações, inclusive se usamos a IA como assistente de ideias.”',
    isTrue: true,
    explanation: 'Verdadeiro! Citar as fontes demonstra respeito aos autores e honestidade no trabalho. Dar créditos é atitude de cientista!',
    ruleLearned: 'Respeite a autoria e cite suas fontes.',
  },
  {
    id: 'q3',
    claim: '“Podemos digitar nosso endereço, escola e telefone na conversa com a IA para ela nos conhecer melhor.”',
    isTrue: false,
    explanation: 'Muito perigoso! Falso! Jamais compartilhe senhas, endereço, telefone ou dados pessoais em chats de IA ou sites.',
    ruleLearned: 'Proteja sempre sua privacidade e segurança digital.',
  },
];

export const CODE_OF_HONOR_PLEDGES = [
  {
    id: 'p1',
    title: 'Não copiar respostas prontas',
    desc: 'Eu uso a IA para despertar ideias e entender conceitos, mas quem pensa, escreve e cria sou EU!',
    icon: 'CopySlash',
    badge: 'Autonomia',
  },
  {
    id: 'p2',
    title: 'Conferir as informações',
    desc: 'Sei que a IA pode cometer erros ou alucinar. Por isso, sempre checo com livros, enciclopédias e professores.',
    icon: 'SearchCheck',
    badge: 'Verificação',
  },
  {
    id: 'p3',
    title: 'Respeitar a autoria e citar fontes',
    desc: 'Dou créditos aos cientistas, autores e criadores que pesquisaram antes de mim.',
    icon: 'BookmarkCheck',
    badge: 'Honestidade',
  },
  {
    id: 'p4',
    title: 'Citar o uso ético da IA',
    desc: 'Sou transparente e conto como utilizei a IA como guia de aprendizagem na minha jornada.',
    icon: 'Sparkles',
    badge: 'Transparência',
  },
  {
    id: 'p5',
    title: 'Guardar meus dados pessoais',
    desc: 'Nunca compartilho senhas, endereço, telefone ou dados de documentos na internet ou em chats.',
    icon: 'Lock',
    badge: 'Privacidade',
  },
];
