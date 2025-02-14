export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      stages: {
        Row: {
          id: string
          program_id: string
          name: string
          description: string | null
          order_number: number
          educational_content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_id: string
          name: string
          description?: string | null
          order_number: number
          educational_content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          program_id?: string
          name?: string
          description?: string | null
          order_number?: number
          educational_content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          stage_id: string
          name: string
          type: 'chat' | 'form' | 'document'
          description: string | null
          prompt_template: string | null
          order_number: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stage_id: string
          name: string
          type: 'chat' | 'form' | 'document'
          description?: string | null
          prompt_template?: string | null
          order_number: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stage_id?: string
          name?: string
          type?: 'chat' | 'form' | 'document'
          description?: string | null
          prompt_template?: string | null
          order_number?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          program_id: string
          current_stage_id: string | null
          status: 'not_started' | 'in_progress' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          program_id: string
          current_stage_id?: string | null
          status: 'not_started' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string
          current_stage_id?: string | null
          status?: 'not_started' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      insights: {
        Row: {
          id: string
          content: string
          stage_id: string
          user_id: string
          is_saved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          stage_id: string
          user_id: string
          is_saved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          stage_id?: string
          user_id?: string
          is_saved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
