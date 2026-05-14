import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useAppDispatch';
import {
  login,
  logout,
  getMe,
  register,
  clearError,
} from '@reducers/authSlice';
import type { User } from '@reducers/authSlice';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    gender: 'male' | 'female'
  ) => Promise<void>;
  clearError: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading, isSubmitting, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSubmitting,
        error,
        login: (email, password) =>
          dispatch(login({ email, password })).unwrap(),
        logout: () => dispatch(logout()).unwrap(),
        register: (name, email, password, gender) =>
          dispatch(register({ name, email, password, gender })).unwrap(),
        clearError: () => dispatch(clearError()),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return context;
}
