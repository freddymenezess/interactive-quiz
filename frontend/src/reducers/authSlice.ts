import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@api/auth.service';
import { ERROR_MESSAGES } from '../lib/utils';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  role: Role;
  gender: 'male' | 'female';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

// ─── Estado inicial ───────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isSubmitting: false,
  error: null,
};

const getErrorMessage = (code: string): string =>
  ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;

// ─── Thunks (ações assíncronas) ───────────────────────────────────────────────

export const getMe = createAsyncThunk(
  '/auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getMe();
      return data.user;
    } catch {
      return rejectWithValue('Sessão expirada');
    }
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.login(credentials);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err.error_code));
    }
  }
);

export const logout = createAsyncThunk('/auth/logout', async () => {
  await authService.logout();
});

export const register = createAsyncThunk(
  '/auth/register',
  async (
    credentials: {
      name: string;
      email: string;
      password: string;
      gender: 'male' | 'female';
    },
    { rejectWithValue }
  ) => {
    try {
      await authService.register(credentials);
    } catch (err: any) {
      return rejectWithValue(err.error_code ?? 'UNKNOWN_ERROR');
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getMe
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });

    // login
    builder
      .addCase(login.pending, (state) => {
        state.isSubmitting = true; // ← não toca no isLoading
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSubmitting = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSubmitting = false;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isSubmitting = false;
      state.error = null;
    });

    // register
    builder
      .addCase(register.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSubmitting = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
