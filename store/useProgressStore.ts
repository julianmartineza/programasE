import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Insight } from '../types';

interface ProgressState {
  currentProgress: UserProgress | null;
  insights: Insight[];
  setProgress: (progress: UserProgress) => void;
  updateStageProgress: (stageId: string, status: 'not_started' | 'in_progress' | 'completed') => void;
  addInsight: (insight: Insight) => void;
  saveInsight: (insightId: string) => void;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      currentProgress: null,
      insights: [],
      setProgress: (progress: UserProgress) =>
        set({ currentProgress: progress }),
      updateStageProgress: (stageId: string, status: 'not_started' | 'in_progress' | 'completed') =>
        set((state) => ({
          currentProgress: state.currentProgress
            ? {
                ...state.currentProgress,
                currentStageId: stageId,
                status: status,
              }
            : null,
        })),
      addInsight: (insight: Insight) =>
        set((state) => ({
          insights: [...state.insights, insight],
        })),
      saveInsight: (insightId: string) =>
        set((state) => ({
          insights: state.insights.map((insight) =>
            insight.id === insightId
              ? { ...insight, isSaved: true }
              : insight
          ),
        })),
      clearProgress: () =>
        set({ currentProgress: null, insights: [] }),
    }),
    {
      name: 'progress-storage',
    }
  )
);
