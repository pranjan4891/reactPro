// src/store/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roles } from '../../utils/roles';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  role: Roles;
  error: string | null;
}

// Retrieve stored data from localStorage
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const storedRole = localStorage.getItem('role') as Roles;

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: !!storedToken,  // User is authenticated if there's a stored token
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  role: storedRole || Roles.Admin,  // Default role
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: string; token: string; role: Roles }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('role', action.payload.role);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = Roles.Admin;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
    setAuthenticatedUser(state, action: PayloadAction<{ user: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  },
});

export const { loginSuccess, loginFailure, logout, setAuthenticatedUser } = authSlice.actions;

export default authSlice.reducer;
