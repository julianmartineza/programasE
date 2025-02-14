'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { StageCard } from '@/components/programs/stage-card';
import { useProgramStore } from '@/stores/useProgramStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { Loader2 } from 'lucide-react';

export default function ProgramDetail() {
  const { id } = useParams();
  const { fetchProgramById, currentProgram, loading: programLoading } = useProgramStore();
  const { fetchUserProgress, userProgress, loading: progressLoading } = useProgressStore();

  useEffect(() => {
    if (id) {
      fetchProgramById(id as string);
      fetchUserProgress(id as string);
    }
  }, [id, fetchProgramById, fetchUserProgress]);

  if (programLoading || progressLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentProgram) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Programa no encontrado</p>
      </div>
    );
  }

  const getCurrentStageIndex = () => {
    if (!userProgress || !currentProgram.stages) return 0;
    const lastCompletedIndex = currentProgram.stages.findIndex(
      (stage) => !userProgress.some((p) => p.stage_id === stage.id && p.completed)
    );
    return lastCompletedIndex === -1 ? currentProgram.stages.length - 1 : lastCompletedIndex;
  };

  const currentStageIndex = getCurrentStageIndex();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{currentProgram.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {currentProgram.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentProgram.stages?.map((stage, index) => {
          const isCompleted = userProgress?.some(
            (p) => p.stage_id === stage.id && p.completed
          );
          const isLocked = index > currentStageIndex + 1;
          const isCurrent = index === currentStageIndex;

          return (
            <StageCard
              key={stage.id}
              stage={stage}
              isLocked={isLocked}
              isCompleted={!!isCompleted}
              isCurrent={isCurrent}
              programId={id as string}
            />
          );
        })}
      </div>
    </div>
  );
}
