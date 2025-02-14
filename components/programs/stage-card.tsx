'use client';

import { CheckCircle2, Circle, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { Stage } from '@/types/models';

interface StageCardProps {
  stage: Stage;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  programId: string;
}

export function StageCard({
  stage,
  isLocked,
  isCompleted,
  isCurrent,
  programId,
}: StageCardProps) {
  return (
    <div
      className={`group relative rounded-lg border p-6 transition-all ${
        isLocked
          ? 'cursor-not-allowed opacity-60'
          : 'hover:border-primary hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold tracking-tight">
              {stage.order_number}. {stage.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {stage.description}
            </p>
          </div>
        </div>
        <div className="ml-4">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : isLocked ? (
            <LockKeyhole className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Circle className={`h-5 w-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
        </div>
      </div>
      {!isLocked && (
        <Link
          href={`/programas/${programId}/etapas/${stage.id}`}
          className="absolute inset-0 rounded-lg ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className="sr-only">
            Ver etapa {stage.name}
          </span>
        </Link>
      )}
    </div>
  );
}
