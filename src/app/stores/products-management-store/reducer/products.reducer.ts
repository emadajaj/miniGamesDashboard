
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../action/products.action';

export interface ProductState {
  products: any[];
  loading: boolean;
  selectedProduct: any,
  error: string | null;
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    selectedProduct: null,
    error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.ProductActions.editProductSuccess, (state) => ({
    ...state,
    selectedProduct: null, // Optionally reset after editing
  })),
);