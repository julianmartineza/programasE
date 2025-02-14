import { create } from 'zustand';
import { Program, Stage } from '../types';

interface ProgramState {
  programs: Program[];
  currentProgram: Program | null;
  currentStage: Stage | null;
  setPrograms: (programs: Program[]) => void;
  setCurrentProgram: (program: Program) => void;
  setCurrentStage: (stage: Stage) => void;
  updateStageContent: (stageId: string, content: string) => void;
}

export const useProgramStore = create<ProgramState>()((set) => ({
  programs: [],
  currentProgram: null,
  currentStage: null,
  setPrograms: (programs: Program[]) => set({ programs }),
  setCurrentProgram: (program: Program) =>
    set({ currentProgram: program, currentStage: null }),
  setCurrentStage: (stage: Stage) => set({ currentStage: stage }),
  updateStageContent: (stageId: string, content: string) =>
    set((state) => ({
      programs: state.programs.map((program) => ({
        ...program,
        stages: program.stages.map((stage) =>
          stage.id === stageId
            ? { ...stage, educationalContent: content }
            : stage
        ),
      })),
    })),
}));
