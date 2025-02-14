import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { ProgressState, UserProgress } from '@/types/models';
import { useAuthStore } from './useAuthStore';

export const useProgressStore = create<ProgressState>((set, get) => ({
  userProgress: [],
  currentProgress: null,
  isLoading: false,
  error: null,

  fetchUserProgress: async () => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      set({ isLoading: true, error: null });
      
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          programs (
            name,
            description,
            category
          ),
          stages (
            name,
            order_number
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      set({ 
        userProgress: progress as UserProgress[],
        isLoading: false 
      });
    } catch (error) {
      console.error('Error al cargar progreso:', error);
      set({ 
        error: 'Error al cargar tu progreso. Por favor, intenta de nuevo.',
        isLoading: false 
      });
    }
  },

  updateProgress: async (programId: string, stageId: string | null, status: UserProgress['status']) => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      set({ isLoading: true, error: null });
      
      const { data: progress, error } = await supabase
        .from('user_progress')
        .update({ 
          current_stage_id: stageId,
          status,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('program_id', programId)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        userProgress: state.userProgress.map(p => 
          p.program_id === programId ? { ...p, ...progress } : p
        ),
        currentProgress: progress,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
      set({ 
        error: 'Error al actualizar tu progreso. Por favor, intenta de nuevo.',
        isLoading: false 
      });
    }
  },

  startProgram: async (programId: string) => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      set({ isLoading: true, error: null });
      
      // Verificar si ya existe un progreso para este programa
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select()
        .eq('user_id', userId)
        .eq('program_id', programId)
        .single();

      if (existingProgress) {
        set({ 
          error: 'Ya estás inscrito en este programa',
          isLoading: false 
        });
        return;
      }

      // Obtener la primera etapa del programa
      const { data: firstStage } = await supabase
        .from('stages')
        .select()
        .eq('program_id', programId)
        .order('order_number', { ascending: true })
        .limit(1)
        .single();

      // Crear nuevo progreso
      const { data: progress, error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          program_id: programId,
          current_stage_id: firstStage?.id || null,
          status: 'in_progress'
        })
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        userProgress: [...state.userProgress, progress],
        currentProgress: progress,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al iniciar programa:', error);
      set({ 
        error: 'Error al iniciar el programa. Por favor, intenta de nuevo.',
        isLoading: false 
      });
    }
  },
}));
