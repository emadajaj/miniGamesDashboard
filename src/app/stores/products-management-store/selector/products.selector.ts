import { ProductState } from '../reducer/products.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAward = createSelector(
    selectProductState,
  (state: ProductState) => state.selectedProduct // Ensure this is the correct property name
);