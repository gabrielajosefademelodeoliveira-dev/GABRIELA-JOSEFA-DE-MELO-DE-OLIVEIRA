import React, { useState } from 'react';
import { MascotIA } from '../MascotIA';
import { CODE_OF_HONOR_PLEDGES } from '../../data/stagesData';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Shield, Lock, Check, AlertOctagon, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage7CodeOfHonorProps {
  onAcceptHonor: () => void;
  onNext: () => void;
}

export const Stage7CodeOfHonor: React.FC<Stage7CodeOfHonorProps> = ({
  onAcceptHonor,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [activePledges, setActivePledges] = useState<Record<string, boolean>>({});
  const [safetyQuiz, setSafetyQuiz] = useState<Record<string, string | null>>({});

  const togglePledge = (id: string) => {
    setActivePledges((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allPledgesChecked = CODE_OF_HONOR_PLEDGES.every((p) => activePledges[p.id]);

  const practicalScenarios = [
    {
      id: 'sc1',
      question: 'Se um colega disser: “Pede para a IA fazer a redação inteira e só troca o seu nome no cabeçalho”, qual é a atitude correta?',
      options: [
        { text: 'Copiar o texto todo, afinal ninguém vai notar.', correct: false },
        { text: 'Explicar que isso é plágio e que o legal é usar a IA só para ter ideias e escrever com as próprias palavras!', correct: true },
      ],
    },
    {
      id: 'sc2',
      question: 'Se um site ou aplicativo de IA pedir: “Digite seu endereço completo, telefone da sua mãe e sua senha”, o que você faz?',
      options: [
        { text: 'NUNCA digitar dados pessoais! Fechar a janela ou avisar um adulto responsável.', correct: true },
        { text: 'Digitar tudo para continuar usando rápido.', correct: false },
      ],
    },
  ];

  const handleSelectScenario = (scId: string, optText: string) => {
    setSafetyQuiz((prev) => ({ ...prev, [scId]: optText }));
  };

  const isScenarioCompleted =
    practicalScenarios.every((sc) => {
      const selected = safetyQuiz[sc.id];
      const correctOpt = sc.options.find((o) => o.correct)?.text;
      return selected === correctOpt;
    });

  const canProceed = hasReadInstruction && allPledgesChecked && isScenarioCompleted;

  const handleComplete = () => {
    onAcceptHonor();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#BAE6FD', '#38BDF8', '#FCD34D', '#10B981'],
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="warning"
        speechText="Atenção total ao Escudo de Segurança! 🛡️ A Inteligência Artificial é um superpoder, e como todo superpoder, exige grande responsabilidade! Vamos aprender os 5 Mandamentos do Bom Usuário de IA!"
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-sky-50/80 rounded-3xl p-5 sm:p-6 border-2 border-sky-200 shadow-[2px_3px_0px_#BAE6FD]">
        <div className="flex items-center gap-2.5 mb-3 text-sky-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-sky-600" />
          <span>Etapa 7: O Código do Bom Usuário de IA</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 bg-white/90 p-4 rounded-2xl border border-sky-100">
          <p>
            Ser um usuário consciente de IA significa dominar a tecnologia para o bem, sem deixar que ela tire sua autonomia ou coloque sua segurança em perigo.
          </p>

          <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-rose-900 text-xs sm:text-sm">
            <span className="font-bold flex items-center gap-1.5 mb-1 text-rose-800">
              <Lock className="w-4 h-4" /> SEGURANÇA MÁXIMA: NUNCA COMPARTILHE DADOS PESSOAIS!
            </span>
            <p>
              Nunca digite em chats ou sites: <strong>suas senhas</strong>, <strong>seu endereço</strong>, <strong>telefone pessoal ou dos pais</strong>, <strong>documentos (RG, CPF)</strong> ou fotos particulares. Preserve sua privacidade!
            </p>
          </div>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-sky-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-sky-600 focus:ring-sky-500 border-sky-300"
            />
            <span>Li e compreendi as regras de ouro e de segurança! 📖🛡️</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Assine o juramento abaixo.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: OS 5 ESCUDOS DE HONRA */}
      <div className={`space-y-5 transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <Shield className="w-5 h-5 text-sky-600" />
            <span>Ative os 5 Escudos do Guardião Digital:</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            Clique em cada um dos escudos para firmar seu compromisso ético:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CODE_OF_HONOR_PLEDGES.map((pledge) => {
              const isChecked = Boolean(activePledges[pledge.id]);
              return (
                <button
                  key={pledge.id}
                  type="button"
                  onClick={() => togglePledge(pledge.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/80 border-emerald-400 shadow-[1px_2px_0px_#059669]'
                      : 'bg-[#FAF8F5] border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                      isChecked
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'bg-white text-slate-400 border-slate-300'
                    }`}
                  >
                    {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : <Shield className="w-4 h-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {pledge.title}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded-md">
                        {pledge.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{pledge.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ATIVIDADE: DESAFIO DE SITUAÇÕES PRÁTICAS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <HeartHandshake className="w-5 h-5 text-purple-600" />
            <span>Decisões na Prática</span>
          </div>

          <div className="space-y-3.5">
            {practicalScenarios.map((sc, idx) => (
              <div key={sc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {idx + 1}. {sc.question}
                </span>

                <div className="space-y-2">
                  {sc.options.map((opt, oIdx) => {
                    const isSelected = safetyQuiz[sc.id] === opt.text;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectScenario(sc.id, opt.text)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? opt.correct
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-rose-100 border-rose-400 text-rose-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 text-[10px]">
                          {isSelected ? (opt.correct ? '✓' : '✕') : ''}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                canProceed
                  ? 'bg-sky-400 hover:bg-sky-500 text-sky-950 border-2 border-sky-500 cursor-pointer shadow-[2px_3px_0px_#0284C7]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-900" />
              <span>Concluir Etapa 7 & Ganhar Estrela 7 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
