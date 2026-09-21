import React, { useEffect, useState } from 'react';
import { MascotIA } from '../MascotIA';
import { ResearchProject } from '../../types';
import { Sparkles, Trophy, Award, Printer, Download, RotateCcw, ShieldCheck, CheckCircle2, Heart, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage9RewardProps {
  project: ResearchProject;
  onRestart: () => void;
}

export const Stage9Reward: React.FC<Stage9RewardProps> = ({
  project,
  onRestart,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'certificate'>('dossier');

  useEffect(() => {
    // Grand celebration confetti bursts
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FCD34D', '#93C5FD', '#86EFAC', '#F472B6', '#A855F7'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FCD34D', '#93C5FD', '#86EFAC', '#F472B6', '#A855F7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const todayFormatted = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Guia IA Mascote celebrando */}
      <MascotIA
        mood="celebrating"
        speechText={`PARABÉNS, ${project.studentName.toUpperCase()}! 🏆🌟 Você concluiu todas as 9 etapas da jornada! Você provou que a inteligência artificial não substitui a sua mente genial: ela apenas acende a faísca da sua curiosidade! Veja seu Dossiê e seu Certificado Oficial abaixo!`}
      />

      {/* MANIFESTO DOS 6 SUPERPODERES */}
      <div className="bg-gradient-to-r from-amber-100 via-sky-100 to-emerald-100 rounded-3xl p-6 border-3 border-amber-300 shadow-[3px_5px_0px_#F59E0B] text-center space-y-3">
        <div className="text-3xl">✨ 🧠 ✨</div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-handwriting tracking-wide">
          O Juramento do Pesquisador Consciente
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto pt-1">
          <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200 text-xs sm:text-sm font-extrabold text-amber-900 shadow-xs">
            🔎 EU CONSIGO PESQUISAR.
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm font-extrabold text-sky-900 shadow-xs">
            ❓ EU CONSIGO PERGUNTAR.
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm font-extrabold text-emerald-900 shadow-xs">
            🔍 EU CONSIGO CONFERIR.
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-purple-200 text-xs sm:text-sm font-extrabold text-purple-900 shadow-xs">
            🧠 EU CONSIGO PENSAR.
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm font-extrabold text-orange-900 shadow-xs">
            🎨 EU CONSIGO CRIAR.
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-rose-200 text-xs sm:text-sm font-extrabold text-rose-900 shadow-xs">
            🛡️ EU POSSO USAR A IA COM CONSCIÊNCIA.
          </div>
        </div>
      </div>

      {/* TABS & ACTIONS */}
      <div className="no-print flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dossier'
                ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Caderno da Pesquisa Consciente</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'certificate'
                ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Certificado Oficial</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            title="Iniciar nova pesquisa do zero"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Pesquisa</span>
          </button>
        </div>
      </div>

      {/* TAB 1: O DOSSIÊ COMPLETO DA PESQUISA CONSCIENTE */}
      {activeTab === 'dossier' && (
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-3 border-[#E2D5C3] shadow-[4px_6px_0px_#CBD5E1] space-y-6">
          {/* Header do Dossiê */}
          <div className="border-b-2 border-dashed border-amber-300 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-xs">
                📒
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                  Dossiê Oficial de Aprendizagem
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-handwriting mt-1">
                  Minha Pesquisa Consciente
                </h3>
                <p className="text-xs text-slate-500">
                  Pesquisador(a): <strong className="text-slate-800">{project.studentName}</strong> • Data: {todayFormatted}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-2xl text-emerald-900 text-xs font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Selo Ético de Uso Consciente da IA</span>
            </div>
          </div>

          {/* Seção 1: Tema e Pergunta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 block">Tema Investigado:</span>
              <div className="text-base font-bold text-sky-900 flex items-center gap-2">
                <span>🔎</span> {project.topic}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 block">Pergunta Curiosa de Pesquisa:</span>
              <div className="text-base font-bold text-amber-900 flex items-center gap-2">
                <span>❓</span> {project.researchQuestion}
              </div>
            </div>
          </div>

          {/* Seção 2: Conhecimento Prévio */}
          {project.priorKnowledge && (
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs space-y-1.5">
              <span className="text-xs uppercase font-bold text-slate-400 block">O Que Eu Já Sabia Antes de Começar:</span>
              <p className="text-sm text-slate-700 italic">
                “{project.priorKnowledge}”
              </p>
            </div>
          )}

          {/* Seção 3: Explicação com Próprias Palavras */}
          <div className="bg-white p-5 rounded-2xl border-2 border-purple-200 shadow-xs space-y-2">
            <span className="text-xs uppercase font-bold text-purple-700 block flex items-center gap-1">
              <span>✍️</span> Minha Explicação Autoral (Sem Copiar!):
            </span>
            <div className="p-4 bg-notebook-paper rounded-xl text-slate-800 text-sm sm:text-base leading-[28px]">
              {project.studentExplanation || 'Explicação registrada com as próprias palavras.'}
            </div>
          </div>

          {/* Seção 4: Criação Autoral (Desenho ou Texto) */}
          <div className="bg-white p-5 rounded-2xl border-2 border-orange-200 shadow-xs space-y-3">
            <span className="text-xs uppercase font-bold text-orange-700 block flex items-center gap-1">
              <span>🎨</span> Minha Produção Autoral:
            </span>

            {project.creationType === 'drawing' && project.creationDrawingDataUrl ? (
              <div className="flex flex-col items-center">
                <div className="border-3 border-dashed border-amber-300 rounded-2xl overflow-hidden p-1 bg-white shadow-xs max-w-xl w-full">
                  <img
                    src={project.creationDrawingDataUrl}
                    alt="Desenho autoral feito pelo estudante"
                    className="w-full h-auto rounded-xl object-contain bg-white"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1">Ilustração autoral feita à mão com lápis de cor digital</span>
              </div>
            ) : (
              <div className="p-4 bg-orange-50/40 rounded-xl border border-orange-200 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {project.creationTitle && <h4 className="font-bold text-base mb-2 text-orange-950">{project.creationTitle}</h4>}
                {project.creationText}
              </div>
            )}
          </div>

          {/* Seção 5: Fontes Verificadas */}
          <div className="bg-white p-5 rounded-2xl border-2 border-pink-200 shadow-xs space-y-2.5">
            <span className="text-xs uppercase font-bold text-pink-700 block flex items-center gap-1">
              <span>🔍</span> Fontes Confiáveis Consultadas e Verificadas:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.verifiedSources.map((src) => (
                <div key={src.id} className="p-3 rounded-xl bg-pink-50/50 border border-pink-200 text-xs">
                  <span className="font-bold text-slate-800 block">{src.title}</span>
                  <span className="text-[11px] text-slate-500">{src.details}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 6: O Que Eu Aprendi (Reflexões) */}
          <div className="bg-white p-5 rounded-2xl border-2 border-yellow-200 shadow-xs space-y-3">
            <span className="text-xs uppercase font-bold text-yellow-800 block flex items-center gap-1">
              <span>🧠</span> O Que Eu Aprendi na Jornada:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">💡 O que descobri de novo:</span>
                <p className="text-slate-700">{project.learnedWhat}</p>
              </div>

              <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200 space-y-1">
                <span className="font-bold text-pink-900 block">🔍 O que conferi em outras fontes:</span>
                <p className="text-slate-700">{project.learnedCheck}</p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1">
                <span className="font-bold text-sky-900 block">🤖 Como a IA me ajudou a pensar:</span>
                <p className="text-slate-700">{project.learnedHowAiHelped}</p>
              </div>
            </div>
          </div>

          {/* Rodapé do Caderno */}
          <div className="border-t-2 border-dashed border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              Aplicativo Educacional <strong>IA com Consciência</strong> • {project.starsCount} de 9 Estrelas Conquistadas ⭐
            </div>
            <div className="italic text-slate-400">
              “Não quero que a IA faça o trabalho da criança. Quero que ela ajude a criança a aprender a pensar com a IA.”
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CERTIFICADO OFICIAL */}
      {activeTab === 'certificate' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border-4 border-amber-400 shadow-[6px_8px_0px_#D97706] text-center space-y-6 relative overflow-hidden">
          {/* Decorative Certificate Corners */}
          <div className="absolute top-3 left-3 text-2xl text-amber-400">⚜️</div>
          <div className="absolute top-3 right-3 text-2xl text-amber-400">⚜️</div>
          <div className="absolute bottom-3 left-3 text-2xl text-amber-400">⚜️</div>
          <div className="absolute bottom-3 right-3 text-2xl text-amber-400">⚜️</div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-700">
              REPÚBLICA DA APRENDIZAGEM CRIATIVA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 font-handwriting">
              Certificado de Pesquisador Consciente
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Concedido por mérito de pensamento crítico, autonomia e uso ético da Inteligência Artificial
            </p>
          </div>

          <div className="py-4 space-y-3 max-w-xl mx-auto">
            <p className="text-sm text-slate-600">Certificamos com muito orgulho que:</p>
            <div className="text-2xl sm:text-3xl font-black text-sky-800 font-handwriting border-b-2 border-dashed border-sky-300 pb-1">
              {project.studentName || 'Pesquisador de Ouro'}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              concluiu com êxito as 9 etapas da jornada educativa sobre o tema:
              <br />
              <strong className="text-base text-slate-900 font-bold">"{project.topic}"</strong>,
              <br />
              demonstrando que <strong>sabe perguntar, verificar fontes, pensar por si mesmo e criar de forma autoral</strong>, sem copiar respostas prontas e com total respeito à segurança e à privacidade!
            </p>
          </div>

          {/* Seals and Badges */}
          <div className="flex items-center justify-center gap-6 pt-3 flex-wrap">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-3 border-amber-400 flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl">🏆</span>
              <span className="text-[9px] font-black uppercase text-amber-900">9 Estrelas</span>
            </div>

            <div className="w-24 h-24 rounded-full bg-sky-100 border-3 border-sky-400 flex flex-col items-center justify-center shadow-xs">
              <span className="text-3xl">🤖</span>
              <span className="text-[9px] font-black uppercase text-sky-900">IA Amiga</span>
            </div>

            <div className="w-20 h-20 rounded-full bg-emerald-100 border-3 border-emerald-400 flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl">🛡️</span>
              <span className="text-[9px] font-black uppercase text-emerald-900">Ética 100%</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 max-w-lg mx-auto">
            <div>
              Data de Emissão: <strong className="text-slate-700">{todayFormatted}</strong>
            </div>
            <div>
              Assinatura Oficial: <strong className="text-sky-700 font-handwriting text-base">Robô Guia IA & Você ✨</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
