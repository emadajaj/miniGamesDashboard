import { ProductEffect } from './effect/like-card-products.effect';
import { productReducer } from './reducer/like-card-products.reducer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('product',productReducer),
    EffectsModule.forFeature(
      [ProductEffect]
    )
  ],
  providers: [
    {
      provide: 'ngrxStore',
      useValue: {
        enabled: true,
      },
    },
  ],
})
export class ProductManagerStoreModule {}
