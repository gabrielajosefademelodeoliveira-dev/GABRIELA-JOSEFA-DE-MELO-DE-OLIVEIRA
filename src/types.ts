export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type MascotMood = 'happy' | 'thinking' | 'detective' | 'celebrating' | 'curious' | 'warning';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isWarning?: boolean;
}

export interface FactCheckItem {
  id: string;
  claim: string;
  isTrue: boolean;
  explanation: string;
  howToCheck: string;
}

export interface VerifiedSource {
  id: string;
  title: string;
  type: 'livro' | 'site' | 'enciclopedia' | 'professor' | 'museu' | 'outro';
  details: string;
}

export interface ResearchProject {
  studentName: string;
  topic: string;
  topicCategory?: string;
  priorKnowledge: string;
  researchQuestion: string;
  chatHistory: ChatMessage[];
  verifiedSources: VerifiedSource[];
  factChecksCompleted: boolean;
  studentExplanation: string;
  creationType: 'drawing' | 'article' | 'mindmap';
  creationDrawingDataUrl?: string;
  creationText?: string;
  creationTitle?: string;
  codeOfHonorAccepted: boolean;
  learnedWhat: string;
  learnedCheck: string;
  learnedHowAiHelped: string;
  completedStages: StageId[];
  starsCount: number;
  completedAt?: string;
}

export interface StageInfo {
  id: StageId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badgeName: string;
  badgeIcon: string;
}
