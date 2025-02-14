import { useCallback } from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { Insight, UserProgress } from '@/types';

export const useProgress = () => {
  const {
    currentProgress,
    insights,
    setProgress,
    updateStageProgress,
    addInsight,
    saveInsight,
    clearProgress,
  } = useProgressStore();

  const handleStartProgram = useCallback(async (programId: string, userId: string) => {
    try {
      // Aquí iría la llamada a la API para iniciar un programa
      const response = await fetch('/api/progress/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programId, userId }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar programa');
      }

      const progress: UserProgress = await response.json();
      setProgress(progress);
      return true;
    } catch (error) {
      console.error('Error al iniciar programa:', error);
      return false;
    }
  }, [setProgress]);

  const handleUpdateStage = useCallback(async (
    stageId: string,
    status: 'not_started' | 'in_progress' | 'completed'
  ) => {
    try {
      // Aquí iría la llamada a la API para actualizar el estado de la etapa
      const response = await fetch(`/api/progress/stage/${stageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar etapa');
      }

      updateStageProgress(stageId, status);
      return true;
    } catch (error) {
      console.error('Error al actualizar etapa:', error);
      return false;
    }
  }, [updateStageProgress]);

  const handleAddInsight = useCallback(async (insightData: Omit<Insight, 'id' | 'createdAt'>) => {
    try {
      // Aquí iría la llamada a la API para guardar el insight
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insightData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar insight');
      }

      const newInsight: Insight = await response.json();
      addInsight(newInsight);
      return true;
    } catch (error) {
      console.error('Error al guardar insight:', error);
      return false;
    }
  }, [addInsight]);

  return {
    currentProgress,
    insights,
    startProgram: handleStartProgram,
    updateStage: handleUpdateStage,
    addInsight: handleAddInsight,
    saveInsight,
    clearProgress,
  };
};
