import { createAction } from '@ngrx/store';

export const startLoading = createAction('[Loading] Start Loading');
export const stopLoading = createAction('[Loading] Stop Loading');