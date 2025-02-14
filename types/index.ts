export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  category: string;
  stages: Stage[];
  isActive: boolean;
}

export interface Stage {
  id: string;
  programId: string;
  name: string;
  description: string;
  orderNumber: number;
  educationalContent: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  stageId: string;
  name: string;
  type: 'chat' | 'form' | 'document';
  description: string;
  promptTemplate?: string;
  orderNumber: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  programId: string;
  currentStageId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  insights: Insight[];
}

export interface Insight {
  id: string;
  content: string;
  stageId: string;
  userId: string;
  isSaved: boolean;
  createdAt: Date;
}
