import { createReducer, on } from "@ngrx/store";
import { startLoading, stopLoading } from "../action/loading.action";

export interface AppState {
  loading: boolean;
  // other states...
}

const initialState: AppState = {
  loading: false,
  // other initial states...
};

export const appReducer = createReducer(
  initialState,
  on(startLoading, (state) => ({ ...state, loading: true })),
  on(stopLoading, (state) => ({ ...state, loading: false }))
);