import React, { useState, useRef, useEffect } from 'react';
import { MascotIA } from '../MascotIA';
import { ChatMessage } from '../../types';
import { Sparkles, ArrowRight, BookOpen, Send, Bot, User, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage3ChatIAProps {
  topic: string;
  researchQuestion: string;
  initialChatHistory: ChatMessage[];
  onSaveChat: (history: ChatMessage[]) => void;
  onNext: () => void;
}

export const Stage3ChatIA: React.FC<Stage3ChatIAProps> = ({
  topic,
  researchQuestion,
  initialChatHistory,
  onSaveChat,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialChatHistory && initialChatHistory.length > 0) return initialChatHistory;
    return [
      {
        id: 'msg-init',
        sender: 'ai',
        text: `Olá! Eu sou o IA! 🤖✨ Estou muito animado para explorar sua pergunta: **"${researchQuestion || topic}"**!\n\nLembre-se da nossa regra de amigos: **eu não vou fazer seu trabalho por você**, mas posso te dar pistas incríveis, fazer perguntas curiosas e te ajudar a pensar! O que você gostaria de me perguntar primeiro?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Socratic quick suggestion chips
  const quickIdeas = [
    `Quais pistas você pode me dar sobre ${topic || 'esse tema'}?`,
    `O que os cientistas acham que causa isso?`,
    `Você pode me fazer uma pergunta difícil para testar o que eu já sei?`,
    `Onde eu posso conferir se uma informação sobre isso é confiável?`,
  ];

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    // Instant client-side privacy check
    if (/minha senha|minhasenha|meu telefone|meu cep|moro na rua|meu endereço/i.test(text)) {
      setPrivacyNotice('Lembre-se da segurança: nunca compartilhe senhas, telefone ou endereço!');
    } else {
      setPrivacyNotice(null);
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory,
          topic,
          researchQuestion,
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || 'Que ponto interessante! Como você acha que podemos investigar mais a fundo?';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWarning: Boolean(data.securityWarning),
      };

      const updated = [...newHistory, aiMsg];
      setMessages(updated);
      onSaveChat(updated);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Pensando nessa questão... O que a sua própria curiosidade te diz a respeito disso? Como poderíamos descobrir juntos?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updated = [...newHistory, fallbackMsg];
      setMessages(updated);
      onSaveChat(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const userMessagesCount = messages.filter((m) => m.sender === 'user').length;
  const canProceed = hasReadInstruction && userMessagesCount >= 2;

  const handleComplete = () => {
    onSaveChat(messages);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#A7F3D0', '#38BDF8', '#FDE047'],
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="curious"
        speechText="Chegamos ao laboratório de ideias! Aqui você conversa comigo. Lembre-se: se você me pedir 'faça minha redação', eu vou recusar com carinho e te perguntar: 'O que você acha?'. Faça perguntas curiosas para investigarmos juntos!"
        showSocraticButtons={true}
        onAskSocratic={(phrase) => handleSendMessage(`IA, me faça pensar: ${phrase}`)}
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-emerald-50/80 rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-[2px_3px_0px_#A7F3D0]">
        <div className="flex items-center gap-2.5 mb-3 text-emerald-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Etapa 3: A IA é Sua Guia de Aprendizagem, Não um Resolvedor!</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-2.5 bg-white/90 p-4 rounded-2xl border border-emerald-100">
          <p>
            Existe uma grande diferença entre <strong>usar a IA para pensar</strong> e <strong>deixar a IA pensar por você</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs sm:text-sm">
              <span className="font-bold text-rose-800 block mb-1">🚫 O que NÃO fazer:</span>
              <p className="text-slate-600">
                Pedir: <em>“Escreva um texto pronto de 20 linhas sobre dinossauros para eu copiar no meu caderno.”</em><br />
                (Isso impede seu cérebro de aprender e comete plágio!)
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-800 block mb-1">⭐ O jeito inteligente de pesquisar:</span>
              <p className="text-slate-600">
                Perguntar: <em>“Quais pistas me ajudam a entender como os dinossauros se defendiam?”</em> ou <em>“Você pode me explicar com uma comparação simples?”</em>
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 border-emerald-300"
            />
            <span>Li e compreendi que a IA é um guia socrático de aprendizagem! 📖🤖</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Converse com o IA abaixo.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: CHAT INTERATIVO AO VIVO */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] overflow-hidden flex flex-col h-[520px]">
          {/* Chat Header */}
          <div className="bg-[#FAF5EE] p-3.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                  <span>Robô Guia IA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500">
                  Pesquisa: {researchQuestion || topic || 'Investigação'}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
              Perguntas feitas: {userMessagesCount} / 2 (mínimo)
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-full bg-sky-200 border border-sky-400 flex items-center justify-center text-sm shrink-0">
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? msg.isWarning
                          ? 'bg-rose-50 border-2 border-rose-300 text-rose-900 shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                        : 'bg-sky-500 text-white font-medium shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        isAi ? 'text-slate-400' : 'text-sky-100'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-sm shrink-0">
                      🧒
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2 bg-white/70 rounded-xl w-fit border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>O IA está pensando em uma boa pista para você...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickIdeas.map((idea, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(idea)}
                className="text-xs bg-slate-50 hover:bg-sky-50 hover:text-sky-800 text-slate-600 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer"
              >
                💭 {idea}
              </button>
            ))}
          </div>

          {/* Privacy Warning Banner if detected */}
          {privacyNotice && (
            <div className="bg-rose-100 border-t border-rose-200 px-4 py-1.5 text-xs text-rose-800 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{privacyNotice}</span>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-white border-t border-slate-200 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Faça uma pergunta sobre sua pesquisa para o IA..."
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-hidden text-xs sm:text-sm bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Perguntar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Advance Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            {userMessagesCount < 2 ? (
              <span className="text-amber-700 font-bold">
                ⚠️ Faça pelo menos 2 perguntas para o IA antes de avançar! (Faltam {2 - userMessagesCount})
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Você conversou e explorou ideias com o IA! Pronto para verificar as informações!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleComplete}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
              canProceed
                ? 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-2 border-emerald-500 cursor-pointer shadow-[2px_3px_0px_#047857]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>Concluir Etapa 3 & Ganhar Estrela 3 ⭐</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
