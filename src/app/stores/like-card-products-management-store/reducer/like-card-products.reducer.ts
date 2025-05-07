
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../action/like-card-products.action';

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
  on(ProductActions.ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.ProductActions.addProductSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    products: [...state.products, response],
  })),
  on(ProductActions.ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductActions.ProductActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product, 
  })),
  on(ProductActions.ProductActions.editProductSuccess, (state) => ({
    ...state,
    selectedProduct: null, // Optionally reset after editing
  })),
);