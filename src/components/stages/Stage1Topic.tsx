import React, { useState } from 'react';
import { SUGGESTED_TOPICS } from '../../data/stagesData';
import { MascotIA } from '../MascotIA';
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage1TopicProps {
  studentName: string;
  topic: string;
  priorKnowledge: string;
  onSave: (data: { studentName: string; topic: string; priorKnowledge: string }) => void;
  onNext: () => void;
}

export const Stage1Topic: React.FC<Stage1TopicProps> = ({
  studentName: initialName,
  topic: initialTopic,
  priorKnowledge: initialPrior,
  onSave,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [name, setName] = useState(initialName || '');
  const [topic, setTopic] = useState(initialTopic || '');
  const [priorKnowledge, setPriorKnowledge] = useState(initialPrior || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleSelectSuggested = (item: (typeof SUGGESTED_TOPICS)[0]) => {
    setSelectedTopicId(item.id);
    setTopic(item.title);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !topic.trim() || !priorKnowledge.trim()) return;

    onSave({ studentName: name.trim(), topic: topic.trim(), priorKnowledge: priorKnowledge.trim() });
    
    // Celebration confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FCD34D', '#93C5FD', '#86EFAC', '#F9A8D4'],
    });

    onNext();
  };

  const isFormValid = hasReadInstruction && name.trim().length >= 2 && topic.trim().length >= 3 && priorKnowledge.trim().length >= 5;

  return (
    <div className="space-y-6">
      {/* Guia IA Mascote */}
      <MascotIA
        mood="curious"
        speechText="Olá, jovem pesquisador! Eu sou o IA, seu companheiro de aprendizagem! Antes de começar qualquer pesquisa, precisamos saber: o que desperta a sua curiosidade no mundo hoje? Lembre-se: primeiro leia a etapa abaixo com atenção!"
      />

      {/* 1. LEITURA EDUCATIVA DA ETAPA */}
      <div className="bg-amber-50/80 rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-[2px_3px_0px_#FDE68A]">
        <div className="flex items-center gap-2.5 mb-3 text-amber-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span>Etapa 1: O Que é Escolher um Tema?</span>
        </div>
        
        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-2.5 bg-white/90 p-4 rounded-2xl border border-amber-100">
          <p>
            Pesquisar não é só procurar uma resposta pronta no computador. É como ser um <strong>detetive curioso do universo</strong>!
          </p>
          <p>
            Quando escolhemos um tema que realmente nos fascina (animais, espaço, história, ciência, música), nosso cérebro se diverte enquanto aprende.
          </p>
          <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-sky-900 text-xs sm:text-sm flex items-start gap-2">
            <span className="text-base">💡</span>
            <span>
              <strong>Dica de ouro do IA:</strong> Pensar no que você <em>já sabe</em> antes de pesquisar ativa sua memória e ajuda você a saber exatamente o que ainda precisa descobrir!
            </span>
          </div>
        </div>

        {/* Checkbox obrigatório de confirmação de leitura */}
        <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-amber-600 focus:ring-amber-500 border-amber-300"
            />
            <span>Li e compreendi como escolher o meu tema! 📖✨</span>
          </label>
          
          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Agora faça a atividade.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE PRÁTICA */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-5">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
            <Compass className="w-5 h-5 text-sky-600" />
            <span>Atividade: Registro da Sua Aventura</span>
          </div>

          {/* Nome do Aluno */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              1. Qual é o seu nome ou apelido de cientista/pesquisador?
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Luiza, Pedro, Sofia, Lucas..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-sm font-medium"
            />
          </div>

          {/* Temas Sugeridos Rápidos */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
              2. Escolha uma ideia inspiradora abaixo ou digite seu próprio tema:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
              {SUGGESTED_TOPICS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSuggested(item)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedTopicId === item.id || topic === item.title
                      ? 'bg-amber-100/80 border-amber-400 shadow-[2px_3px_0px_#F59E0B] scale-[1.02]'
                      : 'bg-[#FAF8F5] border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                  }`}
                >
                  <span className="text-2xl block mb-1">{item.emoji}</span>
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</div>
                  <span className="text-[10px] text-slate-500 line-clamp-1">{item.category}</span>
                </button>
              ))}
            </div>

            {/* Input de Tema Personalizado */}
            <div>
              <span className="text-xs text-slate-500 font-semibold mb-1 block">
                Ou escreva o seu próprio tema de pesquisa:
              </span>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setSelectedTopicId(null);
                }}
                placeholder="Ex: Por que os vulcões entram em erupção? / Como as abelhas produzem mel?"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-sm font-medium"
              />
            </div>
          </div>

          {/* O que já sabe sobre esse assunto? */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              3. “O que você já sabe sobre esse assunto?” 🧠
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Escreva qualquer coisa que você já tenha ouvido falar, visto na escola ou em vídeos. Não tem problema se for só uma ideia inicial!
            </p>
            <textarea
              required
              rows={3}
              value={priorKnowledge}
              onChange={(e) => setPriorKnowledge(e.target.value)}
              placeholder="Ex: Eu sei que os dinossauros viveram há milhões de anos e que um meteoro caiu na Terra..."
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-hidden bg-slate-50/50 text-slate-800 text-sm font-medium resize-none"
            />
          </div>

          {/* Botão de Avanço com Conquista de Estrela */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                isFormValid
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 border-2 border-amber-500 cursor-pointer shadow-[2px_3px_0px_#B45309]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Concluir Etapa 1 & Ganhar Estrela 1 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
