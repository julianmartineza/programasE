'use client';

import { useEffect } from 'react';
import { Header } from '@/components/ui/header';
import { ProgramCard } from '@/components/programs/program-card';
import { useProgramStore } from '@/stores/useProgramStore';
import { useProgressStore } from '@/stores/useProgressStore';

export default function ProgramsPage() {
  const { programs, isLoading: loadingPrograms, error: programsError, fetchPrograms } = useProgramStore();
  const { 
    userProgress, 
    isLoading: loadingProgress, 
    error: progressError,
    fetchUserProgress,
    startProgram 
  } = useProgressStore();

  useEffect(() => {
    fetchPrograms();
    fetchUserProgress();
  }, [fetchPrograms, fetchUserProgress]);

  const handleStartProgram = async (programId: string) => {
    try {
      await startProgram(programId);
    } catch (error) {
      console.error('Error al iniciar programa:', error);
    }
  };

  const isLoading = loadingPrograms || loadingProgress;
  const error = programsError || progressError;

  if (error) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-6 md:py-12">
          <div className="container">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 md:py-12">
        <div className="container">
          <div className="flex flex-col gap-4 md:gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Programas Disponibles</h1>
              <p className="text-muted-foreground mt-2">
                Selecciona el programa que mejor se adapte a tus necesidades empresariales
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[250px] rounded-lg border bg-muted/10 p-6 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    progress={userProgress.find(p => p.program_id === program.id)}
                    onStartProgram={handleStartProgram}
                    isLoading={loadingProgress}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
