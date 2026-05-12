import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@api/auth.service';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// ─── Estado inicial ───────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// ─── Thunks (ações assíncronas) ───────────────────────────────────────────────

export const getMe = createAsyncThunk(
  'auth/getMe',
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
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.login(credentials);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err.error_code ?? 'UNKNOWN_ERROR');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
