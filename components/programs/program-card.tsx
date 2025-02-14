'use client';

import { Book, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Program, UserProgress } from '@/types/models';

interface ProgramCardProps {
  program: Program;
  progress?: UserProgress;
  onStartProgram?: (programId: string) => void;
  isLoading?: boolean;
}

export function ProgramCard({
  program,
  progress,
  onStartProgram,
  isLoading = false,
}: ProgramCardProps) {
  const handleStart = () => {
    if (onStartProgram && !isLoading) {
      onStartProgram(program.id);
    }
  };

  return (
    <div className="group relative rounded-lg border p-6 hover:border-primary">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="space-y-1">
            <h2 className="font-semibold tracking-tight text-lg">
              {program.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {program.description}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <div className="mr-2 rounded-lg border border-primary/10 bg-primary/5 p-2">
              <Book className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">
              {program.category}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {progress ? (
          <Link
            href={`/programas/${program.id}`}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {progress.status === 'completed' ? (
              'Ver programa completado'
            ) : (
              'Continuar programa'
            )}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? 'Iniciando...' : 'Comenzar programa'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        )}
        <div className="text-sm text-muted-foreground">
          {progress?.status === 'completed' ? (
            <span className="text-green-600">Completado</span>
          ) : progress?.status === 'in_progress' ? (
            <span className="text-blue-600">En progreso</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
