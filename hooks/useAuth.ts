import { useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/types';

export const useAuth = () => {
  const { user, isAuthenticated, token, login, logout, updateUser } = useAuthStore();

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      // Aquí iría la llamada a la API de autenticación
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      login(data.user, data.token);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }, [login]);

  const handleLogout = useCallback(() => {
    try {
      // Aquí iría la lógica de logout en el backend
      logout();
      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      return false;
    }
  }, [logout]);

  const handleUpdateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      // Aquí iría la llamada a la API para actualizar el perfil
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar perfil');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return false;
    }
  }, [token, updateUser]);

  return {
    user,
    isAuthenticated,
    token,
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };
};
