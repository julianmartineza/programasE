import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Program, ProgramWithStages, ProgramsState } from '@/types/models';
import { useAuthStore } from './useAuthStore';

export const useProgramStore = create<ProgramsState>((set) => ({
  programs: [],
  selectedProgram: null,
  isLoading: false,
  error: null,

  fetchPrograms: async () => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      set({ isLoading: true, error: null });
      
      // Obtener el rol del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      let query = supabase
        .from('programs')
        .select(`
          *,
          program_access!inner (
            user_id,
            is_active,
            expires_at
          )
        `)
        .eq('is_active', true);

      // Si el usuario es admin, puede ver todos los programas
      if (profile?.role === 'admin') {
        query = supabase
          .from('programs')
          .select()
          .eq('is_active', true);
      } else {
        // Si es usuario normal, solo ve los programas a los que tiene acceso activo
        query = query
          .eq('program_access.user_id', userId)
          .eq('program_access.is_active', true)
          .or('program_access.expires_at.is.null,program_access.expires_at.gt.now()');
      }

      const { data: programs, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ 
        programs: programs as Program[],
        isLoading: false 
      });
    } catch (error) {
      console.error('Error al cargar programas:', error);
      set({ 
        error: 'Error al cargar los programas. Por favor, intenta de nuevo.',
        isLoading: false 
      });
    }
  },

  fetchProgramById: async (id: string) => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      set({ isLoading: true, error: null });
      
      // Verificar acceso al programa
      const { data: access, error: accessError } = await supabase
        .from('program_access')
        .select()
        .eq('user_id', userId)
        .eq('program_id', id)
        .eq('is_active', true)
        .or('expires_at.is.null,expires_at.gt.now()')
        .single();

      if (accessError && !access) {
        throw new Error('No tienes acceso a este programa');
      }

      const { data: program, error } = await supabase
        .from('programs')
        .select(`
          *,
          stages (
            *,
            activities (*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      set({ 
        selectedProgram: program as ProgramWithStages,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error al cargar programa:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar el programa. Por favor, intenta de nuevo.',
        isLoading: false 
      });
    }
  },

  clearSelectedProgram: () => {
    set({ selectedProgram: null });
  },
}));
