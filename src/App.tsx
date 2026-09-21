import React, { useState, useEffect } from 'react';
import { StageId, ResearchProject } from './types';
import { Header } from './components/Header';
import { StageNavigation } from './components/StageNavigation';
import { Stage1Topic } from './components/stages/Stage1Topic';
import { Stage2Question } from './components/stages/Stage2Question';
import { Stage3ChatIA } from './components/stages/Stage3ChatIA';
import { Stage4Verify } from './components/stages/Stage4Verify';
import { Stage5Explain } from './components/stages/Stage5Explain';
import { Stage6Create } from './components/stages/Stage6Create';
import { Stage7CodeOfHonor } from './components/stages/Stage7CodeOfHonor';
import { Stage8WhatILearned } from './components/stages/Stage8WhatILearned';
import { Stage9Reward } from './components/stages/Stage9Reward';

const STORAGE_KEY = 'iaconsciencia_project_v1';

const defaultProject: ResearchProject = {
  studentName: '',
  topic: '',
  priorKnowledge: '',
  researchQuestion: '',
  chatHistory: [],
  verifiedSources: [],
  factChecksCompleted: false,
  studentExplanation: '',
  creationType: 'drawing',
  codeOfHonorAccepted: false,
  learnedWhat: '',
  learnedCheck: '',
  learnedHowAiHelped: '',
  completedStages: [],
  starsCount: 0,
};

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [project, setProject] = useState<ResearchProject>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
    return defaultProject;
  });

  // Persist project changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  }, [project]);

  const markStageCompleted = (stageId: StageId) => {
    setProject((prev) => {
      const alreadyCompleted = prev.completedStages.includes(stageId);
      const newCompleted = alreadyCompleted ? prev.completedStages : [...prev.completedStages, stageId];
      return {
        ...prev,
        completedStages: newCompleted,
        starsCount: newCompleted.length,
      };
    });
  };

  const handleNextStage = () => {
    markStageCompleted(currentStage);
    if (currentStage < 9) {
      setCurrentStage((prev) => (prev + 1) as StageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetProject = () => {
    const confirm = window.confirm(
      'Tem certeza de que deseja iniciar uma nova pesquisa do zero? Suas notas e desenhos atuais serão reiniciados.'
    );
    if (confirm) {
      localStorage.removeItem(STORAGE_KEY);
      setProject(defaultProject);
      setCurrentStage(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D3748] flex flex-col font-sans selection:bg-amber-200">
      {/* Top Bar with Gamification Stars and Purpose */}
      <Header
        currentStage={currentStage}
        completedStages={project.completedStages}
        starsCount={project.starsCount}
        studentName={project.studentName}
        onReset={handleResetProject}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Game Levels Navigation Trail */}
        <StageNavigation
          currentStage={currentStage}
          completedStages={project.completedStages}
          onSelectStage={(stage) => setCurrentStage(stage)}
        />

        {/* Current Active Stage Screen */}
        <div className="w-full">
          {currentStage === 1 && (
            <Stage1Topic
              studentName={project.studentName}
              topic={project.topic}
              priorKnowledge={project.priorKnowledge}
              onSave={(data) => {
                setProject((prev) => ({
                  ...prev,
                  studentName: data.studentName,
                  topic: data.topic,
                  priorKnowledge: data.priorKnowledge,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 2 && (
            <Stage2Question
              topic={project.topic}
              initialQuestion={project.researchQuestion}
              onSave={(question) => {
                setProject((prev) => ({
                  ...prev,
                  researchQuestion: question,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 3 && (
            <Stage3ChatIA
              topic={project.topic}
              researchQuestion={project.researchQuestion}
              initialChatHistory={project.chatHistory}
              onSaveChat={(history) => {
                setProject((prev) => ({
                  ...prev,
                  chatHistory: history,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 4 && (
            <Stage4Verify
              topic={project.topic}
              initialSources={project.verifiedSources}
              onSaveSources={(sources) => {
                setProject((prev) => ({
                  ...prev,
                  verifiedSources: sources,
                  factChecksCompleted: true,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 5 && (
            <Stage5Explain
              topic={project.topic}
              researchQuestion={project.researchQuestion}
              initialExplanation={project.studentExplanation}
              onSave={(explanation) => {
                setProject((prev) => ({
                  ...prev,
                  studentExplanation: explanation,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 6 && (
            <Stage6Create
              topic={project.topic}
              initialType={project.creationType}
              initialDrawing={project.creationDrawingDataUrl}
              initialText={project.creationText}
              initialTitle={project.creationTitle}
              onSave={(data) => {
                setProject((prev) => ({
                  ...prev,
                  creationType: data.creationType,
                  creationDrawingDataUrl: data.creationDrawingDataUrl,
                  creationText: data.creationText,
                  creationTitle: data.creationTitle,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 7 && (
            <Stage7CodeOfHonor
              onAcceptHonor={() => {
                setProject((prev) => ({
                  ...prev,
                  codeOfHonorAccepted: true,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 8 && (
            <Stage8WhatILearned
              topic={project.topic}
              initialLearnedWhat={project.learnedWhat}
              initialLearnedCheck={project.learnedCheck}
              initialLearnedHowAiHelped={project.learnedHowAiHelped}
              onSave={(data) => {
                setProject((prev) => ({
                  ...prev,
                  learnedWhat: data.learnedWhat,
                  learnedCheck: data.learnedCheck,
                  learnedHowAiHelped: data.learnedHowAiHelped,
                }));
              }}
              onNext={handleNextStage}
            />
          )}

          {currentStage === 9 && (
            <Stage9Reward
              project={project}
              onRestart={handleResetProject}
            />
          )}
        </div>
      </main>

      {/* Warm Child-friendly Footer */}
      <footer className="no-print w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200 mt-8 bg-[#FAF5EE]">
        <p className="font-handwriting text-sm text-slate-600">
          🌱 IA com Consciência – Para aprender a pensar, questionar, checar e criar com autonomia!
        </p>
      </footer>
    </div>
  );
}
