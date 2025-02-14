'use client';

import { useState } from 'react';
import { Stage } from '@/types';
import { BookOpen, MessageSquare, CheckCircle } from 'lucide-react';

interface StageContentProps {
  stage: Stage;
  onComplete: () => void;
}

export function StageContent({ stage, onComplete }: StageContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'activities'>('content');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{stage.name}</h2>
          <p className="text-muted-foreground">{stage.description}</p>
        </div>
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <CheckCircle className="h-4 w-4" />
          Marcar como completada
        </button>
      </div>

      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('content')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium ${
            activeTab === 'content'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Contenido Educativo
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium ${
            activeTab === 'activities'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Actividades
        </button>
      </div>

      <div className="min-h-[400px] rounded-lg border p-6">
        {activeTab === 'content' ? (
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: stage.educationalContent }} />
          </div>
        ) : (
          <div className="space-y-4">
            {stage.activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-lg border p-4 hover:bg-muted/50"
              >
                <h3 className="font-medium">{activity.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <div className="mt-4">
                  {activity.type === 'chat' && (
                    <button
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Iniciar conversación
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
