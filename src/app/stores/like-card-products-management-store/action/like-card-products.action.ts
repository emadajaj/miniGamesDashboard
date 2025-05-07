import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductActions = createActionGroup({
  source: 'product',
  events: {
    'Add Product':  props<{ product: any }>(),
    'Add Product Success':  props<{ response: any[] }>(),
    'Add Product Failure': props<{ error: any }>(),
    'Load Product' :props<{ id: number }>(),
    'Load Product Success' :props<{ product: any }>(),
    'Load Product Failure' :props<{ error: any }>(),
    'Edit Product' :props<{ product: any }>(),
    'Edit Product Success' :emptyProps(),
    'Edit Product Failure' :props<{ error: any }>(),
  },
});
