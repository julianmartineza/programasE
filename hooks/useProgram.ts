import { useCallback } from 'react';
import { useProgramStore } from '@/store/useProgramStore';
import { Program, Stage } from '@/types';

export const useProgram = () => {
  const {
    programs,
    currentProgram,
    currentStage,
    setPrograms,
    setCurrentProgram,
    setCurrentStage,
    updateStageContent,
  } = useProgramStore();

  const handleFetchPrograms = useCallback(async () => {
    try {
      // Aquí iría la llamada a la API para obtener los programas
      const response = await fetch('/api/programs');
      
      if (!response.ok) {
        throw new Error('Error al obtener programas');
      }

      const data: Program[] = await response.json();
      setPrograms(data);
      return true;
    } catch (error) {
      console.error('Error al obtener programas:', error);
      return false;
    }
  }, [setPrograms]);

  const handleSelectProgram = useCallback(async (programId: string) => {
    try {
      // Aquí iría la llamada a la API para obtener el detalle del programa
      const response = await fetch(`/api/programs/${programId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener programa');
      }

      const program: Program = await response.json();
      setCurrentProgram(program);
      return true;
    } catch (error) {
      console.error('Error al obtener programa:', error);
      return false;
    }
  }, [setCurrentProgram]);

  const handleSelectStage = useCallback(async (stageId: string) => {
    try {
      // Aquí iría la llamada a la API para obtener el detalle de la etapa
      const response = await fetch(`/api/stages/${stageId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener etapa');
      }

      const stage: Stage = await response.json();
      setCurrentStage(stage);
      return true;
    } catch (error) {
      console.error('Error al obtener etapa:', error);
      return false;
    }
  }, [setCurrentStage]);

  const handleUpdateStageContent = useCallback(async (stageId: string, content: string) => {
    try {
      // Aquí iría la llamada a la API para actualizar el contenido de la etapa
      const response = await fetch(`/api/stages/${stageId}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar contenido');
      }

      updateStageContent(stageId, content);
      return true;
    } catch (error) {
      console.error('Error al actualizar contenido:', error);
      return false;
    }
  }, [updateStageContent]);

  return {
    programs,
    currentProgram,
    currentStage,
    fetchPrograms: handleFetchPrograms,
    selectProgram: handleSelectProgram,
    selectStage: handleSelectStage,
    updateStageContent: handleUpdateStageContent,
  };
};
