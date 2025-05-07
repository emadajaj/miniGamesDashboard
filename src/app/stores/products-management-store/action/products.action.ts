import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductActions = createActionGroup({
  source: 'product',
  events: {
    'Edit Product' :props<{ product: any }>(),
    'Edit Product Success' :emptyProps(),
    'Edit Product Failure' :props<{ error: any }>(),
  },
});
