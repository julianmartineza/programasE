export type Program = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Stage = {
  id: string;
  program_id: string;
  name: string;
  description: string | null;
  order_number: number;
  educational_content: string | null;
  created_at: string;
  updated_at: string;
};

export type Activity = {
  id: string;
  stage_id: string;
  name: string;
  type: 'chat' | 'form' | 'document';
  description: string | null;
  prompt_template: string | null;
  order_number: number;
  created_at: string;
  updated_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  program_id: string;
  current_stage_id: string | null;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
};

export type Insight = {
  id: string;
  content: string;
  stage_id: string;
  user_id: string;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  company_name: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
};

export type ProgramAccess = {
  id: string;
  user_id: string;
  program_id: string;
  granted_by: string | null;
  granted_at: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Tipos para las respuestas de la API
export type ProgramWithStages = Program & {
  stages: Stage[];
};

export type StageWithActivities = Stage & {
  activities: Activity[];
};

export type ProgramWithProgress = Program & {
  user_progress: UserProgress | null;
};

// Estados para los stores
export type ProgramsState = {
  programs: Program[];
  selectedProgram: ProgramWithStages | null;
  isLoading: boolean;
  error: string | null;
  fetchPrograms: () => Promise<void>;
  fetchProgramById: (id: string) => Promise<void>;
  clearSelectedProgram: () => void;
};

export type ProgressState = {
  userProgress: UserProgress[];
  currentProgress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProgress: () => Promise<void>;
  updateProgress: (programId: string, stageId: string | null, status: UserProgress['status']) => Promise<void>;
  startProgram: (programId: string) => Promise<void>;
};
