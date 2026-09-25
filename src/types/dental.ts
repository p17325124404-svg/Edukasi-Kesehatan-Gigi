export type AgeMode = 'anak' | 'remaja';

export type ActiveTab = 'home' | 'timer' | 'game' | 'anatomy' | 'guide' | 'quiz' | 'tracker';

export interface BrushingZone {
  id: number;
  name: string;
  section: string;
  duration: number; // in seconds
  instruction: string;
  tip: string;
  zoneHighlight: 'top-outer' | 'top-inner' | 'top-chewing' | 'bottom-outer' | 'bottom-inner' | 'bottom-chewing' | 'tongue';
}

export interface AnatomyPart {
  id: string;
  name: string;
  latinName: string;
  descriptionChild: string;
  descriptionTeen: string;
  function: string;
  funFact: string;
  color: string;
  vulnerability: string;
}

export interface QuizQuestion {
  id: number;
  mode: AgeMode | 'all';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'sikat' | 'makanan' | 'kebiasaan' | 'behel' | 'anatomi';
}

export interface BrushingRecord {
  date: string; // YYYY-MM-DD
  morning: boolean;
  night: boolean;
  durationSeconds: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredDays: number;
  unlocked: boolean;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: 'kebiasaan' | 'makanan' | 'behel' | 'masalah' | 'fakta';
  mode: AgeMode | 'all';
  summary: string;
  content: string[];
  tags: string[];
  tips: string[];
}
