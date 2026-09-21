import React, { useState } from 'react';
import { MascotIA } from '../MascotIA';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Brain, Lightbulb, Search, Bot } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage8WhatILearnedProps {
  topic: string;
  initialLearnedWhat?: string;
  initialLearnedCheck?: string;
  initialLearnedHowAiHelped?: string;
  onSave: (data: { learnedWhat: string; learnedCheck: string; learnedHowAiHelped: string }) => void;
  onNext: () => void;
}

export const Stage8WhatILearned: React.FC<Stage8WhatILearnedProps> = ({
  topic,
  initialLearnedWhat = '',
  initialLearnedCheck = '',
  initialLearnedHowAiHelped = '',
  onSave,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [learnedWhat, setLearnedWhat] = useState(initialLearnedWhat || '');
  const [learnedCheck, setLearnedCheck] = useState(initialLearnedCheck || '');
  const [learnedHowAiHelped, setLearnedHowAiHelped] = useState(initialLearnedHowAiHelped || '');

  const isFormValid =
    hasReadInstruction &&
    learnedWhat.trim().length >= 8 &&
    learnedCheck.trim().length >= 8 &&
    learnedHowAiHelped.trim().length >= 8;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSave({
      learnedWhat: learnedWhat.trim(),
      learnedCheck: learnedCheck.trim(),
      learnedHowAiHelped: learnedHowAiHelped.trim(),
    });

    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FEF08A', '#FCD34D', '#93C5FD', '#F472B6'],
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="happy"
        speechText="Estamos quase na grande coroação! 🧠 Os maiores sábios do mundo sempre fazem uma pausa para refletir: 'O que eu descobri hoje? O que eu conferi? E como a tecnologia me ajudou a pensar?'. Preencha suas 3 reflexões para destravar seu troféu!"
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-yellow-50/80 rounded-3xl p-5 sm:p-6 border-2 border-yellow-200 shadow-[2px_3px_0px_#FEF08A]">
        <div className="flex items-center gap-2.5 mb-3 text-yellow-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-yellow-600" />
          <span>Etapa 8: A Autoavaliação do Pesquisador</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-2.5 bg-white/90 p-4 rounded-2xl border border-yellow-100">
          <p>
            Parar para pensar sobre o seu próprio aprendizado se chama <strong>metacognição</strong>. É o superpoder de entender como o seu cérebro aprendeu algo novo!
          </p>
          <p>
            Nesta etapa, você vai olhar para trás em toda a sua jornada e registrar seus maiores marcos sobre <strong>"{topic}"</strong>.
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
            <span>Compreendi a importância de refletir sobre o que aprendi! 📖🧠</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Registre suas 3 reflexões.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: 3 REFLEXÕES DE OURO */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-5">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <Brain className="w-5 h-5 text-yellow-500" />
            <span>Suas 3 Descobertas da Jornada</span>
          </div>

          {/* 1. O que descobri */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>1. O que eu descobri de mais surpreendente sobre o tema?</span>
            </label>
            <textarea
              required
              rows={3}
              value={learnedWhat}
              onChange={(e) => setLearnedWhat(e.target.value)}
              placeholder="Ex: Descobri que os dinossauros tinham parentesco com as aves de hoje e que muitos tinham penas coloridas..."
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          {/* 2. O que conferi */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-pink-500" />
              <span>2. O que eu precisei conferir para não cair em erros ou alucinações?</span>
            </label>
            <textarea
              required
              rows={3}
              value={learnedCheck}
              onChange={(e) => setLearnedCheck(e.target.value)}
              placeholder="Ex: Conferi a data em que os fósseis foram encontrados e se a espécie de dinossauro realmente existiu..."
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          {/* 3. Como a IA ajudou */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-sky-500" />
              <span>3. Como a IA me ajudou a pensar e aprender (sem fazer por mim)?</span>
            </label>
            <textarea
              required
              rows={3}
              value={learnedHowAiHelped}
              onChange={(e) => setLearnedHowAiHelped(e.target.value)}
              placeholder="Ex: O robô IA me fez perguntas instigantes, deu pistas de onde procurar e me ajudou a organizar as ideias para eu escrever com minhas próprias palavras..."
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                isFormValid
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-2 border-yellow-500 cursor-pointer shadow-[2px_3px_0px_#CA8A04]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-800" />
              <span>Concluir Etapa 8 & Liberar a Grande Recompensa! 🏆</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
