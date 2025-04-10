// src/app/store/auth/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../action/auth.action';

export interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
  error: string | null;
  token: string | null; // Add token property
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null,
  token: null // Add token property
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);