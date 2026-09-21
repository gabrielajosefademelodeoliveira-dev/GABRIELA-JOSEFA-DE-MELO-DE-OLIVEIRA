import React, { useState } from 'react';
import { MascotMood } from '../types';
import { Volume2, VolumeX, Sparkles, ShieldAlert, Lightbulb } from 'lucide-react';

interface MascotIAProps {
  mood?: MascotMood;
  speechText?: string;
  className?: string;
  showSocraticButtons?: boolean;
  onAskSocratic?: (phrase: string) => void;
}

export const MascotIA: React.FC<MascotIAProps> = ({
  mood = 'happy',
  speechText,
  className = '',
  showSocraticButtons = false,
  onAskSocratic,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Text-to-speech for younger learners (6-8 years old)
  const speakSpeechText = () => {
    if (!speechText || !('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // Gentle and clear for children
    utterance.pitch = 1.2; // Friendly, slightly higher animated voice

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const socraticPrompts = [
    'O que você acha?',
    'Como podemos descobrir?',
    'Vamos conferir essa informação?',
    'Você consegue explicar com suas palavras?',
  ];

  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-3.5 ${className}`}>
      {/* Hand-drawn colored-pencil robot mascot "IA" */}
      <div className="relative group shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-[#BAE6FD] to-[#7DD3FC] p-2 border-2 border-[#38BDF8] shadow-[3px_4px_0px_#0284C7] relative flex items-center justify-center transition-transform transform group-hover:scale-105">
          {/* Antenna / Lightbulb */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {mood === 'thinking' ? (
              <Lightbulb className="w-5 h-5 text-amber-500 animate-bounce" />
            ) : mood === 'warning' ? (
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm animate-pulse" />
            )}
            <div className="w-0.5 h-2 bg-sky-700" />
          </div>

          {/* SVG Friendly Robot Face with colored pencil vibe */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Soft pencil texture highlights */}
            <rect x="10" y="15" width="80" height="70" rx="20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" strokeDasharray="120" />
            
            {/* Screen visor */}
            <rect x="20" y="25" width="60" height="42" rx="12" fill="#0C4A6E" />

            {/* Eyes */}
            {mood === 'thinking' ? (
              <>
                <circle cx="38" cy="42" r="6" fill="#FDE047" />
                <circle cx="62" cy="42" r="6" fill="#FDE047" />
                <circle cx="41" cy="40" r="2.5" fill="#0369A1" />
                <circle cx="65" cy="40" r="2.5" fill="#0369A1" />
              </>
            ) : mood === 'detective' ? (
              <>
                <circle cx="36" cy="45" r="7" fill="#67E8F9" />
                {/* Monocle / Magnifying glass overlay */}
                <circle cx="64" cy="45" r="11" fill="none" stroke="#F59E0B" strokeWidth="3" />
                <line x1="72" y1="53" x2="82" y2="63" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                <circle cx="64" cy="45" r="5" fill="#FDE047" />
              </>
            ) : mood === 'celebrating' ? (
              <>
                {/* Happy arched eyes */}
                <path d="M 30 48 Q 38 35 46 48" stroke="#FDE047" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 54 48 Q 62 35 70 48" stroke="#FDE047" strokeWidth="4" fill="none" strokeLinecap="round" />
              </>
            ) : mood === 'warning' ? (
              <>
                <circle cx="38" cy="45" r="6" fill="#FDA4AF" />
                <circle cx="62" cy="45" r="6" fill="#FDA4AF" />
                <circle cx="38" cy="45" r="2" fill="#881337" />
                <circle cx="62" cy="45" r="2" fill="#881337" />
              </>
            ) : (
              <>
                {/* Happy big curious eyes */}
                <circle cx="38" cy="44" r="7" fill="#67E8F9" />
                <circle cx="62" cy="44" r="7" fill="#67E8F9" />
                <circle cx="39" cy="42" r="2.5" fill="#FFFFFF" />
                <circle cx="63" cy="42" r="2.5" fill="#FFFFFF" />
              </>
            )}

            {/* Rosy pencil-drawn cheeks */}
            <ellipse cx="26" cy="55" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <ellipse cx="74" cy="55" rx="5" ry="3" fill="#F472B6" opacity="0.6" />

            {/* Mouth */}
            {mood === 'celebrating' ? (
              <path d="M 40 55 Q 50 64 60 55" stroke="#FDE047" strokeWidth="3.5" fill="#EA580C" strokeLinecap="round" />
            ) : mood === 'thinking' ? (
              <circle cx="50" cy="55" r="3" fill="#FDE047" />
            ) : (
              <path d="M 42 55 Q 50 62 58 55" stroke="#FDE047" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            )}

            {/* Pencil in hand or cute badge */}
            <rect x="76" y="65" width="6" height="18" rx="2" fill="#FBBF24" transform="rotate(25 76 65)" />
            <polygon points="76,83 82,83 79,90" fill="#F87171" transform="rotate(25 76 65)" />
          </svg>

          {/* Badge label */}
          <div className="absolute -bottom-2 bg-amber-300 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500 shadow-xs font-handwriting">
            Guia IA
          </div>
        </div>
      </div>

      {/* Speech Bubble */}
      {speechText && (
        <div className="flex-1 w-full bg-white/95 rounded-2xl p-3.5 border-2 border-amber-200 shadow-[2px_3px_0px_#FDE68A] relative">
          {/* Arrow pointing to mascot */}
          <div className="hidden sm:block absolute -left-2 top-5 w-4 h-4 bg-white border-l-2 border-b-2 border-amber-200 transform rotate-45" />

          <div className="flex items-start justify-between gap-2">
            <div className="text-[#334155] text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-sky-700 mr-1">IA:</span>
              {speechText}
            </div>

            {/* Text to Speech button */}
            {'speechSynthesis' in window && (
              <button
                type="button"
                onClick={speakSpeechText}
                title={isSpeaking ? 'Parar leitura' : 'Ouvir o que o IA está falando'}
                className="shrink-0 p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors border border-sky-200"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Quick Socratic Prompt Buttons */}
          {showSocraticButtons && onAskSocratic && (
            <div className="mt-3 pt-2.5 border-t border-dashed border-amber-200">
              <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Perguntas Socráticas do IA para você pensar:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {socraticPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onAskSocratic(prompt)}
                    className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full font-medium transition-transform active:scale-95 text-left"
                  >
                    “{prompt}”
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
