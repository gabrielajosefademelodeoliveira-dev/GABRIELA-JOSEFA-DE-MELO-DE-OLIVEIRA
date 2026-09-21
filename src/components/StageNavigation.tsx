import React from 'react';
import { StageId } from '../types';
import { STAGES_LIST } from '../data/stagesData';
import { Check, Lock, Star } from 'lucide-react';

interface StageNavigationProps {
  currentStage: StageId;
  completedStages: StageId[];
  onSelectStage: (stage: StageId) => void;
}

export const StageNavigation: React.FC<StageNavigationProps> = ({
  currentStage,
  completedStages,
  onSelectStage,
}) => {
  return (
    <div className="no-print w-full py-4 px-2 sm:px-4">
      {/* Scrollable / Responsive Trail of Steps */}
      <div className="flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {STAGES_LIST.map((stage, idx) => {
          const isCurrent = stage.id === currentStage;
          const isCompleted = completedStages.includes(stage.id);
          // A stage is accessible if it is completed, or if it is the immediate next uncompleted stage
          const isAccessible =
            isCompleted ||
            stage.id === currentStage ||
            (stage.id === 1 || completedStages.includes((stage.id - 1) as StageId));

          return (
            <React.Fragment key={stage.id}>
              {/* Step Button */}
              <button
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && onSelectStage(stage.id)}
                className={`group relative flex flex-col items-center shrink-0 p-2 sm:p-2.5 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-400 shadow-[2px_3px_0px_#F59E0B] scale-105 ring-2 ring-amber-300/60'
                    : isCompleted
                    ? 'bg-white border-emerald-300 hover:border-emerald-400 shadow-[1px_2px_0px_#10B981]'
                    : 'bg-slate-50/70 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
                style={{ width: '92px' }}
                title={
                  !isAccessible
                    ? `Complete a etapa anterior para desbloquear a Etapa ${stage.id}`
                    : `Ir para Etapa ${stage.id}: ${stage.title}`
                }
              >
                {/* Stage Number & Status Badge */}
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                      isCurrent
                        ? 'bg-amber-300 text-amber-900'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    Nível {stage.id}
                  </span>

                  {isCompleted ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : !isAccessible ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : (
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
                  )}
                </div>

                {/* Badge Emoji / Icon */}
                <div className="text-xl my-0.5 group-hover:scale-110 transition-transform">
                  {stage.badgeIcon}
                </div>

                {/* Stage Short Title */}
                <span
                  className={`text-[11px] font-bold line-clamp-1 text-center w-full ${
                    isCurrent ? 'text-amber-900 font-extrabold' : 'text-slate-700'
                  }`}
                >
                  {stage.title}
                </span>
              </button>

              {/* Connecting line between stages */}
              {idx < STAGES_LIST.length - 1 && (
                <div
                  className={`hidden sm:block w-3 h-0.5 rounded-full shrink-0 ${
                    completedStages.includes(stage.id) ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
