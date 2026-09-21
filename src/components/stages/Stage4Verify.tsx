import React, { useState } from 'react';
import { MascotIA } from '../MascotIA';
import { VERIFICATION_QUIZ } from '../../data/stagesData';
import { VerifiedSource } from '../../types';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Search, Plus, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage4VerifyProps {
  topic: string;
  initialSources: VerifiedSource[];
  onSaveSources: (sources: VerifiedSource[]) => void;
  onNext: () => void;
}

export const Stage4Verify: React.FC<Stage4VerifyProps> = ({
  topic,
  initialSources,
  onSaveSources,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean | null>>({});
  const [sources, setSources] = useState<VerifiedSource[]>(() => {
    if (initialSources && initialSources.length > 0) return initialSources;
    return [
      {
        id: 'src-1',
        title: 'Livro didático de Ciências ou Enciclopédia Escolar',
        type: 'livro',
        details: 'Capítulo sobre natureza e ciências',
      },
    ];
  });

  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourceType, setNewSourceType] = useState<VerifiedSource['type']>('livro');
  const [newSourceDetails, setNewSourceDetails] = useState('');

  const handleAnswerQuiz = (qId: string, answer: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceTitle.trim()) return;

    const newSrc: VerifiedSource = {
      id: `src-${Date.now()}`,
      title: newSourceTitle.trim(),
      type: newSourceType,
      details: newSourceDetails.trim() || 'Fonte confiável recomendada para conferir',
    };

    const updated = [...sources, newSrc];
    setSources(updated);
    onSaveSources(updated);
    setNewSourceTitle('');
    setNewSourceDetails('');
  };

  const handleRemoveSource = (id: string) => {
    const updated = sources.filter((s) => s.id !== id);
    setSources(updated);
    onSaveSources(updated);
  };

  const allQuizAnswered = VERIFICATION_QUIZ.every((q) => quizAnswers[q.id] !== undefined);
  const canProceed = hasReadInstruction && allQuizAnswered && sources.length >= 1;

  const handleComplete = () => {
    onSaveSources(sources);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FBCFE8', '#93C5FD', '#FDE047'],
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="detective"
        speechText="Atenção, detetive! Sabia que até as IAs mais modernas podem inventar dados falsos por engano? Isso é chamado de 'alucinação'! Por isso, uma mente brilhante nunca acredita de primeira: ela sempre faz as 4 Perguntas de Ouro!"
      />

      {/* 1. LEITURA EDUCATIVA: AS 4 PERGUNTAS DE OURO */}
      <div className="bg-pink-50/80 rounded-3xl p-5 sm:p-6 border-2 border-pink-200 shadow-[2px_3px_0px_#FBCFE8]">
        <div className="flex items-center gap-2.5 mb-3 text-pink-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-pink-600" />
          <span>Etapa 4: As 4 Perguntas de Ouro da Verificação</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 bg-white/90 p-4 rounded-2xl border border-pink-100">
          <p>
            Sempre que você ler uma informação da IA ou da internet, vista o chapéu de <strong>Detetive da Verdade</strong> e faça as 4 perguntas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200">
              <span className="font-bold text-sky-800 text-xs sm:text-sm block">
                1. 📍 “De onde veio essa informação?”
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Foi de um laboratório, livro escolar, museu ou um comentário solto em rede social?
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
              <span className="font-bold text-purple-800 text-xs sm:text-sm block">
                2. ✍️ “Quem escreveu?”
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Essa pessoa ou instituição realmente estudou e entende do assunto?
              </p>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-800 text-xs sm:text-sm block">
                3. 📚 “Qual é a fonte?”
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Temos o nome do livro, site científico oficial, enciclopédia ou revista?
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-800 text-xs sm:text-sm block">
                4. 🔍 “Essa informação pode ser confirmada?”
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Se você procurar em outro livro ou perguntar ao professor, a resposta é parecida?
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-pink-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-pink-600 focus:ring-pink-500 border-pink-300"
            />
            <span>Aprendi as 4 Perguntas de Ouro da Verificação! 📖🔍</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Agora faça os desafios.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: DESAFIO DETETIVE DA VERDADE */}
      <div className={`space-y-5 transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <Search className="w-5 h-5 text-pink-600" />
            <span>Desafio 1: Verdadeiro ou Alucinação?</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            Responda o que um bom pesquisador faria em cada uma das situações:
          </p>

          <div className="space-y-3.5">
            {VERIFICATION_QUIZ.map((q, idx) => {
              const userAnswer = quizAnswers[q.id];
              const isAnswered = userAnswer !== undefined && userAnswer !== null;
              const isCorrect = isAnswered && userAnswer === q.isTrue;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50 space-y-2.5"
                >
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {idx + 1}. {q.claim}
                  </p>

                  {/* Buttons True/False */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAnswerQuiz(q.id, true)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                        userAnswer === true
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      👍 Verdadeiro
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAnswerQuiz(q.id, false)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                        userAnswer === false
                          ? 'bg-rose-100 border-rose-400 text-rose-900 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      👎 Falso / Perigoso
                    </button>
                  </div>

                  {/* Explanation feedback */}
                  {isAnswered && (
                    <div
                      className={`p-2.5 rounded-xl text-xs font-medium ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      <span className="font-bold block mb-0.5">
                        {isCorrect ? '🎯 Mandou muito bem!' : '💡 Ops, vamos refletir juntos:'}
                      </span>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. ATIVIDADE: REGISTRAR FONTES CONFIÁVEIS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Desafio 2: As Fontes Confiáveis da Sua Pesquisa</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            Onde você conferiu (ou pode conferir) o tema <strong>"{topic}"</strong> além da IA? Adicione livros, enciclopédias, sites seguros ou professores:
          </p>

          {/* Form to add source */}
          <form onSubmit={handleAddSource} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="sm:col-span-5">
              <input
                type="text"
                value={newSourceTitle}
                onChange={(e) => setNewSourceTitle(e.target.value)}
                placeholder="Ex: Livro de Ciências, Museu Nacional..."
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={newSourceType}
                onChange={(e) => setNewSourceType(e.target.value as any)}
                className="w-full px-2 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="livro">📖 Livro / Apostila</option>
                <option value="enciclopedia">📚 Enciclopédia</option>
                <option value="site">🌐 Site Confiável (.edu, .org, museu)</option>
                <option value="professor">👩‍🏫 Professor(a)</option>
                <option value="museu">🏛️ Museu / Instituição</option>
                <option value="outro">✨ Outro</option>
              </select>
            </div>

            <div className="sm:col-span-4 flex gap-2">
              <input
                type="text"
                value={newSourceDetails}
                onChange={(e) => setNewSourceDetails(e.target.value)}
                placeholder="Detalhes (página, autor...)"
                className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </form>

          {/* List of sources */}
          <div className="space-y-2">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center justify-between gap-2"
              >
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-slate-800">{src.title}</span>
                  <span className="text-xs text-slate-500 ml-2">({src.type})</span>
                  {src.details && <p className="text-xs text-slate-500 mt-0.5">{src.details}</p>}
                </div>
                {sources.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSource(src.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="Remover fonte"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                canProceed
                  ? 'bg-pink-400 hover:bg-pink-500 text-pink-950 border-2 border-pink-500 cursor-pointer shadow-[2px_3px_0px_#9D174D]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-900" />
              <span>Concluir Etapa 4 & Ganhar Estrela 4 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
