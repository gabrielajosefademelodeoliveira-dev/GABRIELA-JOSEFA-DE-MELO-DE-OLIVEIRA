import React, { useState } from 'react';
import { MascotIA } from '../MascotIA';
import { Sparkles, ArrowRight, BookOpen, HelpCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage2QuestionProps {
  topic: string;
  initialQuestion?: string;
  onSave: (question: string) => void;
  onNext: () => void;
}

export const Stage2Question: React.FC<Stage2QuestionProps> = ({
  topic,
  initialQuestion = '',
  onSave,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [question, setQuestion] = useState(initialQuestion || '');

  const sampleQuestionStarters = [
    `Como o(a) ${topic || 'assunto'} funciona de verdade?`,
    `Por que o(a) ${topic || 'assunto'} é tão importante para nós hoje?`,
    `De que maneira os cientistas descobriram segredos sobre ${topic || 'esse tema'}?`,
    `O que aconteceria no nosso planeta se ${topic || 'esse fenômeno'} não existisse?`,
  ];

  const handleUseStarter = (starter: string) => {
    setQuestion(starter);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Ensure it ends with question mark
    let cleanQ = question.trim();
    if (!cleanQ.endsWith('?')) {
      cleanQ += '?';
    }

    onSave(cleanQ);

    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FCD34D', '#FBCFE8', '#93C5FD'],
    });

    onNext();
  };

  const isValid = hasReadInstruction && question.trim().length >= 8;

  return (
    <div className="space-y-6">
      <MascotIA
        mood="thinking"
        speechText={`Excelente escolha de tema: "${topic || 'sua pesquisa'}"! Mas preste atenção: cientistas não procuram apenas dados soltos, eles buscam responder a uma GRANDE PERGUNTA! Vamos aprender a criar a sua?`}
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-yellow-50/80 rounded-3xl p-5 sm:p-6 border-2 border-yellow-200 shadow-[2px_3px_0px_#FDE047]">
        <div className="flex items-center gap-2.5 mb-3 text-yellow-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-yellow-600" />
          <span>Etapa 2: A Arte de Fazer Boas Perguntas</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 bg-white/90 p-4 rounded-2xl border border-yellow-100">
          <p>
            Uma boa pergunta de pesquisa é como uma chave dourada que abre portas secretas na ciência.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs sm:text-sm">
              <span className="font-bold text-rose-800 block mb-1">❌ Pergunta Fechada (Sim/Não):</span>
              <p className="text-slate-600">
                <em>“Os dinossauros existiram?”</em><br />
                (A resposta é apenas "sim", e a pesquisa acaba muito rápido!)
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-800 block mb-1">✅ Pergunta Investigativa (Curiosa):</span>
              <p className="text-slate-600">
                <em>“Como os cientistas conseguem descobrir o que os dinossauros comiam apenas olhando seus fósseis?”</em><br />
                (Dá vontade de ler, pesquisar e investigar!)
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-amber-900">
            ✨ Palavras mágicas para começar sua pergunta: <strong>Como...?</strong>, <strong>Por que...?</strong>, <strong>De que forma...?</strong>, <strong>O que aconteceria se...?</strong>
          </p>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-yellow-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-amber-600 focus:ring-amber-500 border-yellow-300"
            />
            <span>Li como criar uma pergunta investigativa! 📖❓</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Agora formule sua pergunta.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE PRÁTICA */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-5">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Atividade: Construindo a Sua Pergunta</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm">
            <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Seu tema escolhido:</span>
            <div className="font-bold text-sky-800 text-base flex items-center gap-1.5">
              <span>🔎</span> {topic || 'Tema em definição'}
            </div>
          </div>

          {/* Fórmulas de inspiração */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
              Clique em uma ideia abaixo para inspirar ou adaptar:
            </label>
            <div className="space-y-1.5">
              {sampleQuestionStarters.map((starter, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUseStarter(starter)}
                  className="w-full text-left p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-100 text-amber-950 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span className="text-amber-500 font-bold">👉</span>
                  <span>{starter}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Campo de formulação */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              Escreva a sua pergunta de pesquisa clara e interessante:
            </label>
            <textarea
              required
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Como os buracos negros conseguem sugar até a luz e o que os cientistas acham que tem dentro deles?"
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-sm sm:text-base font-medium resize-none"
            />
          </div>

          {/* Validação amigável */}
          {question.trim().length > 5 && (
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span>
                <strong>IA analisando sua pergunta:</strong> Que curiosidade fantástica! Essa pergunta vai guiar toda a nossa investigação!
              </span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                isValid
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-2 border-yellow-500 cursor-pointer shadow-[2px_3px_0px_#CA8A04]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-800" />
              <span>Concluir Etapa 2 & Ganhar Estrela 2 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
