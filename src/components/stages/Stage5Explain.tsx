import React, { useState } from 'react';
import { MascotIA } from '../MascotIA';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, PenTool, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage5ExplainProps {
  topic: string;
  researchQuestion: string;
  initialExplanation?: string;
  onSave: (explanation: string) => void;
  onNext: () => void;
}

export const Stage5Explain: React.FC<Stage5ExplainProps> = ({
  topic,
  researchQuestion,
  initialExplanation = '',
  onSave,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [explanation, setExplanation] = useState(initialExplanation || '');

  const wordCount = explanation.trim() ? explanation.trim().split(/\s+/).length : 0;
  const isSatisfactory = wordCount >= 15; // Requires at least a few thoughtful sentences

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSatisfactory) return;

    onSave(explanation.trim());

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#DDD6FE', '#93C5FD', '#FCD34D'],
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="happy"
        speechText="Agora vem o momento mais mágico de todos! Chega de computadores e IAs: agora o palco é do SEU cérebro! Se você tivesse que explicar tudo o que descobriu para um amigo no recreio, o que você diria? Use as suas próprias palavras!"
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-purple-50/80 rounded-3xl p-5 sm:p-6 border-2 border-purple-200 shadow-[2px_3px_0px_#DDD6FE]">
        <div className="flex items-center gap-2.5 mb-3 text-purple-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>Etapa 5: O Poder de Explicar com Suas Próprias Palavras</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 bg-white/90 p-4 rounded-2xl border border-purple-100">
          <p>
            Copiar e colar um texto bonito da internet ou da IA é como tirar uma foto de um prato de comida delicioso: a foto fica bonita, mas você não se alimenta de verdade!
          </p>

          <p>
            Quando você traduz o que aprendeu para as <strong>suas próprias palavras</strong>, o conhecimento vira parte de você. Ninguém tira isso de você!
          </p>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Dica de ouro:</strong> Comece com frases como: <em>“O que eu achei mais curioso foi que...”</em>, <em>“Isso acontece porque...”</em> ou <em>“Para entender isso, imagine que...”</em>.
            </span>
          </div>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-purple-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-purple-600 focus:ring-purple-500 border-purple-300"
            />
            <span>Compreendi por que explicar com minhas palavras é tão importante! 📖✍️</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Agora escreva sua síntese.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: FOLHA DE CADERNO DE REDAÇÃO */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
              <PenTool className="w-5 h-5 text-purple-600" />
              <span>Atividade: Minha Explicação Autoral</span>
            </div>

            <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Palavras escritas: <span className={wordCount >= 15 ? 'text-emerald-600' : 'text-amber-600'}>{wordCount}</span> (mínimo sugerido: 15)
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
            <strong>Tema:</strong> {topic} • <strong>Pergunta investigada:</strong> {researchQuestion}
          </div>

          {/* Notebook lined textarea */}
          <div className="relative">
            <textarea
              required
              rows={7}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Escreva aqui aquilo que você realmente compreendeu sobre sua pesquisa. Explique do seu jeito, sem se preocupar em usar palavras difíceis..."
              className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-hidden bg-notebook-paper text-slate-800 text-sm sm:text-base font-medium leading-[28px] resize-none shadow-inner"
            />
          </div>

          {/* Dynamic feedback from IA */}
          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center gap-2.5 text-xs text-purple-900">
            <span className="text-xl">🤖</span>
            <div>
              {wordCount === 0 ? (
                <span>O IA está ansioso para ler o seu pensamento autêntico!</span>
              ) : wordCount < 15 ? (
                <span>Muito bom começo! Escreva mais um pouquinho explicando os detalhes para ficar supercompleto!</span>
              ) : (
                <span className="font-bold text-emerald-800">
                  Sensacional! Você explicou com suas próprias palavras e provou que é o dono do seu conhecimento! 🎉
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!hasReadInstruction || !isSatisfactory}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                hasReadInstruction && isSatisfactory
                  ? 'bg-purple-400 hover:bg-purple-500 text-purple-950 border-2 border-purple-500 cursor-pointer shadow-[2px_3px_0px_#6B21A8]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-900" />
              <span>Concluir Etapa 5 & Ganhar Estrela 5 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
