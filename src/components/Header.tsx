import React, { useState } from 'react';
import { Star, Award, RotateCcw, Info, Sparkles, BookOpen } from 'lucide-react';
import { STAGES_LIST } from '../data/stagesData';
import { StageId } from '../types';

interface HeaderProps {
  currentStage: StageId;
  completedStages: StageId[];
  starsCount: number;
  studentName: string;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  completedStages,
  starsCount,
  studentName,
  onReset,
}) => {
  const [showManifestModal, setShowManifestModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  return (
    <header className="no-print w-full bg-[#FAF5EE] border-b-2 border-[#E2D5C3] sticky top-0 z-30 shadow-xs backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-200 via-sky-200 to-rose-200 border-2 border-amber-300 flex items-center justify-center shadow-xs">
            <span className="text-xl">✨</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#1E293B] tracking-tight font-handwriting">
                IA com Consciência
              </h1>
              <span className="text-[10px] uppercase font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                6 a 15 anos
              </span>
            </div>
            <p className="text-xs text-[#64748B] hidden sm:block">
              Aprender, Pesquisar e Criar com Inteligência Artificial
            </p>
          </div>
        </div>

        {/* Gamification Stats: Stars, Badges, Mission */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {/* Student Tag if entered */}
          {studentName && (
            <div className="text-xs bg-white text-slate-700 font-semibold px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1">
              <span>👤</span> {studentName}
            </div>
          )}

          {/* Stars Counter */}
          <div 
            className="flex items-center gap-1 bg-amber-100/90 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-xs cursor-pointer hover:scale-105 transition-transform"
            title="Estrelas conquistadas em cada etapa concluída!"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{starsCount} / 9</span>
            <span className="text-[10px] text-amber-700 hidden sm:inline">Estrelas</span>
          </div>

          {/* Badges Button */}
          <button
            type="button"
            onClick={() => setShowBadgesModal(true)}
            className="flex items-center gap-1 bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-bold hover:bg-purple-200 transition-colors cursor-pointer"
            title="Ver medalhas e conquistas"
          >
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>{completedStages.length}</span>
            <span className="text-[10px] text-purple-700 hidden sm:inline">Medalhas</span>
          </button>

          {/* Manifest Principle Button */}
          <button
            type="button"
            onClick={() => setShowManifestModal(true)}
            className="flex items-center gap-1 bg-sky-100 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-full text-xs font-bold hover:bg-sky-200 transition-colors cursor-pointer"
            title="Qual é o propósito deste app?"
          >
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Propósito</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full border border-slate-200 transition-colors"
            title="Iniciar nova pesquisa do zero"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Motto Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 border-t border-b border-amber-200/60 px-4 py-1.5 text-center">
        <p className="text-xs sm:text-sm font-bold text-[#334155] font-handwriting">
          🌟 “Não quero que a IA faça o trabalho da criança. Quero que ela ajude a criança a aprender a pensar com a IA.”
        </p>
      </div>

      {/* Modal: Purpose & Manifesto */}
      {showManifestModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 max-w-lg w-full border-3 border-amber-300 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-2xl border-2 border-amber-400">
                💡
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 font-handwriting">
                  O Segredo da Pesquisa Consciente
                </h3>
                <p className="text-xs text-slate-500">Para estudantes, pais e professores</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-amber-200">
              <p className="font-semibold text-sky-800">
                A Inteligência Artificial é uma ferramenta incrível, mas o verdadeiro cérebro brilhante é o SEU!
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li><strong>A IA não faz por você:</strong> ela atua como um guia curioso para você descobrir novos caminhos.</li>
                <li><strong>Pensamento Crítico:</strong> você aprende a perguntar, checar fontes e desconfiar de erros.</li>
                <li><strong>Criação Autoral:</strong> no final, você expressa o que entendeu com suas próprias palavras e desenhos!</li>
                <li><strong>Segurança:</strong> você aprende a nunca expor dados pessoais na internet.</li>
              </ul>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowManifestModal(false)}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all shadow-md active:scale-95"
              >
                Entendi! Vamos nessa! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Badges & Achievements */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 max-w-xl w-full border-3 border-purple-300 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-purple-200 flex items-center justify-center text-xl border border-purple-400">
                  🏅
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-handwriting">
                    Suas Conquistas e Medalhas
                  </h3>
                  <p className="text-xs text-slate-500">Colecione as 9 medalhas da jornada!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBadgesModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STAGES_LIST.map((stg) => {
                const isUnlocked = completedStages.includes(stg.id);
                return (
                  <div
                    key={stg.id}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-white border-amber-300 shadow-xs'
                        : 'bg-slate-100/70 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="text-2xl shrink-0">{stg.badgeIcon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {stg.badgeName}
                        </h4>
                        {isUnlocked && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            Conquistada! ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        Etapa {stg.id}: {stg.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setShowBadgesModal(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-md"
              >
                Continuar Pesquisa ✏️
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
