import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Privacy Filter: check for personal data patterns
function detectSensitiveData(text: string): string | null {
  const lower = text.toLowerCase();
  
  // Password mentions
  if (/minha senha (é|e|sera)|minhasenha|\bsenha\s*:\s*\S+/i.test(text)) {
    return 'senha';
  }
  // Phone numbers (e.g. (xx) 9xxxx-xxxx or similar)
  if (/(\(?\d{2}\)?\s*9?\d{4}[-\s]?\d{4})/.test(text)) {
    return 'número de telefone';
  }
  // Address markers
  if (/(moro na rua|moro na avenida|meu endereço é|minha casa fica na rua|cep\s*\d{5})/i.test(lower)) {
    return 'endereço de casa';
  }
  // CPF / Document markers
  if (/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/.test(text) || /\bmeu rg é\b/i.test(lower) || /\bmeu cpf é\b/i.test(lower)) {
    return 'documento pessoal (como CPF ou RG)';
  }

  return null;
}

// Fallback intelligent Socratic responses if Gemini key is missing or offline
function getSocraticFallback(message: string, topic?: string, researchQuestion?: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('faz para mim') || lower.includes('faz o trabalho') || lower.includes('copiar') || lower.includes('escreve meu texto')) {
    return `Opa, amigo explorador! 🛑 Lembre-se do nosso lema: eu sou o **IA**, seu guia de aventuras, e não faço o trabalho por você! Que tal nós pensarmos juntos? Se o assunto é "${topic || 'sua pesquisa'}", qual é a primeira ideia que vem à sua mente quando pensa nisso?`;
  }

  if (lower.includes('o que é') || lower.includes('quem foi') || lower.includes('como funciona')) {
    return `Excelente pergunta curiosa! 🔎 Pense comigo: quando observamos isso na natureza ou no nosso dia a dia, o que você já reparou sobre ${topic || 'esse assunto'}? Uma boa pista é pesquisar em enciclopédias ou livros sobre a origem disso. O que você acha que aconteceria se tentássemos investigar como isso começou?`;
  }

  if (lower.includes('é verdade') || lower.includes('fonte') || lower.includes('confiável')) {
    return `Você está agindo como um verdadeiro Detetive da Verdade! 🔍 Nem tudo que a gente lê na internet (ou que uma IA diz) é 100% certo. Vamos checar: qual livro, museu ou cientista renomado fala sobre isso? Você consegue encontrar mais uma fonte para confirmar essa informação?`;
  }

  return `Que reflexão interessante sobre ${topic || 'nossa pesquisa'}! 🤖💡 
Como o seu guia, eu adoro ver sua curiosidade em ação. 
Agora me diga: **o que você acha dessa questão com suas próprias palavras?** 
Se você fosse explicar para um colega de turma agora, como você começaria?`;
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'IA com Consciência', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Chat route with Socratic learning buddy
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], topic = '', researchQuestion = '' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Mensagem é obrigatória' });
      return;
    }

    // Safety check for personal information
    const sensitiveType = detectSensitiveData(message);
    if (sensitiveType) {
      res.json({
        reply: `🛡️ **Alerta de Segurança do Guardião IA!**\n\nPercebi que você pode ter mencionado um(a) **${sensitiveType}**!\n\nLembre-se da nossa regra de ouro de segurança na internet: **NUNCA compartilhe senhas, endereços, telefones ou documentos com Inteligências Artificiais ou em sites**. Proteja sempre sua privacidade e a da sua família! Vamos tentar refazer sua pergunta de pesquisa sem incluir esses dados?`,
        securityWarning: true,
        detectedType: sensitiveType,
      });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Offline / Socratic fallback mode
      const fallbackReply = getSocraticFallback(message, topic, researchQuestion);
      res.json({ reply: fallbackReply, isSimulated: true });
      return;
    }

    // Call Gemini 3.8 Flash with pedagogical Socratic instructions
    const systemInstruction = `
Você é o "IA", um robô-guia simpático, curioso, paciente, educativo e divertido do aplicativo educacional "IA com Consciência – Aprender, Pesquisar e Criar com Inteligência Artificial", destinado a crianças e jovens de 6 a 15 anos.

A FRASE PRINCIPAL DO NOSSO APP É:
"Não quero que a IA faça o trabalho da criança. Quero que ela ajude a criança a aprender a pensar com a IA."

CONTEXTO DA PESQUISA DA CRIANÇA:
- Tema escolhido: "${topic || 'Ainda não informado'}"
- Pergunta de pesquisa: "${researchQuestion || 'Ainda não formulada'}"

DIRETRIZES PEDAGÓGICAS INEGOCIÁVEIS:
1. JAMAIS entregue respostas prontas, redações completas, parágrafos prontos para copiar ou lições de casa resolvidas.
2. Seja um orientador socrático: devolva perguntas que estimulem a criança a pensar, analisar, comparar e concluir.
3. Use sempre que oportuno as perguntas-chave:
   - "O que você acha?"
   - "Como podemos descobrir?"
   - "Vamos conferir essa informação?"
   - "Você consegue explicar com suas palavras?"
4. Dê pistas, faça analogias simples e instigantes adequadas à idade (6 a 15 anos).
5. Se a criança pedir "faça um texto sobre X para minha escola", responda com carinho explicando que fazer por ela tiraria o superpoder de aprender, e ajude-a a estruturar tópicos e perguntas para ela mesma escrever.
6. Lembre a criança de que IAs podem errar ou ter "alucinações", incentivando-a a conferir livros, professores e fontes confiáveis.
7. Mantenha as respostas concisas (2 a 3 parágrafos curtos), dinâmicas, com emojis educativos e linguagem calorosa em Português do Brasil.
`;

    // Construct contents with limited recent history
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'ai') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Que pergunta curiosa! O que você acha que podemos descobrir a respeito disso?';
    res.json({ reply, isSimulated: false });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const fallbackReply = getSocraticFallback(req.body.message || '', req.body.topic, req.body.researchQuestion);
    res.json({ reply: fallbackReply, isSimulated: true });
  }
});

// Start server with Vite middleware in dev or static in prod
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IA com Consciência server running on http://0.0.0.0:${PORT}`);
  });
}

start();
