import React, { useState, useRef, useEffect } from 'react';
import { MascotIA } from '../MascotIA';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Palette, Eraser, RotateCcw, FileText, Network, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage6CreateProps {
  topic: string;
  initialType?: 'drawing' | 'article' | 'mindmap';
  initialDrawing?: string;
  initialText?: string;
  initialTitle?: string;
  onSave: (data: {
    creationType: 'drawing' | 'article' | 'mindmap';
    creationDrawingDataUrl?: string;
    creationText?: string;
    creationTitle?: string;
  }) => void;
  onNext: () => void;
}

export const Stage6Create: React.FC<Stage6CreateProps> = ({
  topic,
  initialType = 'drawing',
  initialDrawing,
  initialText = '',
  initialTitle = '',
  onSave,
  onNext,
}) => {
  const [hasReadInstruction, setHasReadInstruction] = useState(false);
  const [mode, setMode] = useState<'drawing' | 'article' | 'mindmap'>(initialType);
  
  // Drawing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2563EB'); // default blue pencil
  const [lineWidth, setLineWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawnSomething, setHasDrawnSomething] = useState(Boolean(initialDrawing));

  // Article / Poster state
  const [artTitle, setArtTitle] = useState(initialTitle || `O Fascinante Mundo de: ${topic}`);
  const [artText, setArtText] = useState(initialText || '');

  // Mindmap state
  const [mindmapNodes, setMindmapNodes] = useState<string[]>([
    'O que é?',
    'Curiosidade principal',
    'Por que importa?',
    'Minha descoberta favorita',
  ]);
  const [mindmapNotes, setMindmapNotes] = useState<Record<number, string>>({});

  // Palette of colored pencils (pastel & vibrant pencil tones)
  const pencilColors = [
    { name: 'Azul Céu', hex: '#38BDF8' },
    { name: 'Azul Caneta', hex: '#2563EB' },
    { name: 'Verde Folha', hex: '#22C55E' },
    { name: 'Amarelo Sol', hex: '#FACC15' },
    { name: 'Laranja Pêssego', hex: '#FB923C' },
    { name: 'Rosa Chiclete', hex: '#F472B6' },
    { name: 'Roxo Lavanda', hex: '#A855F7' },
    { name: 'Grafite Lápis', hex: '#334155' },
    { name: 'Marrom Terra', hex: '#92400E' },
  ];

  // Set up canvas when in drawing mode
  useEffect(() => {
    if (mode !== 'drawing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load initial drawing if exists
    if (initialDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialDrawing;
    } else {
      // Draw light paper background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [mode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawnSomething(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = lineWidth;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSomething(false);
  };

  const addStamp = (emoji: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '40px sans-serif';
    ctx.fillText(emoji, canvas.width / 2 + (Math.random() * 80 - 40), canvas.height / 2 + (Math.random() * 80 - 40));
    setHasDrawnSomething(true);
  };

  const canProceed =
    hasReadInstruction &&
    (mode === 'drawing' ? hasDrawnSomething : mode === 'article' ? artText.trim().length >= 20 : Object.keys(mindmapNotes).length >= 2);

  const handleComplete = () => {
    let drawingDataUrl: string | undefined = undefined;
    if (mode === 'drawing' && canvasRef.current) {
      drawingDataUrl = canvasRef.current.toDataURL('image/png');
    }

    let compiledText = artText;
    if (mode === 'mindmap') {
      compiledText = mindmapNodes
        .map((n, i) => `• ${n}: ${mindmapNotes[i] || '(não preenchido)'}`)
        .join('\n');
    }

    onSave({
      creationType: mode,
      creationDrawingDataUrl: drawingDataUrl,
      creationText: compiledText,
      creationTitle: artTitle,
    });

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FED7AA', '#F472B6', '#38BDF8', '#FACC15'],
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <MascotIA
        mood="celebrating"
        speechText="É hora de colocar a mão na massa! 🎨 Todo cientista e autor transforma o que aprendeu em algo para o mundo ver: um cartaz com lápis de cor, uma reportagem ou um mapa conceitual. Escolha o seu formato favorito abaixo!"
      />

      {/* 1. LEITURA EDUCATIVA */}
      <div className="bg-orange-50/80 rounded-3xl p-5 sm:p-6 border-2 border-orange-200 shadow-[2px_3px_0px_#FED7AA]">
        <div className="flex items-center gap-2.5 mb-3 text-orange-900 font-bold font-handwriting text-xl">
          <BookOpen className="w-5 h-5 text-orange-600" />
          <span>Etapa 6: Criar o Seu Produto Autoral</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-2.5 bg-white/90 p-4 rounded-2xl border border-orange-100">
          <p>
            Criar é o ápice da aprendizagem! Quando você desenha, cria um cartaz ou esquematiza um mapa de ideias, você sintetiza todo o conhecimento que acumulou.
          </p>
          <p>
            Esse produto será colocado no seu <strong>Dossiê Oficial da Pesquisa Consciente</strong> ao final da jornada!
          </p>
        </div>

        {/* Checkbox obrigatório */}
        <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasReadInstruction}
              onChange={(e) => setHasReadInstruction(e.target.checked)}
              className="w-5 h-5 rounded-md text-orange-600 focus:ring-orange-500 border-orange-300"
            />
            <span>Compreendi o valor de criar meu produto autoral! 📖🎨</span>
          </label>

          {hasReadInstruction && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Leitura concluída! Crie seu produto abaixo.
            </span>
          )}
        </div>
      </div>

      {/* 2. ATIVIDADE: STUDIO CRIATIVO */}
      <div className={`transition-opacity duration-300 ${!hasReadInstruction ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[2px_4px_0px_#CBD5E1] space-y-5">
          {/* Seletor de Formato */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold font-handwriting text-xl">
              <Palette className="w-5 h-5 text-orange-500" />
              <span>Escolha o Formato da Sua Criação:</span>
            </div>

            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setMode('drawing')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mode === 'drawing'
                    ? 'bg-white text-orange-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Desenho & Cartaz</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('article')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mode === 'article'
                    ? 'bg-white text-orange-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Mini Notícia</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('mindmap')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mode === 'mindmap'
                    ? 'bg-white text-orange-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Mapa Mental</span>
              </button>
            </div>
          </div>

          {/* OPÇÃO 1: CANVAS DE DESENHO ESTILO LÁPIS DE COR */}
          {mode === 'drawing' && (
            <div className="space-y-3">
              {/* Canvas Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 bg-amber-50/50 p-2.5 rounded-2xl border border-amber-200">
                {/* Pencil Palette */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-600 mr-1">Lápis:</span>
                  {pencilColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => {
                        setColor(c.hex);
                        setIsEraser(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                        !isEraser && color === c.hex ? 'scale-125 border-slate-800 ring-2 ring-amber-300' : 'border-white shadow-xs'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>

                {/* Brush size, Eraser, Clear */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEraser(!isEraser)}
                    className={`p-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                      isEraser ? 'bg-rose-100 text-rose-900 border-rose-300' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                    title="Borracha"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Borracha</span>
                  </button>

                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="p-1.5 rounded-xl text-xs text-slate-600 hover:text-rose-600 bg-white border border-slate-200 transition-colors"
                    title="Limpar papel"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stamps */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-500">
                <span className="font-bold shrink-0">Carimbos lúdicos:</span>
                {['⭐', '☀️', '🦕', '🚀', '🔍', '💡', '🤖', '🌳', '❤️'].map((stamp) => (
                  <button
                    key={stamp}
                    type="button"
                    onClick={() => addStamp(stamp)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 border border-slate-200 flex items-center justify-center text-base shrink-0 transition-transform active:scale-90 cursor-pointer"
                  >
                    {stamp}
                  </button>
                ))}
              </div>

              {/* The Drawing Canvas */}
              <div className="border-3 border-dashed border-amber-300 rounded-3xl overflow-hidden shadow-inner bg-white relative flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={680}
                  height={380}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full max-w-full h-auto cursor-crosshair touch-none bg-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                ✏️ Desenhe com o mouse ou com o dedo na tela! Use as cores para ilustrar sua descoberta sobre "{topic}".
              </p>
            </div>
          )}

          {/* OPÇÃO 2: MINI ARTIGO / NOTÍCIA ESCOLAR */}
          {mode === 'article' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título da sua Notícia ou Cartaz:
                </label>
                <input
                  type="text"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm sm:text-base font-bold text-slate-800 rounded-xl border-2 border-slate-200 focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Corpo do Artigo (Mínimo 20 palavras):
                </label>
                <textarea
                  rows={8}
                  value={artText}
                  onChange={(e) => setArtText(e.target.value)}
                  placeholder="Escreva como se fosse um repórter ou cientista mirim contando para o mundo a grande novidade que descobriu..."
                  className="w-full p-4 text-xs sm:text-sm text-slate-800 rounded-xl border-2 border-slate-200 focus:border-orange-400 bg-notebook-paper leading-[28px]"
                />
              </div>
            </div>
          )}

          {/* OPÇÃO 3: MAPA CONCEITUAL */}
          {mode === 'mindmap' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-100/70 border-2 border-amber-300 rounded-2xl text-center">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block">Ideia Central</span>
                <span className="text-base font-bold text-slate-800">{topic}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mindmapNodes.map((node, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border-2 border-orange-200 bg-orange-50/40 space-y-1.5">
                    <span className="font-bold text-xs text-orange-950 block">📌 {node}</span>
                    <textarea
                      rows={2}
                      value={mindmapNotes[idx] || ''}
                      onChange={(e) => setMindmapNotes({ ...mindmapNotes, [idx]: e.target.value })}
                      placeholder="Escreva a conexão aqui..."
                      className="w-full p-2 text-xs rounded-xl border border-orange-200 bg-white resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
                canProceed
                  ? 'bg-orange-400 hover:bg-orange-500 text-orange-950 border-2 border-orange-500 cursor-pointer shadow-[2px_3px_0px_#C2410C]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-950" />
              <span>Concluir Etapa 6 & Ganhar Estrela 6 ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
