import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducer/loading.reducer';

export const selectLoadingState = createFeatureSelector<AppState>('loading');

export const selectLoading = createSelector(
    selectLoadingState,
  (state: AppState) => state.loading // Ensure this is the correct property name
);