import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

export const useAuth = () => {
  const router = useRouter()
  const { user, setUser, profile, setProfile } = useAuthStore()

  const loadProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      if (profile) setProfile(profile)
      return profile
    } catch (error) {
      console.error('Error al cargar el perfil:', error)
      return null
    }
  }

  useEffect(() => {
    // Cargar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.id)
      }
    })

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user)
          await loadProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setProfile])

  const signUp = async (email: string, password: string, fullName: string, companyName?: string) => {
    try {
      // 1. Registrar el usuario
      const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      })

      if (signUpError) throw signUpError

      if (!user) throw new Error('No se pudo crear el usuario')

      // 2. Esperar a que la sesión esté disponible
      const currentSession = session || (await supabase.auth.getSession()).data.session
      if (!currentSession) throw new Error('No se pudo obtener la sesión')

      // 3. Crear el perfil del usuario
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: fullName,
          company_name: companyName,
        })
        .select()
        .single()

      if (profileError) {
        // Si hay un error al crear el perfil, eliminamos el usuario
        await supabase.auth.admin.deleteUser(user.id)
        throw profileError
      }

      // 4. Redirigir al login
      router.push('/login')
    } catch (error) {
      console.error('Error en el registro:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (user) {
        // Cargar el perfil antes de redirigir
        const profile = await loadProfile(user.id)
        if (!profile) throw new Error('No se pudo cargar el perfil')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
      router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error al solicitar cambio de contraseña:', error)
      throw error
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      console.error('Error al actualizar contraseña:', error)
      throw error
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)

      if (error) throw error

      // Actualizar el perfil en el estado
      setProfile({ ...profile, ...updates } as Profile)
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      throw error
    }
  }

  return {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
  }
}
